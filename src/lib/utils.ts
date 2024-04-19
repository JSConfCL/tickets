import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | boolean | undefined)[]): string {
  return twMerge(classNames(inputs));
}
