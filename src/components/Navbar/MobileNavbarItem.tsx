"use client";

import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { NavbarMenuItem } from "./types";
import { MobileLink } from "./MobileLink";
import { children } from "./NavbarItem";

export const MobileNavbarItem = ({
  item,
  setOpen,
}: {
  item: NavbarMenuItem;
  setOpen: (open: boolean) => void;
}) => {
  if (item.children) {
    return (
      <>
        <h4 className="font-medium text-muted-foreground">{item.content}</h4>
        {item.children
          .filter((children) => children.content !== "separator")
          .filter((children) => children.link)
          .map((children) => {
            return (
              <MobileLink
                href={children.link}
                onOpenChange={setOpen}
                className="text-muted-foreground"
              >
                {children.content}
              </MobileLink>
            );
          })}
      </>
    );
  }

  return (
    <MobileLink
      href={item.link}
      onOpenChange={setOpen}
      className="text-muted-foreground"
    >
      {item.content}
    </MobileLink>
  );
};
