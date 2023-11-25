"use client";

import Link from "next/link";
import { NavbarMenuItem } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import classNames from "classnames";

export const NavbarItem = ({ item }: { item: NavbarMenuItem }) => {
  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          {item.content}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {item?.children?.map((children) => {
            if (children.link) {
              return (
                <DropdownMenuItem
                  key={`dropdown-${item.content}`}
                  className="cursor-pointer"
                >
                  <Link href={children.link} className="flex items-center">
                    {children.icon}
                    <span>{children.content}</span>
                  </Link>
                </DropdownMenuItem>
              );
            }

            if (children.content === "separator") {
              return <DropdownMenuSeparator key={`dropdown-${item.content}`} />;
            }
            return (
              <DropdownMenuItem
                key={`dropdown-${item.content}`}
                onClick={children.onClick}
                className={classNames(children.onClick && "cursor-pointer")}
              >
                {children.icon}
                <span>{children.content}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (item.link) {
    return (
      <Link
        href={item.link}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {item.content}
      </Link>
    );
  }

  return (
    <span
      onClick={item.onClick}
      className={classNames(
        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        item.onClick && "cursor-pointer",
      )}
    >
      {item.content}
    </span>
  );
};
