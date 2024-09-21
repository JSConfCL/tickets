import { cx } from "class-variance-authority";
import { Suspense } from "react";

import { MyPurchaseOrders } from "~/components/MyPurchaseOrders/MyPurchaseOrders";
import { MyPurchaseOrdersLoadingSkeleton } from "~/components/MyPurchaseOrders/MyPurchaseOrdersLoadingSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";

export default function Layout() {
  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <Suspense fallback={<MyPurchaseOrdersLoadingSkeleton />}>
        <MyPurchaseOrders />
      </Suspense>
    </div>
  );
}
