export default function Pregunta() {
  return (
    <main className="flex max-w-5xl flex-col items-center justify-between px-6 pt-36 transition-all md:px-10 md:pt-44 xl:px-0 xl:pt-52">
      <div className="flex flex-col gap-16 pb-4">
        <h1 className="flex flex-col justify-start gap-7 text-left text-4xl font-extrabold shadow-slate-900 transition-all text-shadow sm:text-5xl xl:text-6xl">
          <span>Preguntanos lo que sea!</span>
        </h1>
        <p className="text-lg shadow-slate-900 text-shadow-sm md:text-xl xl:text-2xl">
          Tu pregunta será anonimizada (o como tu prefieras) y respondidas
          durante el livestream.
        </p>
      </div>
    </main>
  );
}
