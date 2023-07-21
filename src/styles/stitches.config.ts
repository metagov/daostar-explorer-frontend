/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-restricted-imports */
// Check https://rossmoody.com/writing/remix-stitches for more info

import * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";
import { IBM_Plex_Sans } from "next/font/google";

import baseColors from "~/components/ui/Colors";

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const stitchesInstance = createStitches({
  theme: {
    colors: {
      ...baseColors,
    },
    fonts: {
      IBMPlexSans: IBMPlexSans.style.fontFamily,
      fallback:
        "system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    },
    fontSizes: {
      64: "64px",
      42: "42px",
      30: "30px",
      16: "16px",
      12: "12px",
      8: "8px",
    },
    lineHeights: {
      100: "100%",
      120: "120%",
      140: "140%",
      145: "145%",
      155: "155%",
      160: "160%",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    space: {
      64: "64px",
      42: "42px",
      30: "30px",
      16: "16px",
      8: "8px",
      4: "4px",
      2: "2px",
    },
    sizes: {
      headerHeight: "108px",
      contentMaxWidth: "1000px",
    },
    radii: {
      small: "2px",
      medium: "12px",
      large: "24px",
      full: "50%",
    },
    shadows: {
      medium: "0px 4px 10px rgba(0, 0, 0, 0.4)",
      high: "5px 10px 24px rgba(0, 0, 0, 0.3)",
      mediumLight: "0px 4px 10px rgba(255, 255, 255, 0.4)",
      highLight: "5px 10px 24px rgba(255, 255, 255, 0.3)",
    },
  },
  media: {},

  utils: {
    marginX: (value: Stitches.PropertyValue<"margin">) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: Stitches.PropertyValue<"margin">) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: Stitches.PropertyValue<"padding">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: Stitches.PropertyValue<"padding">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});

export type CSS = Stitches.CSS<typeof stitchesInstance.config>;

/**
 * The code below forces everyone to specify a human readable
 * name for each instance of `styled` they create.
 *
 * Ignore ts checks on this function so we can keep it working as the original one
 */

//@ts-ignore
export const styled: typeof stitchesInstance.styled = (
  target,
  styles,
  name: string,
) => {
  //@ts-ignore
  const Original = stitchesInstance.styled(target, styles);
  const className = name
    ? Original.className.replace("c-", `${name}-`)
    : Original.className;

  return Object.assign({}, Original, {
    defaultProps: { className },
    displayName: name,
    className,
    selector: `.${className}`,
  });
};

export const {
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
  prefix,
} = stitchesInstance;
