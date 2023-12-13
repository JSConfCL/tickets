import { GoogleMapsEmbed } from '@next/third-parties/google'

export const Location = () => {
  return (
    <section className="flex w-full flex-col gap-2 bg-slate-900 p-6 dark:bg-slate-50">
      <h2 className='text-xl text-slate-50 dark:text-slate-900 md:text-4xl'>Lugar</h2>
      <GoogleMapsEmbed
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        height={400}
        width="100%"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      />
      <p className='text-slate-50 dark:text-slate-900'>
        Hub Providencia, Calle Falsa, 1234, Santiago Centro, Santiago, Chile.
      </p>
      <p className='text-slate-50 dark:text-slate-900'>
        Más descripción de como llegar al evento. Tocar la puerta X, subir por las escaleras de la derecha, etc.
      </p>
    </section>
  );
};

