import { FC } from "react";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { LocationType } from "./types";

export const Location: FC<LocationType> = ({ title, location, className }) => {
  return (
    <section
      className={`flex w-full flex-col gap-4 bg-slate-900 p-6 dark:bg-slate-50 ${
        className ?? ""
      }`}
    >
      <h2 className="text-xl text-slate-50 dark:text-slate-900 md:text-4xl">
        {title}
      </h2>
      <GoogleMapsEmbed
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        height={400}
        width="100%"
        mode="place"
        q="Los Jesuitas 881, 7501300 Providencia, Región Metropolitana"
      />
      <p className="text-slate-50 dark:text-slate-900">{location?.address}</p>
      <p className="text-slate-50 dark:text-slate-900">
        {location?.information}
      </p>
    </section>
  );
};
