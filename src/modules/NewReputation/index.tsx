import { ChangeEvent, useState, useEffect } from "react";

import { styled } from "~/styles/stitches.config";

import CenteredLayout from "~/layouts/CenteredLayout";

import Button from "~/components/ui/Button";
import Link from "~/components/ui/Link";
import NumberInput from "~/components/ui/NumberInput";
import TextInput from "~/components/ui/TextInput";
import { Regular, Title } from "~/components/ui/Typography";

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

export default function NewReputation() {
  const [hasErrors, setHasErrors] = useState(true);
  const [rating, setRating] = useState<string | null>();
  const [ethAddress, setEthAddress] = useState<string | null>();

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
          <Button disabled={hasErrors}>Submit</Button>
        </SubmitGroup>
      </ContentLayout>
    </CenteredLayout>
  );
}
