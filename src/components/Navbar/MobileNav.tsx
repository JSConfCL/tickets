"use client";

import { Menu, PackageOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsAuthReady, useIsLoggedIn } from "@/utils/supabase/AuthProvider";

import { MobileLink } from "./MobileLink";
import { MobileNavbarItem } from "./MobileNavbarItem";
import { NavBarProps } from "./types";
import { urls } from "../../lib/urls";

export function MobileNav({ items }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const isReady = useIsAuthReady();
  const closeNav = () => setOpen(false);
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
        <MobileLink href="/" className="flex items-center" onClick={closeNav}>
          <PackageOpen className="h-5 w-5" />
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] px-6 pb-10">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              {items.map((item) => (
                <MobileNavbarItem
                  key={`mobile-${item.content}`}
                  item={item}
                  onNavItemClick={closeNav}
                />
              ))}
              {isReady && !isLoggedIn ? (
                <Link
                  className={buttonVariants({})}
                  href={urls.login}
                  onClick={closeNav}
                >
                  Ingresar
                </Link>
              ) : null}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
