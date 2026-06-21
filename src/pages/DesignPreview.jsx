import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const LOGOS = [
  {
    id: "bloom",
    name: "Bloom",
    blurb: "Five-petal flower — soft, feminine, self-care",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <linearGradient id="g-bloom" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8fb1" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="24"
            cy="14"
            rx="7"
            ry="11"
            fill="url(#g-bloom)"
            opacity="0.92"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="5.5" fill="#fff" opacity="0.95" />
      </svg>
    ),
  },
  {
    id: "glowheart",
    name: "Glow Heart",
    blurb: "Heart + sparkle — warm, caring, simple",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <linearGradient id="g-heart" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8fb1" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <path
          d="M24 39 C24 39 8 29 8 18.5 C8 12 13 8 18 8 C21 8 23.5 9.8 24 12 C24.5 9.8 27 8 30 8 C35 8 40 12 40 18.5 C40 29 24 39 24 39Z"
          fill="url(#g-heart)"
        />
        <path d="M34 9 L35.5 12.5 L39 14 L35.5 15.5 L34 19 L32.5 15.5 L29 14 L32.5 12.5Z" fill="#fff" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: "sunrise",
    name: "Sunrise",
    blurb: "Radiant circle — energy, daily ritual, glow",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <linearGradient id="g-sun" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5b942" />
            <stop offset="100%" stopColor="#ff8fb1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }, (_, i) => (i * 360) / 8).map((deg) => (
          <rect
            key={deg}
            x="22.5"
            y="2"
            width="3"
            height="9"
            rx="1.5"
            fill="url(#g-sun)"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="10" fill="url(#g-sun)" />
      </svg>
    ),
  },
  {
    id: "leafdrop",
    name: "Leaf Drop",
    blurb: "Leaf/droplet — calm, balance, growth",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path
          d="M24 6 C34 14 38 22 32 32 C28 38.5 19 38.5 15 32 C9 22 14 14 24 6Z"
          fill="url(#g-leaf)"
        />
        <path d="M24 10 C24 18 24 26 24 34" stroke="#fff" strokeWidth="1.6" opacity="0.7" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
];

const BACKGROUNDS = [
  {
    id: "current",
    name: "Current",
    blurb: "Deep purple/pink — what you have now",
    body: "radial-gradient(circle at 20% 0%, #2a1a36 0%, #15101c 55%, #100c16 100%)",
    blobs: ["#ff8fb1", "#b9a3ff", "#a855f7"],
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    blurb: "Warm coral/peach — cozy, inviting",
    body: "radial-gradient(circle at 25% 0%, #3a1f2b 0%, #241420 55%, #170f17 100%)",
    blobs: ["#ff9d6e", "#ff8fb1", "#f5b942"],
  },
  {
    id: "calm",
    name: "Calm Mist",
    blurb: "Muted teal/lavender — minimal, soothing",
    body: "radial-gradient(circle at 20% 0%, #16242b 0%, #121a22 55%, #0d1217 100%)",
    blobs: ["#6ee7b7", "#7dd3fc", "#b9a3ff"],
  },
  {
    id: "aurora",
    name: "Aurora",
    blurb: "Vibrant pink/blue/purple mesh — bold, lively",
    body: "radial-gradient(circle at 15% 0%, #2a1438 0%, #1a1030 45%, #0c1326 100%)",
    blobs: ["#ff6fb0", "#7c6bff", "#38bdf8"],
  },
];

export default function DesignPreview() {
  const [logo, setLogo] = useState("bloom");
  const [bg, setBg] = useState("current");

  const activeBg = BACKGROUNDS.find((b) => b.id === bg);
  const activeLogo = LOGOS.find((l) => l.id === logo);

  useEffect(() => {
    document.body.style.background = activeBg.body;
    return () => {
      document.body.style.background = "";
    };
  }, [activeBg.body]);

  return (
    <div className="min-h-screen text-ink p-6 sm:p-10 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {activeBg.blobs.map((color, i) => (
          <div
            key={color}
            className="blob animate-blob"
            style={{
              background: color,
              width: 280 + i * 40,
              height: 280 + i * 40,
              top: `${[-5, 30, 60][i]}%`,
              left: i === 1 ? "auto" : `${[-5, 70][i] ?? 30}%`,
              right: i === 1 ? "-5%" : "auto",
              animationDelay: `${i * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div>
          <h1 className="font-display text-3xl font-semibold text-gradient mb-1">Design Picker</h1>
          <p className="text-sm text-ink-50">Click a logo and a background to preview live. Tell me your picks when you're ready.</p>
        </div>

        <div className="glass rounded-3xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center p-3 shrink-0">
            {activeLogo.svg}
          </div>
          <div>
            <p className="font-display text-lg font-semibold">Better Everyday</p>
            <p className="text-xs text-ink-50">Live preview: {activeLogo.name} logo + {activeBg.name} background</p>
          </div>
        </div>

        <section>
          <h2 className="text-sm uppercase tracking-wide text-ink-50 mb-3">Choose a logo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {LOGOS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLogo(l.id)}
                className={`glass rounded-3xl p-5 flex flex-col items-center gap-3 text-center transition-all ${
                  logo === l.id ? "ring-2 ring-[var(--accent-1)]" : "hover:bg-ink-5"
                }`}
              >
                <div className="relative w-16 h-16">
                  {l.svg}
                  {logo === l.id && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent-1)] flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{l.name}</p>
                  <p className="text-[11px] text-ink-40">{l.blurb}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-wide text-ink-50 mb-3">Choose a background</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BACKGROUNDS.map((b) => (
              <button
                key={b.id}
                onClick={() => setBg(b.id)}
                className={`rounded-3xl p-5 flex items-center gap-4 text-left border transition-all ${
                  bg === b.id ? "border-[var(--accent-1)]" : "border-ink-10 hover:border-ink-20"
                }`}
                style={{ background: b.body }}
              >
                <div className="flex gap-1.5 shrink-0">
                  {b.blobs.map((c) => (
                    <span key={c} className="w-6 h-6 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    {b.name}
                    {bg === b.id && <Check size={13} />}
                  </p>
                  <p className="text-[11px] text-white/60">{b.blurb}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
