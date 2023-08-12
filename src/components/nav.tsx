import Link from "next/link";
import { Icons } from "./icons";
import { MainNav } from "./Navbar/MainNav";
import { MobileNav } from "./Navbar/MobileNav";
import { MainNavGuest } from "./Navbar/MainNavGuest";
import { MobileNavGuest } from "./Navbar/MobileNavGuest";
import { ThemeSwitcher } from "./Navbar/ThemeSwitcher";
import { currentUser } from "@clerk/nextjs";
import { LogOut, Settings, User } from "lucide-react";

export const Nav = async () => {
  const user = await currentUser();

  const guestItems = [
    {
      content: "Eventos",
      link: "/",
    },
    {
      content: "Comunidades",
      link: "/",
    },
    {
      content: "Login",
      link: "/",
    },
    {
      content: "Regístrate",
      link: "/",
    },
  ];

  const userItems = [
    {
      content: "Eventos",
      link: "/",
    },
    {
      content: "Comunidades",
      link: "/",
    },
    {
      content: "Perfil",
      children: [
        {
          content: "Mi Cuenta",
          icon: <User className="mr-2 h-4 w-4"  />,
          link: "/",
        },
        {
          content: "separator",
        },
        {
          content: "Settings",
          icon: <Settings className="mr-2 h-4 w-4"  />,
          link: "/",
        },
        {
          content: "separator",
        },
        {
          content: "Salir",
          icon: <LogOut className="mr-2 h-4 w-4"  />,
          link: "/",
        },
      ],
    },
  ];

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href={"/"} target="_blank" rel="noreferrer">
          <div className="px-0 block dark:hidden">
            <Icons.logo className="h-5 w-5" />
            <span className="sr-only">Devent</span>
          </div>
          <div className="px-0 hidden dark:block">
            <Icons.logoDark className="h-5 w-5" />
            <span className="sr-only">Devent</span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center space-x-4 hidden md:flex ">
            <MainNav items={!user ? userItems : guestItems} />
            <ThemeSwitcher />
          </nav>
        </div>
        <MobileNav items={!user ? userItems : guestItems} />
      </div>
    </header>
  );
};
