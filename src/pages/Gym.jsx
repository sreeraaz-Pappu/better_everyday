import { useState } from "react";
import { Dumbbell, Plus, Trash2, Flame } from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { todayISO, formatLong, formatPretty } from "../utils/date";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import { Label, Input, PrimaryButton } from "../components/ui/Field";

const emptyForm = { name: "", sets: "", reps: "", weight: "" };

function emptyDay(date) {
  return { date, exercises: [] };
}

function makeExerciseId() {
  return `e${Date.now()}`;
}

export default function Gym() {
  const [workouts, setWorkouts] = useLocalData("workouts", []);
  const today = todayISO();
  const todayEntry = workouts.find((w) => w.date === today) || emptyDay(today);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function updateToday(patch) {
    setWorkouts((prev) => {
      const others = prev.filter((w) => w.date !== today);
      return [...others, { ...todayEntry, ...patch }];
    });
  }

  function addExercise() {
    if (!form.name.trim() || !form.sets || !form.reps) return;
    updateToday({
      exercises: [
        ...todayEntry.exercises,
        {
          id: makeExerciseId(),
          name: form.name.trim(),
          sets: parseInt(form.sets, 10) || 0,
          reps: parseInt(form.reps, 10) || 0,
          weight: form.weight ? parseFloat(form.weight) : null,
        },
      ],
    });
    setForm(emptyForm);
    setOpen(false);
  }

  function removeExercise(id) {
    updateToday({ exercises: todayEntry.exercises.filter((e) => e.id !== id) });
  }

  const totalSets = todayEntry.exercises.reduce((sum, e) => sum + e.sets, 0);

  const recentSessions = [...workouts]
    .filter((w) => w.date !== today && w.exercises.length > 0)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 7);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <PageHeader
        icon={Dumbbell}
        title="Gym"
        subtitle={formatLong(today)}
        action={
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white text-sm flex items-center gap-1.5"
          >
            <Plus size={16} /> Add exercise
          </button>
        }
      />

      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-ink-70">Today's workout</p>
          {totalSets > 0 && (
            <span className="text-xs flex items-center gap-1 text-[var(--accent-3)]">
              <Flame size={14} /> {totalSets} sets logged
            </span>
          )}
        </div>
        {todayEntry.exercises.length === 0 ? (
          <p className="text-sm text-ink-40">No exercises logged yet today.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {todayEntry.exercises.map((e) => (
              <div key={e.id} className="flex items-center justify-between bg-ink-5 rounded-xl px-4 py-2.5">
                <div>
                  <p className="text-sm text-ink font-medium">{e.name}</p>
                  <p className="text-xs text-ink-50">
                    {e.sets} sets × {e.reps} reps{e.weight ? ` @ ${e.weight}kg` : ""}
                  </p>
                </div>
                <button onClick={() => removeExercise(e.id)} className="text-ink-30 hover:text-rose-300">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3">Recent sessions</p>
        {recentSessions.length === 0 ? (
          <EmptyState icon={Dumbbell} title="No past sessions" subtitle="Your previous workouts will show up here." />
        ) : (
          <div className="flex flex-col gap-2">
            {recentSessions.map((w) => (
              <div key={w.date} className="flex items-center justify-between bg-ink-5 rounded-xl px-4 py-2.5">
                <p className="text-sm text-ink">{formatPretty(w.date)}</p>
                <p className="text-xs text-ink-50">{w.exercises.length} exercises</p>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      <Modal open={open} onClose={() => setOpen(false)} title="Add exercise">
        <div className="flex flex-col gap-3">
          <div>
            <Label>Exercise</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Squats"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Sets</Label>
              <Input type="number" value={form.sets} onChange={(e) => setForm({ ...form, sets: e.target.value })} placeholder="3" />
            </div>
            <div>
              <Label>Reps</Label>
              <Input type="number" value={form.reps} onChange={(e) => setForm({ ...form, reps: e.target.value })} placeholder="12" />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="optional" />
            </div>
          </div>
          <PrimaryButton onClick={addExercise} className="mt-2">Add exercise</PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
