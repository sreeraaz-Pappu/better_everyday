import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "./navItems";

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3">
      <div className="glass rounded-3xl px-2 py-2 flex gap-1 overflow-x-auto no-scrollbar">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className="relative flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl min-w-[64px] text-[10px] shrink-0"
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
                <span className={`relative z-10 ${isActive ? "text-ink" : "text-ink-50"}`}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
