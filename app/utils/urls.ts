export const urls = {
  home: "/",
  events: {
    root: "/eventos",
    evento: (id: string) => `/eventos/${id}`,
    tickets: (id: string) => `/eventos/${id}/tickets`,
    myTickets: (id: string) => `/eventos/${id}/my-tickets`,
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
