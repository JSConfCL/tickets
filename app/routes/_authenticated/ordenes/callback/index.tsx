import { useSearchParams } from "@remix-run/react";
import { toast } from "sonner";

import { PurchaseCallback } from "~/components/PurchaseOrder/Callback";

export default function Index() {
  const [params] = useSearchParams();
  const purchaseOrderId = params.get("purchaseOrderId");

  if (!purchaseOrderId) {
    return toast("Error fetching purchase order");
  }

  return <PurchaseCallback purchaseOrderId={purchaseOrderId} />;
}
