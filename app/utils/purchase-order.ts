import { PurchaseOrder, Ticket } from "~/api/gql/graphql";

interface TicketSummary {
  ticket: Ticket;
  count: number;
}

export const groupedTickets = (
  purchaseOrder: PurchaseOrder,
): TicketSummary[] => {
  return Object.values(
    purchaseOrder.tickets.reduce(
      (acc, ticket) => {
        const currentTicketHash: TicketSummary = acc[
          ticket.ticketTemplate.id
        ] ?? { count: 0, ticket: ticket.ticketTemplate };

        currentTicketHash.count++;

        return { ...acc, [ticket.ticketTemplate.id]: currentTicketHash };
      },
      {} as Record<string, TicketSummary>,
    ),
  );
};
