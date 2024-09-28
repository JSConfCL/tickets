import { Link } from "@remix-run/react";
import { CircleCheck, CircleX } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

import {
  PurchaseOrderStatusEnum,
  PurchaseOrder as PurchaseOrderType,
} from "~/api/gql/graphql";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatCurrency } from "~/utils/numbers";
import { groupedTickets } from "~/utils/purchase-order";
import { urls } from "~/utils/urls";
import { cn } from "~/utils/utils";

import { CallbackLoadingSkeleton } from "./CallbackLoadingSkeleton";
import {
  useCheckPurchaseOrderStatusMutation,
  CheckPurchaseOrderStatusMutation,
} from "./graphql/checkPurchaseOrderStatus.generated";

type PurchaseCallbackProps = {
  purchaseOrderId: string;
};

type Currency = NonNullable<
  CheckPurchaseOrderStatusMutation["checkPurchaseOrderStatus"]["currency"]
>;
type UserTicket =
  CheckPurchaseOrderStatusMutation["checkPurchaseOrderStatus"]["tickets"][0];
type Ticket = UserTicket["ticketTemplate"];
type TicketPrice = NonNullable<Ticket["prices"]>[0];

const getTicketCurrency = (
  ticket: Ticket,
  selectedCurrencyId: string,
): TicketPrice | undefined => {
  return ticket.prices?.find(
    (price) => price.currency.id == selectedCurrencyId,
  );
};

const getFormmatedTicketPrice = (
  ticket: Ticket,
  selectedCurrency: Currency,
) => {
  const ticketCurrency = getTicketCurrency(ticket, selectedCurrency.id);

  if (!ticket || !ticketCurrency) {
    return null;
  }

  return formatCurrency(ticketCurrency.amount, selectedCurrency.currency);
};

const PurchaseStatusAlert = ({
  status,
}: {
  status: PurchaseOrderStatusEnum;
}) => {
  const alerts = {
    [PurchaseOrderStatusEnum.Open]: {
      icon: <CircleX className="size-6" />,
      variant: "destructive",
      classNames: "",
      title: "Pago pendiente",
      description:
        "Tu compra está pendiente de pago. Si pagaste espera unos segundos y refresca la página. Si el error persiste comunica con el equipo.",
    },
    [PurchaseOrderStatusEnum.Complete]: {
      icon: <CircleCheck className="size-6" />,
      variant: "default",
      classNames:
        "border-green-800/50 text-green-800 dark:border-green-400/50 dark:text-green-400  [&>svg]:text-green-800 dark:[&>svg]:text-green-400",
      title: "Compra completada",
      description:
        "YA ESTAS LIST@! 🎉. Cuéntale al mundo, Compártelo tus redes!",
    },
    [PurchaseOrderStatusEnum.Expired]: {
      icon: <CircleX className="size-6" />,
      variant: "destructive",
      classNames: "",
      title: "Error en el proceso de pago",
      description: "Hubo un problema con el pago, por favor intente nuevamente",
    },
  };

  const alertInfo = alerts[status];
  const alertVariant = (
    alertInfo.variant && ["destructive", "default"].includes(alertInfo.variant)
      ? alertInfo.variant
      : "default"
  ) as "destructive" | "default";

  return (
    <Alert
      variant={alertVariant}
      className={cn(alertInfo.classNames, "[&>svg~*]:pl-11")}
    >
      {alertInfo.icon}
      <AlertTitle>{alertInfo.title}</AlertTitle>
      <AlertDescription>{alertInfo.description}</AlertDescription>
    </Alert>
  );
};

