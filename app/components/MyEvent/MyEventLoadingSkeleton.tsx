import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="h-full p-6">
      <Skeleton className="mx-auto size-60 rounded-md" />
      <Skeleton className="mx-auto my-6 h-6 w-40" />
      <Skeleton className="h-6 w-full" />
      <Separator className="my-2" />
      <span className="flex flex-col gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </span>
      <Separator className="my-2" />
      <span className="flex flex-col gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </span>
      <div className="mt-4 flex items-end justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </Card>
  );
};

export const MyEventLoadingSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex basis-4/12 flex-col gap-2">
        <Skeleton className="h-20 w-full rounded-md bg-primary/10 lg:h-40" />
        <Skeleton className="h-12 w-36" />
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Separator className="my-2" />
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
    </div>
  );
};
