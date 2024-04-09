"use client";

import { MouseEventHandler, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { formatCurrency } from "@/lib/numbers";

import { Ticket, AllowedCurrency as Currency } from "@/api/gql/graphql";
import { Separator } from "@/components/ui/separator";

type TicketsState = {
  [key: string]: number;
};

type Currencies = {
  [key: string]: Currency;
};

// Stepper
const steps = [
  {
    id: 0,
    slug: "tickets",
    shortName: "Tickets",
    longName: "Tickets",
    description:
      "Praesent augue.  Fusce commodo.  Vestibulum convallis, lorem a tempus semper, dui dui euismod elit, vitae placerat urna tortor vitae lacus.",
  },
  {
    id: 1,
    slug: "info",
    shortName: "Datos",
    longName: "Datos",
    description:
      "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.  Mauris mollis tincidunt felis.  Aliquam feugiat tellus ut neque.",
  },
  {
    id: 2,
    slug: "confirm",
    shortName: "Pago",
    longName: "Pago",
    description:
      "Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit.",
  },
];

interface Step {
  id: number;
  slug: string;
  shortName: string;
  longName: string;
  description: string;
}

interface StepHeaderProps {
  activeStep: Step;
  steps: Step[];
  step: number;
}

interface StepFooterProps {
  onClickPrevious: MouseEventHandler<HTMLButtonElement>;
  onClickNext: MouseEventHandler<HTMLButtonElement>;
  steps: Step[];
  step: number;
  total: string | null;
}

const StepHeader = ({ activeStep, steps, step }: StepHeaderProps) => (
  <>
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>{activeStep.longName}</CardTitle>
        <CardDescription>
          <div>{activeStep.description}</div>
          <div>
            Paso {step + 1} de {steps.length}.
          </div>
        </CardDescription>
      </div>
    </CardHeader>
    <Separator className="my-4" />
  </>
);

const StepFooter = ({
  onClickPrevious,
  onClickNext,
  steps,
  step,
  total,
}: StepFooterProps) => (
  <>
    <Separator className="my-4" />
    <CardFooter className="flex justify-between">
      <Button variant="outline" disabled={step == 0} onClick={onClickPrevious}>
        Anterior
      </Button>
      <div>
        <span className="mr-4 text-2xl font-bold">{total ?? 0}</span>
        <Button disabled={step == steps.length - 1} onClick={onClickNext}>
          Siguiente
        </Button>
      </div>
    </CardFooter>
  </>
);

export default function Tickets({ tickets }: { tickets: Ticket[] }) {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
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
  const currencies: Currencies = tickets
    .flatMap((ticket) => ticket.prices?.map((price) => price.currency))
    .reduce((acc, currency) => {
      if (currency) {
        return { ...acc, [currency.id]: currency };
      }
      return acc;
    }, {});

  const [selectedTickets, setSelectedTickets] = useState<TicketsState>({});
  const [selectedCurrencyId, setSelectedCurrencyId] = useState(
    Object.keys(currencies)[0],
  );

  const handleChange = (ticketId: string, number: number) => {
    setSelectedTickets((tmpTickets) => ({ ...tmpTickets, [ticketId]: number }));
  };

  const handleAdd = (ticketId: string) => {
    setSelectedTickets((tmpTickets: TicketsState) => ({
      ...tmpTickets,
      [ticketId]: tmpTickets[ticketId] ? tmpTickets[ticketId] + 1 : 1,
    }));
  };

  const handleSubtract = (ticketId: string) => {
    setSelectedTickets((tmpTickets: TicketsState) => ({
      ...tmpTickets,
      [ticketId]: tmpTickets[ticketId] ? tmpTickets[ticketId] - 1 : 0,
    }));
  };

  const handleChangeCurrency = (id: string) => {
    setSelectedCurrencyId(id);
  };

  const getTicketCurrency = (ticket: Ticket) => {
    return ticket.prices?.find(
      (price) => price.currency.id == selectedCurrencyId,
    );
  };

  const getCurrentCurrency = () => currencies[selectedCurrencyId];

  const getTotal = () => {
    return tickets.reduce((acc, ticket) => {
      const actualPrice = ticket.isFree
        ? 0
        : getTicketCurrency(ticket)?.amount ?? 0;
      const amountOfTickets = selectedTickets[ticket.id] ?? 0;
      return acc + amountOfTickets * actualPrice;
    }, 0);
  };

  const getFormattedTotal = () => formatCurrency(getTotal(), getCurrentCurrency().currency)
  
  const getFormmatedTicketPrice = (ticket: Ticket) => {
    const ticketCurrency = getTicketCurrency(ticket)
    if (!ticket || !ticketCurrency) { return null }
    
    return formatCurrency(ticketCurrency.amount, ticketCurrency.currency.currency)
  }
  
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
              disabled={index > maxStep}
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
        <Card>
          <StepHeader step={step} steps={steps} activeStep={activeStep} />
          <CardContent>
            {/* "Tickets Main" */}
            <div>
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col items-center gap-1 border-b border-slate-500 py-4 last:border-0 dark:border-slate-400 md:flex-row md:gap-0"
                >
                  <div className="flex w-full grow flex-col gap-1">
                    <div className="w-auto font-bold text-slate-900 dark:text-white">
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
                        : "Gratis"}
                    </div>
                  </div>
                  <div className="ml-4 flex w-full flex-row items-center justify-between gap-4 font-medium md:w-auto">
                    <div>{getFormmatedTicketPrice(ticket)}</div>
                    <div className="flex flex-row gap-2">
                      <Button
                        disabled={!selectedTickets[ticket.id]}
                        onClick={() => handleSubtract(ticket.id)}
                      >
                        -
                      </Button>
                      <div className="w-16">
                        <Input
                          type="number"
                          value={selectedTickets[ticket.id] ?? 0}
                          min={0}
                          max={100}
                          step={1}
                          onChange={(e) => {
                            handleChange(ticket.id, +e.target.value);
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          handleAdd(ticket.id);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <StepFooter
            onClickPrevious={previousStep}
            onClickNext={nextStep}
            steps={steps}
            step={step}
            total={getFormattedTotal()}
          />
        </Card>
      </TabsContent>
      <TabsContent value={steps[1].slug}>
        <Card>
          <StepHeader steps={steps} step={step} activeStep={activeStep} />
          <CardContent>Paso 2</CardContent>
          <StepFooter
            onClickPrevious={previousStep}
            onClickNext={nextStep}
            steps={steps}
            step={step}
            total={getFormattedTotal()}
          />
        </Card>
      </TabsContent>
      <TabsContent value={steps[2].slug}>
        <Card>
          <StepHeader steps={steps} step={step} activeStep={activeStep} />
          <CardContent>Paso 3</CardContent>{" "}
          <StepFooter
            onClickPrevious={previousStep}
            onClickNext={nextStep}
            steps={steps}
            step={step}
            total={getFormattedTotal()}
          />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
