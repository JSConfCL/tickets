import { Suspense } from "react";

import { MyTicketsList } from "~/components/MyTickets/MyTicketsList";

export const MyTickets = () => {
  return (
    <Suspense>
      <MyTicketsList />
    </Suspense>
  );
};
