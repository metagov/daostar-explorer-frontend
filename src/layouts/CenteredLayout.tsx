import { ReactNode } from "react";

import { styled } from "~/styles/stitches.config";

import Navbar from "~/components/shared/Navbar";

import MeshSrc from "~/vectors/mesh.svg";

interface Props {
  children: ReactNode;
}

const Background = styled(
  "div",
  {
    width: "100vw",
    height: "100vh",
    backgroundColor: "$black",
    backgroundImage: `url(${MeshSrc})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    overflowY: "scroll",
  },
  "Background",
);

const Container = styled(
  "div",
  {
    position: "relative",
    width: "100%",
    maxWidth: "$contentMaxWidth",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "$42",
    margin: "0 auto",
  },
  "Container",
);

export default function CenteredLayout({ children }: Props) {
  return (
    <Background>
      <Navbar />
      <Container>{children}</Container>
    </Background>
  );
}
