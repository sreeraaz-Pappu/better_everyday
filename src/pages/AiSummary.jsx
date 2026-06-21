import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Sparkles, TrendingUp, ThumbsUp, AlertCircle, Gauge, Heart } from "lucide-react";
import { useLocalData } from "../hooks/useLocalData";
import { mockAiSummary } from "../data/mockData";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import ProgressRing from "../components/ui/ProgressRing";

export default function AiSummary() {
  const [summary] = useLocalData("aiSummary", mockAiSummary);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  function generate() {
    setRevealed(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRevealed(true);
    }, 2000);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <PageHeader icon={Wand2} title="AI Summary" subtitle="A gentle look at your week, powered by mock AI" />

      <GlassCard className="flex flex-col items-center text-center gap-4 py-8">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center">
          <Sparkles size={24} className="text-white" />
        </div>
        <p className="text-ink-60 text-sm max-w-sm">
          Generate a personalized summary of your habits, mood and progress this week.
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={generate}
          disabled={loading}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white font-medium flex items-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
              />
              Generating...
            </>
          ) : (
            <>
              <Wand2 size={16} /> Generate AI Summary
            </>
          )}
        </motion.button>
      </GlassCard>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            <GlassCard>
              <p className="text-xs text-[var(--accent-3)] mb-1 flex items-center gap-1.5">
                <TrendingUp size={14} /> Previous You vs Present You
              </p>
              <p className="text-sm text-ink-80">{summary.comparison}</p>
            </GlassCard>

            <GlassCard>
              <p className="text-xs text-[var(--accent-3)] mb-1 flex items-center gap-1.5">
                <Sparkles size={14} /> This week's improvement
              </p>
              <p className="text-sm text-ink-80">{summary.weeklyImprovement}</p>
            </GlassCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassCard>
                <p className="text-xs text-emerald-300 mb-2 flex items-center gap-1.5">
                  <ThumbsUp size={14} /> Things going well
                </p>
                <ul className="text-sm text-ink-80 flex flex-col gap-1.5">
                  {summary.goingWell.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-emerald-300 mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard>
                <p className="text-xs text-amber-300 mb-2 flex items-center gap-1.5">
                  <AlertCircle size={14} /> Things to improve
                </p>
                <ul className="text-sm text-ink-80 flex flex-col gap-1.5">
                  {summary.toImprove.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-amber-300 mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            <GlassCard className="flex items-center gap-4">
              <ProgressRing value={summary.consistencyScore} size={100} stroke={9} label="consistency" />
              <div>
                <p className="text-xs text-ink-50 flex items-center gap-1.5 mb-1">
                  <Gauge size={14} /> Consistency score
                </p>
                <p className="text-sm text-ink-70">
                  You're showing up for yourself more often this week. Keep that momentum going!
                </p>
              </div>
            </GlassCard>

            <GlassCard className="flex items-center gap-3 bg-gradient-to-r from-[var(--accent-1)]/15 to-[var(--accent-2)]/15">
              <Heart size={20} className="text-[var(--accent-1)] shrink-0" />
              <p className="text-sm text-white italic">{summary.motivation}</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
