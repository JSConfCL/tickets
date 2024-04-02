"use client";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

export default function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  useEffect(() => {
    const start = async () => {
      const { data } = await supabase.auth.getSession();
      const accessToken = data?.session?.access_token;

      const localStorageKey = process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY;
      if (!accessToken || !localStorageKey) {
        return;
      }

      window.localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY!,
        accessToken,
      );
      console.log({ accessToken });
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // TODO: handle token
    });

    start().catch((e) => {
      console.error(e);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="sync">{children}</AnimatePresence>
    </LazyMotion>
  );
}

export const runtime = "edge";
