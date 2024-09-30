import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="flex h-full flex-col gap-6 p-6">
      <Skeleton className="mx-auto size-60 rounded-md" />
      <Skeleton className="mx-auto h-4 w-24" />
      <Skeleton className="mx-auto h-8 w-40" />
      <span className="flex flex-col gap-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </span>
    </Card>
  );
};

export const MyTicketsLoadingSkeleton = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      <div className="basis-full md:basis-1/3">
        <LoadingCard />
      </div>
      <div className="basis-full md:basis-1/3">
        <LoadingCard />
      </div>
      <div className="basis-full md:basis-1/3">
        <LoadingCard />
      </div>
    </div>
  );
};
