import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import AnimatedBackground from "./AnimatedBackground";
import { useLocalData } from "../../hooks/useLocalData";
import { mockSettings } from "../../data/mockData";

export default function AppLayout() {
  const location = useLocation();
  const [settings] = useLocalData("settings", mockSettings);

  useEffect(() => {
    document.documentElement.classList.toggle("light", settings.theme !== "dark");
    document.documentElement.setAttribute("data-theme", settings.theme || "dark");
    document.documentElement.setAttribute("data-accent", settings.accent || "rose");
  }, [settings.theme, settings.accent]);

  return (
    <div className="flex min-h-screen">
      <AnimatedBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-30 flex items-center gap-2.5 px-4 py-3 glass">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center shrink-0 p-1">
            <img src="/favicon.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-base font-semibold text-gradient">Better Everyday</span>
        </header>
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 pb-28 md:pb-10 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
