import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
    <div className="flex flex-col gap-12">
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-2xl">Ordenes de Compra</CardTitle>
          <CardDescription>Revisa todas tus ordenes de compra.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead className="md:table-cell">Descripción</TableHead>
                <TableHead className="hidden md:table-cell">
                  Método de Pago
                </TableHead>
                <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Precio</TableHead>
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
                  <TableCell className="sm:table-cell">
                    <Skeleton className="h-4 w-64" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
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
