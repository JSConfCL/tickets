import { cx } from "class-variance-authority";
import { Suspense, useMemo, useState } from "react";

import { MyTicketsList } from "~/components/MyEvents/MyTicketsList";
import { MyTicketsLoadingSkeleton } from "~/components/MyEvents/MyTicketsLoadingSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Layout() {
  const [tab, setTab] = useState<"future" | "past">("future");
  const now = useMemo(() => new Date().toISOString(), []);

  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Mis Eventos</h1>
        <div>
          <Tabs
            defaultValue="future"
            value={tab}
            onValueChange={(el) => setTab(el as "future" | "past")}
          >
            <TabsList>
              <TabsTrigger value="future">Futuros</TabsTrigger>
              <TabsTrigger value="past">Pasados</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Suspense fallback={<MyTicketsLoadingSkeleton />}>
        {tab === "future" && (
          <MyTicketsList key="future" startDateTimeFrom={now} order="ASC" />
        )}
        {tab === "past" && (
          <MyTicketsList key="past" startDateTimeTo={now} order="DESC" />
        )}
      </Suspense>
    </div>
  );
}
