import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";

import { useSearchUsersQuery } from "~/components/Navbar/graphql/searchUsers.generated";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useAuthContext } from "~/utils/supabase/AuthProvider";

export const ImpersonationModal = ({
  isOpen,
  onStateChange,
}: {
  isOpen: boolean;
  onStateChange: (arg: boolean) => void;
}) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);
  const { setImpersonation } = useAuthContext();

  const columns: ColumnDef<{
    email: string | null;
    userName: string;
    id: string;
  }>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "userName",
        header: "User name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "impersonate",
        header: "Impersonate",
        cell: ({ row }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { impersonation } = useAuthContext();

          return (
            <Button
              size="sm"
              onClick={() => {
                setImpersonation({
                  userId: row.original.id,
                  userName: row.original.userName,
                });
                onStateChange(false);
              }}
            >
              {impersonation?.userId === row.id
                ? "Stop Impersonating"
                : "Impersonate"}
            </Button>
          );
        },
      },
    ],
    [onStateChange, setImpersonation],
  );

  const userQuery = useSearchUsersQuery({
    variables: {
      input: {
        search: {
          name: debouncedSearch,
        },
        pagination: {
          page,
          pageSize: 5,
        },
      },
    },
    skip: !debouncedSearch,
  });

  const pagination = useMemo(
    () => userQuery.data?.userSearch?.pagination,
    [userQuery.data?.userSearch?.pagination],
  );

  const data = useMemo(
    () =>
      userQuery.data?.userSearch?.data?.map((user) => ({
        id: user.id,
        userName: user.username,
        email: user.email ?? null,
      })) ?? [],
    [userQuery.data],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => onStateChange(open)} modal>
      <DialogContent className="max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Impersonate user</DialogTitle>
        </DialogHeader>
        <Separator />
        <DialogDescription className="flex flex-col gap-10">
          <Input
            placeholder="Search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {pagination && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();

                      if (page > 0) {
                        setPage(page - 1);
                      }
                    }}
                    href=""
                  />
                </PaginationItem>
                <PaginationItem>
                  {Array.from({ length: pagination.totalPages }).map(
                    (_, index) => (
                      <PaginationLink
                        isActive={page === index}
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(index);
                        }}
                        href=""
                        data-state={page === index && "selected"}
                      >
                        {index + 1}
                      </PaginationLink>
                    ),
                  )}
                </PaginationItem>
                <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();

                      if (pagination.totalPages - 1 > page) {
                        setPage(page + 1);
                      }
                    }}
                    href=""
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </DialogDescription>
        <Separator />
        <DialogFooter>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onStateChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
