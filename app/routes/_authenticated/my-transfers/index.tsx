import { MetaFunction } from "@remix-run/cloudflare";
import { cx } from "class-variance-authority";
import { Suspense } from "react";

import { MyTransfers } from "~/components/MyTransfers/MyTransfers";
import { MyTransfersSkeleton } from "~/components/MyTransfers/MyTransfersSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";

export const meta: MetaFunction = () => {
  return [{ title: "Mis Transferencias de Tickets | Tickets" }];
};

export default function Layout() {
  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <Suspense fallback={<MyTransfersSkeleton />}>
        <MyTransfers />
      </Suspense>
    </div>
  );
}
