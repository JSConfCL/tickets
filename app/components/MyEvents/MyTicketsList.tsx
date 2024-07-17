import { Link } from "@remix-run/react";
import { formatDistanceToNow, subDays, format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import {
  MyEventsQuery,
  useMyEventsSuspenseQuery,
} from "~/components/MyEvents/graphql/myEvents.generated";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import { urls } from "~/utils/urls";

export const MyTicketsList = ({
  startDateTimeFrom = null,
  startDateTimeTo = null,
}: {
  startDateTimeFrom?: string | null;
  startDateTimeTo?: string | null;
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
        return -1;
      }

      if (dateA < dateB) {
        return 1;
      }

      return 0;
    });

    return {
      groupedByDate,
      orderedDates,
    };
  }, [data.searchEvents.data]);

  // We go over the groupedByDateArray object in order
  // to render the events grouped by date

  return (
    <div className="flex flex-col gap-12">
      {!data.searchEvents.data.length && (
        <div className="text-center text-gray-400">No hay eventos</div>
      )}
      {orderedDates.map((event) => {
        return (
          <div key={event} className="flex flex-col gap-6">
            <div>
              <Badge className="text-base" variant="secondary">
                {format(event, "d 'de' MMMM, yyyy")}
              </Badge>
            </div>
            {groupedByDate[event].map((event) => {
              const parsedDate = new Date(event.startDateTime as string);
              const isOverAWeekFromNow = parsedDate > subDays(new Date(), 7);
              const relativeDate = formatDistanceToNow(parsedDate, {
                addSuffix: true,
              });
              const formattedDate = format(
                parsedDate,
                "cccc - d 'de' MMMM, yyyy",
              );
              const date = isOverAWeekFromNow ? formattedDate : relativeDate;

              const formattedTime = format(parsedDate, "hh:mm aaa");

              return (
                <Card
                  key={event.id}
                  className="flex w-full max-w-2xl flex-col gap-5 bg-gray-900/40 p-6"
                >
                  <div className="flex flex-col gap-1 text-sm text-gray-400">
                    <span className="capitalize">{date}</span>
                    <span>{formattedTime}</span>
                  </div>
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <div className="flex items-end justify-between">
                    <div>
                      <Button asChild variant="secondary">
                        <Link
                          to={urls.myEvents.myTickets(event.id)}
                          className="flex items-center gap-2"
                        >
                          <span className="capitalize">
                            {event.usersTickets.length} tickets
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
            })}
          </div>
        );
      })}
    </div>
  );
};
