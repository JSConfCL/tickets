import type { HeroTypes } from "./types";

export const Hero = ({ children }: HeroTypes) => {
  return (
    <section className="flex h-80 w-full place-items-end bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat md:h-96">
      <div className="flex size-full flex-col justify-end bg-slate-100/75 dark:bg-slate-900/75">
        <div className="mx-auto flex w-full max-w-screen-xl px-4 py-8 md:grid-cols-12 lg:gap-8 xl:gap-0">
          {children}
        </div>
      </div>
    </section>
  );
};
