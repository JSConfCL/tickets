import { useMyProfileSuspenseQuery } from "~/components/Profile/graphql/myProfile.generated";

export const MyProfile = () => {
  const { data } = useMyProfileSuspenseQuery();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl">Información personal</h2>
        <div className="flex items-center gap-4">
          <span>Nombre:</span>
          <span>
            {data.me.name} {data.me.lastName && data.me.lastName}
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-xl">Información de contacto</h2>
        <div className="flex items-center gap-4">
          <span>Email:</span>
          <span>{data.me.email}</span>
        </div>
      </div>
    </div>
  );
};
