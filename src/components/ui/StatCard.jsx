import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function StatCard({ icon: Icon, label, value, suffix = "", positive = true }) {
  return (
    <GlassCard className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          positive
            ? "bg-gradient-to-br from-[var(--accent-1)]/40 to-[var(--accent-2)]/40"
            : "bg-ink-10"
        }`}
      >
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-ink-50">{label}</p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-semibold text-ink"
        >
          {value}
          <span className="text-xs text-ink-40 ml-1">{suffix}</span>
        </motion.p>
      </div>
    </GlassCard>
  );
}
