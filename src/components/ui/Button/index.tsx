import { styled } from "~/styles/stitches.config";

const Button = styled(
  "button",
  {
    background: "transparent",
    border: "1px solid $yellow",
    borderRadius: "$small",
    color: "$yellow",
    padding: "$8 $16",

    "&:hover": {
      cursor: "pointer",
      background: "rgba(248, 228, 65, 0.40)",
      transition: "background 0.2s ease",
    },

    variants: {
      rounded: {
        true: {
          borderRadius: "large",
        },
      },
      filled: {
        true: {
          background: "rgba(248, 228, 65, 0.40)",
        },
      },
    },
  },
  "Button",
);

export default Button;
