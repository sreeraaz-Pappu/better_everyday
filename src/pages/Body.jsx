import { useState } from "react";
import { Ruler, Camera, Plus, TrendingDown, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useLocalData } from "../hooks/useLocalData";
import { todayISO, formatPretty } from "../utils/date";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import Modal from "../components/ui/Modal";
import { Label, Input, PrimaryButton } from "../components/ui/Field";
import EmptyState from "../components/ui/EmptyState";

const emptyForm = { weight: "", height: "", waist: "", hip: "", chest: "", bodyFat: "" };

export default function Body() {
  const [entries, setEntries] = useLocalData("body", []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const sorted = [...entries].sort((a, b) => (a.date < b.date ? -1 : 1));
  const latest = sorted[sorted.length - 1];
  const prev = sorted[sorted.length - 2];
  const diff = latest && prev ? +(latest.weight - prev.weight).toFixed(1) : 0;

  const chartData = sorted.map((e) => ({ date: formatPretty(e.date), weight: e.weight }));

  function handleAdd() {
    if (!form.weight) return;
    const entry = {
      date: todayISO(),
      weight: parseFloat(form.weight) || 0,
      height: parseFloat(form.height) || latest?.height || 0,
      waist: parseFloat(form.waist) || 0,
      hip: parseFloat(form.hip) || 0,
      chest: parseFloat(form.chest) || 0,
      bodyFat: form.bodyFat ? parseFloat(form.bodyFat) : null,
    };
    setEntries((prevEntries) => [...prevEntries.filter((e) => e.date !== entry.date), entry]);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        icon={Ruler}
        title="Body & Physical Features"
        subtitle="Track your measurements over time"
        action={
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white text-sm flex items-center gap-1.5"
          >
            <Plus size={16} /> Add update
          </button>
        }
      />

      {latest ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard className="flex flex-col items-center">
            <p className="text-xs text-ink-50">Weight</p>
            <p className="text-xl font-display text-ink">{latest.weight} kg</p>
            {diff !== 0 && (
              <span className={`text-xs flex items-center gap-1 ${diff < 0 ? "text-emerald-300" : "text-rose-300"}`}>
                {diff < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                {Math.abs(diff)} kg
              </span>
            )}
          </GlassCard>
          <GlassCard className="flex flex-col items-center">
            <p className="text-xs text-ink-50">Waist</p>
            <p className="text-xl font-display text-ink">{latest.waist} cm</p>
          </GlassCard>
          <GlassCard className="flex flex-col items-center">
            <p className="text-xs text-ink-50">Hip</p>
            <p className="text-xl font-display text-ink">{latest.hip} cm</p>
          </GlassCard>
          <GlassCard className="flex flex-col items-center">
            <p className="text-xs text-ink-50">Body Fat</p>
            <p className="text-xl font-display text-ink">{latest.bodyFat ?? "—"}%</p>
          </GlassCard>
        </div>
      ) : (
        <EmptyState icon={Ruler} title="No body data yet" subtitle="Add your first measurement update to start tracking progress." />
      )}

      {chartData.length > 1 && (
        <GlassCard>
          <p className="text-sm text-ink-70 mb-3">Weight progress</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(128,128,128,0.25)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(128,128,128,0.7)" fontSize={11} />
                <YAxis stroke="rgba(128,128,128,0.7)" fontSize={11} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ background: "var(--tooltip-bg)", border: "1px solid rgba(var(--ink), 0.1)", borderRadius: 12 }}
                  labelStyle={{ color: "rgb(var(--ink))" }}
                />
                <Line type="monotone" dataKey="weight" stroke="var(--accent-1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      )}

      <GlassCard>
        <p className="text-sm text-ink-70 mb-3 flex items-center gap-2">
          <Camera size={16} /> Progress photo
        </p>
        <div className="border-2 border-dashed border-ink-15 rounded-2xl py-10 flex flex-col items-center gap-2 text-ink-40">
          <Camera size={28} />
          <p className="text-sm">Photo upload coming soon</p>
        </div>
      </GlassCard>

      <GlassCard className="overflow-x-auto">
        <p className="text-sm text-ink-70 mb-3">History</p>
        {sorted.length === 0 ? (
          <p className="text-sm text-ink-40">No entries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-ink-40 text-left">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Weight</th>
                <th className="py-2 pr-4">Waist</th>
                <th className="py-2 pr-4">Hip</th>
                <th className="py-2 pr-4">Chest</th>
                <th className="py-2 pr-4">Body Fat</th>
              </tr>
            </thead>
            <tbody>
              {[...sorted].reverse().map((e) => (
                <tr key={e.date} className="border-t border-ink-5 text-ink-80">
                  <td className="py-2 pr-4">{formatPretty(e.date)}</td>
                  <td className="py-2 pr-4">{e.weight} kg</td>
                  <td className="py-2 pr-4">{e.waist} cm</td>
                  <td className="py-2 pr-4">{e.hip} cm</td>
                  <td className="py-2 pr-4">{e.chest} cm</td>
                  <td className="py-2 pr-4">{e.bodyFat ?? "—"}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>

      <Modal open={open} onClose={() => setOpen(false)} title="Add body update">
        <div className="flex flex-col gap-3">
          <div>
            <Label>Weight (kg)</Label>
            <Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="62.5" />
          </div>
          <div>
            <Label>Height (cm)</Label>
            <Input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} placeholder="165" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Waist</Label>
              <Input type="number" value={form.waist} onChange={(e) => setForm({ ...form, waist: e.target.value })} />
            </div>
            <div>
              <Label>Hip</Label>
              <Input type="number" value={form.hip} onChange={(e) => setForm({ ...form, hip: e.target.value })} />
            </div>
            <div>
              <Label>Chest</Label>
              <Input type="number" value={form.chest} onChange={(e) => setForm({ ...form, chest: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Body fat % (optional)</Label>
            <Input type="number" value={form.bodyFat} onChange={(e) => setForm({ ...form, bodyFat: e.target.value })} />
          </div>
          <PrimaryButton onClick={handleAdd} className="mt-2">Save update</PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
