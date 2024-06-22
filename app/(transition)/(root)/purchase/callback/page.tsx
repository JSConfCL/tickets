import { GraphQLError } from "graphql";

import { getApolloClientForRSC } from "@/api/ApolloClientForRSC";
import { PurchaseOrderError } from "@/components/features/PurchaseOrder/Error";

import {
  CheckPurchaseOrderStatusDocument,
  CheckPurchaseOrderStatusMutation,
} from "./CheckPurchaseOrderStatus.generated";

type PurchaseCallbackProps = {
  searchParams: {
    purchaseOrderId: string;
    [key: string]: string;
  };
};

export default async function PurchaseCallback({
  searchParams,
}: PurchaseCallbackProps) {
  const client = getApolloClientForRSC();
  const { purchaseOrderId } = searchParams;

  if (!purchaseOrderId) {
    return (
      <PurchaseOrderError
        errors={[new GraphQLError("No purchase order ID provided")]}
      />
    );
  }

  const { data, errors } =
    await client.mutate<CheckPurchaseOrderStatusMutation>({
      mutation: CheckPurchaseOrderStatusDocument,
      fetchPolicy: "no-cache",
      errorPolicy: "all",
      variables: {
        input: {
          purchaseOrderId,
        },
      },
    });

  if (errors) {
    return <PurchaseOrderError errors={errors} />;
  }

  return (
    <div>
      status:
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const runtime = "edge";
