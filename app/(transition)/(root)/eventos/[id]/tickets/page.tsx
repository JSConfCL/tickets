import { getApolloClientForRSC } from "@/api/ApolloClientForRSC";
import { EventStatus } from "@/api/gql/graphql";
import { Badge } from "@/components/ui/badge";
import {
  GetEventAndTicketsDocument,
  GetEventAndTicketsQuery,
} from "@/features/TicketsSaleFlow/graphql/getEventAndTickets.generated";
import Tickets from "@/features/TicketsSaleFlow/ticketSaleFlow";

interface SearchParams {
  id: string;
}

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

export default async function EventPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const c = getApolloClientForRSC();
  const { id } = searchParams;

  const { data, error } = await c.query<GetEventAndTicketsQuery>({
    query: GetEventAndTicketsDocument,
    variables: {
      input: id,
    },
  });

  if (error) {
    return <h2>Ocurrió un error cargando el evento</h2>;
  }

  const { event } = data;

  if (!event) {
    return <h2>No pudimos encontrar el evento que estás buscando</h2>;
  }

  const {
    name,
    tickets = [],
    status: eventStatus,
    // startDateTime, endDateTime
  } = event;

  // const formattedStartDate = formatDate(startDateTime);
  // const formattedEndDate = formatDate(endDateTime);

  const parsedDate = new Date(event.startDateTime as string).getTime();
  const isActive = event.status === EventStatus.Active;
  const hasFinished = parsedDate > Date.now();
  return (
    <main className="flex w-full max-w-[1360px] flex-col gap-8 px-6 py-8">
      {/* Header */}
      <div>
        <h1 className="text-center text-4xl font-extrabold">
          <span className="inline-flex flex-wrap items-center justify-center gap-4">
            {name}
            <StatusBadge status={eventStatus} hasFinished={hasFinished} />
          </span>
        </h1>
        {/* <h2 className="mb-8 text-center text-2xl">
          {formattedStartDate}{" "}
          {formattedEndDate ? `- ${formattedEndDate}` : null}
        </h2> */}
        <Tickets
          isActive={isActive}
          hasFinished={hasFinished}
          tickets={tickets}
        />
      </div>
    </main>
  );
}

export const runtime = "edge";
