import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  GlassWater,
  Moon,
  Minus,
  Plus,
  PlusCircle,
  X,
  Check,
} from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { todayISO, formatLong } from "../utils/date";
import { MOODS, DEFAULT_CHECKIN_ITEMS } from "../data/mockData";
import { getCheckinIcon } from "../utils/checkinIcons";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import ToggleCard from "../components/ui/ToggleCard";
import { Textarea, PrimaryButton, Input } from "../components/ui/Field";

const moodEmoji = {
  Happy: "😊",
  Tired: "😴",
  Stressed: "😣",
  Calm: "😌",
  Energetic: "⚡",
  Neutral: "😐",
  Sleepy: "🥱",
};

function slugify(label) {
  return (
    label
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `item-${Date.now()}`
  );
}

export default function CheckIn() {
  const [checkins, setCheckins] = useLocalData("checkins", []);
  const [items, setItems] = useLocalData("checkinItems", DEFAULT_CHECKIN_ITEMS);
  const today = todayISO();
  const isSunday = new Date(today).getDay() === 0;
  const existing = checkins.find((c) => c.date === today) || {};

  const emptyForm = { water: 0, sleep: 0, mood: "", notes: "", ...Object.fromEntries(items.map((item) => [item.id, false])) };

  const [form, setForm] = useState(
    isSunday ? emptyForm : {
      water: existing.water ?? 0,
      sleep: existing.sleep ?? 7,
      mood: existing.mood || "Calm",
      notes: existing.notes || "",
      ...Object.fromEntries(items.map((item) => [item.id, !!existing[item.id]])),
    }
  );
  const [saved, setSaved] = useState(false);
  const [newItemLabel, setNewItemLabel] = useState("");

  // Store an empty record for Sunday so history stays blank for this day
  useEffect(() => {
    if (isSunday && !checkins.find((c) => c.date === today)) {
      setCheckins((prev) => [...prev, { date: today, ...emptyForm }]);
    }
  }, []);

  function update(key, value) {
    setForm((f) => {
      const updatedForm = { ...f, [key]: value };
      // Auto-persist toggle items so they survive a refresh without needing Save
      if (items.some((item) => item.id === key)) {
        setCheckins((prev) => {
          const others = prev.filter((c) => c.date !== today);
          return [...others, { date: today, ...updatedForm }];
        });
      }
      return updatedForm;
    });
    setSaved(false);
  }

  function handleSave() {
    setCheckins((prev) => {
      const others = prev.filter((c) => c.date !== today);
      return [...others, { date: today, ...form }];
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addItem() {
    const label = newItemLabel.trim();
    if (!label) return;
    const id = slugify(label);
    if (items.some((item) => item.id === id)) {
      setNewItemLabel("");
      return;
    }
    setItems((prev) => [...prev, { id, label, icon: null }]);
    setForm((f) => ({ ...f, [id]: false }));
    setNewItemLabel("");
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setForm((f) => {
      const next = { ...f };
      delete next[id];
      return next;
    });
  }

  if (isSunday) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl">
        <PageHeader icon={CalendarCheck} title="Daily Check-in" subtitle={formatLong(today)} />
        <GlassCard className="flex flex-col items-center gap-3 py-10 text-center">
          <span className="text-5xl">🛌</span>
          <p className="text-lg font-display text-ink">Rest Day</p>
          <p className="text-sm text-ink-40">Sundays are your break — no check-in needed. Recharge and come back tomorrow!</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <PageHeader icon={CalendarCheck} title="Daily Check-in" subtitle={formatLong(today)} />

      <GlassCard className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = getCheckinIcon(item.icon);
          return (
            <div key={item.id} className="flex items-center gap-2">
              <div className="flex-1">
                <ToggleCard
                  icon={Icon}
                  label={item.label}
                  value={!!form[item.id]}
                  onChange={(v) => update(item.id, v)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                title={`Remove ${item.label}`}
                className="w-8 h-8 rounded-full bg-ink-5 hover:bg-ink-10 flex items-center justify-center text-ink-40 hover:text-ink-70 shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}

        <div className="flex items-center gap-2 pt-1">
          <Input
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Add a new check-in (e.g. Stretching)"
          />
          <button
            type="button"
            onClick={addItem}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white flex items-center justify-center shrink-0"
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassCard>
          <p className="text-sm text-ink-70 mb-3 flex items-center gap-2">
            <GlassWater size={16} /> Water intake
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => update("water", Math.max(0, parseFloat((form.water - 0.25).toFixed(2))))}
              className="w-9 h-9 rounded-full bg-ink-10 hover:bg-ink-20 flex items-center justify-center text-ink"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              min="0"
              max="10"
              step="0.25"
              value={form.water}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || val === "-") {
                  update("water", 0);
                } else {
                  const parsed = parseFloat(val);
                  if (!isNaN(parsed) && parsed >= 0) update("water", parsed);
                }
              }}
              className="w-20 text-center text-2xl font-display py-1 rounded-xl bg-ink-5 border border-ink-10 text-ink outline-none focus:border-[var(--accent-1)]"
            />
            <button
              type="button"
              onClick={() => update("water", parseFloat((form.water + 0.25).toFixed(2)))}
              className="w-9 h-9 rounded-full bg-ink-10 hover:bg-ink-20 flex items-center justify-center text-ink"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="text-center text-xs text-ink-40 mt-2">litres today</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-ink-70 mb-3 flex items-center gap-2">
            <Moon size={16} /> Sleep hours
          </p>
          <input
            type="number"
            min="0"
            max="14"
            step="0.5"
            value={form.sleep}
            onChange={(e) => update("sleep", parseFloat(e.target.value) || 0)}
            className="w-full text-center text-2xl font-display py-2 rounded-xl bg-ink-5 border border-ink-10 text-ink outline-none focus:border-[var(--accent-1)]"
          />
          <p className="text-center text-xs text-ink-40 mt-2">hours slept</p>
        </GlassCard>
      </div>

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3">Mood selector</p>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((mood) => (
            <motion.button
              key={mood}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => update("mood", mood)}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 border transition-colors ${
                form.mood === mood
                  ? "bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white border-transparent"
                  : "bg-ink-5 text-ink-60 border-ink-10 hover:bg-ink-10"
              }`}
            >
              <span>{moodEmoji[mood]}</span>
              {mood}
            </motion.button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3">How did today feel?</p>
        <Textarea
          rows={4}
          placeholder="Write a little note about your day..."
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </GlassCard>

      <PrimaryButton onClick={handleSave} className="flex items-center justify-center gap-2">
        {saved ? <Check size={18} /> : null}
        {saved ? "Saved!" : "Save Check-in"}
      </PrimaryButton>
    </div>
  );
}
