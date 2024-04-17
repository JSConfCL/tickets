"use client";

import { NavbarMenuItem } from "./types";
import { MobileLink } from "./MobileLink";

export const MobileNavbarItem = ({
  item,
  setOpen,
}: {
  item: NavbarMenuItem;
  setOpen: (open: boolean) => void;
}) => {
  const mobileItemMapper = (item: NavbarMenuItem) => {
    if (item.link) {
      return (
        <MobileLink
          key={`mobileitem-${item.content}`}
          href={item.link}
          onOpenChange={setOpen}
          className="text-muted-foreground"
        >
          {item.content}
        </MobileLink>
      );
    }

    if (item.onClick) {
      return (
        <span
          className="cursor-pointer text-muted-foreground"
          role="button"
          aria-pressed="false"
          onClick={(e) => {
            if (item.onClick) {
              item.onClick(e);
            }
            if (item.closeMenu) {
              setOpen(false);
            }
          }}
        >
          {item.content}
        </span>
      );
    }

    return (
      <h4 className="font-medium text-muted-foreground">{item.content}</h4>
    );
  };

  if (item.children) {
    return (
      <>
        <h4 className="font-medium text-muted-foreground">{item.content}</h4>
        {item.children
          .filter((children) => children.content !== "separator")
          .map(mobileItemMapper)}
      </>
    );
  }

  return mobileItemMapper(item);
};
