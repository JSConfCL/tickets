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

export const MyTransfersSkeleton = () => {
  const purchaseOrders = Array.from({ length: 5 }).map((_, index) => index);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Transferencias de Tickets</h1>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                  Id
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                  Evento
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                  Ticket
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                  Fecha de Envío
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                  Remitente
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                  Destinatario
                </TableHead>
                <TableHead className="h-[52px] text-center text-base font-bold dark:text-white">
                  Estado
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
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
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
