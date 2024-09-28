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
    <div className="mx-auto flex w-full max-w-[1076px] flex-col gap-9">
      <div className="flex flex-col gap-9">
        <Skeleton className="mx-auto h-20 w-full rounded-md md:h-40" />
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-16 w-48" />
            <Skeleton className="h-8 w-96" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-t hover:bg-transparent">
                  <TableHead className="h-[52px] w-[200px] text-center text-base font-bold text-white">
                    Tipo de Ticket
                  </TableHead>
                  <TableHead className="h-[52px] text-center text-base font-bold text-white">
                    Descripción
                  </TableHead>
                  <TableHead className="h-[52px] w-[100px] grow-0 text-center text-base font-bold text-white">
                    Cantidad
                  </TableHead>
                  <TableHead className="h-[52px] w-[150px] text-center text-base font-bold text-white">
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
