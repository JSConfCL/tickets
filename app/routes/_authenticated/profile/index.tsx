import { cx } from "class-variance-authority";
import { Suspense } from "react";

import { MyProfile } from "~/components/Profile/MyProfile";
import { MyProfileLoadingSkeleton } from "~/components/Profile/MyProfileLoadingSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";

export default function Layout() {
  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-cal text-3xl">Tu Perfil</h1>
      </div>
      <Suspense fallback={<MyProfileLoadingSkeleton />}>
        <MyProfile />
      </Suspense>
    </div>
  );
}
