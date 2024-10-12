import { ChangeEventHandler } from "react";

import { Input } from "~/components/ui/input";

export const TicketAmountInput = ({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) => {
  return (
    <Input
      type="number"
      className="border-0 p-0 text-center text-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      disabled={disabled}
      value={value}
      min={0}
      max={100}
      onChange={onChange}
    />
  );
};
