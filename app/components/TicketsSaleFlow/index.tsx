import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

import { EventStatus } from "~/api/gql/graphql";
import { useGetEventAndTicketsSuspenseQuery } from "~/components/TicketsSaleFlow/graphql/getEventAndTickets.generated";
import { TicketsSaleFlowSkeleton } from "~/components/TicketsSaleFlow/skeleton";
import Tickets from "~/components/TicketsSaleFlow/ticketSaleFlow";
import { Badge } from "~/components/ui/badge";

// import { useGetEventAndTicketsSuspenseQuery } from "~/components/features/TicketsSaleFlow/graphql/getEventAndTickets.generated";
// import { TicketsSaleFlowSkeleton } from "~/features/TicketsSaleFlow/skeleton";
// import Tickets from "~/features/TicketsSaleFlow/ticketSaleFlow";

const StatusBadge = ({
  status,
  hasFinished,
}: {
  status: EventStatus;
  hasFinished: boolean;
}) => {
  if (status === EventStatus.Inactive) {
    return <Badge variant="destructive">Evento Inactivo</Badge>;
  }

  if (status === EventStatus.Active && hasFinished) {
    return <Badge color="red">Evento Finalizado</Badge>;
  }

  return null;
};

const LoadTickets = ({ id }: { id: string | null }) => {
  const { data, error } = useGetEventAndTicketsSuspenseQuery({
    variables: {
      input: id!,
    },
    skip: !id,
  });

  const { event } = data;

  if (!event || error) {
    throw new Error("No pudimos encontrar el evento que estás buscando");
  }

  const isActive = event.status === EventStatus.Active;
  const parsedStartTimeStamp = new Date(
    event.startDateTime as string,
  ).getTime();
  const hasFinished = parsedStartTimeStamp <= Date.now();

  return (
    <>
      <h1 className="text-center text-5xl font-extrabold">
        <span className="inline-flex flex-wrap items-center justify-center gap-4">
          {event.name}
          <StatusBadge status={event.status} hasFinished={hasFinished} />
        </span>
      </h1>
      <Tickets
        isActive={isActive}
        hasFinished={hasFinished}
        tickets={event.tickets}
      />
    </>
  );
};

export default function EventPage({ id }: { id: string }) {
  return (
    <main className="mx-auto flex w-full max-w-[1360px] px-6 py-12">
      <AnimatePresence mode="popLayout">
        <Suspense fallback={<TicketsSaleFlowSkeleton />}>
          <motion.div
            className="flex flex-col gap-10"
            key="lazyComponent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <LoadTickets id={id} />
          </motion.div>
        </Suspense>
      </AnimatePresence>
    </main>
  );
}
