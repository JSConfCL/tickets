import { Attendees } from "./_components/Attendees/Attendees";
import { Hero } from "./_components/Hero/Hero";
import { Information } from "./_components/Information/Information";
import { Location } from "./_components/Location/Location";
import { Organizers } from "./_components/Organizers/Organizers";
import { Register } from "./_components/Register/Register";
import { event } from "./fixture";

export default function Event() {
  const { information, organizers, attendees, location } = event;

  return (
    <main className="flex w-full flex-col items-center justify-between gap-6 px-6 py-7 transition-all md:px-10 lg:pt-14">
      <div className="w-full">
        <Hero {...event} />
        <Register />
      </div>
      <Information information={information} />
      <Location location={location}/>
      <Organizers organizers={organizers} />
      <Attendees attendees={attendees} />
    </main>
  );
}

export const runtime = "edge";
