import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { InformationTypes } from "./types";

const remarkPlugins = [remarkGfm];

export const Information = ({ title, information }: InformationTypes) => (
  <section className="flex w-full flex-col gap-4 bg-slate-900 p-6 dark:bg-slate-50">
    <h2 className="text-xl text-slate-50 md:text-4xl dark:text-slate-900">
      {title}
    </h2>
    <Markdown
      className="prose prose-sm prose-invert dark:prose lg:prose-base !max-w-full"
      remarkPlugins={remarkPlugins}
    >
      {information}
    </Markdown>
  </section>
);
