export const urls = {
  home: "/",
  profile: {
    root: "/profile",
  },
  events: {
    root: "/events",
    tickets: (id: string) => `/events/${id}/tickets`,
  },
  myEvents: {
    root: `/my-events`,
    details: (id: string) => `/my-events/${id}`,
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
