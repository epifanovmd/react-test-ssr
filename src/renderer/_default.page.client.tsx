import React from "react";
import { createRoot } from "react-dom/client";

import { PageShell } from "./PageShell";
import type { PageContextClient } from "./types";

const container = document.getElementById("root");
const root = createRoot(container!);

export const clientRouting = true;

export const render = (pageContext: PageContextClient) => {

  root.render(<PageShell {...pageContext} />);
};
