import { motion } from "framer-motion";
import { Sparkles, Dumbbell, Beef, GlassWater, Moon, Smile } from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { mockSettings, DEFAULT_CHECKIN_ITEMS } from "../data/mockData";
import { getCheckinIcon } from "../utils/checkinIcons";
import { todayISO, formatLong } from "../utils/date";
import { computeWellnessScore } from "../utils/wellness";
import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/ui/StatCard";
import ProgressRing from "../components/ui/ProgressRing";
import ProgressBar from "../components/ui/ProgressBar";

export default function Dashboard() {
  const [checkins] = useLocalData("checkins", []);
  const [settings] = useLocalData("settings", mockSettings);
  const [items] = useLocalData("checkinItems", DEFAULT_CHECKIN_ITEMS);

  const today = todayISO();
  const todayCheckin =
    checkins.find((c) => c.date === today) || checkins[checkins.length - 1] || {};

  const score = computeWellnessScore(todayCheckin);

  const glowItems = items.map((item) => ({
    label: item.label,
    done: !!todayCheckin[item.id],
    icon: getCheckinIcon(item.icon),
  }));

  return (
    <div className="flex flex-col gap-6">
      <GlassCard className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink flex items-center gap-2">
            Hi, {settings.profileName || "Glow Girl"}, welcome back
            <Sparkles size={22} className="text-[var(--accent-1)]" />
          </h1>
          <p className="text-ink-50 text-sm mt-1">{formatLong(today)}</p>
        </div>
        <div className="text-sm text-ink-60 italic">"Soft days, strong glow."</div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1 flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-ink-50 uppercase tracking-wide">Daily Wellness Score</p>
          <ProgressRing value={score} label="/ 100" sublabel="today" />
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <p className="text-sm text-ink-70 mb-4 font-medium">Today's Glow Check ✨</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {glowItems.map(({ label, done, icon: Icon }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.03 }}
                className={`rounded-2xl p-3 flex flex-col items-center gap-2 border ${
                  done
                    ? "bg-gradient-to-br from-[var(--accent-1)]/25 to-[var(--accent-2)]/25 border-ink-15"
                    : "bg-ink-5 border-ink-10"
                }`}
              >
                <Icon size={18} className={done ? "text-ink" : "text-ink-40"} />
                <span className={`text-xs ${done ? "text-ink" : "text-ink-40"}`}>{label}</span>
                <span className={`text-[10px] ${done ? "text-[var(--accent-3)]" : "text-ink-30"}`}>
                  {done ? "Done" : "Pending"}
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Dumbbell} label="Gym" value={todayCheckin.gym ? "Done" : "Skipped"} positive={!!todayCheckin.gym} />
        <StatCard icon={Beef} label="Protein" value={todayCheckin.protein ? "Met" : "Missed"} positive={!!todayCheckin.protein} />
        <StatCard icon={GlassWater} label="Water" value={todayCheckin.water ?? 0} suffix="glasses" />
        <StatCard icon={Moon} label="Sleep" value={todayCheckin.sleep ?? 0} suffix="hrs" />
      </div>

      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-ink-70 font-medium flex items-center gap-2">
            <Smile size={16} /> Mood today
          </p>
          <span className="text-sm text-ink">{todayCheckin.mood || "Not logged"}</span>
        </div>
        <ProgressBar value={score} label="Overall glow" valueLabel={`${score}%`} />
      </GlassCard>
    </div>
  );
}
