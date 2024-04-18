export type NavbarMenuItem = {
  content: string;
  link?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: Array<NavbarMenuItem>;
  closeMenu?: boolean;
};

export type NavBarProps = {
  items: Array<NavbarMenuItem>;
};
