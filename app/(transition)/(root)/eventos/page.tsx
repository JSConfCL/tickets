"use client";
import { useGetLatestEventsQuery } from "./getLatestEvents.generated";
import {
  CardHeader,
  CardLink,
  CardTitle,
} from "../../../../src/components/ui/card";
import { urls } from "../../../../src/lib/urls";

export default function Eventos() {
  const { data, loading, error } = useGetLatestEventsQuery();
  // const { data, error } = await c.query<GetLatestEventsQuery>({
  //   query: GetLatestEventsDocument,
  // });

  if (error) {
    return <h2>Ocurrió un error cargando el evento</h2>;
  }

  if (loading || !data) {
    return <h2>Cargando eventos...</h2>;
  }

  if (!data.events || data.events.length === 0) {
    return <h2>No hay eventos por ahora</h2>;
  }

  return (
    <main className="flex w-full max-w-[1360px] flex-col items-center justify-between gap-6 px-6 py-7 transition-all">
      <div className="flex w-full flex-1 flex-row flex-wrap gap-4">
        {data.events.map((event) => (
          <CardLink key={event.id} href={urls.eventos.evento(event.id)}>
            <CardHeader className="w-full min-w-[220px] max-w-sm">
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            {/* <CardContent> */}
            {/* <p>{event.description}</p> */}
            {/* </CardContent> */}
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </CardLink>

          // <div key={event.id} className="flex flex-col gap-6">
          //   <h1 className="text-2xl">{event.name}</h1>
          //   {/* <p>{event.description}</p>
          //   <p>{event.date}</p>
          //   <p>{event.location}</p> */}
          // </div>
        ))}
      </div>
    </main>
  );
}

export const runtime = "edge";
