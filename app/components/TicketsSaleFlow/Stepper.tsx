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
  popoverContent,
}: SecondStepFooterProps) => (
  <div className="mt-2 flex justify-end gap-2 text-right">
    <Button variant="outline" onClick={onClickPrevious}>
      Atras
    </Button>
    <ConditionalPopoverWrapper popoverContent={popoverContent}>
      <Button disabled={isDisabled} onClick={onClickNext}>
        Pagar
      </Button>
    </ConditionalPopoverWrapper>
  </div>
);

const ConditionalPopoverWrapper = ({
  popoverContent,
  children,
}: {
  popoverContent?: React.ReactNode;
  children: React.ReactNode;
}) => {
  if (popoverContent) {
    return (
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent>{popoverContent}</PopoverContent>
      </Popover>
    );
  } else {
    return <>{children}</>;
  }
};

export const FirstStepFooter = ({
  onClickNext,
  isDisabled,
  popoverContent,
}: FirstStepFooterProps) => (
  <div className="mt-2 flex justify-end gap-2 text-right">
    <ConditionalPopoverWrapper popoverContent={popoverContent}>
      <Button disabled={isDisabled} onClick={onClickNext}>
        Siguiente
      </Button>
    </ConditionalPopoverWrapper>
  </div>
);
