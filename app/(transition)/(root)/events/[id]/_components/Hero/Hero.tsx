// import { FC } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid'

// export const Hero = ({ name, image, organizer, datime, location }) => (
export const Hero = () => (
  <section className={`flex h-80 w-full place-items-end bg-[url('https://www.slingacademy.com/wp-content/uploads/2022/10/hero-image-example.webp')] md:h-96`}>
    <div className="mx-auto flex w-full max-w-screen-xl px-4 py-8 md:grid-cols-12 lg:gap-8 xl:gap-0">
      <div className="mr-auto flex w-full flex-col place-self-center">
        <h1 className="mb-4 max-w-2xl text-2xl font-extrabold leading-none tracking-tight dark:text-white md:text-4xl">
          Javascript Meetup — Enero
        </h1>
        <div className="flex w-full justify-between">
          <div className="flex grow flex-col">
            <p className='font-thin'>por <span className='underline'>Javascript Chile</span></p>
            <p className='font-thin'>Jueves, 27 Enero, 2024 | 6:30 PM</p>
          </div>
          <div className="hidden md:flex md:max-w-xs md:items-center md:gap-2">
            <MapPinIcon className="h-8 w-8" />
            <p>
              Hub Providencia, Calle Falsa, 1234, Santiago
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
