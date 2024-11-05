import { Calendar, ExternalLink, MapPin } from "lucide-react";

import { formatDate, formatTime } from "~/utils/date";
import { cn } from "~/utils/utils";

import {
  MyEventQuery,
  useMyEventSuspenseQuery,
} from "./graphql/myEvent.generated";
import { TicketCard } from "./TicketCard";

type Event = MyEventQuery["searchEvents"]["data"][0];

export const MyEvent = ({ id }: { id: string }) => {
  const { data } = useMyEventSuspenseQuery({
    variables: {
      input: {
        search: {
          id,
        },
        pagination: {
          page: 0,
          pageSize: 10,
        },
      },
    },
  });

  const event: Event = data.searchEvents.data[0];
  const tickets = event?.usersTickets;
  const parsedDate = new Date(event.startDateTime as string);
  const formattedDate = formatDate(parsedDate);
  const formattedTime = formatTime(parsedDate);
  const formatedAddress = event.address;

  return (
    <div className="flex flex-col gap-12">
      {!event ? (
        <div className="text-center text-gray-400">
          El evento que buscas no existe
        </div>
      ) : null}

      {event ? (
        <div className="flex w-full flex-col gap-6">
          <div className="flex basis-4/12 flex-col gap-6">
            <div
              className={cn(
                "mx-auto h-20 w-full rounded-md bg-primary/10 lg:h-40",
                event.bannerImage?.url ? "bg-cover bg-center" : "",
              )}
              style={
                event.bannerImage?.url
                  ? { backgroundImage: `url(${event.bannerImage?.url})` }
                  : {}
              }
            />
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="text-base text-muted-foreground">
              {event.description}
            </p>
            <div className="flex flex-col gap-3 font-medium">
              {formatedAddress ? (
                <a
                  href={encodeURI(
                    `https://www.google.com/maps/search/${formatedAddress}?source=opensearch`,
                  )}
                  target="_blank"
                  className="flex flex-row items-center gap-2.5 text-sm"
                  rel="noreferrer"
                >
                  <MapPin className="size-6" />
                  {formatedAddress}
                  <ExternalLink className="size-6" />
                  <span className="sr-only">Ver en Google Maps</span>
                </a>
              ) : null}
              <div className="flex flex-row items-center gap-2.5 text-sm">
                <Calendar className="size-6" />
                {[formattedDate, formattedTime].filter(Boolean).join(" - ")}
              </div>
            </div>
          </div>
          <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} event={event} ticket={ticket} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
