import { ChangeEvent, KeyboardEvent } from "react";
import { styled } from "~/styles/stitches.config";

interface Props {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextAreaStyled = styled(
  "textarea",
  {
    width: "100%",
    minHeight: "80px",
    padding: "$8",
    border: "1px solid $gray200",
    borderRadius: "$small",
    backgroundColor: "$gray400",
    color: "$gray100",
    fontSize: "$16",
    outline: "none",
    transition: "border 0.2s ease",

    "&:focus": {
      border: "1px solid $gray100",
    },
  },
  "TextArea",
);

export default function TextArea({ placeholder, onChange, onKeyUp }: Props) {
  return (
    <TextAreaStyled
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
}
