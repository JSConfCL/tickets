import { Event } from "@/api/gql/graphql";

type Community = {
  name: string;
};

type Data = {
  event: EventClass;
};

export type EventType = {
  event: Event;
};

export type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

