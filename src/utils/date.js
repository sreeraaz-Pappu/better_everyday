export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export function formatPretty(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export function formatLong(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function daysBetween(iso, fromIso = todayISO()) {
  const a = new Date(iso + "T00:00:00");
  const b = new Date(fromIso + "T00:00:00");
  return Math.round((b - a) / 86400000);
}