export const PurchaseCallback = ({
  purchaseOrderId,
}: PurchaseCallbackProps) => {
  const triggered = useRef(false);

  const [checkPurchaseOrderMutation, { loading, error, data }] =
    useCheckPurchaseOrderStatusMutation({
      variables: {
        input: {
          purchaseOrderId,
        },
      },
    });

  const checkPurchaseOrder = useCallback(checkPurchaseOrderMutation, [
    checkPurchaseOrderMutation,
  ]);

  useEffect(() => {
    if (!triggered.current) {
      void checkPurchaseOrder();
    }

    triggered.current = true;
  }, [checkPurchaseOrder]);

  if (loading) {
    return <CallbackLoadingSkeleton />;
  }

  if (error) {
    return toast("Error fetching order status");
  }

  if (!data?.checkPurchaseOrderStatus) {
    return <></>;
  }

  const purchaseOrder = data.checkPurchaseOrderStatus;
  const paymentLink = purchaseOrder?.paymentLink ?? null;
  const tickets = groupedTickets(purchaseOrder as PurchaseOrderType);
  const event = purchaseOrder?.tickets?.[0].ticketTemplate.event;
  const selectedCurrency = purchaseOrder.currency;
  const publicURL =
    event?.publicShareURL &&
    purchaseOrder.status === PurchaseOrderStatusEnum.Complete
      ? purchaseOrder.tickets.length > 1
        ? urls.public.po(purchaseOrder.publicId as string, event.publicShareURL)
        : urls.public.ticket(
            purchaseOrder.tickets[0].publicId,
            event.publicShareURL,
          )
      : null;
  const purchaseOrderStatuses = [
    PurchaseOrderStatusEnum.Open,
    PurchaseOrderStatusEnum.Complete,
    PurchaseOrderStatusEnum.Expired,
  ];

  if (
    !purchaseOrder.status ||
    !purchaseOrderStatuses.includes(purchaseOrder.status)
  ) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-[856px] flex-col gap-9">
      <img
        className="mx-auto w-60"
        src={event.logoImage?.url}
        alt={event.name}
      />
      <PurchaseStatusAlert status={purchaseOrder.status} />
      <Card className="mx-auto">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-t hover:bg-transparent">
                <TableHead className="h-[52px] w-[200px] text-center text-base font-bold text-white">
                  Tipo de Ticket
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold text-white">
                  Descripción
                </TableHead>
                <TableHead className="h-[52px] w-[100px] grow-0 text-center text-base font-bold text-white">
                  Cantidad
                </TableHead>
                <TableHead className="h-[52px] w-[150px] text-center text-base font-bold text-white">
                  Precio
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map(({ count, ticket }, index) => (
                <TableRow key={index}>
                  <TableCell className="p-4 py-6 text-center font-bold">
                    {ticket.name}
                  </TableCell>
                  <TableCell className="py-6 text-center text-muted-foreground">
                    {ticket.description}
                  </TableCell>
                  <TableCell className="py-6 text-center">{count}</TableCell>
                  <TableCell className="py-6 text-center font-bold">
                    {ticket.isFree && selectedCurrency
                      ? "Gratis"
                      : getFormmatedTicketPrice(
                          ticket,
                          selectedCurrency as Currency,
                        )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-background hover:bg-background">
                <TableCell
                  className="pt-9 text-right text-lg font-bold uppercase"
                  colSpan={3}
                >
                  {purchaseOrder.status !== PurchaseOrderStatusEnum.Complete
                    ? "Total a Pagar"
                    : null}
                </TableCell>
                <TableCell className="pt-9 text-right text-lg font-bold md:pr-11">
                  {purchaseOrder.finalPrice
                    ? formatCurrency(
                        purchaseOrder.finalPrice,
                        selectedCurrency?.currency as string,
                      )
                    : "Gratis"}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
      {purchaseOrder.status === PurchaseOrderStatusEnum.Expired && (
        <div className="mt-2 flex justify-end gap-2">
          <Link
            to={urls.events.root}
            className={buttonVariants({ variant: "secondary" })}
          >
            Eventos
          </Link>
          <Link
            to={urls.events.tickets(event.id)}
            className={buttonVariants({ variant: "default" })}
          >
            Volver al Evento
          </Link>
        </div>
      )}
      {purchaseOrder.status === PurchaseOrderStatusEnum.Open && (
        <div className="mt-2 flex justify-end gap-2">
          <Link
            to={urls.events.tickets(event.id)}
            className={buttonVariants({ variant: "secondary" })}
          >
            Atras
          </Link>

          {paymentLink ? (
            <a
              href={paymentLink}
              onClick={(e) => {
                e.preventDefault();

                if (purchaseOrder.paymentLink) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  window.location.href = paymentLink;
                }
              }}
              className={buttonVariants({ variant: "default" })}
            >
              Pagar
            </a>
          ) : null}
        </div>
      )}
      {purchaseOrder.status === PurchaseOrderStatusEnum.Complete ? (
        <div className="mt-2 flex flex-col justify-end gap-2 md:flex-row">
          {publicURL ? (
            <a
              href={publicURL}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({ variant: "secondary" })}
            >
              Compartir
            </a>
          ) : null}
          <Link
            to={urls.myEvents.details(event.id)}
            className={buttonVariants({ variant: "default" })}
          >
            Ver en mis Eventos
          </Link>
        </div>
      ) : null}
    </div>
  );
};
