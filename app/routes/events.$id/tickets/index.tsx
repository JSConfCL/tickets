import { useParams, useSearchParams } from "@remix-run/react";

import EventPage from "~/components/TicketsSaleFlow";

export default function Tickets() {
  const params = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const eventId = params.id!;
  const coupon = searchParams.get("coupon") ?? undefined;

  return <EventPage id={eventId} coupon={coupon} />;
}
