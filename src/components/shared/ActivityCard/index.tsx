import { styled } from "~/styles/stitches.config";

import type { ContributionStatus } from "~/lib/types";

import Box from "~/components/ui/Box";

const VERTICAL_CARD_WIDTH = "217px";
const HORIZONTAL_CARD_WIDTH = "294px";

const Gradients = [
  "conic-gradient(from 90deg at 50% 50%, #55E3C1 0deg, #BD7070 151.87deg, #7A55E3 225deg, #0E012B 359.94deg, #55E3C1 360deg);",
  "conic-gradient(from 90deg at 50% 50%, #A5E355 0deg, #BD7095 151.87deg, #55E3C9 225deg, #6E45C7 359.94deg, #A5E355 360deg);",
  "conic-gradient(from 90deg at 50% 50%, #E3AA55 0deg, #B270BD 151.87deg, #E3D555 225deg, #1D2B01 359.94deg, #E3AA55 360deg);",
  "conic-gradient(from 90deg at 50% 50%, #A5E355 0deg, #BD7095 151.87deg, #5596E3 225deg, #0E012B 359.94deg, #A5E355 360deg);",
  "conic-gradient(from 90deg at 50% 50%, #D8E355 0deg, #E64949 151.87deg, #55E3D2 225deg, #0E012B 359.94deg, #D8E355 360deg);",
  "conic-gradient(from 90deg at 50% 50%, #55A7E3 0deg, #CFBC10 151.87deg, #C85FED 225deg, #6241A8 359.94deg, #55A7E3 360deg);",
  "conic-gradient(from 90deg at 50% 50%, #55E36C 0deg, #2B10CF 151.87deg, #170A1C 225deg, #1A0051 359.94deg, #55E36C 360deg);",
];

type StyleVariant = "alternative" | null;

interface Props {
  seed: bigint;
  title: string;
  content: string;
  style?: StyleVariant;
  status: ContributionStatus;
}

const LabelColors = {
  imported: {
    hex: "$blue",
    rgba: (alpha = 1) => `rgba(66, 142, 255, ${alpha})`,
  },
  minted: {
    hex: "$green",
    rgba: (alpha = 1) => `rgba(0, 168, 150, ${alpha})`,
  },
  minting: {
    hex: "$purple",
    rgba: (alpha = 1) => `rgba(105, 53, 170, ${alpha})`,
  },
  unminted: {
    hex: "$gray200",
    rgba: (alpha = 1) => `rgba(78, 78, 78, ${alpha})`,
  },
};

const BaseGradient = styled(
  "div",
  {
    inset: 0,
    padding: "$8",
    borderRadius: "$medium",
    overflow: "hidden",
    height: "140px",
    boxShadow: "$medium",

    variants: {
      style: {
        alternative: {
          borderRadius: "$full",
          height: "120px",
          width: "120px",
          transform: "rotate(-90deg)",
        },
      },
    },
  },
  "Gradient",
);

const DeterministicGradient = ({
  seed,
  style,
}: {
  seed: bigint;
  style: StyleVariant;
}) => {
  const index = Number(seed % BigInt(Gradients.length));
  const gradient = Gradients[index];

  return <BaseGradient css={{ background: gradient }} style={style} />;
};

const BlurShadowContainer = styled(
  "div",
  {
    inset: 0,
    filter: "blur(0.5px)",
    opacity: 0.9,
    variants: {
      style: {
        alternative: {
          filter: "hue-rotate(45deg) blur(0.5px)",
        },
      },
    },
  },
  "BlurShadowContainer",
);

const CardSpotlight = styled(Box, {
  position: "relative",
  height: "140px",

  variants: {
    style: {
      alternative: {
        width: "140px",
        height: "100%",
      },
    },
  },
});

const Card = styled(
  Box,
  {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "$16",
    padding: "$16",
    borderRadius: "$medium",
    backgroundColor: "$gray50",
    boxShadow: "$highLight",
    color: "$gray400",
    width: VERTICAL_CARD_WIDTH,

    variants: {
      style: {
        alternative: {
          flexDirection: "row",
          gap: "$16",
          width: HORIZONTAL_CARD_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
  "Card",
);

const LabelContainer = styled(Box, {
  display: "flex",
  width: "min-content",
  padding: "$4",
  borderRadius: "$medium",
});

const LabelContent = styled("span", {
  fontSize: "$8",
  fontWeight: "$bold",
  textTransform: "capitalize",
});

const Label = ({ status }: { status: Status }) => {
  const color = LabelColors[status]["hex"];
  const backgroundColor = LabelColors[status]["rgba"](0.3);

  return (
    <LabelContainer css={{ color, backgroundColor }}>
      <LabelContent css={{ color }}>{status}</LabelContent>
    </LabelContainer>
  );
};

const TextWrapper = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$16",
});

const Title = styled("h2", {
  fontFamily: "$IBMPlexSans",
  fontWeight: "$bold",
});

const Content = styled("p", {
  fontFamily: "$IBMPlexSans",
  fontSize: "$12",
});

export default function ActivityCard({
  seed,
  title,
  content,
  style,
  status,
}: Props) {
  return (
    <Card style={style}>
      <CardSpotlight style={style}>
        <BlurShadowContainer style={style}>
          <DeterministicGradient style={style} seed={seed} />
        </BlurShadowContainer>
      </CardSpotlight>
      <TextWrapper>
        <Title>{title}</Title>
        <Label status={status} />
        <Content>{content}</Content>
      </TextWrapper>
    </Card>
  );
}
