import { Link } from "@remix-run/react";
import { Bell, Calendar, MapPin } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { TicketTransferAttemptStatus } from "~/api/gql/graphql";
import {
  MyEventsQuery,
  useMyEventsSuspenseQuery,
} from "~/components/MyEvents/graphql/myEvents.generated";
import { useAcceptTransferredTicketMutation } from "~/components/MyTransfers/graphql/acceptTransferedTicket.generated";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { formatDate, formatTime } from "~/utils/date";
import { pluralize } from "~/utils/string";
import { urls } from "~/utils/urls";
import { cn } from "~/utils/utils";

import { useMyReceivedTransfersSuspenseQuery } from "./graphql/myReceivedTransfers.generated";

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
    <Card className="flex h-full flex-col justify-between gap-6 p-6">
      <div className="flex flex-col gap-6">
        <Link
          className="flex cursor-pointer flex-col gap-6"
          to={urls.myEvents.details(event.id)}
        >
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
          <div className="text-center">
            <Badge className="rounded-full text-sm capitalize">
              {event.usersTickets.length}{" "}
              {pluralize(event.usersTickets.length, "ticket", "tickets")}
            </Badge>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            {event.name}
          </CardTitle>
        </Link>
        <div className="flex flex-col gap-4">
          {formatedAddress ? (
            <CardDescription className="flex flex-row items-center gap-2 font-medium text-primary">
              <MapPin className="size-6 shrink-0" />
              {formatedAddress}
            </CardDescription>
          ) : null}
          <CardDescription className="flex flex-row items-center gap-2 font-medium text-primary">
            <Calendar className="size-6 shrink-0" />
            {[formattedDate, formattedTime].filter(Boolean).join(" - ")}
          </CardDescription>
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
  const { data, refetch: refetchMyEvents } = useMyEventsSuspenseQuery({
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
  const { data: receivedTransfersData, refetch: refetchReceivedTransfers } =
    useMyReceivedTransfersSuspenseQuery();
  const [acceptTicket, { loading: acceptTicketLoading }] =
    useAcceptTransferredTicketMutation();

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

  const myTicketTransfers =
    receivedTransfersData?.myTicketTransfers.filter(
      (ticketTransfer) =>
        ticketTransfer.status === TicketTransferAttemptStatus.Pending,
    ) ?? [];
  const ticketTransfer = myTicketTransfers?.[0];

  const handleAcceptTransfer = async () => {
    await acceptTicket({
      variables: {
        transferId: ticketTransfer.id,
      },
      onCompleted(data) {
        if (data.acceptTransferredTicket.id) {
          toast.success(
            `La transferencia se ha confirmado exitosamente. Hemos notificado a ${ticketTransfer.sender.email}.`,
          );
          void refetchReceivedTransfers();
          void refetchMyEvents();
        } else {
          toast.error(
            "Ocurrió un error al intentar confirmar la transferencia. Por favor intenta de nuevo.",
          );
        }
      },
      onError() {
        toast.error(
          "Ocurrió un error al intentar confirmar la transferencia. Por favor intenta de nuevo.",
        );
      },
    });
  };

  return (
    <>
      {ticketTransfer ? (
        <Alert key={ticketTransfer.id}>
          <Bell className="size-4" />
          <AlertTitle>Te han envíado un Ticket</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <div>
              Te han envíado un ticket:{" "}
              {ticketTransfer.userTicket.ticketTemplate.name} para el evento:{" "}
              {ticketTransfer.userTicket.ticketTemplate.event.name}.
            </div>
            <div className="flex flex-col justify-end gap-2 md:flex-row">
              <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                to={urls.myTransfers}
              >
                Ver mis Transferencia
              </Link>
              <Button
                onClick={() => {
                  void handleAcceptTransfer();
                }}
                disabled={acceptTicketLoading}
              >
                Aceptar Transferencia
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : null}
      <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {sorted.map((event, index) => (
          <div key={`${event.id}-${index}`} className="basis-full md:basis-1/3">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </>
  );
};
