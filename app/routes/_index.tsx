import { Link } from "@remix-run/react";

import { CommunityOS } from "~/components/Icons/communityos";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/utils";

export default function Index() {
  return (
    <div className="flex grow items-center justify-center p-6">
      <div className="relative mx-auto p-6 text-white md:p-24 xl:p-32">
        <div className="relative z-10">
          <h1 className="mb-8" aria-label="Community OS">
            <CommunityOS className="mx-auto text-center" />
          </h1>
          <h2 className="mb-4 text-center font-cal text-5xl md:text-8xl xl:text-9xl">
            Tickets
          </h2>
          <p className="text-center leading-6 md:text-xl">
            Conoce <strong className="font-cal">Tickets</strong>. La
            infraestructura de gestión de eventos de código abierto para
            comunidades modernas.
          </p>
          <p className="mb-4 text-center leading-6 md:text-xl">
            Enfocate en hacer tu evento increíble, mientras nosotros nos
            encargamos de la parte molesta.
          </p>
          <p className="text-center font-cal leading-6 md:text-xl">
            De la comunidad, para la comunidad.
          </p>
          <div className="mt-8 flex flex-col-reverse justify-center gap-4 text-center leading-6 md:flex-row md:text-xl">
            <a
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white bg-black text-white",
              )}
              href="https://communityos.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactar
            </a>
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-[#F0E040] bg-black text-white",
              )}
              to="https://tickets.communityos.io/events/7dfe393e-7c8f-4d5c-903d-aa65e28e4227/tickets"
            >
              JSConf 2024
            </Link>
            <span className="cursor-not-allowed">
              <Button
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "border-black bg-white text-black",
                )}
                disabled
              >
                Eventos
              </Button>
            </span>
            {/* <Link
              className={cn(
                buttonVariants(),
                "border-black bg-white text-black",
              )}
              to={urls.events.root}
            >
              Eventos
            </Link> */}
          </div>
        </div>
        <BackgroundBeams className="rounded-2xl bg-[#09090b]" />
      </div>
    </div>
  );
}
