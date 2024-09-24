import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { FirstStepFooterProps, SecondStepFooterProps } from "./types";

export const SecondStepFooter = ({
  onClickPrevious,
  onClickNext,
  isDisabled,
}: SecondStepFooterProps) => (
  <div className="mt-2 flex justify-end gap-2 text-right">
    <Button variant="outline" onClick={onClickPrevious}>
      Atras
    </Button>
    <Button disabled={isDisabled} onClick={onClickNext}>
      Pagar
    </Button>
  </div>
);

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
  hoverText,
}: FirstStepFooterProps) => (
  <div className="mt-2 flex justify-end gap-2 text-right">
    <ConditionalPopoverWrapper popoverText={hoverText}>
      <Button disabled={isDisabled} onClick={onClickNext}>
        Siguiente
      </Button>
    </ConditionalPopoverWrapper>
  </div>
);
