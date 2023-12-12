import { getApolloClient } from "../../../../../src/api/ApolloClient";
import { LandingPageEvents } from "../../../../../src/components/features/LandingPageEvents";
import {
  FetchExampleEventsDocument,
  FetchExampleEventsQuery,
} from "../../../../../src/components/features/LandingPageEvents/graphql/FetchExampleEvents.generated";
import { Hero } from "./_components/Hero/Hero";

export default async function Event() {
  const c = getApolloClient();
  const variable = await c.query<FetchExampleEventsQuery>({
    query: FetchExampleEventsDocument,
  });
  return (
    <main className="flex max-w-5xl flex-col items-center justify-between px-6 pt-7 transition-all md:px-10 lg:pt-14 xl:px-0">
      <Hero />
    </main>
  );
}

export const runtime = "edge";
