import { useMatch, useSearchParams } from "@remix-run/react";

import { useIsSafariMobileWebview } from "~/components/useIsSafariMobile";
import { urls } from "~/utils/urls";

export function useGetLoginURL() {
  const isSafariMobileWebview = useIsSafariMobileWebview();
  const [search] = useSearchParams();

  const matches = useMatch({
    path: "/events/:eventId/tickets",
  });

  const searchParams = new URLSearchParams(search);

  const url = new URL(window.location.href);

  if (isSafariMobileWebview && matches) {
    const { eventId } = matches.params;

    if (eventId) {
      const coupon = search.get("coupon") ?? undefined;

      url.pathname = urls.events.tickets(eventId);

      if (coupon) {
        searchParams.set("coupon", coupon);
        url.search = searchParams.toString();
      }

      console.info("x-safari-", url.toString());

      return `x-safari-${url.toString()}`;
    }
  } else {
    url.pathname = urls.login;
    // searchParams.set("redirectTo", encodeURIComponent(window.location.href));
    url.search = searchParams.toString();
  }

  console.info(url.toString());

  return url.toString();
}
