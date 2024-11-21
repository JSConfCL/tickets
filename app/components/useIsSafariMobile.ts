import InAppSpy from "inapp-spy";
import { useMemo, useState } from "react";

export const useIsSafariMobileWebview = () => {
  const [{ isInApp }] = useState(() => InAppSpy());
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const isMobileSafari = iOS && webkit && !ua.match(/CriOS/i);

  return useMemo(() => isInApp && isMobileSafari, [isInApp, isMobileSafari]);
};
