// app/root.tsx
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { GPUProvider } from "~/contexts/gpuContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <GPUProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </GPUProvider>
      </body>
    </html>
  );
}
