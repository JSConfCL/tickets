import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useMemo } from "react";

import {
  MyEventsQuery,
  useMyEventsSuspenseQuery,
} from "~/components/MyEvents/graphql/myEvents.generated";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { formatDate, formatTime } from "~/utils/date";
import { parseAddress, formatAddress } from "~/utils/event";
import { pluralize } from "~/utils/string";
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
      {orderedDates.map((date) => {
        const parsedEventDate = new Date(date);
        const formattedEventDate = formatDate(parsedEventDate);

        return (
          <div key={date} className="flex flex-col gap-6 md:flex-row">
            <div className="basis-3/12 justify-end">
              <Badge className="text-base" variant="secondary">
                {formattedEventDate}
              </Badge>
            </div>
            <div className="flex basis-9/12 flex-col gap-4">
              {groupedByDate[date].map((event) => {
                const parsedDate = new Date(event.startDateTime as string);
                const formattedTime = formatTime(parsedDate);
                const formattedDate = formatDate(parsedDate);
                const formatedAddress = formatAddress(
                  parseAddress(event.address),
                );

                return (
                  <div key={event.id} className="basis-full">
                    <Card className="flex flex-col gap-8 p-4">
                      <div className="flex flex-col gap-4 md:flex-row">
                        {event.bannerImageSanityRef ? (
                          <img
                            className="mx-auto w-full rounded-md md:mx-0 md:w-60"
                            src={event.bannerImageSanityRef}
                            alt="Imagen representativa del evento"
                          />
                        ) : (
                          <>
                            <Skeleton className="mx-auto w-full rounded-md md:mx-0 md:w-60" />
                            <span className="sr-only">Imagen del evento</span>
                          </>
                        )}

                        <div className="flex basis-full flex-col gap-1">
                          <CardTitle className="text-lg font-bold">
                            {event.name}
                          </CardTitle>
                          <CardDescription className="flex flex-row items-center gap-2 font-bold">
                            <Calendar className="size-4" />
                            {[formattedDate, formattedTime]
                              .filter(Boolean)
                              .join(" - ")}
                          </CardDescription>
                          <CardDescription className="flex flex-row items-center gap-2 font-bold">
                            <MapPin className="size-4" />
                            {formatedAddress}
                          </CardDescription>
                          <div className="mt-4 flex items-end justify-between">
                            <div>
                              <Button asChild variant="secondary">
                                <a
                                  href={urls.myEvents.details(event.id)}
                                  className="flex items-center gap-2"
                                >
                                  <span className="capitalize">
                                    {event.usersTickets.length}{" "}
                                    {pluralize(
                                      event.usersTickets.length,
                                      "ticket",
                                      "tickets",
                                    )}
                                  </span>
                                  <ArrowRight size={16} />
                                </a>
                              </Button>
                            </div>
                            <div>
                              <Badge variant="outline" className="text-sm">
                                {event.community?.name}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
