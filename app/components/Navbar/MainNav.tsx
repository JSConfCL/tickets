import { NavbarItem } from "./NavbarItem";
import type { NavBarProps } from "./types";

export function MainNav({ items }: NavBarProps) {
  return (
    <nav className={"flex flex-row items-center gap-1"}>
      {items
        .filter((item) => item.show)
        .map((item) => (
          <NavbarItem key={`navbarItem-${item.content}`} item={item} />
        ))}
    </nav>
  );
}
