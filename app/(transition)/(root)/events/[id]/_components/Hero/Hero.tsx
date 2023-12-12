export const Hero = () => (
  <section className="flex h-96 w-full place-items-end bg-[url('https://www.slingacademy.com/wp-content/uploads/2022/10/hero-image-example.webp')]">
    <div className="mx-auto grid w-full max-w-screen-xl px-4 py-8 md:grid-cols-12 lg:gap-8 xl:gap-0">
      <div className="mr-auto place-self-center md:col-span-7">
        <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white">
          Javascript Meetup — Enero
        </h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>por Javascript Chile</p>
            <p>Jueves, 27 Enero, 2024 | 6:30 PM</p>
          </div>
          <div className="hidden max-w-xs md:block">
            <p>
              Hub Providencia, Calle Falsa, 1234, Santiago
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
