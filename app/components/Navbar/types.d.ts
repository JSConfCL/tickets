export type NavbarMenuItem = {
  content: string;
  show: boolean;
  link?: string;
  fullLink?: string;
  icon?: React.ReactNode;
  variant?: "secondary" | "link" | "default";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: Array<NavbarMenuItem>;
};

export type NavBarProps = {
  items: Array<NavbarMenuItem>;
};
