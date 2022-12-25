import { ReactElement } from "react";
import type { PageContextBuiltIn } from "vite-plugin-ssr";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";
import { PageContextUrls } from "vite-plugin-ssr/dist/esm/shared/addComputedUrlProps";

export type { DocumentProps };
export type { OnBeforeRender };
export type { PageContext };
export type { PageContextServer };
export type { PageContextClient };
export type { PageProps };
export type { VitePageContext };

type PageProps = {};
type Page = (pageProps: PageProps) => ReactElement;

type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;

  urlPathname: string;

  exports: {
    documentProps?: DocumentProps;
    onBeforeRender?: OnBeforeRender;
  };

};

type DocumentProps = { title?: string; description?: string };
type OnBeforeRender = (pageContext: VitePageContext) => Promise<void>;

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type VitePageContext = PageContextClient | PageContextServer;

type PageContext<
  QueryParams = Record<string, string>,
  RouteParams = Record<string, string>,
  PageContextCustom = Record<string, any>,
> = Omit<
  VitePageContext,
  // client unused
  | "Page"
  | "pageProps"
  | "exports"
  | "exportsAll"
  | "pageExports"
  // redefine
  | "routeParams"
  | "urlParsed"
> & {
  routeParams: RouteParams;
  urlParsed: Omit<PageContextUrls["urlParsed"], "search" | "searchAll"> & {
    search: Partial<QueryParams>;
    searchAll: Partial<
      Record<keyof QueryParams, QueryParams[keyof QueryParams][]>
    >;
  };
} & PageContextCustom;
