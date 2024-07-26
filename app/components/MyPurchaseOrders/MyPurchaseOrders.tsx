import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";

import { PurchaseOrder as PurchaseOrderType } from "~/api/gql/graphql";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatDate } from "~/utils/date";
import { formatCurrency } from "~/utils/numbers";
import { groupedTickets } from "~/utils/purchase-order";
import { urls } from "~/utils/urls";
import { cn } from "~/utils/utils";

import { useMyPurchaseOrdersSuspenseQuery } from "./graphql/myPurchaseOrders.generated";

export const MyPurchaseOrders = () => {
  const { data } = useMyPurchaseOrdersSuspenseQuery({
    variables: {
      input: {
        search: {},
        pagination: {
          page: 0,
          pageSize: 10,
        },
      },
    },
  });

  const purchaseOrders = data?.myPurchaseOrders?.data ?? [];

  return (
    <div className="flex flex-col gap-12">
      {!purchaseOrders?.length && (
        <div className="text-center text-gray-400">No hay eventos</div>
      )}
      {purchaseOrders.length ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle className="text-2xl">Ordenes de Compra</CardTitle>
            <CardDescription>
              Revisa todas tus ordenes de compra.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead className="md:table-cell">Descripción</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Método de Pago
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((purchaseOrder) => {
                  const event = purchaseOrder.tickets[0].ticketTemplate.event;

                  return (
                    <TableRow key={purchaseOrder.id}>
                      <TableCell>
                        <div className="font-medium">
                          {purchaseOrder.id.split("-")[4]}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="">
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
                        </div>
                      </TableCell>
                      <TableCell className="sm:table-cell">
                        <Link
                          to={urls.myEvents.details(event.id)}
                          className={cn(
                            buttonVariants({ variant: "link" }),
                            "m-0 flex flex-row justify-start gap-1 p-0",
                          )}
                        >
                          <div>
                            {groupedTickets(
                              purchaseOrder as PurchaseOrderType,
                            ).map(({ count, ticket }) => (
                              <div key={ticket.name}>
                                {count}x {ticket.name}
                              </div>
                            ))}
                          </div>
                          <div>
                            <ArrowUpRight className="size-4" />
                            <span className="sr-only">Ver Tickets</span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {purchaseOrder.paymentPlatform}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(purchaseOrder.createdAt as string)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(
                          purchaseOrder.finalPrice as number,
                          purchaseOrder.currency?.currency,
                        )}
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
