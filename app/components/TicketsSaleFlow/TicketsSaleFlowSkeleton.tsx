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

export const TicketsSaleFlowSkeleton = () => {
  const tickets = Array.from({ length: 5 }).map((_, index) => index);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex basis-4/12 flex-col gap-2">
        <Skeleton className="mx-auto h-20 w-full rounded-md md:h-40" />
        <div className="flex w-full justify-end">
          <Skeleton className="h-8 w-24" />
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-center font-cal text-lg ">
                    Tipo de Ticket
                  </TableHead>
                  <TableHead className="text-center font-cal text-lg">
                    Descripción
                  </TableHead>
                  <TableHead className="w-[200px] text-center font-cal text-lg">
                    Cantidad
                  </TableHead>
                  <TableHead className="w-[150px] text-center font-cal text-lg">
                    Precio
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket: number) => (
                  <TableRow key={ticket}>
                    <TableCell className="p-4 text-center">
                      <Skeleton className="mx-auto h-4 w-24" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="mx-auto h-4 w-96" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="mx-auto h-4 w-12" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="mx-auto h-4 w-24" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="flex w-full flex-col justify-end gap-2 md:flex-row">
          <Skeleton className="h-8 w-full md:w-32" />
          <Skeleton className="h-8 w-full md:w-32" />
        </div>
      </div>
    </div>
  );
};
