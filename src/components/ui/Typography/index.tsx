import { styled } from "~/styles/stitches.config";

export const typographyBase = {
  color: "$white",
  fontFamily: "$IBMPlexSans",
};

export const Title = styled("span", {
  ...typographyBase,
  fontWeight: "$bold",
  fontSize: "$42",
});

export const Large = styled("span", {
  ...typographyBase,
  fontWeight: "$regular",
  fontSize: "$30",
});

export const Regular = styled("span", {
  ...typographyBase,
  fontWeight: "$regular",
  fontSize: "$16",
});
