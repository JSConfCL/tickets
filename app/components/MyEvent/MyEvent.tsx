import {
  Calendar,
  DownloadIcon,
  ExternalLink,
  MapPin,
  Mail,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatDate, formatTime } from "~/utils/date";
import {
  redemptionStatusLabel,
  redemptionStatusColor,
  idReference as ticketIdReference,
} from "~/utils/ticket";
import { cn } from "~/utils/utils";

import {
  MyEventQuery,
  useMyEventSuspenseQuery,
} from "./graphql/myEvent.generated";
import { Separator } from "../ui/separator";

type Event = MyEventQuery["searchEvents"]["data"][0];

const Ticket = ({
  event,
  ticket,
}: {
  event: Event;
  ticket: Event["usersTickets"]["0"];
}) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <Card className="h-full bg-white p-6 text-black">
      <div className="relative mt-4 w-full max-w-[90%] text-right">
        <div className={cn(showQR ? "" : "blur-lg")}>
          <QRCode className="mx-auto" value={ticket.id} />
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            setShowQR((show) => !show);
          }}
        >
          {showQR ? (
            <>
              <EyeIcon className="size-4" /> Ver QR
            </>
          ) : (
            <>
              <EyeOffIcon className="size-4" /> Ocultar QR
            </>
          )}
        </Button>
      </div>
      <CardTitle className="my-6 text-center">
        ID Ref: {ticketIdReference(ticket.id)}
      </CardTitle>
      <CardContent className="text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="font-semibold">Evento</span>
              <span>{event.name}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="font-semibold">Fecha de inicio</span>
              <span>{formatDate(event.startDateTime as string)}</span>
            </li>
            {event.endDateTime ? (
              <li className="flex items-center justify-between">
                <span className="font-semibold">Fecha de fin</span>
                <span>{formatDate(event.endDateTime as string)}</span>
              </li>
            ) : null}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="font-semibold">Tipo de Ticket</span>
              <span>{ticket.ticketTemplate.name}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-semibold">Estado</span>
              <span>
                <Badge className="gap-2 text-black" variant="outline">
                  <span
                    className={cn(
                      "flex h-2 w-2 rounded-full",
                      redemptionStatusColor(ticket.redemptionStatus),
                    )}
                  />
                  {redemptionStatusLabel(ticket.redemptionStatus)}
                </Badge>
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-semibold">Fecha de Compra</span>
              <span>{formatDate(ticket.createdAt as string)}</span>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex flex-col gap-2 md:flex-row">
          <Button
            className="flex grow flex-row gap-2 bg-white text-black"
            variant="outline"
            onClick={() => {
              // setSelectedTicket(ticket.id);
            }}
          >
            <DownloadIcon className="size-4" /> Descargar
          </Button>
          <Button
            className="flex grow flex-row gap-2 bg-white text-black"
            variant="outline"
            onClick={() => {
              // setSelectedTicket(ticket.id);
            }}
          >
            <Mail className="size-4" /> Enviar por email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const MyEvent = ({ id }: { id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedTicket, setSelectedTicket] = useState<string | null>(null);
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

  // onOpenChange signature is: (open: boolean) => void
  // so, we can't use the setShowTicket directly cuz types inconsitency
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (open: boolean) => {
    if (!open) {
      setSelectedTicket(null);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {!event ? (
        <div className="text-center text-gray-400">No hay eventos</div>
      ) : null}

      {event ? (
        <div className="flex basis-8/12 flex-col gap-4">
          <Card>
            <CardHeader className="px-7">
              {event.bannerImageSanityRef ? (
                <img
                  className="mx-auto mb-4 h-40 rounded-md lg:h-96"
                  src={event.bannerImageSanityRef}
                  alt="Imagen representativa del evento"
                />
              ) : (
                <>
                  <div className="mx-auto mb-4 h-40 w-full rounded-md bg-primary/10 lg:h-96" />
                  <span className="sr-only">Imagen del evento</span>
                </>
              )}
              <CardTitle className="text-2xl font-bold">{event.name}</CardTitle>
              <div>{event.description}</div>
            </CardHeader>
            <CardContent>
              <div className="flex basis-4/12 flex-col gap-2">
                <div className="flex flex-row items-center gap-1 text-muted-foreground">
                  <Calendar className="size-4" />
                  {[formattedDate, formattedTime].filter(Boolean).join(" - ")}
                </div>
                {formatedAddress ? (
                  <a
                    href={encodeURI(
                      `https://www.google.com/maps/search/${formatedAddress}?source=opensearch`,
                    )}
                    target="_blank"
                    className="flex flex-row items-center gap-1 text-muted-foreground"
                    rel="noreferrer"
                  >
                    <MapPin className="size-4" />
                    {formatedAddress}
                    <ExternalLink className="size-4" />
                    <span className="sr-only">Ver en Google Maps</span>
                  </a>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 md:grid-cols-3">
            {tickets.map((ticket) => (
              <Ticket key={ticket.id} event={event} ticket={ticket} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
