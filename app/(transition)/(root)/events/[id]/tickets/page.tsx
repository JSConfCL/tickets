import { getApolloClient } from "@/api/ApolloClient";
import { Event } from "@/api/gql/graphql";

import { formatDate } from "@/lib/date";

import Tickets from "./tickets";

import { GetEventAndTicketsDocument } from "./getEventAndTickets.generated";

interface SearchParams {
  id: string;
}

interface Response {
  event: Event;
}

export default async function EventPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const c = getApolloClient();
  const { id } = searchParams;

  const { data, error } = await c.query<Response>({
    query: GetEventAndTicketsDocument,
    variables: {
      input: id,
    },
  });

  if (error) return <h2>Ocurrió un error cargando el evento</h2>;

  const { event } = data;

  if (!event) return <h2>No pudimos encontrar el evento que estás buscando</h2>;

  const { name, startDateTime, endDateTime, tickets = [] } = event;

  const formattedStartDate = formatDate(startDateTime);
  const formattedEndDate = formatDate(endDateTime);

  console.log({ tickets });
  return (
    <main className="flex w-full max-w-[1360px] flex-col gap-8 px-6 py-8">
      {/* Header */}
      <div>
        <h1 className="text-center text-4xl font-extrabold">{name}</h1>
        <h2 className="mb-8 text-center text-2xl">
          {formattedStartDate}{" "}
          {formattedEndDate ? `- ${formattedEndDate}` : null}
        </h2>
        <Tickets tickets={tickets} />
      </div>
    </main>
  );
}

export const runtime = "edge";
