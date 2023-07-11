import type { ReactNode } from "react";
import { styled } from "~/styles/stitches.config";
import type { CSS } from "~/styles/stitches.config";

export interface BoxProps extends Omit<Partial<HTMLElement>, "children"> {
  as?: keyof JSX.IntrinsicElements;
  css?: CSS;
  children?: ReactNode;
}

const Box = styled("div", {}, "Box");

export default Box;
