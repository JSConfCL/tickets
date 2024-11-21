import { Link } from "@remix-run/react";
import { MouseEventHandler, useCallback, useState } from "react";
import { toast } from "sonner";

import { useGetLoginURL } from "~/components/LoginButton";
import { Button } from "~/components/ui/button";
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
import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";

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
  const loginURL = useGetLoginURL();
  const isLogged = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();
  const hasSession = isAuthReady && isLogged;
  const [isDisabled, setIsDisabled] = useState(false);
  const [purchaseOrderMutation] = useCreatePurchaseOrderMutation();
  const createPurchaseOrder = useCallback(async () => {
    setIsDisabled(true);
    const purchaseOrder = Object.entries(selectedTickets)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketId, quantity]) => ({
        ticketId,
        quantity,
      }));

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
          setIsDisabled(false);
          toast.error(
            "Ocurrió un error al intentar comprar tus tickets. Por favor intenta de nuevo.",
          );
        }
      },
      onError() {
        setIsDisabled(false);
        toast.error(
          "Ocurrió un error al intentar comprar tus tickets. Por favor intenta de nuevo.",
        );
      },
    });
  }, [currencyId, purchaseOrderMutation, selectedTickets, setIsDisabled]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pb-2">
          <h2 className="mt-4	text-2xl font-bold leading-[52px]">
            Entrada General
          </h2>
          <Table>
            <TableHeader>
              <TableRow className="border-t hover:bg-transparent">
                <TableHead className="h-[52px] min-w-[140px] text-center text-base font-bold text-white">
                  Tipo de Ticket
                </TableHead>
                <TableHead className="h-[52px] min-w-[300px] text-center text-base font-bold text-white">
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
              {tickets
                .filter((ticket) => selectedTickets[ticket.id])
                .map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="p-4 py-6 text-center font-bold">
                      {ticket.name}
                    </TableCell>
                    <TableCell className="py-6 text-center text-muted-foreground">
                      {ticket.description}
                    </TableCell>
                    <TableCell className="py-6 text-center">
                      {selectedTickets[ticket.id]}
                    </TableCell>
                    <TableCell className="py-6 text-center font-bold">
                      {" "}
                      {ticket.isFree
                        ? "Gratis"
                        : getFormmatedTicketPrice(ticket)}
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
                  Total a Pagar
                </TableCell>
                <TableCell className="pt-9 text-right text-lg font-bold md:pr-11">
                  {!numberOfTickets || formattedTotal
                    ? formattedTotal
                    : "Gratis"}
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
        isDisabled={numberOfTickets === 0 || isDisabled || !hasSession}
        total={formattedTotal}
        popoverContent={
          !hasSession ? (
            <div className="flex flex-col gap-4 text-sm">
              Debes iniciar sesión para poder comprar tickets.
              <div className="flex justify-center">
                <Button variant="default" asChild>
                  <Link to={loginURL}>
                    <span className="text-xs">Inicia sesión aquí</span>
                  </Link>
                </Button>
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
};
