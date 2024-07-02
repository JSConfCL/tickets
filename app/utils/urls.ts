export const urls = {
  home: "/",
  eventos: {
    root: "/eventos",
    evento: (id: string) => `/eventos/${id}`,
    tickets: (id: string) => `/eventos/${id}/tickets`,
  },
  ordenes: {
    root: "/ordenes",
    orden: (id: string) => `/ordenes/${id}`,
    tickets: (id: string) => `/ordenes/${id}/tickets`,
  },
  comunidades: "/comunidades",
  login: "/login",
};
