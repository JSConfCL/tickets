"use client";
import React from "react";
import { useFetchExampleEventsQuery } from "./graphql/FetchExampleEvents.generated";

export const LandingPageEvents = () => {
  const events = useFetchExampleEventsQuery();
  return (
    <>
      {events?.data?.events.map((event) => (
        <div key={event.id}>{event.id}</div>
      ))}
    </>
  );
};
