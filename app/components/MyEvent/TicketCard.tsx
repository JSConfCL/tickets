import { EyeIcon, EyeOffIcon, Sparkles, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

import { TicketApprovalStatus } from "~/api/gql/graphql";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { formatCalendarDate, formatDate } from "~/utils/date";
import {
  redemptionStatusLabel,
  redemptionStatusColor,
  idReference as ticketIdReference,
} from "~/utils/ticket";
import { urls } from "~/utils/urls";
import { cn } from "~/utils/utils";

import { MyEventQuery } from "./graphql/myEvent.generated";
import { TransferTicketDialog } from "./TransferTicketDialog";

type Event = MyEventQuery["searchEvents"]["data"][0];

export const TicketCard = ({
  event,
  ticket,
}: {
  event: Event;
  ticket: Event["usersTickets"]["0"];
}) => {
  const [showQR, setShowQR] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const publicUrl = event?.publicShareURL
    ? urls.public.ticket(ticket.publicId, event.publicShareURL)
    : undefined;

  return (
    <>
      <TransferTicketDialog
        open={showMore}
        onOpenChange={setShowMore}
        ticketId={ticket.id}
      />
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
                  <span className="text-right">
                    {ticket.ticketTemplate.name}
                  </span>
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
          <Button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex grow-0 flex-row bg-white text-black",
            )}
            disabled={
              ticket.approvalStatus === TicketApprovalStatus.TransferPending
            }
            onClick={() => {
              setShowMore((show) => !show);
            }}
          >
            <EllipsisVertical className="size-4" />
            <span className="sr-only">Más</span>
          </Button>
        </div>
      </Card>
    </>
  );
};
