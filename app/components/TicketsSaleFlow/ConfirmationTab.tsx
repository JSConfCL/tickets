import { MouseEventHandler, useCallback } from "react";
import { toast } from "sonner";

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

import { useCreatePurchaseOrderMutation } from "./graphql/createPurchaseOrder.generated";
import { EventTicketFragmentFragment } from "./graphql/EventTicketFragment.generated";
import { SecondStepFooter } from "./Stepper";
import { Step, TicketsState } from "./types";

export const ConfirmationTab = ({
  tickets,
  selectedTickets,
  numberOfTickets,
  formattedTotal,
  previousStep,
  getFormmatedTicketPrice,
  currencyId,
}: {
  step: number;
  steps: Step[];
  activeStep: Step;
  tickets: EventTicketFragmentFragment[];
  selectedTickets: TicketsState;
  numberOfTickets: number;
  formattedTotal: string | null;
  previousStep: MouseEventHandler<HTMLButtonElement>;
  getFormmatedTicketPrice: (
    ticket: EventTicketFragmentFragment,
  ) => string | null;
  currencyId: string;
}) => {
  const [purchaseOrderMutation, purchaseOrderMutationResults] =
    useCreatePurchaseOrderMutation();
  const createPurchaseOrder = useCallback(async () => {
    // calls the mutation
    const purchaseOrder = Object.entries(selectedTickets).map(
      ([ticketId, quantity]) => ({
        ticketId,
        quantity,
      }),
    );

    await purchaseOrderMutation({
      variables: {
        input: {
          generatePaymentLink: {
            currencyId,
          },
          purchaseOrder,
        },
      },
      onCompleted(data) {
        // Redirect to payment page
        if (data.claimUserTicket.__typename === "RedeemUserTicketError") {
          toast.error(data.claimUserTicket.errorMessage);
        } else if (data.claimUserTicket.__typename === "PurchaseOrder") {
          const { paymentLink } = data.claimUserTicket;

          if (paymentLink) {
            toast("Tu orden esta lista, redirigiéndote al portal de pago.");
            setTimeout(() => {
              window.location.href = paymentLink;
            }, 2000);
          }
        } else {
          toast.error(
            "Ocurrió un error al intentar comprar tus tickets. Por favor intenta de nuevo.",
          );
        }
      },
      onError() {
        toast.error(
          "Ocurrió un error al intentar comprar tus tickets. Por favor intenta de nuevo.",
        );
      },
    });
  }, [currencyId, purchaseOrderMutation, selectedTickets]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-center font-cal text-lg ">
                  Tipo de Ticket
                </TableHead>
                <TableHead className="text-center font-cal text-lg">
                  Descripción
                </TableHead>
                <TableHead className="w-[200px] text-center font-cal text-lg">
                  Cantidad
                </TableHead>
                <TableHead className="w-[150px] text-center font-cal text-lg">
                  Precio
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets
                .filter((ticket) => selectedTickets[ticket.id])
                .map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="p-4 text-center font-cal">
                      {ticket.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {ticket.description}
                    </TableCell>
                    <TableCell className="text-center font-cal">
                      {selectedTickets[ticket.id]}
                    </TableCell>
                    <TableCell className="text-center font-cal">
                      {" "}
                      {ticket.isFree
                        ? "Gratis"
                        : getFormmatedTicketPrice(ticket)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-background">
                <TableCell className="text-right font-cal text-lg" colSpan={4}>
                  {formattedTotal ? (
                    <span className="flex flex-row justify-end gap-4">
                      <span className="w-full grow">Total a Pagar</span>
                      <span>{formattedTotal}</span>
                    </span>
                  ) : (
                    "Gratis"
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
      <SecondStepFooter
        onClickPrevious={previousStep}
        onClickNext={() => {
          createPurchaseOrder().catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          });
        }}
        isDisabled={
          numberOfTickets === 0 || purchaseOrderMutationResults.loading
        }
        total={formattedTotal}
      />
    </div>
  );
};
