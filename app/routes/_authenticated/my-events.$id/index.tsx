import { useParams } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { Suspense } from "react";

import { MyEvent } from "~/components/MyEvent/MyEvent";
import { MyEventLoadingSkeleton } from "~/components/MyEvent/MyEventLoadingSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";

export default function MyEventPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <Suspense fallback={<MyEventLoadingSkeleton />}>
        <MyEvent id={id} />
      </Suspense>
    </div>
  );
}
