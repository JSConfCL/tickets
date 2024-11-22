import { useState } from "react";

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
}: SecondStepFooterProps) => {
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <>
      <div className="ml-auto">
        <label className="ms-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input
            type="checkbox"
            className="size-4"
            checked={acceptTerms}
            onChange={() => setAcceptTerms((prev) => !prev)}
          />
          <div>
            Estoy de acuerdo con los{" "}
            <a
              href="https://legal.jsconf.cl/terminos_de_compra_e_imagen/"
              className="text-blue-600 hover:underline dark:text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              términos y condiciones
            </a>
            .
          </div>
        </label>
      </div>
      <div className="mt-2 flex justify-end gap-2 text-right">
        <Button variant="outline" onClick={onClickPrevious}>
          Atras
        </Button>
        <ConditionalPopoverWrapper popoverContent={popoverContent}>
          <Button disabled={isDisabled || !acceptTerms} onClick={onClickNext}>
            Pagar
          </Button>
        </ConditionalPopoverWrapper>
      </div>
    </>
  );
};

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
