import { useState } from "react";
import { Apple, Plus, PartyPopper, Trash2, Pill, Info } from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { todayISO, formatLong } from "../utils/date";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import ProgressBar from "../components/ui/ProgressBar";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import { Label, Input, Select, Textarea, PrimaryButton } from "../components/ui/Field";

const MEAL_TYPES = ["Breakfast", "Lunch", "Snacks", "Dinner"];

function emptyDay(date) {
  return {
    date,
    proteinGoal: 70,
    proteinConsumed: 0,
    fiberGoal: 25,
    fiberConsumed: 0,
    calories: 0,
    ironTaken: null,
    hairTaken: null,
    meals: [],
    notes: "",
  };
}

const emptySupplementForm = { name: "", dose: "", time: "", notes: "" };

export default function Diet() {
  const [diet, setDiet] = useLocalData("diet", []);
  const [supplements, setSupplements] = useLocalData("medicines", []);
  const today = todayISO();
  const todayEntry = diet.find((d) => d.date === today) || emptyDay(today);

  const [open, setOpen] = useState(false);
  const [mealForm, setMealForm] = useState({ type: "Breakfast", name: "" });
  const [supplementOpen, setSupplementOpen] = useState(false);
  const [supplementForm, setSupplementForm] = useState(emptySupplementForm);

  function updateToday(patch) {
    setDiet((prev) => {
      const others = prev.filter((d) => d.date !== today);
      return [...others, { ...todayEntry, ...patch }];
    });
  }

  function addMeal() {
    if (!mealForm.name.trim()) return;
    updateToday({ meals: [...todayEntry.meals, { ...mealForm }] });
    setMealForm({ type: "Breakfast", name: "" });
    setOpen(false);
  }

  function removeMeal(idx) {
    updateToday({ meals: todayEntry.meals.filter((_, i) => i !== idx) });
  }

  function toggleSupplementTaken(id) {
    setSupplements((prev) => prev.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s)));
  }

  function removeSupplement(id) {
    setSupplements((prev) => prev.filter((s) => s.id !== id));
  }

  function addSupplement() {
    if (!supplementForm.name.trim()) return;
    setSupplements((prev) => [...prev, { id: `m${Date.now()}`, ...supplementForm, taken: false }]);
    setSupplementForm(emptySupplementForm);
    setSupplementOpen(false);
  }

  const proteinPct = todayEntry.proteinGoal
    ? Math.min(100, (todayEntry.proteinConsumed / todayEntry.proteinGoal) * 100)
    : 0;
  const proteinGoalMet = todayEntry.proteinConsumed >= todayEntry.proteinGoal;

  const fiberPct = todayEntry.fiberGoal
    ? Math.min(100, (todayEntry.fiberConsumed / todayEntry.fiberGoal) * 100)
    : 0;
  const fiberGoalMet = todayEntry.fiberConsumed >= todayEntry.fiberGoal;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <PageHeader icon={Apple} title="Diet Tracker" subtitle={formatLong(today)} />

      <GlassCard>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-ink-70">Protein progress</p>
          {proteinGoalMet && (
            <span className="text-xs flex items-center gap-1 text-emerald-300">
              <PartyPopper size={14} /> Goal completed!
            </span>
          )}
        </div>
        <ProgressBar
          value={proteinPct}
          valueLabel={`${todayEntry.proteinConsumed}g / ${todayEntry.proteinGoal}g`}
        />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <Label>Protein goal (g)</Label>
            <Input
              type="number"
              value={todayEntry.proteinGoal}
              onChange={(e) => updateToday({ proteinGoal: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label>Protein consumed (g)</Label>
            <Input
              type="number"
              value={todayEntry.proteinConsumed}
              onChange={(e) => updateToday({ proteinConsumed: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-ink-70">Fiber progress</p>
          {fiberGoalMet && (
            <span className="text-xs flex items-center gap-1 text-emerald-300">
              <PartyPopper size={14} /> Goal completed!
            </span>
          )}
        </div>
        <ProgressBar
          value={fiberPct}
          valueLabel={`${todayEntry.fiberConsumed}g / ${todayEntry.fiberGoal}g`}
        />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <Label>Fiber goal (g)</Label>
            <Input
              type="number"
              value={todayEntry.fiberGoal}
              onChange={(e) => updateToday({ fiberGoal: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label>Fiber consumed (g)</Label>
            <Input
              type="number"
              value={todayEntry.fiberConsumed}
              onChange={(e) => updateToday({ fiberConsumed: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Calories (optional)</Label>
          <Input
            type="number"
            value={todayEntry.calories}
            onChange={(e) => updateToday({ calories: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3">Daily supplements</p>
        <div className="flex flex-col gap-3">
          {[
            { key: "ironTaken", label: "Iron supplement" },
            { key: "hairTaken", label: "Hair supplement" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <p className="text-sm text-ink">{label}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => updateToday({ [key]: true })}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                    todayEntry[key] === true
                      ? "bg-emerald-500 text-white"
                      : "bg-ink-5 text-ink-40 hover:bg-ink-10"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => updateToday({ [key]: false })}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                    todayEntry[key] === false && todayEntry[key] !== null
                      ? "bg-rose-400 text-white"
                      : "bg-ink-5 text-ink-40 hover:bg-ink-10"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-ink-70">Meals today</p>
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add meal
          </button>
        </div>
        {todayEntry.meals.length === 0 ? (
          <p className="text-sm text-ink-40">No meals logged yet today.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {todayEntry.meals.map((meal, idx) => (
              <div key={idx} className="flex items-center justify-between bg-ink-5 rounded-xl px-4 py-2.5">
                <div>
                  <p className="text-xs text-[var(--accent-3)]">{meal.type}</p>
                  <p className="text-sm text-ink">{meal.name}</p>
                </div>
                <button onClick={() => removeMeal(idx)} className="text-ink-30 hover:text-rose-300">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-ink-70 flex items-center gap-2">
            <Pill size={16} /> Supplements & medicines
          </p>
          <button
            onClick={() => setSupplementOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        {supplements.length === 0 ? (
          <EmptyState icon={Pill} title="No supplements added" subtitle="Add iron, hair vitamins, or any daily supplement here." />
        ) : (
          <div className="flex flex-col gap-2">
            {supplements.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 bg-ink-5 rounded-xl px-4 py-2.5">
                <button
                  onClick={() => toggleSupplementTaken(s.id)}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    s.taken
                      ? "bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] border-transparent"
                      : "border-ink-30"
                  }`}
                >
                  {s.taken && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
                <div className="flex-1">
                  <p className="text-sm text-ink font-medium">{s.name}</p>
                  <p className="text-xs text-ink-50">
                    {s.dose} • {s.time}
                  </p>
                </div>
                <button onClick={() => removeSupplement(s.id)} className="text-ink-30 hover:text-rose-300">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-start gap-2 mt-3 text-ink-40">
          <Info size={13} className="mt-0.5 shrink-0" />
          <p className="text-[11px]">Personal tracker only — not medical advice. Consult a doctor for treatment decisions.</p>
        </div>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3">Diet notes</p>
        <Textarea
          rows={3}
          placeholder="Anything about today's meals..."
          value={todayEntry.notes}
          onChange={(e) => updateToday({ notes: e.target.value })}
        />
      </GlassCard>

      <Modal open={open} onClose={() => setOpen(false)} title="Add meal">
        <div className="flex flex-col gap-3">
          <div>
            <Label>Meal type</Label>
            <Select value={mealForm.type} onChange={(e) => setMealForm({ ...mealForm, type: e.target.value })}>
              {MEAL_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>What did you eat?</Label>
            <Input
              value={mealForm.name}
              onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
              placeholder="e.g. Grilled chicken salad"
            />
          </div>
          <PrimaryButton onClick={addMeal} className="mt-2">Add meal</PrimaryButton>
        </div>
      </Modal>

      <Modal open={supplementOpen} onClose={() => setSupplementOpen(false)} title="Add supplement">
        <div className="flex flex-col gap-3">
          <div>
            <Label>Name</Label>
            <Input
              value={supplementForm.name}
              onChange={(e) => setSupplementForm({ ...supplementForm, name: e.target.value })}
              placeholder="Iron Supplement"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Dose</Label>
              <Input
                value={supplementForm.dose}
                onChange={(e) => setSupplementForm({ ...supplementForm, dose: e.target.value })}
                placeholder="1 capsule"
              />
            </div>
            <div>
              <Label>Time</Label>
              <Input
                value={supplementForm.time}
                onChange={(e) => setSupplementForm({ ...supplementForm, time: e.target.value })}
                placeholder="08:00 AM"
              />
            </div>
          </div>
          <div>
            <Label>Notes (optional)</Label>
            <Textarea
              rows={2}
              value={supplementForm.notes}
              onChange={(e) => setSupplementForm({ ...supplementForm, notes: e.target.value })}
            />
          </div>
          <PrimaryButton onClick={addSupplement} className="mt-2">Add supplement</PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
