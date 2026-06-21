import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function FloatingActionButton({ onClick, icon: Icon = Plus, label }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-24 md:bottom-8 right-5 md:right-10 z-30 flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white shadow-lg shadow-black/30"
    >
      <Icon size={18} />
      {label && <span className="text-sm font-medium">{label}</span>}
    </motion.button>
  );
}
