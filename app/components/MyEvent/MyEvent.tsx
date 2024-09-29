import {
  Calendar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DownloadIcon,
  ExternalLink,
  MapPin,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Mail,
  EyeIcon,
  EyeOffIcon,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { formatCalendarDate, formatDate, formatTime } from "~/utils/date";
import {
  redemptionStatusLabel,
  redemptionStatusColor,
  idReference as ticketIdReference,
} from "~/utils/ticket";
import { urls } from "~/utils/urls";
import { cn } from "~/utils/utils";

import {
  MyEventQuery,
  useMyEventSuspenseQuery,
} from "./graphql/myEvent.generated";

type Event = MyEventQuery["searchEvents"]["data"][0];

const Ticket = ({
  event,
  ticket,
}: {
  event: Event;
  ticket: Event["usersTickets"]["0"];
}) => {
  const [showQR, setShowQR] = useState(false);
  const publicUrl = event?.publicShareURL
    ? urls.public.ticket(ticket.publicId, event.publicShareURL)
    : undefined;

  return (
    <Card className="flex h-full flex-col justify-between gap-6 bg-white p-6 text-black">
      <div className="flex w-full flex-col gap-6">
        <div className="relative mx-auto mt-4 w-full max-w-[90%] text-center">
          <div
            className={cn(
              "mx-auto max-w-[90%] overflow-hidden",
              showQR ? "" : " max-w-[80%] overflow-hidden",
            )}
          >
            <QRCode
              className={cn("aspect-square w-full", showQR ? "" : "blur-md")}
              value={ticket.id}
            />
          </div>
        </div>
        <CardTitle className="text-center font-bold">
          ID Ref: {ticketIdReference(ticket.id)}
        </CardTitle>
        <CardContent className="p-0 text-sm">
          <div className="grid gap-3">
            <ul className="grid gap-3">
              <li className="flex items-center justify-between text-base">
                <span className="shrink-0 font-bold">Evento</span>
                <span className="text-right">{event.name}</span>
              </li>
            </ul>
            <Separator className="my-2 bg-[#e7e5e4]" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="shrink-0 font-bold">Fecha de inicio</span>
                <span className="text-right">
                  {formatDate(event.startDateTime as string)}
                </span>
              </li>
              {event.endDateTime ? (
                <li className="flex items-center justify-between">
                  <span className="shrink-0 font-bold">Fecha de fin</span>
                  <span className="text-right">
                    {formatDate(event.endDateTime as string)}
                  </span>
                </li>
              ) : null}
            </ul>
            <Separator className="my-2 bg-[#e7e5e4]" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="shrink-0 font-bold">Tipo de Ticket</span>
                <span className="text-right">{ticket.ticketTemplate.name}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="shrink-0 font-bold">Estado</span>
                <span className="text-right">
                  <span className="flex flex-row items-center gap-2">
                    <span
                      className={cn(
                        "flex h-2 w-2 rounded-full",
                        redemptionStatusColor(ticket.redemptionStatus),
                      )}
                    />
                    {redemptionStatusLabel(ticket.redemptionStatus)}
                  </span>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="shrink-0 font-bold">Fecha de Compra</span>
                <span className="text-right">
                  {formatCalendarDate(ticket.createdAt as string)}
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col gap-2 p-0 md:flex-row">
        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex grow flex-row gap-2 bg-white text-black",
          )}
          onClick={() => {
            setShowQR((show) => !show);
          }}
        >
          {showQR ? (
            <>
              <EyeOffIcon className="size-4" /> Ocultar QR
            </>
          ) : (
            <>
              <EyeIcon className="size-4" /> Ver QR
            </>
          )}
        </Button>
        {publicUrl ? (
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex grow flex-row gap-2 bg-white text-black",
            )}
          >
            <Sparkles className="size-4" />
            Compartir
          </a>
        ) : null}
        {/*
          <Button
            className="flex grow flex-row gap-2 bg-white text-black"
            variant="outline"
            onClick={() => {}}
          >
            <DownloadIcon className="size-4" /> Descargar
          </Button>          
          <Button
            className="flex grow flex-row gap-2 bg-white text-black"
            variant="outline"
            onClick={() => {}}
          >
            <Mail className="size-4" /> Enviar por email
          </Button>
           */}
      </div>
    </Card>
  );
};

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

  const event = data.searchEvents.data[0];
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
              <Ticket key={ticket.id} event={event} ticket={ticket} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
