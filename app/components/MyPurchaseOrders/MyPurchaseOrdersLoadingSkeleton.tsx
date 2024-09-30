import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const MyPurchaseOrdersLoadingSkeleton = () => {
  const purchaseOrders = Array.from({ length: 5 }).map((_, index) => index);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Ordenes de Compra</h1>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-[52px] text-center text-base font-bold text-white">
                  Id
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold text-white">
                  Evento
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold text-white">
                  Descripción
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold text-white">
                  Fecha
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold text-white">
                  Precio
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((purchaseOrder) => (
                <TableRow key={purchaseOrder}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-64" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
