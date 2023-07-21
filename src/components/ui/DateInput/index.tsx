import { ChangeEvent } from "react";
import { styled } from "~/styles/stitches.config";

interface Props {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const DateInputStyled = styled(
  "input",
  {
    width: "min-content",
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
  },
  "DateInput",
);

export default function DateInput({ onChange, disabled }: Props) {
  return (
    <DateInputStyled type="date" onChange={onChange} disabled={disabled} />
  );
}
