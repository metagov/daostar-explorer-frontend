import { ChangeEvent, KeyboardEvent } from "react";
import { styled } from "~/styles/stitches.config";

interface Props {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
}

const TextInputStyled = styled(
  "input",
  {
    width: "100%",
    height: "40px",
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

    variants: {
      error: {
        true: {
          border: "1px solid $purple",

          "&:focus": {
            border: "1px solid $purple",
          },
        },
      },
    },
  },
  "TextInput",
);

export default function TextInput({
  placeholder,
  onChange,
  onKeyUp,
  disabled,
  error,
}: Props) {
  return (
    <TextInputStyled
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
      disabled={disabled}
      error={error}
    />
  );
}
