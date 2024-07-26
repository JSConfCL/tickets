import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="flex w-full flex-col gap-3 bg-gray-900/40 p-5">
      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="mx-auto h-40 w-full rounded-md md:mx-0 md:h-auto md:w-60" />
        <div className="flex basis-full flex-col gap-1">
          <div className="flex flex-col gap-1 text-xs text-gray-400">
            <span className="flex items-center gap-1 capitalize">
              <Skeleton className="h-3 w-40" />
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Skeleton className="h-3 w-20" />
            </span>
          </div>
          <Skeleton className="h-8 w-36" />
          <div>
            <Button asChild variant="secondary">
              <Skeleton className="h-9 w-32" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
export const MyTicketsLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="basis-3/12 justify-end">
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="flex basis-9/12 flex-col gap-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
};
