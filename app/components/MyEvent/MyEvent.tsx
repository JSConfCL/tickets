import { Calendar, ExternalLink, MapPin } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import { TicketApprovalStatus } from "~/api/gql/graphql";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { formatDate, formatTime } from "~/utils/date";
import { cn } from "~/utils/utils";

import { useClaimUserTicketAddonsMutation } from "./graphql/claimUserTicketAddons.generated";
import {
  MyEventQuery,
  useMyEventSuspenseQuery,
} from "./graphql/myEvent.generated";
import {
  MyEventAddonsQuery,
  useMyEventAddonsSuspenseQuery,
} from "./graphql/myEventAddons.generated";
import { TicketCard } from "./TicketCard";

type Event = MyEventQuery["searchEvents"]["data"][0];
type Addon = MyEventAddonsQuery["searchAddons"][0];
type UserTicket = Event["usersTickets"][0];

export const MyEvent = ({ id }: { id: string }) => {
  const { data } = useMyEventSuspenseQuery({
    variables: {
      input: {
        search: {
          id,
        },
        pagination: {
          page: 0,
          pageSize: 10,
        },
      },
    },
  });
  const { data: addonsData } = useMyEventAddonsSuspenseQuery({
    variables: { eventId: id },
  });
  const event: Event = data.searchEvents.data[0];
  const addons = addonsData?.searchAddons || [];
  const tickets = event?.usersTickets;
  const parsedDate = new Date(event.startDateTime as string);
  const formattedDate = formatDate(parsedDate);
  const formattedTime = formatTime(parsedDate);
  const formatedAddress = event.address;
  const [
    claimUserTicketAddonMutation,
    {
      data: wasCalledClaimUserTicketAddonMutation,
      loading: isLoadingClaimUserTicketAddonMutation,
    },
  ] = useClaimUserTicketAddonsMutation();

  const registerAddon = useCallback(
    async ({
      addonId,
      userTicketId,
      quantity,
    }: {
      addonId: string;
      userTicketId: string;
      quantity: number;
    }) => {
      await claimUserTicketAddonMutation({
        variables: {
          addonsClaims: [{ addonId, userTicketId, quantity }],
        },
        onCompleted(data) {
          // Redirect to payment page
          if (
            data.claimUserTicketAddons.__typename ===
            "RedeemUserTicketAddonsError"
          ) {
            toast.error(data.claimUserTicketAddons.errorMessage);
          } else if (
            data.claimUserTicketAddons.__typename === "PurchaseOrder"
          ) {
            toast("Tu registro fue exitoso.");
            setTimeout(() => {
              window?.location.reload();
            }, 2000);
          } else {
            toast.error(
              "Ocurrió un error al intentar comprar tus tickets. Por favor intenta de nuevo.",
            );
          }
        },
        onError() {
          toast.error(
            "Ocurrió un error al intentar comprar tus tickets. Por favor intenta de nuevo.",
          );
        },
      });
    },
    [claimUserTicketAddonMutation],
  );

  const canGetAddon = useCallback(
    (addon: Addon, ticket: UserTicket) => {
      const ticketTemplateId = ticket.ticketTemplate.id;
      const ticketAddon = addon.ticketAddons.find(
        (ticketAddon) => ticketAddon.ticketId === ticketTemplateId,
      );

      if (!ticketAddon) {
        return false;
      }

      if (ticket.userTicketAddons.length === 0) {
        return true;
      }

      const constraints: Record<string, boolean> = {};

      addon.constraints.forEach((constraint) => {
        if (constraint.addonId === addon.id) {
          constraints[constraint.relatedAddonId] = true;
          constraints[constraint.addonId] = true;
        }
      });

      return !ticket.userTicketAddons.some(
        (userTicketAddon) =>
          constraints[userTicketAddon.addonId] ||
          userTicketAddon.addonId == addon.id,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addons, tickets],
  );

  return (
    <div className="flex flex-col gap-12">
      {!event ? (
        <div className="text-center text-gray-400">
          El evento que buscas no existe
        </div>
      ) : null}

      {event ? (
        <div className="flex w-full flex-col gap-6">
          <div className="flex basis-4/12 flex-col gap-6">
            <div
              className={cn(
                "mx-auto h-20 w-full rounded-md bg-primary/10 lg:h-40",
                event.bannerImage?.url ? "bg-cover bg-center" : "",
              )}
              style={
                event.bannerImage?.url
                  ? { backgroundImage: `url(${event.bannerImage?.url})` }
                  : {}
              }
            />
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="text-base text-muted-foreground">
              {event.description}
            </p>
            <div className="flex flex-col gap-3 font-medium">
              {formatedAddress ? (
                <a
                  href={encodeURI(
                    `https://www.google.com/maps/search/${formatedAddress}?source=opensearch`,
                  )}
                  target="_blank"
                  className="flex flex-row items-center gap-2.5 text-sm"
                  rel="noreferrer"
                >
                  <MapPin className="size-6" />
                  {formatedAddress}
                  <ExternalLink className="size-6" />
                  <span className="sr-only">Ver en Google Maps</span>
                </a>
              ) : null}
              <div className="flex flex-row items-center gap-2.5 text-sm">
                <Calendar className="size-6" />
                {[formattedDate, formattedTime].filter(Boolean).join(" - ")}
              </div>
            </div>
          </div>

          <Tabs defaultValue="tickets">
            <TabsList className="mb-2 grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="tickets">Entradas</TabsTrigger>
              <TabsTrigger value="extras">Extras</TabsTrigger>
            </TabsList>
            <TabsContent value="tickets">
              <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                {tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    event={event}
                    ticket={ticket}
                    addons={addons}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="extras">
              <div className="mx-auto max-w-[900px] space-y-4">
                {addons.map((addon) => {
                  const ticket = tickets
                    .filter((tmpTicket) =>
                      [
                        TicketApprovalStatus.Approved,
                        TicketApprovalStatus.TransferAccepted,
                        TicketApprovalStatus.NotRequired,
                      ].includes(tmpTicket.approvalStatus),
                    )
                    .find((tmpTicket) => canGetAddon(addon, tmpTicket));

                  return (
                    <div
                      className="flex flex-row justify-between"
                      key={addon.id}
                    >
                      <div>
                        <div className="font-bold">{addon.name}</div>
                        <div className="text-muted-foreground">
                          {addon.description}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <Button
                          disabled={
                            (ticket && !canGetAddon(addon, ticket)) ||
                            isLoadingClaimUserTicketAddonMutation ||
                            Boolean(wasCalledClaimUserTicketAddonMutation)
                          }
                          onClick={() => {
                            if (!ticket) {
                              return;
                            }

                            const ticketTemplateId = ticket.ticketTemplate.id;
                            const ticketAddon = addon.ticketAddons.find(
                              (ticketAddon) =>
                                ticketAddon.ticketId === ticketTemplateId,
                            );

                            if (ticketTemplateId && ticketAddon?.id) {
                              void registerAddon({
                                addonId: addon.id,
                                userTicketId: ticket.id,
                                quantity: 1,
                              });
                            }
                          }}
                        >
                          Registarme
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
};
