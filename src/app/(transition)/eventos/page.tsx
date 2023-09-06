import Card from "@/components/Card/Card";

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
    <main className="container">
      <h1 className="text-5xl font-extrabold my-6 ">Próximos Eventos</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card eventInfo={sampleEventInfo} isAdmin={false} />
        <Card eventInfo={sampleEventInfo} isAdmin={true} />
        <Card eventInfo={sampleEventInfo} isAdmin={true} />
        <Card eventInfo={sampleEventInfo} isAdmin={true} />
      </section>
    </main>
  );
}

export const runtime = "edge";
