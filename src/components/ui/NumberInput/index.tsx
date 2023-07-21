import { ChangeEvent, KeyboardEvent, useState } from "react";
import { styled } from "~/styles/stitches.config";

import InputLabel from "~/components/ui/InputLabel";

interface Props {
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>, error: string) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>, error: string) => void;
}

const NumberInputStyled = styled(
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
  "NumberInput",
);

const Layout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export default function NumberInput({
  placeholder,
  disabled,
  min,
  max,
  onChange,
  onKeyUp,
}: Props) {
  const [error, setError] = useState<string | null>();

  const validateValue = (value: number) => {
    if (min !== undefined && value < min) {
      return `Value must be greater than ${min}`;
    }

    if (max !== undefined && value > max) {
      return `Value must be less than ${max}`;
    }

    return null;
  };

  const wrappedOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const error = validateValue(value);

    setError(error);
    if (onChange) onChange(event, error);
  };

  const wrappedOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    const error = validateValue(value);

    setError(error);
    if (onKeyUp) onKeyUp(event, error);
  };

  return (
    <Layout>
      <NumberInputStyled
        type="number"
        placeholder={placeholder}
        onChange={wrappedOnChange}
        onKeyUp={wrappedOnKeyUp}
        error={!!error}
        disabled={disabled}
      />
      <InputLabel error={!!error}>{error}</InputLabel>
    </Layout>
  );
}
