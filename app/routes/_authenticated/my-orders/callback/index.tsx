import { useSearchParams } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { toast } from "sonner";

import { PurchaseCallback } from "~/components/PurchaseOrder/Callback";

export default function Index() {
  const [params] = useSearchParams();
  const purchaseOrderId = params.get("purchaseOrderId");

  if (!purchaseOrderId) {
    return toast("Error fetching purchase order");
  }

  return (
    <main className="mx-auto flex w-full max-w-[1360px] px-6 py-12">
      <AnimatePresence mode="popLayout">
        <Suspense fallback={<div>LOADING</div>}>
          <motion.div
            className="flex w-full flex-col gap-10"
            key="lazyComponent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <PurchaseCallback purchaseOrderId={purchaseOrderId} />
          </motion.div>
        </Suspense>
      </AnimatePresence>
    </main>
  );
}
