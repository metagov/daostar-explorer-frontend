import { forwardRef, HTMLProps, ReactNode } from "react";
import type { CSS } from "~/styles/stitches.config";
import { styled } from "~/styles/stitches.config";

export type IconSizes = "regular" | "small";
export type RotationType = string;

export type IconProps = {
  children: ReactNode;
  size?: IconSizes;
  css?: CSS;
  color?: CSS["color"];
  rotate?: RotationType;
} & Omit<HTMLProps<HTMLDivElement>, "size" | "ref" | "rotate">;

const StyledIcon = styled(
  "div",
  {
    color: "$white",
    flexShrink: 0,
    variants: {
      size: {
        regular: {
          strokeWidth: "1.55px",
        },
        small: {
          strokeWidth: "1.72px",
        },
      },
    },
  },
  "Icon",
);

const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    { children, size = "regular", rotate, color, css, ...props }: IconProps,
    ref,
  ) => (
    <StyledIcon
      ref={ref}
      size={size}
      style={{ rotate }}
      css={{ color, ...css }}
      {...props}
    >
      {children}
    </StyledIcon>
  ),
);

Icon.defaultProps = {
  size: "regular",
};

Icon.displayName = "Icon";
Icon.toString = StyledIcon.toString;

export default Icon;
