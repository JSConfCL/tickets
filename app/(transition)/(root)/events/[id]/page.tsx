import { gql } from "@apollo/client";
import { getApolloClient } from "@/api/ApolloClient";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Attendees } from "@/components/Event/Attendees/Attendees";
import { Hero } from "@/components/Event/Hero/Hero";
import { Information } from "@/components/Event/Information/Information";
import { Location } from "@/components/Event/Location/Location";
import { Organizers } from "@/components/Event/Organizers/Organizers";
import { Register } from "@/components/Event/Register/Register";
import { FetchExampleEventsQuery } from "@/api/gql/graphql";

// TODO: Mock data, remove after connect this page with GraphQL service
import { event } from "./fixture";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Event({ searchParams }: Props) {
  const c = getApolloClient();
  const { id } = searchParams;

  const response = await c.query<FetchExampleEventsQuery>({
    query: gql`
      {
        event(id: "${id}") {
          name
        }
      }
    `,
  });

  console.log({ response });

  const {
    name,
    organizer,
    datetime,
    information,
    organizers,
    attendees,
    location,
  } = event;

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
                  por <span className="underline">{organizer}</span>
                </p>
                <p className="font-thin">{datetime}</p>
              </div>
              <div className="hidden md:flex md:max-w-xs md:items-center md:gap-2">
                <MapPinIcon className="h-8 w-8" />
                <p className="font-thin">{location?.address}</p>
              </div>
            </div>
          </div>
        </Hero>
        <Register />
      </div>
      <Information
        className="order-2 lg:order-4 lg:col-span-3 xl:order-3 xl:col-span-4"
        title="El evento"
        information={information}
      />
      <Location
        className="order-3 lg:order-2 lg:col-span-3 xl:col-span-2 xl:h-full"
        title="Lugar"
        location={location}
      />
      <div className="order-4 flex w-full flex-col gap-6 lg:order-3 lg:col-span-2">
        <Organizers title="Organizadores" organizers={organizers} />
        <Attendees
          title={`Asistentes (${attendees?.length || 0})`}
          attendees={attendees}
        />
      </div>
    </main>
  );
}

export const runtime = "edge";
