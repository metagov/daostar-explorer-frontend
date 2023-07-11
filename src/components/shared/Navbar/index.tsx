import { styled } from "~/styles/stitches.config";

import Link from "~/components/ui/Link";
import Icon from "~/components/ui/Icon";

import { ReactComponent as DaostarLogo } from "~/vectors/daostar.svg";

const NavbarRoot = styled(
  "div",
  {
    width: "100%",
    padding: "$30",
    minHeight: "$headerHeight",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  "NavbarRoot",
);

export default function Navbar() {
  return (
    <NavbarRoot>
      <Link href="/">
        <Icon size="small">
          <DaostarLogo />
        </Icon>
      </Link>
    </NavbarRoot>
  );
}
