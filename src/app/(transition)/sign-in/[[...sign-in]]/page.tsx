import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex max-w-5xl flex-col items-center justify-between px-6 pt-36 transition-all md:px-10 md:pt-44 xl:px-0 xl:pt-52">
      <SignIn />
    </main>
  );
}

export const runtime = "edge";
