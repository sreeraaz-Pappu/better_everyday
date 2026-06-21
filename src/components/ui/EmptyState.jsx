import { motion } from "framer-motion";

export default function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-10 flex flex-col items-center text-center gap-2"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-1)]/30 to-[var(--accent-2)]/30 flex items-center justify-center mb-2">
        {Icon && <Icon size={28} className="text-white/80" />}
      </div>
      <p className="font-display text-ink text-lg">{title}</p>
      {subtitle && <p className="text-sm text-ink-50 max-w-xs">{subtitle}</p>}
    </motion.div>
  );
}
