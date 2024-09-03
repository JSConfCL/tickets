import { Calendar, EllipsisVertical, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatDate, formatTime } from "~/utils/date";
import {
  approvalStatusColor,
  approvalStatusLabel,
  paymentStatusLabel,
  paymentStatusColor,
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

const MyTicketDetails = ({
  event,
  ticketId,
  onChange,
}: {
  event: Event;
  ticketId: string | null;
  onChange: (open: boolean) => void;
}) => {
  if (!ticketId) {
    return null;
  }

  const ticket = event.usersTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return null;
  }

  return (
    <Dialog open={!!ticketId} onOpenChange={onChange}>
      <DialogContent className="block h-full md:h-auto md:max-h-[90vh]">
        <div className="flex h-full flex-col gap-4 md:max-h-[90vh]">
          <div className="min-h-0 flex-1 overflow-y-auto md:max-h-[90vh]">
            <div className="mt-4 w-full">
              <QRCode className="mx-auto" value={ticket.id} />
            </div>
            <div className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">
                  ID Ref: {ticketIdReference(ticket.id)}
                </div>
                <div className="font-semibold">Evento</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nombre</span>
                    <span>{event.name}</span>
                  </li>
                  {event.startDateTime ? (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Fecha {event.endDateTime ? "de inicio" : ""}
                      </span>
                      <span>{formatDate(event.startDateTime as string)}</span>
                    </li>
                  ) : null}
                  {event.endDateTime ? (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Fecha de fin
                      </span>
                      <span>{formatDate(event.endDateTime as string)}</span>
                    </li>
                  ) : null}
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Ticket</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Tipo</dt>
                    <dd>{ticket.ticketTemplate.name}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">approvalStatus</dt>
                    <dd>
                      {" "}
                      <Badge className="gap-2" variant="outline">
                        <span
                          className={cn(
                            "flex h-2 w-2 rounded-full",
                            approvalStatusColor(ticket.approvalStatus),
                          )}
                        />
                        {approvalStatusLabel(ticket.approvalStatus)}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">paymentStatus</dt>
                    <dd>
                      {ticket.paymentStatus && (
                        <Badge className="gap-2" variant="outline">
                          <span
                            className={cn(
                              "flex h-2 w-2 rounded-full",
                              paymentStatusColor(ticket.paymentStatus),
                            )}
                          />
                          {paymentStatusLabel(ticket.paymentStatus)}
                        </Badge>
                      )}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">redemptionStatus</dt>
                    <dd>
                      <Badge className="gap-2" variant="outline">
                        <span
                          className={cn(
                            "flex h-2 w-2 rounded-full",
                            redemptionStatusColor(ticket.redemptionStatus),
                          )}
                        />
                        {redemptionStatusLabel(ticket.redemptionStatus)}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Fecha de Compra</dt>
                    <dd>{formatDate(ticket.createdAt as string)}</dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
            </div>
            <DialogFooter>
              <DialogClose className={buttonVariants({ variant: "default" })}>
                Cerrar
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export const MyEvent = ({ id }: { id: string }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
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
                  <Skeleton className="mx-auto mb-4 h-40 w-full rounded-md lg:h-96" />
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

          <Card>
            <CardHeader className="px-7">
              <CardTitle className="text-2xl">Tickets</CardTitle>
              <CardDescription>
                Revisa tus tickets disponibles para este evento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Evento
                    </TableHead>
                    <TableHead>Tipo de Ticket</TableHead>
                    <TableHead className="hidden md:table-cell">
                      approvalStatus
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      paymentStatusColor
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      redemptionStatusColor
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Comprado
                    </TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticketIdReference(ticket.id)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {event.name}
                      </TableCell>
                      <TableCell>{ticket.ticketTemplate.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className="gap-2" variant="outline">
                          <span
                            className={cn(
                              "flex h-2 w-2 rounded-full",
                              approvalStatusColor(ticket.approvalStatus),
                            )}
                          />
                          {approvalStatusLabel(ticket.approvalStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {ticket.paymentStatus && (
                          <Badge className="gap-2" variant="outline">
                            <span
                              className={cn(
                                "flex h-2 w-2 rounded-full",
                                paymentStatusColor(ticket.paymentStatus),
                              )}
                            />
                            {paymentStatusLabel(ticket.paymentStatus)}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className="gap-2" variant="outline">
                          <span
                            className={cn(
                              "flex h-2 w-2 rounded-full",
                              redemptionStatusColor(ticket.redemptionStatus),
                            )}
                          />
                          {redemptionStatusLabel(ticket.redemptionStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(ticket.createdAt as string)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setSelectedTicket(ticket.id);
                          }}
                        >
                          <EllipsisVertical className="size-4" />
                          <span className="sr-only">
                            Ver detalles del Ticket
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <MyTicketDetails
                event={event}
                ticketId={selectedTicket}
                onChange={handleChange}
              />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
};
