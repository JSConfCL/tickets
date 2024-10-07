import { Button } from "~/components/ui/button";
import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="mx-auto w-full max-w-[800px] md:p-4">
      <div>
        <Card className="mx-auto w-full max-w-md rounded-xl shadow-md lg:w-96">
          <CardTitle className="p-6 pb-4 text-xl font-semibold">
            Datos Básicos
          </CardTitle>
          <CardContent>
            <div className="grid w-full items-start gap-6 pt-0">
              <div className="grid space-y-2">
                <Label className="leading-5">Nombre</Label>
                <Skeleton className="mt-1 h-10 w-full" />
              </div>

              <div className="grid space-y-2">
                <Label className="leading-5">Apellido</Label>
                <Skeleton className="mt-1 h-10 w-full" />
              </div>

              <div className="grid space-y-2">
                <Label className="leading-5">Nombre de Usuario</Label>
                <Skeleton className="mt-1 h-10 w-full" />
              </div>
              <div className="flex flex-col justify-end gap-4 md:flex-row">
                <Button variant="secondary">Cancelar</Button>
                <Button className="">Guardar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export const MyProfileInfoLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <LoadingCard />
    </div>
  );
};
