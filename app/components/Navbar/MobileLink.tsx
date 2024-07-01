import type { MouseEventHandler, AnchorHTMLAttributes } from "react";

import { cn } from "~/utils/utils";

interface MobileLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
    <a href={href} onClick={onClick} className={cn(className)} {...props}>
      {children}
    </a>
  );
}
