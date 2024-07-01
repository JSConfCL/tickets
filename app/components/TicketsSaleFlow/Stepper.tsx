import { Button } from "~/components/ui/button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";

import {
  FirstStepFooterProps,
  SecondStepFooterProps,
  StepHeaderProps,
} from "./types";

export const StepHeader = ({ activeStep, steps, step }: StepHeaderProps) => (
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

export const SecondStepFooter = ({
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

const PriceBlock = ({ total }: { total: string | null }) => {
  return (
    <span className="mr-4 flex gap-8 text-center text-2xl font-bold leading-none">
      <span>{total ?? 0}</span>
    </span>
  );
};

const ConditionalPopoverWrapper = ({
  popoverText,
  children,
}: {
  popoverText: string | undefined | null;
  children: React.ReactNode;
}) => {
  if (popoverText) {
    return (
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent>{popoverText}.</PopoverContent>
      </Popover>
    );
  } else {
    return <>{children}</>;
  }
};

export const FirstStepFooter = ({
  onClickNext,
  isDisabled,
  total,
  hoverText,
}: FirstStepFooterProps) => (
  <>
    <Separator className="my-4" />
    <CardFooter className="flex justify-end">
      <div className="flex items-center gap-2">
        <PriceBlock total={total} />
        <ConditionalPopoverWrapper popoverText={hoverText}>
          <Button disabled={isDisabled} onClick={onClickNext}>
            Siguiente
          </Button>
        </ConditionalPopoverWrapper>
      </div>
    </CardFooter>
  </>
);
