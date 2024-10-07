import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="mx-auto w-full max-w-[460px] p-4">
      <div className="flex flex-col items-center gap-8">
        <Avatar className="aspect-square size-24">
          <AvatarFallback className="text-4xl uppercase" />
        </Avatar>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Separator className="sm:max-w-md" />
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
      </div>
    </Card>
  );
};
export const MyProfileLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <LoadingCard />
    </div>
  );
};
