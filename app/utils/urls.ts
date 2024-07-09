export const urls = {
  home: "/",
  events: {
    root: "/eventos",
    tickets: (id: string) => `/eventos/${id}/tickets`,
  },
  myEvents: {
    root: `/my-events`,
    myTickets: (id: string) => `/my-events/${id}/my-tickets`,
  },
  ordenes: {
    root: "/ordenes",
    orden: (id: string) => `/ordenes/${id}`,
    tickets: (id: string) => `/ordenes/${id}/tickets`,
  },
  comunidades: "/comunidades",
  tickets: {
    root: "/tickets",
    ticket: (ticketId: string) => `/ticket/:${ticketId}`,
  },
  login: "/login",
};
