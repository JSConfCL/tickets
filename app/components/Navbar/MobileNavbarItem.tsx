import { MobileLink } from "./MobileLink";
import type { NavbarMenuItem } from "./types";

export const MobileNavbarItem = ({
  item,
  onNavItemClick,
}: {
  item: NavbarMenuItem;
  onNavItemClick: () => void;
}) => {
  const mobileItemMapper = (item: NavbarMenuItem) => {
    if (item.link) {
      return (
        <MobileLink
          key={`mobileitem-${item.content}`}
          href={item.fullLink ? item.fullLink : item.link}
          onClick={(e) => {
            item.onClick?.(e);
            onNavItemClick();
          }}
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
            item.onClick?.(e);
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
        <h4 className="font-bold text-primary">{item.content}</h4>
        {item.children
          .filter((children) => children.content !== "separator")
          .map(mobileItemMapper)}
      </>
    );
  }

  return mobileItemMapper(item);
};
