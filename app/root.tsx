import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ThemeProvider } from "~/components/ThemeProvider"

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="KLWKDmdQz2F5xlHRDSF1YyihBSCpDzr5dP8tVtrO5mo" />
        <Meta />
        <Links />
        <script defer data-domain="deltaforce-builds.ignoxx.dev" src="https://plausible.ignoxx.dev/js/script.tagged-events.js"></script>
      </head>
      <body className="font-inter">
        <ThemeProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return;
}
