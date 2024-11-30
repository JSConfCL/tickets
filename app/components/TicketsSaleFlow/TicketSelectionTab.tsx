import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { TicketTemplateStatus } from "~/api/gql/graphql";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/utils/utils";

import { EventTicketFragmentFragment } from "./graphql/EventTicketFragment.generated";
import { TicketAmountInput } from "./inputs";
import { FirstStepFooter } from "./Stepper";
import { Step, TicketsState } from "./types";

const MobileCard = ({
  item,
  getFormmatedTicketPrice,
  selectedTickets,
  onMinusButtonClick,
  onPlusButtonClick,
  onInputChange,
}: {
  item: EventTicketFragmentFragment;
  getFormmatedTicketPrice: (
    ticket: EventTicketFragmentFragment,
  ) => string | null;
  selectedTickets: TicketsState;
  onMinusButtonClick: (ticketId: string) => void;
  onPlusButtonClick: (ticketId: string) => void;
  onInputChange: (ticketId: string, amount: number) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="cursor-pointer p-4 pb-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="font-bold">{item.name}</div>
            <div>
              {" "}
              {item.isFree || !item.prices?.length
                ? "Gratis"
                : getFormmatedTicketPrice(item)}
            </div>
          </div>
          {item.status === TicketTemplateStatus.Active ? (
            <div className="flex w-[100px] flex-row items-center justify-between font-medium">
              <Button
                className="size-[20px] shrink-0 rounded-full p-0 "
                disabled={!selectedTickets[item.id]}
                onClick={() => onMinusButtonClick(item.id)}
              >
                <Minus size={14} />
                <span className="sr-only">Remover Entradar</span>
              </Button>
              <div className="w-8">
                <TicketAmountInput
                  value={selectedTickets[item.id] ?? 0}
                  onChange={(e) => {
                    onInputChange(item.id, parseInt(e.target.value, 10));
                    // handleChange(item.id, parseInt(e.target.value, 10));
                  }}
                />
              </div>
              <Button
                className="size-[20px] shrink-0 rounded-full p-0"
                size="sm"
                onClick={() => onPlusButtonClick(item.id)}
              >
                <Plus size={14} />
                <span className="sr-only">Agregar Entradar</span>
              </Button>
            </div>
          ) : (
            <span className="font-medium">No Disponible</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <button
          className={cn(buttonVariants({ variant: "link" }), "p-0")}
          onClick={() => {
            setIsExpanded((isExpanded) => !isExpanded);
          }}
        >
          {isExpanded ? "Esconder Detalles" : "Ver Detalles"}
        </button>
        {isExpanded && (
          <div className="text-muted-foreground">{item.description}</div>
        )}
      </CardContent>
    </Card>
  );
};

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
    <div className="flex flex-col gap-9">
      <Card className="hidden sm:block">
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
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="p-4 py-6 text-center font-bold">
                    {ticket.name}
                  </TableCell>
                  <TableCell className="py-6 text-center text-muted-foreground">
                    {ticket.description}
                  </TableCell>
                  <TableCell className="py-6 text-center">
                    {ticket.status === TicketTemplateStatus.Active ? (
                      <div className="flex w-[100px] flex-row items-center justify-between gap-2 font-medium">
                        <Button
                          className="size-[20px] shrink-0 rounded-full p-0 "
                          disabled={!selectedTickets[ticket.id]}
                          onClick={() => onMinusButtonClick(ticket.id)}
                        >
                          <Minus size={14} />
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
                          className="size-[20px] shrink-0 rounded-full p-0"
                          size="sm"
                          onClick={() => onPlusButtonClick(ticket.id)}
                        >
                          <Plus size={14} />
                          <span className="sr-only">Agregar Entradar</span>
                        </Button>
                      </div>
                    ) : (
                      <span className="font-medium">No Disponible</span>
                    )}
                  </TableCell>
                  <TableCell className="py-6 text-center font-bold">
                    {" "}
                    {ticket.isFree || !ticket.prices?.length
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
      <div className="space-y-8 sm:hidden">
        <h2 className="mt-4	text-2xl font-bold leading-[52px]">
          Entrada General
        </h2>
        <div className="space-y-4">
          {tickets.map((item) => (
            <MobileCard
              key={item.id}
              item={item}
              getFormmatedTicketPrice={getFormmatedTicketPrice}
              selectedTickets={selectedTickets}
              onMinusButtonClick={onMinusButtonClick}
              onPlusButtonClick={onPlusButtonClick}
              onInputChange={onInputChange}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-between gap-2">
          <div className="text-lg font-bold uppercase">Total a Pagar</div>
          <div className="text-lg font-bold">
            {!numberOfTickets || formattedTotal ? formattedTotal : "Gratis"}
          </div>
        </div>
      </div>
      <FirstStepFooter
        onClickNext={nextStep}
        isDisabled={numberOfTickets === 0 || !isActive || hasFinished}
        steps={steps}
        step={step}
        total={formattedTotal}
        popoverContent={
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
