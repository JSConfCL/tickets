"use client";

import { useCallback, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/numbers";

import { ConfirmationTab } from "./ConfirmationTab.1";
import { EventTicketFragmentFragment } from "./graphql/EventTicketFragment.generated";
import { TicketSelectionTab } from "./TicketSelectionTab";
import { Currencies, TicketsState } from "./types";
const MIN_NUMBER_OF_TICKETS = 0;
const MAX_NUMBER_OF_TICKETS = 100;
const MAX_STEP = 0;

// Stepper
const steps = [
  {
    id: 0,
    slug: "tickets",
    shortName: "Tickets",
    longName: "Tickets",
    description: "Selecciona la cantidad de tickets que deseas comprar.",
  },
  {
    id: 1,
    slug: "info",
    shortName: "Confirmación",
    longName: "Confirmación",
    description: "Revisa tus tickets antes de continuar.",
  },
];

export default function Tickets({
  tickets,
  isActive,
  hasFinished,
}: {
  tickets: EventTicketFragmentFragment[];
  isActive: boolean;
  hasFinished: boolean;
}) {
  const [step, setStep] = useState(0);
  const activeStep = steps[step];

  const customStep = (stepSlug: string) => {
    const stepIndex = steps.findIndex((step) => step.slug == stepSlug);
    if (stepIndex === null || stepIndex === undefined) {
      return;
    }

    if (stepIndex >= 0 && stepIndex < steps.length) {
      setStep(stepIndex);
    }
  };

  const nextStep = () => {
    setStep((tmpStep) => {
      const newStep = tmpStep + 1;
      return Math.min(newStep, steps.length - 1);
    });
  };

  const previousStep = () => {
    setStep((tmpStep) => {
      const newStep = tmpStep - 1;
      return Math.max(newStep, 0);
    });
  };

  // Step 1: Tickets
  const currencies: Currencies = useMemo(
    () =>
      tickets
        .flatMap((ticket) => ticket.prices?.map((price) => price.currency))
        .reduce((acc, currency) => {
          if (currency) {
            return { ...acc, [currency.id]: currency };
          }
          return acc;
        }, {}),
    [tickets],
  );

  const [selectedTickets, setSelectedTickets] = useState<TicketsState>({});
  const [selectedCurrencyId, setSelectedCurrencyId] = useState(
    Object.keys(currencies)[0],
  );

  const numberOfTickets = useMemo(() => {
    let numberOfTickets = 0;
    for (const ticket of tickets) {
      const amountOfTickets = selectedTickets[ticket.id] ?? 0;
      numberOfTickets += amountOfTickets;
    }
    return numberOfTickets;
  }, [selectedTickets, tickets]);

  const handleChange = (ticketId: string, number: number) => {
    const clampNumber = Math.min(
      Math.max(number, MIN_NUMBER_OF_TICKETS),
      MAX_NUMBER_OF_TICKETS,
    );
    setSelectedTickets((tmpTickets) => ({
      ...tmpTickets,
      [ticketId]: clampNumber,
    }));
  };

  const handleAdd = (ticketId: string) => {
    setSelectedTickets((tmpTickets: TicketsState) => {
      const currentTicketCount = tmpTickets[ticketId] ?? MIN_NUMBER_OF_TICKETS;
      let newTicketCount = currentTicketCount + 1;
      if (currentTicketCount >= MAX_NUMBER_OF_TICKETS) {
        newTicketCount = MAX_NUMBER_OF_TICKETS;
      }
      return {
        ...tmpTickets,
        [ticketId]: newTicketCount,
      };
    });
  };

  const handleSubtract = (ticketId: string) => {
    setSelectedTickets((tmpTickets: TicketsState) => {
      const currentTicketCount = tmpTickets[ticketId] ?? MIN_NUMBER_OF_TICKETS;
      let newTicketCount = MIN_NUMBER_OF_TICKETS;
      if (currentTicketCount > MIN_NUMBER_OF_TICKETS) {
        newTicketCount = currentTicketCount - 1;
      }
      return {
        ...tmpTickets,
        [ticketId]: newTicketCount,
      };
    });
  };

  const handleChangeCurrency = (id: string) => {
    setSelectedCurrencyId(id);
  };

  const getTicketCurrency = useCallback(
    (ticket: EventTicketFragmentFragment) => {
      return ticket.prices?.find(
        (price) => price.currency.id == selectedCurrencyId,
      );
    },
    [selectedCurrencyId],
  );

  const total = useMemo(() => {
    return tickets.reduce((acc, ticket) => {
      const actualPrice = ticket.isFree
        ? 0
        : getTicketCurrency(ticket)?.amount ?? 0;
      const amountOfTickets = selectedTickets[ticket.id] ?? 0;
      return acc + amountOfTickets * actualPrice;
    }, 0);
  }, [getTicketCurrency, selectedTickets, tickets]);

  const formattedTotal = useMemo(
    () => formatCurrency(total, currencies[selectedCurrencyId]?.currency),
    [currencies, selectedCurrencyId, total],
  );

  const getFormmatedTicketPrice = useCallback(
    (ticket: EventTicketFragmentFragment) => {
      const ticketCurrency = getTicketCurrency(ticket);
      if (!ticket || !ticketCurrency) {
        return null;
      }

      return formatCurrency(
        ticketCurrency.amount,
        ticketCurrency.currency.currency,
      );
    },
    [getTicketCurrency],
  );

  return (
    <Tabs
      defaultValue={steps[0].slug}
      value={steps[step].slug}
      onValueChange={customStep}
    >
      <div className="flex items-center">
        <TabsList>
          {steps.map((step, index) => (
            <TabsTrigger
              key={step.id}
              value={step.slug}
              disabled={index > MAX_STEP}
            >
              {step.shortName}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {Object.values(currencies).length > 1 ? (
            <div className="flex justify-end">
              <Select
                onValueChange={handleChangeCurrency}
                defaultValue={selectedCurrencyId}
              >
                <SelectTrigger className="w-full md:w-[100px]">
                  <SelectValue placeholder="Selecciona una Moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(currencies).map((currency) => (
                      <SelectItem key={currency.id} value={currency.id}>
                        {currency.currency}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
      </div>

      <TabsContent value={steps[0].slug}>
        <TicketSelectionTab
          step={step}
          steps={steps}
          activeStep={activeStep}
          tickets={tickets}
          selectedTickets={selectedTickets}
          numberOfTickets={numberOfTickets}
          nextStep={nextStep}
          formattedTotal={formattedTotal}
          onMinusButtonClick={handleSubtract}
          onPlusButtonClick={handleAdd}
          onInputChange={handleChange}
          isActive={isActive}
          hasFinished={hasFinished}
        />
      </TabsContent>
      <TabsContent value={steps[1].slug}>
        <ConfirmationTab
          step={step}
          steps={steps}
          activeStep={activeStep}
          tickets={tickets}
          selectedTickets={selectedTickets}
          numberOfTickets={numberOfTickets}
          formattedTotal={formattedTotal}
          previousStep={previousStep}
          getFormmatedTicketPrice={getFormmatedTicketPrice}
        />
      </TabsContent>
    </Tabs>
  );
}
