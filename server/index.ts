import path from "node:path";

import compression from "compression";
import express from "express";
import { createServer } from "vite";
import { renderPage } from "vite-plugin-ssr";

import { PageContextServer } from "../src/renderer/types";

const isProduction = process.env.NODE_ENV === "production";

async function startServer() {
  const app = express();

  app.use(compression());

  if (isProduction) {
    app.use(express.static(path.resolve("dist/client")));
  } else {
    const viteDevServer = await createServer({
      server: { middlewareMode: true },
      mode: "development",
    });

    app.use(viteDevServer.middlewares);
  }

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    const pageContextInit: Partial<PageContextServer> = {
      urlOriginal: url,
    };
    const pageContext = await renderPage(pageContextInit);

    const { httpResponse } = pageContext;

    if (!httpResponse) {
      return next();
    }
    const { body, statusCode, contentType, earlyHints } = httpResponse;

    if (res.writeEarlyHints) {
      res.writeEarlyHints({ link: earlyHints.map(e => e.earlyHintLink) });
    }
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3000;

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

startServer().then();
