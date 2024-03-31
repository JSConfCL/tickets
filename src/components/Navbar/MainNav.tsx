import Link from "next/link";
import { useRouter } from "next/navigation";

import { NavBarProps } from "./types";
import { NavbarItem } from "./NavbarItem";
import { Button, buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export function MainNav({ items }: NavBarProps) {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUser();
  }, []);

  const handleLogout = () => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/login");
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signOut();
  };

  return (
    <nav className={"items-center space-x-4 lg:space-x-6"}>
      {items.map((item) => (
        <NavbarItem key={`navbarItem-${item.content}`} item={item} />
      ))}
      {user ? (
        <Button className="cursor-pointer" onClick={handleLogout}>
          Salir
        </Button>
      ) : (
        <Link className={buttonVariants({})} href="/login">
          Ingresar
        </Link>
      )}
    </nav>
  );
}
