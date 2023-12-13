import { getApolloClient } from "../../../../../src/api/ApolloClient";
import { LandingPageEvents } from "../../../../../src/components/features/LandingPageEvents";
import {
  FetchExampleEventsDocument,
  FetchExampleEventsQuery,
} from "../../../../../src/components/features/LandingPageEvents/graphql/FetchExampleEvents.generated";
import { Hero } from "./_components/Hero/Hero";
import { Location } from "./_components/Location/Location";
import { Register } from "./_components/Register/Register";

const event = {
  name: 'Javascript Meetup — Enero',
  organizer: 'Javascript Chile',
  datetime: 'Jueves, 27 Enero, 2024 | 6:30 PM',
  location: 'Hub Providencia, Calle Falsa, 1234, Santiago'
}

export default async function Event() {
  const c = getApolloClient();
  const variable = await c.query<FetchExampleEventsQuery>({
    query: FetchExampleEventsDocument,
  });
  return (
    <main className="flex w-full flex-col items-center justify-between gap-6 px-6 pt-7 transition-all md:px-10 lg:pt-14">
      <div className="w-full">
        <Hero {...event} />
        <Register />
      </div>
      <Location />
    </main>
  );
}

export const runtime = "edge";
