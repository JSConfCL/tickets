import { Link } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/utils/utils";

import type { NavbarMenuItem } from "./types";

export const NavbarItem = ({ item }: { item: NavbarMenuItem }) => {
  const variant = item.variant || "link";

  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          {item.content}
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end">
            {item.children
              .filter((child) => child.show)
              .map((child: NavbarMenuItem) => {
                if (child.link) {
                  return (
                    <DropdownMenuItem
                      key={`dropdown-${item.content}`}
                      className="cursor-pointer"
                    >
                      <Link to={child.fullLink ? child.fullLink: child.link} className="flex items-center">
                        {child.icon}
                        <span>{child.content}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                }

                if (child.content === "separator") {
                  return (
                    <DropdownMenuSeparator key={`dropdown-${item.content}`} />
                  );
                }

                return (
                  <DropdownMenuItem
                    key={`dropdown-${item.content}`}
                    onClick={child.onClick}
                    className={cn(child.onClick && "cursor-pointer")}
                  >
                    {child.icon}
                    <span>{child.content}</span>
                  </DropdownMenuItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );
  }

  if (item.link) {
    return (
      <Button variant={variant} asChild>
        <Link to={item.fullLink ? item.fullLink: item.link}>{item.content}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} onClick={item.onClick}>
      {item.content}
    </Button>
  );
};
