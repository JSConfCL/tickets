import { MyTickets } from "~/components/MyTickets/MyTickets";
import { sharedLayoutStyle } from "~/components/sharedLayouts";

export default function Layout() {
  return (
    <div className={sharedLayoutStyle}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Mis Tickets</h1>
        <MyTickets />
      </div>
    </div>
  );
}
