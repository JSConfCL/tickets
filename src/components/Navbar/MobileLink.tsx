import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { MouseEventHandler } from "react";

interface MobileLinkProps extends LinkProps {
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  children: React.ReactNode;
  className?: string;
}

export function MobileLink({
  href,
  onClick,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={classNames(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
