import { EventCard } from "@/components/Card/EventCard";

const sampleEventInfo = {
  id: "1",
  title: "NodeSchool Santiago",
  description:
    "NodeSchool Santiago es un meetup dedicado a ayudar a la gente a aprender JavaScript y Node.js",
  date: "Sábado, 12 de Agosto, 2023",
  time: "10:00 am, Santiago, Chile",
  location: "El canelo 2715",
  participants: 70,
  imageUrl: "URL_de_la_imagen_del_evento",
};

// Uso de la componente Card con datos de muestra

export default function Eventos() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-5xl font-extrabold my-6 ">Próximos Eventos</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <EventCard eventInfo={sampleEventInfo} isAdmin={false} />
        <EventCard eventInfo={sampleEventInfo} isAdmin={true} />
        <EventCard eventInfo={sampleEventInfo} isAdmin={true} />
        <EventCard eventInfo={sampleEventInfo} isAdmin={true} />
      </section>
    </main>
  );
}

export const runtime = "edge";
