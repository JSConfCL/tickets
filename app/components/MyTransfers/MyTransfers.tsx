import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";

import { useMyProfileSuspenseQuery } from "~/components/Profile/graphql/myProfile.generated";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatCalendarDate, formatTime } from "~/utils/date";
import { urls } from "~/utils/urls";
import { statusColor, statusLabel } from "~/utils/userTicketTransfer";
import { cn } from "~/utils/utils";

import { useMyTicketTransfersSuspenseQuery } from "./graphql/myTransfers.generated";

interface MinUser {
  email: string;
  name?: string | null;
}

const getUserInfo = (user: MinUser, me: MinUser) => {
  if (user.email === me.email) {
    return "Yo";
  }

  return user.name ? user.name : user.email;
};

export const MyTransfers = () => {
  const {
    data: { me },
  } = useMyProfileSuspenseQuery();
  const { data } = useMyTicketTransfersSuspenseQuery();

  const myTicketTransfers = data?.myTicketTransfers;
  const sortedTickets = [...myTicketTransfers].sort(
    (ticketTransfer1, ticketTransfer2) =>
      ticketTransfer1.createdAt > ticketTransfer2.createdAt ? -1 : 1,
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Transferencias de Tickets</h1>
      </div>
      {!sortedTickets?.length && (
        <div className="text-center text-gray-400">No hay Trasnferencias</div>
      )}
      {sortedTickets.length ? (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                    Id
                  </TableHead>
                  <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                    Evento
                  </TableHead>
                  <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                    Ticket
                  </TableHead>
                  <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                    Fecha de Envío
                  </TableHead>
                  <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                    Remitente
                  </TableHead>
                  <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                    Destinatario
                  </TableHead>
                  <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                    Estado
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTickets.map((ticketTransfer) => {
                  const ticketTemplate =
                    ticketTransfer.userTicket.ticketTemplate;
                  const event = ticketTemplate.event;

                  if (!event) {
                    return;
                  }

                  return (
                    <TableRow key={ticketTransfer.id}>
                      <TableCell className="h-[52px] text-center">
                        {ticketTransfer.id.split("-")[4]}
                      </TableCell>
                      <TableCell className="h-[52px] text-center">
                        <Link
                          className={cn(
                            buttonVariants({ variant: "link" }),
                            "m-0 flex flex-row items-center justify-start gap-1 p-0 font-medium",
                          )}
                          to={urls.events.tickets(event.id)}
                        >
                          {event.name}
                          <ArrowUpRight className="size-4" />
                          <span className="sr-only">Ver evento</span>
                        </Link>
                      </TableCell>
                      <TableCell className="h-[52px] text-center">
                        {ticketTemplate.name}
                      </TableCell>
                      <TableCell className="h-[52px] text-center">
                        {formatCalendarDate(ticketTransfer.createdAt as string)}{" "}
                        {formatTime(ticketTransfer.createdAt as string)}
                      </TableCell>
                      <TableCell className="h-[52px] text-center">
                        {ticketTransfer?.sender
                          ? getUserInfo(ticketTransfer.sender, me as MinUser)
                          : null}
                      </TableCell>
                      <TableCell className="h-[52px] text-center">
                        {getUserInfo(ticketTransfer.recipient, me as MinUser)}
                      </TableCell>
                      <TableCell className="h-[52px]">
                        <span className="flex flex-row items-center justify-center gap-2">
                          <span
                            className={cn(
                              "flex h-2 w-2 rounded-full",
                              statusColor(ticketTransfer.status),
                            )}
                          />
                          {statusLabel(ticketTransfer.status)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};
