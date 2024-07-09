import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="flex w-full max-w-2xl flex-col gap-3 bg-gray-900/40 p-5">
      <div className="flex flex-col gap-1 text-xs text-gray-400">
        <span className="flex items-center gap-1 capitalize">
          <Skeleton className="h-3 w-40" />
          {/* -
          <Skeleton className="h-3 w-4" />
          <Skeleton className="h-3 w-4" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" /> */}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <Skeleton className="h-3 w-20" />
          {/* -
          <Skeleton className="h-3 w-4" />
          <Skeleton className="h-3 w-4" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" /> */}
        </span>
      </div>
      <Skeleton className="h-8 w-36" />
      <div>
        <Button asChild variant="secondary">
          <Skeleton className="h-9 w-32" />
        </Button>
      </div>
    </Card>
  );
};
export const MyTicketsLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
};
