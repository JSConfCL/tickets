import { useParams } from "@remix-run/react";
import EventPage from "~/components/TicketsSaleFlow";

export default function Tickets() {
  const params = useParams<{ eventId: string }>();
  const eventId = params.eventId!;

  return <EventPage id={eventId} />;
}
