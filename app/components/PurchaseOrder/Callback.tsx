import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

import { PurchaseOrderStatusEnum } from "~/api/gql/graphql";
import { urls } from "~/utils/urls";

import { useCheckPurchaseOrderStatusMutation } from "./checkPurchaseOrderStatus.generated";

type PurchaseCallbackProps = {
  purchaseOrderId: string;
};

export const PurchaseCallback = ({
  purchaseOrderId,
}: PurchaseCallbackProps) => {
  const triggered = useRef(false);

  const [checkPurchaseOrderMutation, { loading, error, data }] =
    useCheckPurchaseOrderStatusMutation({
      variables: {
        input: {
          purchaseOrderId,
        },
      },
    });

  const checkPurchaseOrder = useCallback(checkPurchaseOrderMutation, [
    checkPurchaseOrderMutation,
  ]);

  useEffect(() => {
    if (!triggered.current) {
      void checkPurchaseOrder();
    }

    triggered.current = true;
  }, [checkPurchaseOrder]);

  if (loading) {
    return <div>Retrieving order payment status...</div>;
  }

  if (error) {
    return toast("Error fetching order status");
  }

  if (!data) {
    return <></>;
  }

  const { status } = data.checkPurchaseOrderStatus;

  if (
    status === PurchaseOrderStatusEnum.Paid ||
    status === PurchaseOrderStatusEnum.NotRequired
  ) {
    return (
      <div>
        Congrats! Go get your{" "}
        <a href={urls.ordenes.tickets(purchaseOrderId)}>tickets</a>
      </div>
    );
  }

  return <div>Ticket not paid</div>;
};