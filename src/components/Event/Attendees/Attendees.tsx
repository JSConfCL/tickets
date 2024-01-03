import { FC } from "react";
import { AttendeesTypes } from "./types";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const Attendees: FC<AttendeesTypes> = ({ title, attendees }) => {
  if (!attendees?.length) return;

  return (
    <section className="flex w-full flex-col gap-4 bg-slate-900 p-6 dark:bg-slate-50">
      <h2 className="text-xl text-slate-50 dark:text-slate-900 md:text-4xl">
        {title}
      </h2>
      <ol className="flex flex-wrap">
        {attendees?.map(({ id }) => (
          <li className="text-slate-50 dark:text-slate-900" key={id}>
            <UserCircleIcon className="h-7 w-7 shrink-0" />
          </li>
        ))}
      </ol>
    </section>
  );
};
