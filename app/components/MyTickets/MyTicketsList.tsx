import { formatDistanceToNow, subDays, format } from "date-fns";
import { ArrowRight } from "lucide-react";

import { useMyTicketsSuspenseQuery } from "~/components/MyTickets/graphql/myTickets.generated";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import { urls } from "~/utils/urls";

export const MyTicketsList = () => {
  const { data } = useMyTicketsSuspenseQuery({
    variables: {
      input: {
        search: {
          userHasTickets: true,
          id: null,
          name: null,
          startDateTimeFrom: null,
          startDateTimeTo: null,
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

  return (
    <div className="flex flex-col gap-6">
      {data.searchEvents.data.map((event) => {
        const parsedDate = new Date(event.startDateTime as string);
        const isOverAWeekFromNow = parsedDate > subDays(new Date(), 7);
        const relativeDate = formatDistanceToNow(parsedDate, {
          addSuffix: true,
        });
        const formattedDate = format(parsedDate, "cccc - d 'de' MMMM, yyyy");
        const date = isOverAWeekFromNow ? formattedDate : relativeDate;

        const formattedTime = format(parsedDate, "hh:mm aaa");

        return (
          <Card
            key={event.id}
            className="flex w-full max-w-2xl flex-col gap-3 bg-gray-900/40 p-5"
          >
            <div className="flex flex-col gap-1 text-xs text-gray-400">
              <span className="capitalize">{date}</span>
              <span>{formattedTime}</span>
            </div>
            <CardTitle className="text-xl ">{event.name}</CardTitle>
            <div>
              <Button asChild variant="secondary">
                <a
                  href={urls.events.myTickets(event.id)}
                  className="flex items-center gap-2"
                >
                  <span>Ver {event.usersTickets.length} tickets</span>
                  <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
