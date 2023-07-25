import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useWallet } from "~/hooks/useWallet";
import { Users } from "~/lib/wallet/reputable/users";

import { createContribution, updateContribution } from "~/lib/api";
import { toEpoch } from "~/lib/date";

import { styled } from "~/styles/stitches.config";

import CenteredLayout from "~/layouts/CenteredLayout";

import Button from "~/components/ui/Button";
import Link from "~/components/ui/Link";
import NumberInput from "~/components/ui/NumberInput";
import TextInput from "~/components/ui/TextInput";
import { Regular, Large, Title } from "~/components/ui/Typography";

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

// TODO: link to Reputable
const Description = () => (
  <Regular>
    Your reputation rating will be submitted to Reputable. This will also create
    a contribution on <Link href="https://govrn.app">Govrn</Link> to track your
    rating.
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

const DisabledLayout = () => (
  <CenteredLayout>
    <ContentLayout>
      <Title>Submit Reputation Rating</Title>
      <Large>
        Unfortunately, you're not allowlisted to use this feature. Please reach
        out to our team to give you access.
      </Large>
    </ContentLayout>
  </CenteredLayout>
);

export default function NewReputation() {
  const [hasErrors, setHasErrors] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [rating, setRating] = useState<string | null>();
  const [ethAddress, setEthAddress] = useState<string | null>();
  const [ownerAddress, setOwnerAddress] = useState<string | null>();
  const wallet = useWallet();
  const router = useRouter();

  const onRatingChange = (
    event: ChangeEvent<HTMLInputElement>,
    error: string,
  ) => {
    !!error ? setRating(null) : setRating(event.target.value);
  };

  const onEthAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEthAddress(event.target.value);
  };

  useEffect(() => {
    if (!rating) {
      setHasErrors(true);
      return;
    }

    if (!ethAddress) {
      setHasErrors(true);
      return;
    }

    setHasErrors(false);
  }, [rating, ethAddress]);

  const onSubmit = async () => {
    if (hasErrors) return;

    setIsFetching(true);

    //
    // Reputable minting
    //

    // 1. Switch the network to Reputable's
    await wallet.switchNetwork("reputable");

    // 2. Mint the reputation score
    const { hash: reputableTxHash } = await wallet.reputable.adder(
      ethAddress,
      ownerAddress,
      Number(rating),
    );

    setIsMinting(true);

    //
    // Govrn minting
    //

    // 1. Switch network to Govrn's config
    await wallet.switchNetwork("govrn");

    // 2. Draft the contribution data and mint a temporary contribution on the backend.
    //    See NewContribution.tsx for the explanation for this process.
    const contributionTitle = `Rated ${ethAddress} on Reputable`;
    const contributionDescription = `Gave a rating of ${rating} to ${ethAddress} on Reputable.`;
    const contributionCategory = "Unknown";
    const contributionDateOfEngagement = new Date().toJSON();
    const contributionProof = reputableTxHash;

    const firstMessage = [
      contributionTitle,
      contributionDescription,
      contributionCategory,
      contributionProof,
      contributionDateOfEngagement,
    ].join(",");

    const firstSignature = await wallet.sign(firstMessage);

    const { data, errors } = await createContribution(firstSignature, {
      title: contributionTitle,
      description: contributionDescription,
      category: contributionCategory,
      dateOfEngagement: contributionDateOfEngagement,
      proof: contributionProof,
    });

    if (errors) {
      setHasErrors(true);
      console.error(errors);
      alert("Something went wrong, please try again later");
      return;
    }

    // 3. Mint the contribution on Govrn
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
      console.error(updateErrors);
      alert("Something went wrong, please try again later");
      return;
    }

    // 6. Redirect to the rated user's page
    router.push({
      pathname: `/${ethAddress}`,
      query: { fromMint: "1" },
    });

    setIsFetching(false);
  };

  useEffect(() => {
    (async () => {
      const address = await wallet.getAddress();
      setOwnerAddress(address.toLowerCase());
    })();
  }, [wallet]);

  if (ownerAddress && !Users[ownerAddress]) return <DisabledLayout />;

  if (isMinting) return <MintingLayout />;

  return (
    <CenteredLayout>
      <ContentLayout>
        <Title>Submit Reputation Rating</Title>
        <Description />

        <InputGroup>
          <Label>ETH Address</Label>
          <TextInput
            onChange={onEthAddressChange}
            placeholder="Address of the person you're rating. Only pre-approved addresses are allowed."
          />
        </InputGroup>

        <InputGroup>
          <Label>Rating</Label>
          <NumberInput
            placeholder="Please rate 0-5"
            min={0}
            max={5}
            onChange={onRatingChange}
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
