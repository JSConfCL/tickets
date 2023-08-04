"use client";
import { useAuth } from "@clerk/nextjs";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  useEffect(() => {
    const start = async () => {
      const token = await getToken({
        template: "API_AUTH",
      });
      console.log({ token });
    };
    start().catch((e) => {
      console.error(e);
    });
  }, []);
  return (
    <div className="h-full overflow-hidden">
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="sync">{children}</AnimatePresence>
      </LazyMotion>
    </div>
  );
}

export const runtime = "edge";
