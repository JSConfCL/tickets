import { ChangeEventHandler } from "react";

import { Input } from "~/components/ui/input";

export const TicketAmountInput = ({
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
