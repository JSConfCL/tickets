"use client";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="sync">{children}</AnimatePresence>
    </LazyMotion>
  );
}

export const runtime = "edge";
