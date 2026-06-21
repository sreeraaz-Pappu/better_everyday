import { motion } from "framer-motion";

export default function ProgressBar({ value = 0, label, valueLabel, className = "" }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {(label || valueLabel) && (
        <div className="flex justify-between text-xs text-ink-60 mb-1.5">
          <span>{label}</span>
          <span>{valueLabel}</span>
        </div>
      )}
      <div className="h-2.5 rounded-full bg-ink-10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]"
        />
      </div>
    </div>
  );
}
