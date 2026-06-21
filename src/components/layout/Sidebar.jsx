import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { navItems } from "./navItems";
import { useAuth } from "../../context/useAuth";

export default function Sidebar() {
  const { signOut } = useAuth();

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 p-5 gap-2">
      <div className="glass rounded-3xl p-5 flex flex-col h-full">
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center shrink-0 p-1.5 shadow-[0_4px_16px_rgba(255,143,177,0.35)]">
            <img src="/favicon.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-lg font-semibold text-gradient">Better Everyday</span>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-colors ${
                  isActive
                    ? "text-ink"
                    : "text-ink-60 hover:text-ink hover:bg-ink-5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-1)]/30 to-[var(--accent-2)]/30 border border-ink-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm text-ink-60 hover:text-ink hover:bg-ink-5 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign out</span>
        </button>

        <div className="px-2 pt-4 text-[11px] text-ink-30 border-t border-ink-10">
          made with 💗 just for you
        </div>
      </div>
    </aside>
  );
}
