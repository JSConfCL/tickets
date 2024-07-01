import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TicketsSaleFlowSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="text-center text-5xl font-extrabold">
        <span className="inline-flex flex-wrap items-center justify-center gap-4">
          <Skeleton className="h-12 w-44" />
          <Skeleton className="h-12 w-20" />
          <Skeleton className="h-12 w-72" />
        </span>
      </h1>
      <div>
        <Skeleton className="h-10 w-48" />
        <Card className="flex flex-col gap-4 p-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-72" />
        </Card>
        <Card className="flex flex-col gap-4 p-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-96" />
        </Card>
        <Card className="flex flex-col gap-4 p-4">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-72" />
        </Card>
      </div>
    </div>
  );
};
