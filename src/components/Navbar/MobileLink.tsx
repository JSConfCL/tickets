import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import classNames from "classnames";

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={classNames(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
