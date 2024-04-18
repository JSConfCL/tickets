import Link from "next/link";

import { NavBarProps } from "./types";
import { NavbarItem } from "./NavbarItem";
import { buttonVariants } from "../ui/button";
import { useIsAuthReady, useIsLoggedIn } from "@/utils/supabase/AuthProvider";
import { urls } from "../../lib/urls";

export function MainNav({ items }: NavBarProps) {
  const user = useIsLoggedIn();
  const isReady = useIsAuthReady();
  return (
    <nav className={"items-center space-x-4 lg:space-x-6"}>
      {items.map((item) => (
        <NavbarItem key={`navbarItem-${item.content}`} item={item} />
      ))}
      {isReady && !user ? (
        <Link className={buttonVariants({})} href={urls.login}>
          Ingresar
        </Link>
      ) : null}
    </nav>
  );
}
