"use client";

import Link from "next/link";
import { NavbarMenuItem } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const NavbarItem = ({ item }: { item: NavbarMenuItem }) => {
  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          {item.content}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {item.children.map((children) => {
            if (children.link) {
              return (
                <DropdownMenuItem>
                  {children.icon}
                  <span>{children.content}</span>
                </DropdownMenuItem>
              );
            }

            if (children.content === "separator") {
              return <DropdownMenuSeparator />;
            }
            return (
              <DropdownMenuLabel className="text-sm">
                {children.content}
              </DropdownMenuLabel>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.link}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {item.content}
    </Link>
  );
};
