import { ReactNode } from "react";
import { useRouter } from "next/router";

import { styled } from "~/styles/stitches.config";

import Icon from "~/components/ui/Icon";
import Link from "~/components/ui/Link";
import { Regular } from "~/components/ui/Typography";

import { ReactComponent as DaostarLogo } from "~/vectors/daostar.svg";

interface NavbarLinkProps {
  href: string;
  children: ReactNode;
}

const NavbarRoot = styled(
  "div",
  {
    width: "100%",
    padding: "$30",
    minHeight: "$headerHeight",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "NavbarRoot",
);

const NavbarSection = styled(
  "div",
  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "$16",
  },
  "NavbarSection",
);

const NavbarLinkStyled = styled(
  Link,
  {
    padding: "$4 0",
    variants: {
      active: {
        true: {
          borderBottom: "1px solid $white",
        },
      },
    },
  },
  "NavbarLink",
);

const NavbarLink = ({ href, children }: NavbarLinkProps) => {
  const router = useRouter();

  return (
    <NavbarLinkStyled active={router.asPath === href} href={href}>
      {children}
    </NavbarLinkStyled>
  );
};

export default function Navbar() {
  return (
    <NavbarRoot>
      <NavbarSection>
        <Link href="/">
          <Icon size="small">
            <DaostarLogo />
          </Icon>
        </Link>
      </NavbarSection>

      <NavbarSection>
        <NavbarLink href="/contributions/new">
          <Regular>Submit Contribution</Regular>
        </NavbarLink>
        <NavbarLink href="/reputation/new">
          <Regular>Submit Reputation</Regular>
        </NavbarLink>
      </NavbarSection>
    </NavbarRoot>
  );
}
