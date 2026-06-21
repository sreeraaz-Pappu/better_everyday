import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, icon: Icon, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between gap-4 mb-6"
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center shrink-0">
            <Icon size={20} className="text-white" />
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
          {subtitle && <p className="text-sm text-ink-50">{subtitle}</p>}
        </div>
      </div>
      {action}
    </motion.div>
  );
}
