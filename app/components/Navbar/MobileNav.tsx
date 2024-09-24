import { Menu, Tickets } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

import { MobileLink } from "./MobileLink";
import { MobileNavbarItem } from "./MobileNavbarItem";
import type { NavBarProps } from "./types";

export function MobileNav({ items }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const closeNav = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink href="/" className="flex items-center" onClick={closeNav}>
          <Tickets className="size-5" />
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] px-0 pb-10">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              {items
                .filter((item) => item.show)
                .map((item) => (
                  <MobileNavbarItem
                    key={`mobile-${item.content}`}
                    item={item}
                    onNavItemClick={closeNav}
                  />
                ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
