export type NavbarMenuItem = {
  content: string;
  link?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: Array<NavbarMenuItem>;
};

export type NavBarProps = {
  items: Array<NavbarMenuItem>;
};
