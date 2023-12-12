import { getApolloClient } from "../../../../../src/api/ApolloClient";
import { LandingPageEvents } from "../../../../../src/components/features/LandingPageEvents";
import {
  FetchExampleEventsDocument,
  FetchExampleEventsQuery,
} from "../../../../../src/components/features/LandingPageEvents/graphql/FetchExampleEvents.generated";

export default async function Event() {
  const c = getApolloClient();
  const variable = await c.query<FetchExampleEventsQuery>({
    query: FetchExampleEventsDocument,
  });
  return (
    <main className="flex max-w-5xl flex-col items-center justify-between px-6 pt-36 transition-all md:px-10 md:pt-44 xl:px-0 xl:pt-52">
      
    </main>
  );
}

export const runtime = "edge";
