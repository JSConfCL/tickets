/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
// noirmal safari
// "userAgent": "Mozilla/5.0 (iPad; CPU OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0.6723.37 Mobile/15E148 Safari/604.1"
// "userAgent": "Mozilla/5.0 (iPad; CPU OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21G93 Instagram 358.0.0.33.95 (iPad8,11; iPadOS 17_6_1; en_US; en; scale=2.00; 780x1688; 663992737; IABMV/1)"
// "userAgent": "Mozilla/5.0 (Linux; Android 14; Pixel 9 Pro XL Build/AD1A.240905.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.107 Mobile Safari/537.36 Instagram 358.0.0.51.97 Android (34/14; 360dpi; 1008x2071; Google/google; Pixel 9 Pro XL; komodo; komodo; en_US; 665037474)"

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _loadContext: AppLoadContext,
) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const isAndroid = userAgent.toLowerCase().includes("android");

  const isWebview =
    userAgent.toLowerCase().includes("crios") ||
    userAgent.toLowerCase().includes("fxios") ||
    userAgent.toLowerCase().includes("instagram");

  console.log("isWebview", isWebview);
  console.log("isAndroid", isAndroid);
  console.log("userAgent", userAgent);

  if (isWebview && isAndroid) {
    responseHeaders.set("Content-Type", "application/pdf");

    return new Response("", {
      headers: responseHeaders,
    });
  }

  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);

        // biome-ignore lint: noParameterAssign — We want to set the status code to 500
        responseStatusCode = 500;
      },
    },
  );
  // loging user-agent

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
