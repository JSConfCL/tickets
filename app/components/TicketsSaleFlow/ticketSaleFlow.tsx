import { useCallback, useMemo, useState } from "react";

import { GetEventAndTicketsQuery } from "~/components/TicketsSaleFlow/graphql/getEventAndTickets.generated";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { formatCurrency } from "~/utils/numbers";
import { urls } from "~/utils/urls";
import { cn } from "~/utils/utils";

import { ConfirmationTab } from "./ConfirmationTab";
import { EventTicketFragmentFragment } from "./graphql/EventTicketFragment.generated";
import { TicketSelectionTab } from "./TicketSelectionTab";
import { Currencies, TicketsState } from "./types";

const MIN_NUMBER_OF_TICKETS = 0;
const MAX_NUMBER_OF_TICKETS = 100;

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
  event,
  isActive,
  hasFinished,
}: {
  event: NonNullable<GetEventAndTicketsQuery["event"]>;
  isActive: boolean;
  hasFinished: boolean;
}) {
  const tickets = event.tickets;
  const [step, setStep] = useState(0);
  const activeStep = steps[step];
  const [coupon, setCoupon] = useState("");

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

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      return Math.min(newStep, steps.length - 1);
    });
  };

  const previousStep = () => {
    setStep((tmpStep) => {
      const newStep = tmpStep - 1;

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

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
      <TabsContent
        value={steps[0].slug}
        className="mx-auto flex max-w-[1076px] flex-col gap-9"
      >
        <div
          className={cn(
            "mx-auto h-20 w-full rounded-md bg-primary/10 lg:h-40",
            event.bannerImage?.url ? "bg-cover bg-center" : "",
          )}
          style={
            event.bannerImage?.url
              ? { backgroundImage: `url(${event.bannerImage?.url})` }
              : {}
          }
        />
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-4">
            <h2 className="text-3xl font-semibold">Compra de tickets</h2>
            <p className="text-muted-foreground">
              Selecciona la cantidad de tickets que quieres comprar
            </p>
          </div>
          <div className="ml-auto flex w-full flex-col gap-4">
            <div className="flex w-full gap-2 md:justify-end">
              <Input
                className="w-full md:w-[240px]"
                placeholder="Cupón de Descuento"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button
                disabled={!coupon.length}
                onClick={() => {
                  window.location.href = urls.events.tickets(event.id, coupon);
                }}
              >
                Aplicar
              </Button>
            </div>
            {Object.values(currencies).length > 1 ? (
              <div className="ml-auto flex w-full gap-4">
                <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-end">
                  <span className="text-muted-foreground">Tipo de Moneda</span>
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
              </div>
            ) : null}
          </div>
        </div>
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
          getFormmatedTicketPrice={getFormmatedTicketPrice}
          hasFinished={hasFinished}
        />
      </TabsContent>
      <TabsContent
        value={steps[1].slug}
        className="mx-auto flex max-w-[856px] flex-col gap-9"
      >
        <img
          className="mx-auto w-60"
          src={event.logoImage?.url}
          alt={event.name}
        />
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold">Confirmación</h2>
          <p className="text-center text-muted-foreground">
            Revisa los detalles del evento y tus tickets antes de continuar
          </p>
        </div>
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
          currencyId={selectedCurrencyId}
        />
      </TabsContent>
    </Tabs>
  );
}
