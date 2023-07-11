import { CSS, styled } from "~/styles/stitches.config";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { UrlObject } from "url";

const isExternalUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
interface LinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string | UrlObject;
  nextLinkProps?: Omit<NextLinkProps, "passHref">;
  children: ReactNode;
  css?: CSS;
}

const StyledLink = styled(
  "span",
  {
    textDecoration: "none",
    position: "relative",
    cursor: "pointer",
  },
  "StyledLink",
);

const Link = ({ children, href, nextLinkProps, ...linkProps }: LinkProps) => {
  if (typeof href === "string" && isExternalUrl(href)) {
    return (
      <StyledLink
        as="a"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        {...linkProps}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <NextLink href={href} passHref {...nextLinkProps} legacyBehavior>
      <StyledLink {...linkProps}>{children}</StyledLink>
    </NextLink>
  );
};

export default Link;
