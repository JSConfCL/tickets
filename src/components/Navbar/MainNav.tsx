import Link from "next/link";

import { NavBarProps } from "./types";
import { NavbarItem } from "./NavbarItem";
import { buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export function MainNav({ items }: NavBarProps) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setLoading(false);
      setUser(data?.session?.user ?? null);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUser();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className={"items-center space-x-4 lg:space-x-6"}>
      {items.map((item) => (
        <NavbarItem key={`navbarItem-${item.content}`} item={item} />
      ))}
      {!loading && !user ? (
        <Link className={buttonVariants({})} href="/login">
          Ingresar
        </Link>
      ) : null}
    </nav>
  );
}
