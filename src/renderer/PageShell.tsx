import React, { StrictMode, useMemo } from "react";

import type { PageContext, VitePageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

export const PageShell = (pContext: VitePageContext) => {

  const {
    Page,
    pageProps,
    hydrateData,
    exports,
    exportsAll,
    pageExports,
    store,
    ...rest
  } = pContext;

  const urlParsed = useMemo(
    () => pContext.urlParsed ?? ({} as PageContext["urlParsed"]),
    [pContext.urlParsed],
  );
  const routeParams = useMemo(
    () => pContext.routeParams ?? ({} as PageContext["routeParams"]),
    [pContext.routeParams],
  );

  const value = useMemo(
    () => ({
      ...rest,
      store,
      urlParsed,
      routeParams,
    }),
    [rest, routeParams, store, urlParsed],
  );

  return (
    <StrictMode>
      <PageContextProvider value={value}>
        <Page {...pageProps} />
      </PageContextProvider>
    </StrictMode>
  );
};
