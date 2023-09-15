"use client";
import Link from "next/link";
import IconCalendar from "./IconCalendar";
import IconClock from "./IconClock";
import IconEdit from "./IconEdit";
import IconParticipant from "./IconsParticipant";
import IconMap from "./IconMap";

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

export const EventCard: React.FC<CardProps> = ({ eventInfo, isAdmin }) => {
  const { theme } = useTheme(); // Get the current theme
  const darkMode = theme === "dark";

  return (
    <Link
      className={`grid grid-cols-2 gap-4 rounded overflow-hidden shadow-lg ${
        darkMode ? "shadow-custom-dark" : "shadow-lg"
      }`}
      href={`/detalle-evento/${eventInfo.id}`}
    >
      <div className="col-span-1 sm:row-span-3 bg-gradient-to-t from-[#dcf2f2] via-white to-white">
        {isAdmin && (
          <div className="flex justify-center items-end h-full w-full pb-4">
            <Link className="flex" href={`/editar-evento/${eventInfo.id}`}>
              <span>
                <IconEdit darkMode={darkMode} />
              </span>

              <p
                className={`ml-2 ${
                  darkMode ? "text-black" : "dark:text-white"
                }`}
              >
                Editar evento
              </p>
            </Link>
          </div>
        )}
      </div>
      <div className="col-span-1  my-4">
        <h2 className="font-bold pr-4">{eventInfo.title}</h2>
        <p className="text-sm pr-4">{eventInfo.description}</p>
      </div>
      <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1">
        <ul className="pl-4 pb-4 lg:pl-0 lg:pb-0">
          <li className="flex gap-2">
            <span>
              <IconCalendar />
            </span>
            <p>{eventInfo.date}</p>
          </li>
          <li className="flex gap-2">
            <span>
              <IconClock />
            </span>
            <p>{eventInfo.time}</p>
          </li>
          <li className="flex gap-2">
            <span>
              <IconMap />
            </span>
            <p>{eventInfo.location}</p>
          </li>
          <li className="flex gap-2">
            <span>
              <IconParticipant />
            </span>
            <p>{eventInfo.participants} participantes</p>
          </li>
        </ul>
      </div>
    </Link>
  );
};
