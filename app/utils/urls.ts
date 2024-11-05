export const urls = {
  home: "/",
  profile: {
    root: "/profile",
    editInfo: "/profile/info",
  },
  events: {
    root: "/events",
    tickets: (id: string) => `/events/${id}/tickets`,
  },
  myEvents: {
    root: `/my-events`,
    details: (id: string) => `/my-events/${id}`,
  },
  myOrders: {
    root: "/my-orders",
    callback: "/my-orders/callback",
  },
  myTransfers: "/my-transfers",
  comunidades: "/comunidades",
  tickets: {
    root: "/tickets",
    ticket: (ticketId: string) => `/ticket/:${ticketId}`,
  },
  public: {
    po: (purchaseOrderId: string, eventUrl = "/public") =>
      `${eventUrl}/po/${purchaseOrderId}`,
    ticket: (ticketId: string, eventUrl = "/public") =>
      `${eventUrl}/ticket/${ticketId}`,
  },
  login: "/login",
};
