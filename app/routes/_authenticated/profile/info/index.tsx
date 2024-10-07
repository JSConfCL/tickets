import { cx } from "class-variance-authority";
import { Suspense } from "react";

import { MyProfileInfo } from "~/components/Profile/Info/MyProfileInfo";
import { MyProfileInfoLoadingSkeleton } from "~/components/Profile/Info/MyProfileInfoLoadingSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";

export default function Layout() {
  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Tu Perfil</h1>
      </div>
      <Suspense fallback={<MyProfileInfoLoadingSkeleton />}>
        <MyProfileInfo />
      </Suspense>
    </div>
  );
}
