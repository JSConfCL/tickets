"use client";
import { useAuth } from "@clerk/clerk-react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  useEffect(() => {
    const start = async () => {
      const token = await getToken({
        template: "API_AUTH",
      });
      const localStorageKey = process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY;
      if (!token || !localStorageKey) {
        return;
      }
      window.localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY!,
        token,
      );
      console.log({ token });
    };
    start().catch((e) => {
      console.error(e);
    });
  }, []);
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="sync">{children}</AnimatePresence>
    </LazyMotion>
  );
}

export const runtime = "edge";
