"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavBarProps } from "./types";
import { MobileNavbarItem } from "./MobileNavbarItem";
import { MobileLink } from "./MobileLink";
import { Menu, PackageOpen } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileNav({ items }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [redirectUrl, setRedirectUrl] = useState("");
  useEffect(() => {
    setRedirectUrl(window.location.host);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <PackageOpen className="h-5 w-5" />
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] px-6 pb-10">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              {items.map((item) => (
                <MobileNavbarItem
                  key={`mobile-${item.content}`}
                  item={item}
                  setOpen={setOpen}
                />
              ))}
              <SignedOut>
                {process.env.NEXT_PUBLIC_SIGN_IN_URL ? (
                  <Button asChild variant="link">
                    <a
                      href={`${process.env.NEXT_PUBLIC_SIGN_IN_URL}?redirect_url=https://${redirectUrl}`}
                    >
                      Ingresar
                    </a>
                  </Button>
                ) : (
                  <SignInButton mode="modal" redirectUrl={pathname}>
                    <Button variant="link" onClick={() => setOpen(false)}>
                      Ingresar
                    </Button>
                  </SignInButton>
                )}
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <div
                    className="cursor-pointer text-muted-foreground"
                    onClick={() => {
                      setOpen(false);
                    }}
                    // item={{ link: "#", content: "Salir" }}
                    // setOpen={setOpen}
                  >
                    Salir
                  </div>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
