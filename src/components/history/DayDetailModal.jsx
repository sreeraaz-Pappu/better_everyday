import {
  CalendarCheck,
  Ruler,
  Apple,
  Dumbbell,
  ListChecks,
  Wand2,
  GlassWater,
  Moon,
  Pill,
} from "lucide-react";
import Modal from "../ui/Modal";
import { formatLong } from "../../utils/date";
import { computeWellnessScore } from "../../utils/wellness";
import { getCheckinIcon } from "../../utils/checkinIcons";

const moodEmoji = { Happy: "😊", Tired: "😴", Stressed: "😣", Calm: "😌", Energetic: "⚡" };

function Section({ icon: Icon, title, hasData, children }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-sm text-ink-70 font-medium flex items-center gap-2 mb-3">
        <Icon size={16} /> {title}
      </p>
      {hasData ? children : <p className="text-sm text-ink-40">No data recorded</p>}
    </div>
  );
}

export default function DayDetailModal({
  date,
  onClose,
  checkins,
  checkinItems,
  body,
  diet,
  supplements,
  workouts,
  tasks,
}) {
  const checkin = checkins.find((c) => c.date === date);
  const bodyEntry = body.find((b) => b.date === date);
  const dietEntry = diet.find((d) => d.date === date);
  const workout = workouts.find((w) => w.date === date);
  const dayTasks = tasks.filter((t) => t.date === date);
  const score = checkin ? computeWellnessScore(checkin) : null;

  const hasDiet = !!dietEntry;
  const hasGym = !!workout && workout.exercises.length > 0;

  return (
    <Modal open={!!date} onClose={onClose} title={date ? formatLong(date) : ""} className="max-w-2xl">
      {date && (
        <div className="flex flex-col gap-4">
          {checkin && (
            <div className="flex items-center justify-between bg-ink-5 rounded-2xl px-4 py-3">
              <span className="text-sm text-ink-70">Daily wellness score</span>
              <span className="text-lg font-display text-ink">{score}/100</span>
            </div>
          )}

          <Section icon={CalendarCheck} title="Check-in" hasData={!!checkin}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-4 text-sm text-ink-70">
                <span className="flex items-center gap-1.5">
                  {moodEmoji[checkin?.mood] || "🙂"} {checkin?.mood || "No mood logged"}
                </span>
                <span className="flex items-center gap-1.5">
                  <GlassWater size={14} /> {checkin?.water ?? 0} glasses
                </span>
                <span className="flex items-center gap-1.5">
                  <Moon size={14} /> {checkin?.sleep ?? 0} hrs sleep
                </span>
              </div>
              {checkinItems.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {checkinItems.map((item) => {
                    const Icon = getCheckinIcon(item.icon);
                    const done = !!checkin?.[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${
                          done ? "bg-ink-10 text-ink" : "bg-ink-5 text-ink-40"
                        }`}
                      >
                        <Icon size={14} />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              )}
              {checkin?.notes && <p className="text-sm text-ink-60 italic">"{checkin.notes}"</p>}
            </div>
          </Section>

          <Section icon={Ruler} title="Body" hasData={!!bodyEntry}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-ink-40 text-xs">Weight</p>
                <p className="text-ink">{bodyEntry?.weight} kg</p>
              </div>
              <div>
                <p className="text-ink-40 text-xs">Waist</p>
                <p className="text-ink">{bodyEntry?.waist} cm</p>
              </div>
              <div>
                <p className="text-ink-40 text-xs">Hip</p>
                <p className="text-ink">{bodyEntry?.hip} cm</p>
              </div>
              <div>
                <p className="text-ink-40 text-xs">Chest</p>
                <p className="text-ink">{bodyEntry?.chest} cm</p>
              </div>
              <div>
                <p className="text-ink-40 text-xs">Body Fat</p>
                <p className="text-ink">{bodyEntry?.bodyFat ?? "—"}%</p>
              </div>
            </div>
          </Section>

          <Section icon={Apple} title="Diet" hasData={hasDiet || supplements.length > 0}>
            <div className="flex flex-col gap-3">
              {hasDiet && (
                <>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-ink-40 text-xs">Protein</p>
                      <p className="text-ink">
                        {dietEntry.proteinConsumed}g / {dietEntry.proteinGoal}g
                      </p>
                    </div>
                    <div>
                      <p className="text-ink-40 text-xs">Fiber</p>
                      <p className="text-ink">
                        {dietEntry.fiberConsumed}g / {dietEntry.fiberGoal}g
                      </p>
                    </div>
                    {dietEntry.calories > 0 && (
                      <div>
                        <p className="text-ink-40 text-xs">Calories</p>
                        <p className="text-ink">{dietEntry.calories}</p>
                      </div>
                    )}
                  </div>
                  {dietEntry.meals.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                      {dietEntry.meals.map((meal, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm bg-ink-5 rounded-xl px-3 py-2">
                          <span className="text-[var(--accent-3)] text-xs">{meal.type}</span>
                          <span className="text-ink-80">{meal.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-ink-40">No meals logged.</p>
                  )}
                  {dietEntry.notes && <p className="text-sm text-ink-60 italic">"{dietEntry.notes}"</p>}
                </>
              )}
              {supplements.length > 0 && (
                <div>
                  <p className="text-xs text-ink-40 flex items-center gap-1.5 mb-1.5">
                    <Pill size={12} /> Supplements (current list)
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {supplements.map((s) => (
                      <div key={s.id} className="flex items-center justify-between text-sm bg-ink-5 rounded-xl px-3 py-2">
                        <span className="text-ink-80">{s.name}</span>
                        <span className={s.taken ? "text-emerald-300 text-xs" : "text-ink-40 text-xs"}>
                          {s.taken ? "Taken" : "Not taken"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          <Section icon={Dumbbell} title="Gym" hasData={hasGym}>
            <div className="flex flex-col gap-1.5">
              {workout?.exercises.map((e) => (
                <div key={e.id} className="flex items-center justify-between text-sm bg-ink-5 rounded-xl px-3 py-2">
                  <span className="text-ink">{e.name}</span>
                  <span className="text-ink-50 text-xs">
                    {e.sets} sets × {e.reps} reps{e.weight ? ` @ ${e.weight}kg` : ""}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={ListChecks} title="Tasks" hasData={dayTasks.length > 0}>
            <div className="flex flex-col gap-1.5">
              {dayTasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between text-sm bg-ink-5 rounded-xl px-3 py-2">
                  <span className={t.completed ? "text-ink-40 line-through" : "text-ink"}>{t.text}</span>
                  <span className="text-xs text-ink-50">{t.category}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Wand2} title="AI Summary" hasData={false} />
        </div>
      )}
    </Modal>
  );
}
