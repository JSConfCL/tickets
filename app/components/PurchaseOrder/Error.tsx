import type { GraphQLError } from "graphql";

import { Card, CardContent, CardTitle } from "~/components/ui/card";

type PurchaseOrderErrorProps = Readonly<{
  errors: Readonly<GraphQLError[]>;
}>;

export const PurchaseOrderError = ({ errors }: PurchaseOrderErrorProps) => {
  return (
    <Card>
      <CardTitle>Oops!</CardTitle>
      <CardContent>
        <ol>
          {errors.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
