
export type NavbarMenuItem = {
    content: string;
    link?: string;
    icon?: React.ReactNode;
    onClick?: Function; 
    children?: Array<NavbarMenuItem | DropdownMenuSeparator>;
}

export type NavBarProps = {
    items: Array<NavbarMenuItem>;
}

