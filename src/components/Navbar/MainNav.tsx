import { NavBarProps } from "./types";
import { NavbarItem } from "./NavbarItem";

export function MainNav({items}: NavBarProps) {
  return (
    <nav
      className={"items-center space-x-4 lg:space-x-6"}>
      {items.map((item) => (
        <NavbarItem key={item.content} item={item} />
      ))}
    </nav>
  );
}
