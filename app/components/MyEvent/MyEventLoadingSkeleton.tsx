import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const MyEventLoadingSkeleton = () => {
  return (
    <div className="flex basis-8/12 flex-col gap-4">
      <Card className="flex flex-col gap-4 p-7">
        <Skeleton className="mx-auto h-40 w-full rounded-md lg:h-96" />
        <Skeleton className="h-12 w-36" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-40" />
      </Card>

      <Card className="flex flex-col gap-4 p-7">
        <Skeleton className="h-12 w-36" />
        <Skeleton className="h-6 w-64" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead className="hidden md:table-cell">Evento</TableHead>
              <TableHead>Tipo de Ticket</TableHead>
              <TableHead className="hidden md:table-cell">
                approvalStatus
              </TableHead>
              <TableHead className="hidden md:table-cell">
                paymentStatusColor
              </TableHead>
              <TableHead className="hidden md:table-cell">
                redemptionStatusColor
              </TableHead>
              <TableHead className="hidden md:table-cell">Comprado</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((purchaseOrder) => (
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
      </Card>
    </div>
  );
};
