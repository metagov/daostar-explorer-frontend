import { ReactNode } from "react";
import { useRouter } from "next/router";

import { useWallet } from "~/hooks/useWallet";

import { styled } from "~/styles/stitches.config";

import { featureFlags } from "~/lib/config";

import Icon from "~/components/ui/Icon";
import Link from "~/components/ui/Link";
import { Regular } from "~/components/ui/Typography";

import { ReactComponent as DaostarLogo } from "~/vectors/daostar.svg";

interface NavbarLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
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

const NavbarLink = ({ href, children, onClick }: NavbarLinkProps) => {
  const router = useRouter();

  return (
    <NavbarLinkStyled
      active={router.asPath === href}
      onClick={onClick}
      href={href}
    >
      {children}
    </NavbarLinkStyled>
  );
};

export default function Navbar() {
  const wallet = useWallet();
  const router = useRouter();

  const onProfileClick = async () => {
    const address = await wallet.getAddress();
    router.push(`/${address}`);
  };

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
        <NavbarLink onClick={onProfileClick} href="#">
          <Regular>My Profile</Regular>
        </NavbarLink>
        <NavbarLink href="/contributions/new">
          <Regular>Submit Contribution</Regular>
        </NavbarLink>
        {featureFlags.reputableSubmissionEnabled && (
          <NavbarLink href="/reputation/new">
            <Regular>Submit Reputation</Regular>
          </NavbarLink>
        )}
      </NavbarSection>
    </NavbarRoot>
  );
}
