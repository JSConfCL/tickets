import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./Navbar/MainNav";
import { MobileNav } from "./Navbar/MobileNav";
import { ModeToggle } from "./Navbar/ThemeSwitcher";

export const Nav = async () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href={"/"} target="_blank" rel="noreferrer">
          <div
            className="px-0 block dark:hidden"
            
          >
            <Icons.logo className="h-5 w-5" />
            <span className="sr-only">Devent</span>
          </div>
          <div
            className="px-0 hidden dark:block"
            
          >
            <Icons.logoDark className="h-5 w-5" />
            <span className="sr-only">Devent</span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center space-x-4 hidden md:flex ">
            <MainNav />
            <ModeToggle />
          </nav>
        </div>
        <MobileNav />
      </div>
    </header>
  );
};
