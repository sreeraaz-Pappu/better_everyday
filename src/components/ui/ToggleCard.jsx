import { motion } from "framer-motion";

export default function ToggleCard({ icon: Icon, label, value, onChange }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-1)]/40 to-[var(--accent-2)]/40 flex items-center justify-center">
          <Icon size={16} className="text-white" />
        </div>
        <span className="text-sm text-ink-80">{label}</span>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
          value ? "bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]" : "bg-ink-10"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md"
          style={{ x: value ? 24 : 0 }}
        />
      </button>
    </div>
  );
}
