import { MouseEventHandler } from "react";

import { AllowedCurrency as Currency } from "~/api/gql/graphql";

export type TicketsState = {
  [key: string]: number;
};

export type Currencies = {
  [key: string]: Currency;
};

export type Step = {
  id: number;
  slug: string;
  shortName: string;
  longName: string;
  description: string;
};

export type StepHeaderProps = {
  activeStep: Step;
  steps: Step[];
  step: number;
};

export type FirstStepFooterProps = {
  onClickNext: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  steps: Step[];
  step: number;
  total: string | null;
  hoverText?: string | null;
};

export type SecondStepFooterProps = {
  onClickPrevious: MouseEventHandler<HTMLButtonElement>;
  onClickNext: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  total: string | null;
  hoverText?: string | null;
};
