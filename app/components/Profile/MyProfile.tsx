import { Link } from "@remix-run/react";

import { useMyProfileSuspenseQuery } from "~/components/Profile/graphql/myProfile.generated";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";

export const MyProfile = () => {
  const { data } = useMyProfileSuspenseQuery();

  return (
    <div className="flex flex-col items-center gap-10">
      <Avatar className="aspect-square size-36">
        <AvatarImage src={data.me.imageUrl ?? undefined} />
        <AvatarFallback className="text-4xl uppercase">
          {data.me.username.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-2">
        <span>
          {data.me.name} {data.me.name && data.me.lastName}
        </span>
        <span className="break-all">
          @{data.me.username} — {data.me.email}
        </span>
      </div>
      <Separator className="sm:max-w-md" />
      <div>
        <ul className="flex flex-col gap-2">
          {[
            ["Mis Ordenes de Compra", "/my-purchase-orders"],
            ["Mis eventos", "/my-events"],
          ].map(([text, link], index) => (
            <li key={index}>
              <Link to={link} className="text-lg underline">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator className="sm:max-w-md" />
      <div>
        <ul className="flex flex-col gap-2">
          {[
            [
              "Código de conducta",
              "https://github.com/CommunityOS/code_of_conduct/blob/main/README.md",
            ],
            [
              "Términos y condiciones",
              "https://github.com/CommunityOS/code_of_conduct/blob/main/terminos_de_compra_e_imagen/README.md",
            ],
            [
              "Política de privacidad",
              "https://github.com/CommunityOS/code_of_conduct/tree/main/politica_de_privacidad/README.md",
            ],
            [
              "Terminos de servicio",
              "https://github.com/CommunityOS/code_of_conduct/blob/main/terminos_de_servicio/README.md",
            ],
          ].map(([text, link], index) => (
            <li key={index}>
              {/* terms and conditions */}
              <span className="text-sm text-gray-500">
                <a href={link} className="underline">
                  {text}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
