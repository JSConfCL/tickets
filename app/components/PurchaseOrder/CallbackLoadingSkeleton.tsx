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

const TableRowSkeletonTicket = () => (
  <TableRow>
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
);

const MobileSkeletonTicket = () => (
  <Card className="w-full p-0">
    <CardContent className="flex flex-col gap-2 p-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="mt-2 h-8 w-32" />
    </CardContent>
  </Card>
);

export const CallbackLoadingSkeleton = () => {
  const tickets = Array.from({ length: 5 }).map((_, index) => index);

  return (
    <div className="mx-auto flex w-full max-w-[856px] flex-col gap-9">
      <div className="flex basis-4/12 flex-col gap-4">
        <Skeleton className="mx-auto h-40 w-60 rounded-md" />
        <Skeleton className="mx-auto h-16 w-full rounded-md" />
        <Card className="hidden sm:block">
          <CardContent className="pb-2">
            <h2 className="mt-4 text-2xl font-bold leading-[52px]">
              Entrada General
            </h2>
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
                  <TableRowSkeletonTicket key={ticket} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-8 sm:hidden">
          <h2 className="mt-4	text-2xl font-bold leading-[52px]">
            Entrada General
          </h2>
          <div className="space-y-4">
            {tickets.map((ticket: number) => (
              <MobileSkeletonTicket key={ticket} />
            ))}
          </div>
          <div className="mt-12 flex justify-between gap-2">
            <div className="text-lg font-bold uppercase">Total a Pagar</div>
            <div className="text-lg font-bold">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
        <div className="mt-2 flex w-full flex-col justify-end gap-2 md:flex-row">
          <Skeleton className="h-8 w-full md:w-32" />
          <Skeleton className="h-8 w-full md:w-32" />
        </div>
      </div>
    </div>
  );
};
