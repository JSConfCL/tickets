/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { posthog } from "posthog-js";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

import { init } from "./utils/meta-pixel";

function PosthogInit() {
  useEffect(() => {
    const posthogKey = (import.meta.env.VITE_POSTHOG_KEY ?? "") as string;
    const posthogHost = (import.meta.env.VITE_POSTHOG_URL ?? "") as string;

    if (posthogKey && posthogHost) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: "identified_only",
      });
    }
  }, []);

  return null;
}

function MetaPixelInit() {
  useEffect(() => {
    const metaPixelId = (import.meta.env.VITE_META_PIXEL_ID ?? "") as string;

    if (metaPixelId) {
      init(metaPixelId);
    }
  }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <PosthogInit />
      <MetaPixelInit />
    </StrictMode>,
  );
});
