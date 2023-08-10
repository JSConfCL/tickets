import Link from "next/link";
import { Icons } from "./icons";
import { MainNav } from "./Navbar/MainNav";
import { MobileNav } from "./Navbar/MobileNav";
import { MainNavGuest } from "./Navbar/MainNavGuest";
import { MobileNavGuest } from "./Navbar/MobileNavGuest";
import { ThemeSwitcher } from "./Navbar/ThemeSwitcher";
import { currentUser } from "@clerk/nextjs";

export const Nav = async () => {
  const user = await currentUser();

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
            {user ? <MainNav /> : <MainNavGuest />}
            <ThemeSwitcher />
          </nav>
        </div>
        {user ? <MobileNav /> : <MobileNavGuest />}
      </div>
    </header>
  );
};
