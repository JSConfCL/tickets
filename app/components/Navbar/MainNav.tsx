import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";

import { NavbarItem } from "./NavbarItem";
import type { NavBarProps } from "./types";
import { urls } from "~/utils/urls";
import { buttonVariants } from "../ui/button";

export function MainNav({ items }: NavBarProps) {
  const user = useIsLoggedIn();
  const isReady = useIsAuthReady();

  return (
    <nav className={"items-center space-x-4 lg:space-x-6"}>
      {items.map((item) => (
        <NavbarItem key={`navbarItem-${item.content}`} item={item} />
      ))}
      {isReady && !user ? (
        <a className={buttonVariants({})} href={urls.login}>
          Ingresar
        </a>
      ) : null}
    </nav>
  );
}
