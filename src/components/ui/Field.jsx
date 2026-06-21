export function Label({ children }) {
  return <label className="block text-xs text-ink-50 mb-1.5">{children}</label>;
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl bg-ink-5 border border-ink-10 text-ink placeholder-ink-30 outline-none focus:border-[var(--accent-1)] transition-colors ${props.className || ""}`}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl bg-ink-5 border border-ink-10 text-ink placeholder-ink-30 outline-none focus:border-[var(--accent-1)] transition-colors resize-none ${props.className || ""}`}
    />
  );
}

export function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl bg-ink-5 border border-ink-10 text-ink outline-none focus:border-[var(--accent-1)] transition-colors ${props.className || ""}`}
    >
      {children}
    </select>
  );
}

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all ${className}`}
    >
      {children}
    </button>
  );
}
