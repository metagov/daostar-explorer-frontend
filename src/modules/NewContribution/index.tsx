import { ChangeEvent, useState, useEffect } from "react";

import { styled } from "~/styles/stitches.config";

import CenteredLayout from "~/layouts/CenteredLayout";

import Button from "~/components/ui/Button";
import Link from "~/components/ui/Link";
import DateInput from "~/components/ui/DateInput";
import TextArea from "~/components/ui/TextArea";
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

const Description = () => (
  <Regular>
    Your contribution will be submitted to{" "}
    <Link href="https://govrn.app">Govrn</Link>.
  </Regular>
);

const Label = styled(Regular, {
  fontWeight: "$bold",
});

export default function NewContribution() {
  const [hasErrors, setHasErrors] = useState(true);
  const [title, setTitle] = useState<string | null>();
  const [_description, setDescription] = useState<string | null>();
  const [dateOfEngagement, setDateOfEngagement] = useState<string | null>();

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onDateOfEngagementChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfEngagement(event.target.value);
  };

  const onSubmit = () => {
    if (hasErrors) return;

    // 1. Get the right signature
    // 2. Submit to the API to get the details URI
    // 3. Submit to govrn
    // 4. Get the second signature
    // 5. Submit the receipt to the API
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

  return (
    <CenteredLayout>
      <ContentLayout>
        <Title>Submit Contribution</Title>
        <Description />

        <InputGroup>
          <Label>Title</Label>
          <TextInput
            onChange={onTitleChange}
            placeholder="Tell us what you did."
          />
        </InputGroup>

        <InputGroup>
          <Label>Description</Label>
          <TextArea
            onChange={onDescriptionChange}
            placeholder="Want to describe it a little bit further?"
          />
        </InputGroup>

        <InputGroup>
          <Label>Date of Engagement</Label>
          <DateInput onChange={onDateOfEngagementChange} />
        </InputGroup>

        <SubmitGroup>
          <Button disabled={hasErrors} onClick={onSubmit}>
            Submit
          </Button>
        </SubmitGroup>
      </ContentLayout>
    </CenteredLayout>
  );
}
