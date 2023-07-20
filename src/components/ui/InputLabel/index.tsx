import { styled } from "~/styles/stitches.config";
import { Regular } from "~/components/ui/Typography";

const InputLabel = styled(Regular, {
  fontSize: "$8",
  fontWeight: "$bold",

  variants: {
    error: {
      true: {
        color: "$purple",
      },
    },
  },
});

export default InputLabel;
