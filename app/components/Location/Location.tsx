// import { GoogleMapsEmbed } from "@next/third-parties/google";
// import { FC } from "react";

import type { LocationType } from "./types";

export const Location = ({ title, location }: LocationType) => {
  if (!location.address) {
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-4 bg-slate-900 p-6 dark:bg-slate-50">
      <h2 className="text-xl text-slate-50 md:text-4xl dark:text-slate-900">
        {title}
      </h2>
      {/* <GoogleMapsEmbed
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
        height={400}
        width="100%"
        mode="place"
        q="Los Jesuitas 881, 7501300 Providencia, Región Metropolitana"
      /> */}
      <p className="text-slate-50 dark:text-slate-900">{location.address}</p>
      <p className="text-slate-50 dark:text-slate-900">
        {location.information}
      </p>
    </section>
  );
};
