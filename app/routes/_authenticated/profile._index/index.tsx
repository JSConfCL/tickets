import { MetaFunction } from "@remix-run/cloudflare";
import { cx } from "class-variance-authority";
import { Suspense } from "react";

import { MyProfile } from "~/components/Profile/MyProfile";
import { MyProfileLoadingSkeleton } from "~/components/Profile/MyProfileLoadingSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";

export const meta: MetaFunction = () => {
  return [{ title: "Perfil | Tickets" }];
};

export default function Layout() {
  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Perfil</h1>
      </div>
      <Suspense fallback={<MyProfileLoadingSkeleton />}>
        <MyProfile />
      </Suspense>
    </div>
  );
}
