export default function Home() {
  return (
    <main className="flex max-w-5xl flex-col items-center justify-between px-6 pt-36 transition-all md:px-10 md:pt-44 xl:px-0 xl:pt-52">
      <div className="flex flex-col gap-16 pb-4">
        <h1 className="flex flex-col justify-start gap-7 text-left text-6xl font-extrabold shadow-slate-900 transition-all text-shadow sm:text-7xl xl:text-8xl">
          <span>418</span>
          <span>I&apos;m a Teapot</span>
        </h1>
        <p className="text-xl shadow-slate-900 text-shadow-sm md:text-2xl xl:text-3xl">
          418 livestream bi-semanal, de discusión y consejos en el area de
          Desarrollo, e Ingenería de Software.
        </p>
      </div>
      <div className="flex flex-col gap-4"></div>
    </main>
  );
}
