"use client";

import Link from "next/link";
import { Settings, CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { useTheme } from "next-themes";

interface EventInfo {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  imageUrl: string;
}

interface CardProps {
  eventInfo: EventInfo;
  isAdmin?: boolean;
}

const EventCard: React.FC<CardProps> = ({ eventInfo, isAdmin }) => {
  const { theme } = useTheme(); // Get the current theme
  const darkMode = theme === "dark";

  return (
    <Link
      className={`grid grid-cols-2 gap-4 overflow-hidden rounded shadow-lg ${
        darkMode ? "shadow-custom-dark" : "shadow-lg"
      }`}
      href={`/detalle-evento/${eventInfo.id}`}
    >
      <div className="col-span-1 bg-gradient-to-t from-[#dcf2f2] via-white to-white sm:row-span-3">
        {isAdmin && (
          <div className="flex h-full w-full items-end justify-center pb-4">
            <Link className="flex" href={`/editar-evento/${eventInfo.id}`}>
              <span>
                <Settings className="text-black" width="24px" />
              </span>

              <a className="text-black">Editar evento</a>
            </Link>
          </div>
        )}
      </div>
      <div className="col-span-1  my-4">
        <h2 className="pr-4 font-bold">{eventInfo.title}</h2>
        <p className="pr-4 text-sm">{eventInfo.description}</p>
      </div>
      <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1">
        <ul className="pb-4 pl-4 lg:pb-0 lg:pl-0">
          <li className="flex gap-2">
            <span>
              <CalendarDays width="24px" />
            </span>
            <p>{eventInfo.date}</p>
          </li>
          <li className="flex gap-2">
            <span>
              <Clock3 width="24px" />
            </span>
            <p>{eventInfo.time}</p>
          </li>
          <li className="flex gap-2">
            <span>
              <MapPin width="24px" />
            </span>
            <p>{eventInfo.location}</p>
          </li>
          <li className="flex gap-2">
            <span>
              <Users width="24px" />
            </span>
            <p>{eventInfo.participants} participantes</p>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default EventCard;
