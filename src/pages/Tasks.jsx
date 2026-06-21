import { useState } from "react";
import { ListChecks, Plus, Trash2, Sparkles } from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { todayISO } from "../utils/date";
import { TASK_CATEGORIES } from "../data/mockData";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import ProgressBar from "../components/ui/ProgressBar";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import { Label, Input, Select, PrimaryButton } from "../components/ui/Field";

const categoryColors = {
  Health: "from-emerald-400/40 to-emerald-200/30",
  Study: "from-sky-400/40 to-sky-200/30",
  Personal: "from-amber-400/40 to-amber-200/30",
  Beauty: "from-[var(--accent-1)]/40 to-[var(--accent-2)]/30",
  Random: "from-fuchsia-400/40 to-fuchsia-200/30",
};

export default function Tasks() {
  const [tasks, setTasks] = useLocalData("tasks", []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ text: "", category: "Health" });

  const today = todayISO();
  const todayTasks = tasks.filter((t) => t.date === today);
  const completed = todayTasks.filter((t) => t.completed).length;
  const pct = todayTasks.length ? (completed / todayTasks.length) * 100 : 0;

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addTask() {
    if (!form.text.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: `t${Date.now()}`, text: form.text, category: form.category, completed: false, date: today },
    ]);
    setForm({ text: "", category: "Health" });
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <PageHeader
        icon={ListChecks}
        title="Tasks & Random Things"
        subtitle="Habits, to-dos and little wins"
        action={
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white text-sm flex items-center gap-1.5"
          >
            <Plus size={16} /> Add task
          </button>
        }
      />

      <GlassCard>
        <ProgressBar value={pct} label="Today's completion" valueLabel={`${completed}/${todayTasks.length}`} />
      </GlassCard>

      {todayTasks.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Nothing here yet"
          subtitle="Add a little task or habit to start your glow streak today ✨"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {todayTasks.map((t) => (
            <GlassCard key={t.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    t.completed
                      ? "bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] border-transparent"
                      : "border-ink-30"
                  }`}
                >
                  {t.completed && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
                <div>
                  <p className={`text-sm ${t.completed ? "text-ink-40 line-through" : "text-ink"}`}>{t.text}</p>
                  <span
                    className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${categoryColors[t.category]} text-white/90`}
                  >
                    {t.category}
                  </span>
                </div>
              </div>
              <button onClick={() => removeTask(t.id)} className="text-ink-30 hover:text-rose-300">
                <Trash2 size={16} />
              </button>
            </GlassCard>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add task">
        <div className="flex flex-col gap-3">
          <div>
            <Label>Task</Label>
            <Input value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="e.g. Skincare routine" />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {TASK_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
          <PrimaryButton onClick={addTask} className="mt-2">Add task</PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
