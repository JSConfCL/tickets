import React, { MouseEventHandler, useCallback, useRef } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { formatCurrency } from "~/utils/numbers";

import { useCreatePurchaseOrderMutation } from "./graphql/createPurchaseOrder.generated";
import { EventTicketFragmentFragment } from "./graphql/EventTicketFragment.generated";
import { SecondStepFooter, StepHeader } from "./Stepper";
import { Step, TicketsState } from "./types";

export const ConfirmationTab = ({
  step,
  steps,
  activeStep,
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
    <Card>
      <StepHeader steps={steps} step={step} activeStep={activeStep} />
      <CardContent>
        <div className="flex flex-col gap-4 pt-4">
          {tickets
            .filter((ticket) => selectedTickets[ticket.id])
            .map((ticket, index, originalArr) => {
              return (
                <React.Fragment key={ticket.id}>
                  <div className="flex w-full flex-row items-center justify-between gap-4 md:w-auto md:flex-row md:gap-8">
                    <div className="flex w-full grow flex-col gap-1">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {ticket.name}
                      </div>
                      {ticket.description ? (
                        <div className="w-auto ">{ticket.description}</div>
                      ) : null}
                      <div className="flex w-auto gap-2 font-medium text-muted-foreground">
                        {ticket.prices?.length
                          ? ticket.prices
                              .map((price) =>
                                formatCurrency(
                                  price.amount,
                                  price.currency.currency,
                                ),
                              )
                              .join(" | ")
                          : ""}
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-2 font-bold md:w-40">
                      <div className="flex flex-row items-center gap-3">
                        {selectedTickets[ticket.id]}
                      </div>
                      <div className="">×</div>
                      <div className="">
                        {ticket.isFree
                          ? "Gratis"
                          : getFormmatedTicketPrice(ticket)}
                      </div>
                    </div>
                  </div>
                  {originalArr.at(-1)?.id !== ticket.id && (
                    <Separator className="my-3" />
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </CardContent>
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
    </Card>
  );
};
