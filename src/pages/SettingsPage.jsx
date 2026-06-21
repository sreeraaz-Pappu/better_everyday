import { useEffect } from "react";
import { Settings, Moon, Sun, CloudFog, Sunset, Download, Trash2, Database, Check } from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { mockSettings } from "../data/mockData";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/useAuth";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import { Label, Input } from "../components/ui/Field";

const ACCENTS = [
  { key: "rose", label: "Rose", color: "#ff8fb1" },
  { key: "lavender", label: "Lavender", color: "#b9a3ff" },
  { key: "pink", label: "Pink", color: "#f472b6" },
  { key: "purple", label: "Purple", color: "#a855f7" },
  { key: "teal", label: "Teal", color: "#2dd4bf" },
  { key: "gold", label: "Gold", color: "#f5b942" },
  { key: "ocean", label: "Ocean", color: "#38bdf8" },
  { key: "mint", label: "Mint", color: "#6ee7b7" },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useLocalData("settings", mockSettings);

  useEffect(() => {
    document.documentElement.classList.toggle("light", settings.theme !== "dark");
    document.documentElement.setAttribute("data-theme", settings.theme || "dark");
    document.documentElement.setAttribute("data-accent", settings.accent || "rose");
  }, [settings.theme, settings.accent]);

  async function handleReset() {
    if (!window.confirm("This will permanently delete all your Better Everyday data from the database. Continue?")) return;
    await supabase.from("user_data").delete().eq("user_id", user.id);
    window.location.reload();
  }

  async function handleExport() {
    const { data } = await supabase.from("user_data").select("key, value").eq("user_id", user.id);
    const allData = Object.fromEntries((data || []).map((row) => [row.key, row.value]));
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "better-everyday-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <PageHeader icon={Settings} title="Settings" subtitle="Make Better Everyday feel like yours" />

      <GlassCard>
        <Label>Profile name</Label>
        <Input
          value={settings.profileName}
          onChange={(e) => setSettings({ ...settings, profileName: e.target.value })}
          placeholder="Your name"
        />
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3">Theme</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "dark", label: "Dark", icon: Moon },
            { key: "light", label: "Light", icon: Sun },
            { key: "calm-mist", label: "Calm Mist", icon: CloudFog },
            { key: "sunset-glow", label: "Sunset Glow", icon: Sunset },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSettings({ ...settings, theme: key })}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm ${
                settings.theme === key
                  ? "bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-transparent"
                  : "bg-ink-5 text-ink-60 border-ink-10"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3">Accent theme</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACCENTS.map((a) => (
            <button
              key={a.key}
              onClick={() => setSettings({ ...settings, accent: a.key })}
              className={`flex flex-col items-center gap-2 py-3 rounded-xl border ${
                settings.accent === a.key ? "border-ink-40 bg-ink-10" : "border-ink-10 bg-ink-5"
              }`}
            >
              <span className="relative w-8 h-8 rounded-full" style={{ background: a.color }}>
                {settings.accent === a.key && (
                  <Check size={14} className="absolute inset-0 m-auto text-white" />
                )}
              </span>
              <span className="text-xs text-ink-70">{a.label}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="flex flex-col gap-3">
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-ink-10 hover:bg-ink-15 text-ink text-sm"
        >
          <Download size={16} /> Export my data
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-sm"
        >
          <Trash2 size={16} /> Delete all my data
        </button>
      </GlassCard>

      <GlassCard className="flex items-start gap-3 bg-ink-5">
        <Database size={18} className="text-ink-40 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm text-ink-70">Database connection</p>
          <p className="text-xs text-ink-40 mt-0.5">
            Connected to Supabase — your data is synced to the cloud and tied to your account ({user?.email}).
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
