import Link from "next/link";
import { TeapotLogo } from "@/components/teapot418";

export const Nav = () => {
  return (
    <div className="fixed top-0 z-10 flex w-full justify-center py-4">
      <div className="md: xl: flex w-full max-w-5xl flex-row items-center justify-between px-6 transition-all md:px-10 xl:px-0">
        <Link
          href={"/"}
          className=" flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center  px-4 py-2 font-bold  hover:no-underline"
        >
          <TeapotLogo />
        </Link>

        <div className="flex flex-1 justify-end ">
          <div className="flex flex-1 items-center justify-end gap-6">
            <Link
              href={"/pregunta"}
              className=" shrink-0 rounded border-b-4 border-amber-700  bg-amber-500 px-4 py-2 font-bold   transition-all hover:border-amber-700 hover:bg-amber-600 hover:no-underline"
            >
              Haz una pregunta!
            </Link>
            <Link
              href={"/sponsors"}
              className=" shrink-0 p-2 font-bold transition-all hover:no-underline"
            >
              Sponsors
            </Link>
            <Link
              href={"/discord"}
              className=" shrink-0 p-2 font-bold transition-all hover:no-underline"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
