import { isSundayISO } from "./date";

export function computeWellnessScore(checkin) {
  if (!checkin) return 0;
  if (checkin.date && isSundayISO(checkin.date)) return null;
  let score = 0;
  if (checkin.gym) score += 25;
  if (checkin.protein) score += 25;
  if (checkin.tasks) score += 20;
  score += Math.min(checkin.water || 0, 3) / 3 * 15;
  score += Math.min(checkin.sleep || 0, 8) / 8 * 15;
  return Math.round(score);
}

export function isRestDay(checkin) {
  return checkin?.date && isSundayISO(checkin.date);
}
