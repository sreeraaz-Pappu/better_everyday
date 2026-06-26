import { useState } from "react";
import { History, Dumbbell, Beef, ListChecks, Scale, ChevronRight } from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { daysBetween, formatPretty, isSundayISO } from "../utils/date";
import { DEFAULT_CHECKIN_ITEMS } from "../data/mockData";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import EmptyState from "../components/ui/EmptyState";
import DayDetailModal from "../components/history/DayDetailModal";

const FILTERS = [
  { key: 7, label: "Last 7 days" },
  { key: 30, label: "Last 30 days" },
  { key: null, label: "All time" },
];

const moodEmoji = { Happy: "😊", Tired: "😴", Stressed: "😣", Calm: "😌", Energetic: "⚡", Neutral: "😐", Sleepy: "🥱" };

export default function HistoryPage() {
  const [checkins] = useLocalData("checkins", []);
  const [checkinItems] = useLocalData("checkinItems", DEFAULT_CHECKIN_ITEMS);
  const [body] = useLocalData("body", []);
  const [diet] = useLocalData("diet", []);
  const [supplements] = useLocalData("medicines", []);
  const [workouts] = useLocalData("workouts", []);
  const [tasks] = useLocalData("tasks", []);
  const [filter, setFilter] = useState(7);
  const [selectedDate, setSelectedDate] = useState(null);

  const weightByDate = Object.fromEntries(body.map((b) => [b.date, b.weight]));

  const rows = [...checkins]
    .filter((c) => !isSundayISO(c.date))
    .filter((c) => filter === null || daysBetween(c.date) <= filter)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader icon={History} title="Progress & History" subtitle="Look back on your glow journey" />

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.label}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              filter === f.key
                ? "bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-transparent"
                : "bg-ink-5 text-ink-60 border-ink-10 hover:bg-ink-10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <EmptyState icon={History} title="No history yet" subtitle="Your check-ins will show up here once you start logging." />
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((c) => (
            <GlassCard
              key={c.date}
              onClick={() => setSelectedDate(c.date)}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-ink-5 flex flex-col items-center justify-center shrink-0">
                  <span className="text-lg">{moodEmoji[c.mood] || "🙂"}</span>
                </div>
                <div>
                  <p className="text-sm text-ink font-medium">{formatPretty(c.date)}</p>
                  <p className="text-xs text-ink-40">{c.mood || "No mood logged"}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-ink-60">
                <span className={`flex items-center gap-1 ${c.gym ? "text-emerald-300" : "text-ink-30"}`}>
                  <Dumbbell size={13} /> Gym
                </span>
                <span className={`flex items-center gap-1 ${c.protein ? "text-emerald-300" : "text-ink-30"}`}>
                  <Beef size={13} /> Protein
                </span>
                <span className={`flex items-center gap-1 ${c.tasks ? "text-emerald-300" : "text-ink-30"}`}>
                  <ListChecks size={13} /> Tasks
                </span>
                {weightByDate[c.date] && (
                  <span className="flex items-center gap-1 text-[var(--accent-3)]">
                    <Scale size={13} /> {weightByDate[c.date]} kg
                  </span>
                )}
                <ChevronRight size={14} className="text-ink-30 shrink-0" />
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <DayDetailModal
        date={selectedDate}
        onClose={() => setSelectedDate(null)}
        checkins={checkins}
        checkinItems={checkinItems}
        body={body}
        diet={diet}
        supplements={supplements}
        workouts={workouts}
        tasks={tasks}
      />
    </div>
  );
}
