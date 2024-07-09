import { cx } from "class-variance-authority";
import { Suspense } from "react";

import { MyTicketsList } from "~/components/MyEvents/MyTicketsList";
import { MyTicketsLoadingSkeleton } from "~/components/MyEvents/MyTicketsLoadingSkeleton";
import { sharedLayoutStyle } from "~/components/sharedLayouts";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Layout() {
  return (
    <div className={cx(sharedLayoutStyle, "flex flex-col gap-10")}>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl">Eventos</h1>
        <div>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Pasados</TabsTrigger>
              <TabsTrigger value="password">Futuros</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Suspense fallback={<MyTicketsLoadingSkeleton />}>
        <MyTicketsList />
      </Suspense>
    </div>
  );
}
