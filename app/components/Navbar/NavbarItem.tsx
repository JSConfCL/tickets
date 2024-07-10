import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
        <DropdownMenuContent align="end">
          {item.children
            .filter((child) => child.show)
            .map((child) => {
              if (child.link) {
                return (
                  <DropdownMenuItem
                    key={`dropdown-${item.content}`}
                    className="cursor-pointer"
                  >
                    <a href={child.link} className="flex items-center">
                      {child.icon}
                      <span>{child.content}</span>
                    </a>
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
      </DropdownMenu>
    );
  }

  if (item.link) {
    return (
      <Button variant={variant} asChild>
        <a href={item.link}>{item.content}</a>
      </Button>
    );
  }

  return (
    <Button variant={variant} onClick={item.onClick}>
      {item.content}
    </Button>
  );
};
