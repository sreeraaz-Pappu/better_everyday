import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { primaryNavItems, moreNavItems } from "./navItems";
import Modal from "../ui/Modal";

export default function BottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const isMoreActive = moreNavItems.some(({ to }) => location.pathname === to);

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3">
        <div className="glass rounded-3xl px-1 py-2 grid grid-cols-6 gap-0.5">
          {primaryNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className="relative flex flex-col items-center justify-center gap-1 px-1 py-1.5 rounded-2xl text-[10px] min-w-0"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="bottomnav-active"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-1)]/30 to-[var(--accent-2)]/30 border border-ink-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <Icon size={18} className={`relative z-10 ${isActive ? "text-ink" : "text-ink-50"}`} />
                  <span className={`relative z-10 truncate w-full text-center ${isActive ? "text-ink" : "text-ink-50"}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="relative flex flex-col items-center justify-center gap-1 px-1 py-1.5 rounded-2xl text-[10px] min-w-0"
          >
            {isMoreActive && (
              <motion.div
                layoutId="bottomnav-active"
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-1)]/30 to-[var(--accent-2)]/30 border border-ink-10"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <MoreHorizontal size={18} className={`relative z-10 ${isMoreActive ? "text-ink" : "text-ink-50"}`} />
            <span className={`relative z-10 truncate w-full text-center ${isMoreActive ? "text-ink" : "text-ink-50"}`}>
              More
            </span>
          </button>
        </div>
      </nav>

      <Modal open={moreOpen} onClose={() => setMoreOpen(false)} title="More" className="max-w-sm">
        <div className="flex flex-col gap-1.5">
          {moreNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMoreOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm ${
                  isActive ? "text-ink bg-ink-10" : "text-ink-60 hover:text-ink hover:bg-ink-5"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </Modal>
    </>
  );
}
