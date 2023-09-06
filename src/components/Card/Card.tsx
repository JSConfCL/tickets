"use client";
import IconCalendar from "./IconCalendar";
import IconClock from "./IconClock";
import IconEdit from "./IconEdit";
import IconMap from "./IconMap";
import IconParticipant from "./IconsParticipant";

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

const Card: React.FC<CardProps> = ({ eventInfo, isAdmin }) => {
  const handleEditClick = () => {
    // Manage the click to edit
  };

  return (
    <article className="grid grid-cols-2 gap-4 rounded overflow-hidden shadow-lg">
      <div className="col-span-1 sm:row-span-3 bg-gradient-to-t from-[#dcf2f2] via-white to-white">
        {isAdmin && (
          <button
            className="flex justify-center items-end h-full w-full pb-4"
            onClick={handleEditClick}
          >
            <IconEdit />
            <p className="ml-2">Editar evento</p>
          </button>
        )}
      </div>
      <div className="col-span-1  my-4">
        <h2 className="font-bold pr-4">{eventInfo.title.slice(0, 50)}</h2>
        <p className="text-sm pr-4">{eventInfo.description.slice(0, 120)}</p>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <ul className="space-y-4 pb-4 pl-4 sm:pl-0 sm:pb-0">
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
    </article>
  );
};

export default Card;
