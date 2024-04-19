import { getApolloClientForRSC } from "@/api/ApolloClientForRSC";

// import { formatDate } from "@/lib/date";

import {
  GetEventAndTicketsDocument,
  GetEventAndTicketsQuery,
} from "./getEventAndTickets.generated";
import Tickets from "./tickets";

interface SearchParams {
  id: string;
}

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
    // startDateTime, endDateTime
  } = event;

  // const formattedStartDate = formatDate(startDateTime);
  // const formattedEndDate = formatDate(endDateTime);

  return (
    <main className="flex w-full max-w-[1360px] flex-col gap-8 px-6 py-8">
      {/* Header */}
      <div>
        <h1 className="text-center text-4xl font-extrabold">{name}</h1>
        <h2 className="mb-8 text-center text-2xl">
          {/* {formattedStartDate}{" "}
          {formattedEndDate ? `- ${formattedEndDate}` : null} */}
        </h2>
        <Tickets tickets={tickets} />
      </div>
    </main>
  );
}

export const runtime = "edge";
