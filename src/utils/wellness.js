export function computeWellnessScore(checkin) {
  if (!checkin) return 0;
  let score = 0;
  if (checkin.gym) score += 20;
  if (checkin.protein) score += 20;
  if (checkin.tasks) score += 15;
  if (checkin.medicine) score += 15;
  score += Math.min(checkin.water || 0, 8) / 8 * 15;
  score += Math.min(checkin.sleep || 0, 8) / 8 * 15;
  return Math.round(score);
}
