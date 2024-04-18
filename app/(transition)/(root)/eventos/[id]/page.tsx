import { getApolloClientForRSC } from "@/api/ApolloClientForRSC";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Attendees } from "@/components/Event/Attendees/Attendees";
import { Hero } from "@/components/Event/Hero/Hero";
import { Information } from "@/components/Event/Information/Information";
import { Location } from "@/components/Event/Location/Location";
import { Organizers } from "@/components/Event/Organizers/Organizers";
import { Register } from "@/components/Event/Register/Register";
import { PageProps } from "./types";
import { GetEventDocument, GetEventQuery } from "./getEvent.generated";

export default async function Event({ searchParams }: PageProps) {
  const c = getApolloClientForRSC();

  const { data, error } = await c.query<GetEventQuery>({
    query: GetEventDocument,
    variables: {
      input: searchParams.id,
    },
  });

  if (error) return <h2>Ocurrió un error cargando el evento</h2>;

  const { event } = data;

  if (!event) {
    return <h2>No pudimos encontrar el evento que estás buscando</h2>;
  }

  const { address, community, description, name, users, id } = event;

  // const eventDate = new Date(startDateTime).toLocaleString();

  return (
    <main className="flex w-full max-w-[1360px] flex-col items-center justify-between gap-6 px-6 py-7 transition-all md:px-10 lg:grid lg:grid-cols-5 lg:items-start lg:gap-8 lg:px-24 lg:pt-14 xl:grid-cols-6 xl:px-16">
      <div className="order-1 w-full lg:col-span-5 xl:col-span-4">
        <Hero>
          <div className="mr-auto flex w-full flex-col place-self-center">
            <h1 className="mb-4 max-w-2xl text-xl font-extrabold leading-none tracking-tight dark:text-white md:text-4xl">
              {name}
            </h1>
            <div className="flex w-full justify-between">
              <div className="flex grow flex-col">
                <p className="font-thin">
                  por <span className="underline">{community?.name}</span>
                </p>
                {/* <p className="font-thin">{eventDate}</p> */}
              </div>
              <div className="hidden md:flex md:max-w-xs md:items-center md:gap-2">
                <MapPinIcon className="h-8 w-8" />
                <p className="font-thin">{address}</p>
              </div>
            </div>
          </div>
        </Hero>
        <Register eventId={id} />
      </div>
      {description && (
        <div className="order-2 lg:order-4 lg:col-span-3 xl:order-3 xl:col-span-4">
          <Information title="El evento" information={description} />
        </div>
      )}
      <div className="order-3 lg:order-2 lg:col-span-3 xl:col-span-2 xl:h-full">
        <Location
          title="Lugar"
          location={{
            address: "Calle falsa 123",
            information: null,
          }}
        />
      </div>
      <div className="order-4 flex w-full flex-col gap-6 lg:order-3 lg:col-span-2">
        <Organizers title="Organizadores" organizers={[]} />
        <Attendees
          title={`Asistentes (${users?.length || 0})`}
          attendees={users}
        />
      </div>
    </main>
  );
}

export const runtime = "edge";
