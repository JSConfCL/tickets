import Bowser from "bowser";
import InAppSpy from "inapp-spy";
import { useMemo, useState } from "react";
export const useIsSafariMobileWebview = () => {
  const [isInApp] = useState(() => InAppSpy());
  const browser = Bowser.getParser(window.navigator.userAgent);
  const isMobileSafari = browser.satisfies({
    mobile: {
      safari: ">=9",
    },
  });

  return useMemo(() => isInApp && isMobileSafari, [isInApp, isMobileSafari]);
};
