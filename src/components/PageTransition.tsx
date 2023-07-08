"use client";
import React, { forwardRef } from "react";
import { motion, HTMLMotionProps, AnimationProps } from "framer-motion";
import classNames from "classnames";

type PageTransitionProps = HTMLMotionProps<"div">;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

const initial = { y: "5vh", opacity: 0 } satisfies AnimationProps["initial"];
const animate = { y: 0, opacity: 1 } satisfies AnimationProps["animate"];
const exit = { y: "5vh", opacity: 0 } satisfies AnimationProps["exit"];
const transition = {
  delay: 0.25,
  duration: 1,
  ease: "anticipate",
} satisfies AnimationProps["transition"];

function PageTransition(
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef
) {
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={classNames(
        "flex h-full flex-col items-center overflow-auto",
        rest.className
      )}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(PageTransition);
