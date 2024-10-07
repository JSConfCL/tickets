import { Link } from "@remix-run/react";

import { useMyProfileSuspenseQuery } from "~/components/Profile/graphql/myProfile.generated";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { urls } from "~/utils/urls";

export const MyProfile = () => {
  const { data } = useMyProfileSuspenseQuery();

  return (
    <Card className="mx-auto w-full max-w-[460px] p-4">
      <div className="flex flex-col items-center gap-8">
        <Avatar className="aspect-square size-24">
          <AvatarImage src={data.me.imageUrl ?? undefined} />
          <AvatarFallback className="text-4xl uppercase">
            {data.me.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-1">
          <span>
            {data.me.name} {data.me.name && data.me.lastName}
          </span>
          <span className="break-all">@{data.me.username}</span>
          <span className="break-all">{data.me.email}</span>
        </div>
        <Separator className="sm:max-w-md" />
        <div className="w-full">
          <ul className="flex flex-col gap-2">
            {[
              ["Configuración", urls.profile.editInfo],
              ["Mis Ordenes de Compra", urls.myOrders.root],
              ["Mis eventos", urls.myEvents.root],
            ].map(([text, link], index) => (
              <li key={index}>
                <Link to={link} className="text-base underline">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
