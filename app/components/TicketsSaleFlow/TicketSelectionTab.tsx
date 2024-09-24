import { Minus, Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import { EventTicketFragmentFragment } from "./graphql/EventTicketFragment.generated";
import { TicketAmountInput } from "./inputs";
import { FirstStepFooter } from "./Stepper";
import { Step, TicketsState } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const TicketSelectionTab = ({
  getFormmatedTicketPrice,
  step,
  nextStep,
  steps,
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
  getFormmatedTicketPrice: (
    ticket: EventTicketFragmentFragment,
  ) => string | null;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent id="card-content">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-center font-cal text-lg ">
                  Tipo de Ticket
                </TableHead>
                <TableHead className="text-center font-cal text-lg">
                  Descripción
                </TableHead>
                <TableHead className="w-[150px] text-center font-cal text-lg">
                  Cantidad
                </TableHead>
                <TableHead className="w-[150px] text-center font-cal text-lg">
                  Precio
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="p-4 text-center font-cal">
                    {ticket.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {ticket.description}
                  </TableCell>
                  <TableCell className="text-center font-cal">
                    <div className="flex flex-row items-center justify-between gap-3 font-medium">
                      <Button
                        className="size-6 shrink-0 rounded-full p-0"
                        disabled={!selectedTickets[ticket.id]}
                        onClick={() => onMinusButtonClick(ticket.id)}
                      >
                        <Minus size={16} />
                        <span className="sr-only">Remover Entradar</span>
                      </Button>
                      <div className="w-16">
                        <TicketAmountInput
                          value={selectedTickets[ticket.id] ?? 0}
                          onChange={(e) => {
                            onInputChange(
                              ticket.id,
                              parseInt(e.target.value, 10),
                            );
                            // handleChange(ticket.id, parseInt(e.target.value, 10));
                          }}
                        />
                      </div>
                      <Button
                        className="size-6 shrink-0 rounded-full p-0"
                        size="sm"
                        onClick={() => onPlusButtonClick(ticket.id)}
                      >
                        <Plus size={16} />
                        <span className="sr-only">Agregar Entradar</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-cal">
                    {" "}
                    {ticket.isFree || !ticket.prices?.length
                      ? "Gratis"
                      : getFormmatedTicketPrice(ticket)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-background">
                <TableCell className="text-right font-cal text-lg" colSpan={4}>
                  {numberOfTickets ? (
                    formattedTotal ? (
                      <span className="flex flex-row justify-end gap-4">
                        <span>Total a Pagar</span>
                        <span>{formattedTotal}</span>
                      </span>
                    ) : (
                      "Gratis"
                    )
                  ) : (
                    " "
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
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
    </div>
  );
};
