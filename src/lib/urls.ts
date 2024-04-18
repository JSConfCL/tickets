import { root } from "postcss";

export const urls = {
  home: "/",
  eventos: {
    root: "/eventos",
    evento: (id: string) => `/eventos/${id}`,
    tickets: (id: string) => `/eventos/${id}/tickets`,
  },
  comunidades: "/comunidades",
  login: "/login",
};
