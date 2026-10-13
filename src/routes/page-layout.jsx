import { useLocation, Outlet } from "react-router-dom";
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "framer-motion";

const PAGE_EASE = [0.22, 1, 0.36, 1];

function PageTransition({ children }) {
  const reducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Motion.div
        key={pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: PAGE_EASE }}
        className="min-h-screen"
      >
        {children}
      </Motion.div>
    </AnimatePresence>
  );
}

export default function PageLayout() {
  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  );
}
