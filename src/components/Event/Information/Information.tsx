import { FC } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { InformationTypes } from "./types";

const remarkPlugins = [remarkGfm];

export const Information: FC<InformationTypes> = ({ title, information }) => (
  <section className="flex w-full flex-col gap-4 bg-slate-900 p-6 dark:bg-slate-50">
    <h2 className="text-xl text-slate-50 dark:text-slate-900 md:text-4xl">
      {title}
    </h2>
    <Markdown
      className="prose prose-sm prose-invert !max-w-full dark:prose lg:prose-base"
      remarkPlugins={remarkPlugins}
    >
      {information}
    </Markdown>
  </section>
);
