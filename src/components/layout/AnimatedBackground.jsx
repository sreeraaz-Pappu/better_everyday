export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="blob w-72 h-72 bg-[var(--accent-1)] top-[-4rem] left-[-3rem] animate-blob"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="blob w-96 h-96 bg-[var(--accent-3)] top-1/3 right-[-6rem] animate-blob"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="blob w-80 h-80 bg-[var(--accent-2)] bottom-[-5rem] left-1/4 animate-blob"
        style={{ animationDelay: "8s" }}
      />
    </div>
  );
}
