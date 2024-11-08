import { useParams, useSearchParams } from "@remix-run/react";

import EventPage from "~/components/TicketsSaleFlow";

export default function Tickets() {
  const params = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();

  const eventId = params.eventId!;
  const coupon = searchParams.get("coupon") ?? undefined;

  return <EventPage id={eventId} coupon={coupon} />;
}
