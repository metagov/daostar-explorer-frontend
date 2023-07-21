import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useWallet } from "~/hooks/useWallet";

import { createContribution, updateContribution } from "~/lib/api";
import { toEpoch } from "~/lib/date";

import { styled } from "~/styles/stitches.config";

import CenteredLayout from "~/layouts/CenteredLayout";

import Button from "~/components/ui/Button";
import Link from "~/components/ui/Link";
import DateInput from "~/components/ui/DateInput";
import TextArea from "~/components/ui/TextArea";
import TextInput from "~/components/ui/TextInput";
import { Regular, Large, Title } from "~/components/ui/Typography";

const unmintedContributionSignableMessage = (
  title: string,
  description: string,
  category: string,
  dateOfEngagement: string,
) =>
  [title, description, category, dateOfEngagement]
    .filter((field) => field)
    .join(",");

const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$30",
});

const InputGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$8",
});

const SubmitGroup = styled(InputGroup, {
  width: "min-content",
});

const Description = () => (
  <Regular>
    Your contribution will be submitted to{" "}
    <Link href="https://govrn.app">Govrn</Link>.
  </Regular>
);

const Label = styled(Regular, {
  fontWeight: "$bold",
});

const MintingLayout = () => (
  <CenteredLayout>
    <ContentLayout>
      <Title>Submit Contribution</Title>
      <Large>
        Don't close this page! Your contribution is minting. It's important that
        you keep the page open. It may take a few minutes...
      </Large>
    </ContentLayout>
  </CenteredLayout>
);

export default function NewContribution() {
  const [isMinting, setIsMinting] = useState(false);
  const [hasErrors, setHasErrors] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [title, setTitle] = useState<string | null>();
  const [description, setDescription] = useState<string | null>();
  const [dateOfEngagement, setDateOfEngagement] = useState<string | null>();
  const wallet = useWallet();
  const router = useRouter();

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onDateOfEngagementChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);

    if (date instanceof Date && !isNaN(date.valueOf())) {
      setDateOfEngagement(date.toISOString());
    } else {
      setDateOfEngagement(null);
      setHasErrors(true);
    }
  };

  const onSubmit = async () => {
    if (hasErrors) return;

    setIsFetching(true);

    // 1. Switch network to whatever Govrn is configured to be using
    wallet.switchNetwork("govrn");

    // 2. Generate a temporary contribution on the backend and sign it.
    //    Signing is our way of associating it with a user without having
    //    to having implement login.
    //    The backend will pin the details on IPFS and returns us the
    //    detailsUri which we need to mint on Govrn.
    const message = unmintedContributionSignableMessage(
      title,
      description,
      "Unknown",
      dateOfEngagement,
    );

    const signature = await wallet.sign(message);

    const { data, errors } = await createContribution(signature, {
      title,
      description,
      category: "Unknown",
      dateOfEngagement,
    });

    if (errors) {
      setHasErrors(true);
      alert("Something went wrong, please try again later");
      return;
    }

    // 3. Mint the contribution on Govrn.

    const { data: contribution } = data;
    const dateOfEngagementEpoch = toEpoch(contribution.date_of_engagement);
    const dateOfSubmissionEpoch = toEpoch(new Date());

    const { hash: txHash } = await wallet.govrn.mint(
      contribution.metadata_uri,
      dateOfSubmissionEpoch,
      dateOfEngagementEpoch,
    );

    setIsMinting(true);

    const txReceipt = await wallet.watchTransaction(txHash);

    const { id: rawIssuerUid } = await wallet.govrn.getMintedIdFromReceipt(
      txReceipt,
    );

    const issuerUid = rawIssuerUid.toString();

    // 4. Update the temporary contribution on the backend to have the missing
    //    data. We're again asking the user to sign - even though it's a worse
    //    experience, it's faster than implementing login in the app.

    const updateSignature = await wallet.sign(contribution.id.toString());

    // 5. Submit the signature and data to the backend to update the temporary
    //    contribution.

    const { errors: updateErrors } = await updateContribution(
      contribution.id,
      updateSignature,
      { txHash, issuerUid },
    );

    if (updateErrors) {
      setHasErrors(true);
      alert("Something went wrong, please try again later");
      return;
    }

    // 6. Redirect to the owner contributions page
    const address = await wallet.getAddress();
    router.push(`/${address}`);

    setIsFetching(false);
  };

  useEffect(() => {
    if (!title) {
      setHasErrors(true);
      return;
    }

    if (!dateOfEngagement) {
      setHasErrors(true);
      return;
    }

    setHasErrors(false);
  }, [title, dateOfEngagement]);

  if (isMinting) return <MintingLayout />;

  return (
    <CenteredLayout>
      <ContentLayout>
        <Title>Submit Contribution</Title>
        <Description />

        <InputGroup>
          <Label>Title</Label>
          <TextInput
            onChange={onTitleChange}
            disabled={isFetching}
            placeholder="Tell us what you did."
          />
        </InputGroup>

        <InputGroup>
          <Label>Description</Label>
          <TextArea
            onChange={onDescriptionChange}
            disabled={isFetching}
            placeholder="Want to describe it a little bit further?"
          />
        </InputGroup>

        <InputGroup>
          <Label>Date of Engagement</Label>
          <DateInput
            onChange={onDateOfEngagementChange}
            disabled={isFetching}
          />
        </InputGroup>

        <SubmitGroup>
          <Button disabled={hasErrors || isFetching} onClick={onSubmit}>
            Submit
          </Button>
        </SubmitGroup>
      </ContentLayout>
    </CenteredLayout>
  );
}
