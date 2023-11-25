import { NavBarProps } from "./types";
import { NavbarItem } from "./NavbarItem";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MainNav({ items }: NavBarProps) {
  const pathname = usePathname();
  const [redirectUrl, setRedirectUrl] = useState("");
  useEffect(() => {
    setRedirectUrl(window.location.host);
  }, []);
  return (
    <nav className={"items-center space-x-4 lg:space-x-6"}>
      {items.map((item) => (
        <NavbarItem key={`navbarItem-${item.content}`} item={item} />
      ))}
      <SignedOut>
        {process.env.NEXT_PUBLIC_SIGN_IN_URL ? (
          <Button asChild variant="secondary">
            <a
              href={`${process.env.NEXT_PUBLIC_SIGN_IN_URL}?redirect_url=https://${redirectUrl}`}
            >
              Ingresar
            </a>
          </Button>
        ) : (
          <SignInButton mode="modal" redirectUrl={pathname}>
            <Button variant="secondary">Ingresar</Button>
          </SignInButton>
        )}
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button variant={"link"} className="cursor-pointer">
            Salir
          </Button>
        </SignOutButton>
      </SignedIn>
    </nav>
  );
}
