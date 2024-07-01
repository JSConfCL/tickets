// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
// import { cookies } from "next/headers";

// import { COOKIE_NAME } from "@/utils/supabase/client";

// const { getClient } = registerApolloClient(() => {
//   const cookieValue = cookies().get(COOKIE_NAME)?.value ?? "";
//   const headers = cookieValue
//     ? {
//         headers: {
//           cookie: `${COOKIE_NAME}=${cookieValue}`,
//         },
//       }
//     : {};
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       // this needs to be an absolute url, as relative urls cannot be used in SSR
//       uri: VITE_JSCL_API_URL,
//       // fetch,
//       ...headers,
//     }),
//   });
// });

// export const getApolloClientForRSC = getClient;
