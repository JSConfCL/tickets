import { User } from "@/api/gql/graphql";

export type AttendeesTypes = {
  title: string;
  attendees: User[];
};
