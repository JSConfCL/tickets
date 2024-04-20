"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/numbers";

import { EventTicketFragmentFragment } from "./graphql/EventTicketFragment.generated";
import { TicketAmountInput } from "./inputs";
import { FirstStepFooter, StepHeader } from "./Stepper";
import { Step, TicketsState } from "./types";

export const TicketSelectionTab = ({
  step,
  nextStep,
  steps,
  activeStep,
  tickets,
  selectedTickets,
  numberOfTickets,
  formattedTotal,
  onMinusButtonClick,
  onPlusButtonClick,
  onInputChange,
  isActive,
  hasFinished,
}: {
  step: number;
  nextStep: () => void;
  steps: Step[];
  activeStep: Step;
  tickets: EventTicketFragmentFragment[];
  selectedTickets: TicketsState;
  numberOfTickets: number;
  formattedTotal: string | null;
  onMinusButtonClick: (ticketId: string) => void;
  onPlusButtonClick: (ticketId: string) => void;
  onInputChange: (ticketId: string, value: number) => void;
  isActive: boolean;
  hasFinished: boolean;
}) => {
  return (
    <Card>
      <StepHeader step={step} steps={steps} activeStep={activeStep} />
      <CardContent id="card-content">
        {/* "Tickets Main" */}
        <div className="flex flex-col gap-4 pt-4">
          {tickets.map((ticket, index, originalArr) => (
            <>
              <div
                key={ticket.id}
                className="flex flex-col items-center justify-between last:border-0 md:flex-row md:gap-0"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-auto font-bold text-slate-900 dark:text-white">
                    {ticket.name}
                  </div>
                  {ticket.description ? (
                    <div className="w-auto">{ticket.description}</div>
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
                      : "Gratis"}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-3 font-medium">
                  <Button
                    className="h-8"
                    size="sm"
                    disabled={!selectedTickets[ticket.id]}
                    onClick={() => onMinusButtonClick(ticket.id)}
                  >
                    -
                  </Button>
                  <div className="w-16">
                    <TicketAmountInput
                      value={selectedTickets[ticket.id] ?? 0}
                      onChange={(e) => {
                        onInputChange(ticket.id, parseInt(e.target.value, 10));
                        // handleChange(ticket.id, parseInt(e.target.value, 10));
                      }}
                    />
                  </div>
                  <Button
                    className="h-8"
                    size="sm"
                    onClick={() => onPlusButtonClick(ticket.id)}
                  >
                    +
                  </Button>
                </div>
              </div>
              {originalArr.at(-1)?.id !== ticket.id && (
                <Separator className="my-2" />
              )}
            </>
          ))}
        </div>
      </CardContent>
      <FirstStepFooter
        onClickNext={nextStep}
        isDisabled={numberOfTickets === 0 || !isActive || hasFinished}
        steps={steps}
        step={step}
        total={formattedTotal}
        hoverText={
          !isActive
            ? "Este evento no está activo"
            : hasFinished
              ? "Este evento ya ha finalizado"
              : numberOfTickets === 0
                ? "No puedes continuar si no seleccionas al menos un ticket"
                : null
        }
      />
    </Card>
  );
};
