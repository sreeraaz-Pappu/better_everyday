import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={`glass rounded-3xl p-5 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
