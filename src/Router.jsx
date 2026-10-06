import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "framer-motion";
import App from "./App.jsx";
import WC26MatchdayPage from "./pages/WC26MatchdayPage.jsx";
import MSCCCaseStudyPage from "./pages/MSCCCaseStudyPage.jsx";
import DroneTrafficPage from "./pages/DroneTrafficPage.jsx";

const PAGE_EASE = [0.22, 1, 0.36, 1];

function PageTransition({ children }) {
  const reducedMotion = useReducedMotion();
  return (
    <Motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: PAGE_EASE }}
      className="min-h-screen"
    >
      {children}
    </Motion.div>
  );
}

function ScrollManager() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    if (pathname !== "/") {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      return;
    }

    const sectionId =
      (hash && hash.replace("#", "")) || state?.scrollToSection || null;

    if (sectionId) {
      let cancelled = false;
      let attempts = 0;
      const maxAttempts = 100;

      const tryScroll = () => {
        if (cancelled) return;
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        attempts += 1;
        if (attempts < maxAttempts) {
          window.setTimeout(tryScroll, 50);
        }
      };

      const start = window.setTimeout(tryScroll, 0);
      return () => {
        cancelled = true;
        window.clearTimeout(start);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, state]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <App />
            </PageTransition>
          }
        />
        <Route
          path="/projects/wc26-matchday"
          element={
            <PageTransition>
              <WC26MatchdayPage />
            </PageTransition>
          }
        />
        <Route
          path="/projects/mscc-chatbot"
          element={
            <PageTransition>
              <MSCCCaseStudyPage />
            </PageTransition>
          }
        />
        <Route
          path="/projects/drone-traffic"
          element={
            <PageTransition>
              <DroneTrafficPage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <main className="min-h-screen p-12">
              <h1 className="text-3xl font-bold">Page not found</h1>
              <a className="mt-6 inline-block text-blue-600" href="/">
                Return to portfolio
              </a>
            </main>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function Router() {
  return (
    <>
      <ScrollManager />
      <AnimatedRoutes />
    </>
  );
}
