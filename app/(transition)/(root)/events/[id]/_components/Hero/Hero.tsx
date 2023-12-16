import { FC } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { HeroTypes } from './types';

export const Hero: FC<HeroTypes> = ({ name, organizer, datetime, location }) => {
  return (
    <section className={`flex h-80 w-full place-items-end bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat md:h-96`}>
      <div className='flex h-full w-full flex-col justify-end bg-slate-100/75 dark:bg-slate-900/75'>
        <div className="mx-auto flex w-full max-w-screen-xl px-4 py-8 md:grid-cols-12 lg:gap-8 xl:gap-0">
          <div className="mr-auto flex w-full flex-col place-self-center">
            <h1 className="mb-4 max-w-2xl text-xl font-extrabold leading-none tracking-tight dark:text-white md:text-4xl">
              {name}
            </h1>
            <div className="flex w-full justify-between">
              <div className="flex grow flex-col">
                <p className='font-thin'>por <span className='underline'>{organizer}</span></p>
                <p className='font-thin'>{datetime}</p>
              </div>
              <div className="hidden md:flex md:max-w-xs md:items-center md:gap-2">
                <MapPinIcon className="h-8 w-8" />
                <p>
                  {location?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
