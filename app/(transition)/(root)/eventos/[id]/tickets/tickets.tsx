"use client";

import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { AllowedCurrency as Currency } from "@/api/gql/graphql";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/numbers";

import { useCreatePurchaseOrderMutation } from "./createPurchaseOrder.generated";
import { EventTicketFragmentFragment } from "./EventTicketFragment.generated";

const MIN_NUMBER_OF_TICKETS = 0;
const MAX_NUMBER_OF_TICKETS = 100;
const MAX_STEP = 0;

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
    description: "Selecciona la cantidad de tickets que deseas comprar.",
  },
  {
    id: 1,
    slug: "info",
    shortName: "Confirmación",
    longName: "Confirmación",
    description: "Revisa tu pedido antes de continuar.",
  },
  // {
  //   id: 2,
  //   slug: "confirm",
  //   shortName: "Pago",
  //   longName: "Pago",
  //   description:
  //     "Nulla facilisis, risus a rhoncus fermentum, tellus tellus lacinia purus, et dictum nunc justo sit amet elit.",
  // },
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

interface FirstStepFooterProps {
  onClickNext: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  steps: Step[];
  step: number;
  total: string | null;
}

interface SecondStepFooterProps {
  onClickPrevious: MouseEventHandler<HTMLButtonElement>;
  onClickNext: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  total: string | null;
}

const StepHeader = ({ activeStep, steps, step }: StepHeaderProps) => (
  <>
    <CardHeader className="flex flex-col items-start justify-between gap-2">
      <CardTitle>{activeStep.longName}</CardTitle>
      <CardDescription>
        <span>
          Paso {step + 1} de {steps.length}.
        </span>
        <br />
        <span>{activeStep.description}</span>
      </CardDescription>
    </CardHeader>
    <Separator className="my-4" />
  </>
);

const PriceBlock = ({ total }: { total: string | null }) => {
  return (
    <span className="mr-4 flex gap-8 text-center text-2xl font-bold leading-none">
      <span>{total ?? 0}</span>
    </span>
  );
};
const FirstStepFooter = ({
  onClickNext,
  isDisabled,
  total,
}: FirstStepFooterProps) => (
  <>
    <Separator className="my-4" />
    <CardFooter className="flex justify-end">
      <div className="flex items-center gap-2">
        <PriceBlock total={total} />
        <Button disabled={isDisabled} onClick={onClickNext}>
          Siguiente
        </Button>
      </div>
    </CardFooter>
  </>
);

const SecondStepFooter = ({
  onClickPrevious,
  onClickNext,
  isDisabled,
  total,
}: SecondStepFooterProps) => (
  <>
    <Separator className="my-4" />
    <CardFooter className="flex justify-between">
      <div>
        <Button variant="outline" onClick={onClickPrevious}>
          Anterior
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <PriceBlock total={total} />
        <Button disabled={isDisabled} onClick={onClickNext}>
          Comprar
        </Button>
      </div>
    </CardFooter>
  </>
);

const TicketAmountInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Input
      type="number"
      className="appearance-none"
      value={value}
      min={0}
      max={100}
      onChange={onChange}
    />
  );
};

const ConfirmationTab = ({
  step,
  steps,
  activeStep,
  tickets,
  selectedTickets,
  numberOfTickets,
  formattedTotal,
  previousStep,
  getFormmatedTicketPrice,
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
}) => {
  const router = useRouter();
  const idempotencyUUIDKey = useRef<string>(v4());
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
          idempotencyUUIDKey: idempotencyUUIDKey.current,
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
              router.push(paymentLink);
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
  }, [purchaseOrderMutation, router, selectedTickets]);
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
                    <div className="flex flex-row items-center justify-center gap-2 font-bold md:w-40">
                      <div className="flex flex-row items-center gap-3">
                        {selectedTickets[ticket.id]}
                      </div>
                      <div className="">×</div>
                      <div className="">{getFormmatedTicketPrice(ticket)}</div>
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

export default function Tickets({
  tickets,
}: {
  tickets: EventTicketFragmentFragment[];
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
    setSelectedTickets((tmpTickets) => ({ ...tmpTickets, [ticketId]: number }));
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
                        onClick={() => handleSubtract(ticket.id)}
                      >
                        -
                      </Button>
                      <div className="w-16">
                        <TicketAmountInput
                          value={selectedTickets[ticket.id] ?? 0}
                          onChange={(e) => {
                            handleChange(
                              ticket.id,
                              parseInt(e.target.value, 10),
                            );
                          }}
                        />
                      </div>
                      <Button
                        className="h-8"
                        size="sm"
                        onClick={() => handleAdd(ticket.id)}
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
            isDisabled={numberOfTickets === 0}
            steps={steps}
            step={step}
            total={formattedTotal}
          />
        </Card>
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
