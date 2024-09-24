import { Link } from "@remix-run/react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useMemo } from "react";

import {
  MyEventsQuery,
  useMyEventsSuspenseQuery,
} from "~/components/MyEvents/graphql/myEvents.generated";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { formatDate, formatTime } from "~/utils/date";
import { pluralize } from "~/utils/string";
import { urls } from "~/utils/urls";

const EventCard = ({
  event,
}: {
  event: NonNullable<MyEventsQuery["searchEvents"]["data"][0]>;
}) => {
  const parsedDate = new Date(event.startDateTime as string);
  const formattedTime = formatTime(parsedDate);
  const formattedDate = formatDate(parsedDate);
  const formatedAddress = event.address;
  const imageUrl = event?.previewImage?.url;

  return (
    <Card className="flex h-full flex-col justify-between p-6">
      <div>
        {imageUrl ? (
          <img
            className="mx-auto size-60 rounded-md"
            src={imageUrl}
            alt="Imagen representativa del evento"
          />
        ) : (
          <>
            <div className="mx-auto size-60 rounded-md bg-primary/10 " />
            <span className="sr-only">Imagen del evento</span>
          </>
        )}
        <CardTitle className="my-6 text-center font-cal text-2xl">
          {event.name}
        </CardTitle>
        {formatedAddress ? (
          <CardDescription className="flex flex-row items-center gap-2">
            <MapPin className="size-6 shrink-0" />
            {formatedAddress}
          </CardDescription>
        ) : null}
        <CardDescription className="flex flex-row items-center gap-2">
          <Calendar className="size-6 shrink-0" />
          {[formattedDate, formattedTime].filter(Boolean).join(" - ")}
        </CardDescription>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <Button asChild variant="secondary">
            <Link
              to={urls.myEvents.details(event.id)}
              className="flex items-center gap-2"
            >
              <span className="capitalize">
                {event.usersTickets.length}{" "}
                {pluralize(event.usersTickets.length, "ticket", "tickets")}
              </span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div>
          <Badge variant="outline" className="text-sm">
            {event.community?.name}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export const MyTicketsList = ({
  startDateTimeFrom = null,
  startDateTimeTo = null,
  order = "ASC",
}: {
  startDateTimeFrom?: string | null;
  startDateTimeTo?: string | null;
  order?: string;
}) => {
  const { data } = useMyEventsSuspenseQuery({
    variables: {
      input: {
        search: {
          userHasTickets: true,
          id: null,
          name: null,
          startDateTimeFrom: startDateTimeFrom,
          startDateTimeTo: startDateTimeTo,
          status: null,
          visibility: null,
        },
        pagination: {
          page: 0,
          pageSize: 10,
        },
      },
    },
  });

  const { groupedByDate, orderedDates } = useMemo(() => {
    const groupedByDate = data.searchEvents.data.reduce(
      (acc, event) => {
        const date = event.startDateTime as string;
        // const date = format(parsedDate, "cccc - d 'de' MMMM, yyyy");

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(event);

        return acc;
      },
      {} as Record<string, MyEventsQuery["searchEvents"]["data"]>,
    );

    const orderedDates = Object.keys(groupedByDate).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);

      if (dateA > dateB) {
        return order === "ASC" ? 1 : -1;
      }

      if (dateA < dateB) {
        return order === "ASC" ? -1 : 1;
      }

      return 0;
    });

    return {
      groupedByDate,
      orderedDates,
    };
  }, [data.searchEvents.data, order]);

  const sorted = orderedDates.flatMap((date) =>
    groupedByDate[date].map((event) => event),
  );

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {sorted.map((event, index) => (
        <div key={`${event.id}-${index}`} className="basis-full md:basis-1/3">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};
