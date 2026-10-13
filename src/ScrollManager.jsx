import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
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
