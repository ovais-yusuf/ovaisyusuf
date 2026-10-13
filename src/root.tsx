import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ScrollManager from "./ScrollManager.jsx";
import "./index.css";

const themeScript =
  "try{if(localStorage.getItem('portfolio-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ovais Yusuf · AI/ML Engineer</title>
        <meta
          name="description"
          content="AI/ML Engineer building computer vision systems, LLM applications, and research-driven AI tools."
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <ScrollManager />
      <Outlet />
    </ThemeProvider>
  );
}
