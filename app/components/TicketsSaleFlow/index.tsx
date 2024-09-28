import { Suspense } from "react";

import { EventStatus } from "~/api/gql/graphql";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/utils/utils";

import { useGetEventAndTicketsSuspenseQuery } from "./graphql/getEventAndTickets.generated";
import Tickets from "./ticketSaleFlow";
import { TicketsSaleFlowSkeleton } from "./TicketsSaleFlowSkeleton";

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
      {!isActive || hasFinished ? (
        <div>
          <div
            className={cn(
              "mx-auto h-20 w-full rounded-md bg-primary/10 lg:h-40",
              event.bannerImage?.url ? "bg-cover bg-center" : "",
            )}
            style={
              event.bannerImage?.url
                ? { backgroundImage: `url(${event.bannerImage?.url})` }
                : {}
            }
          />
          <StatusBadge status={event.status} hasFinished={hasFinished} />
        </div>
      ) : null}
      <Tickets isActive={isActive} hasFinished={hasFinished} event={event} />
    </>
  );
};

export default function EventPage({ id }: { id: string }) {
  return (
    <main className="mx-auto flex w-full max-w-[1360px] px-6 py-12">
      <Suspense fallback={<TicketsSaleFlowSkeleton />}>
        <div className="flex w-full flex-col gap-10">
          <LoadTickets id={id} />
        </div>
      </Suspense>
    </main>
  );
}
