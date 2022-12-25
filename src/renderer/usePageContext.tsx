import React, { ProviderProps, useContext } from "react";

import type { PageContext } from "./types";

const Context = React.createContext<PageContext>(undefined as any);

export const PageContextProvider = ({
  value,
  children,
}: ProviderProps<PageContext>) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);

export const usePageContext = <T extends PageContext = PageContext>() =>
  useContext(Context) as T;
