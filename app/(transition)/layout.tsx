"use client";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import React from "react";

import { AuthProvider } from "@/utils/supabase/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="sync">{children}</AnimatePresence>
      </LazyMotion>
    </AuthProvider>
  );
}

export const runtime = "edge";
