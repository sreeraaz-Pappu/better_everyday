import { isoDaysAgo } from "../utils/date";

export const MOODS = ["Happy", "Tired", "Stressed", "Calm", "Energetic", "Neutral", "Sleepy"];

export const TASK_CATEGORIES = ["Health", "Study", "Personal", "Beauty", "Random"];

export const DEFAULT_CHECKIN_ITEMS = [
  { id: "gym", label: "Gym", icon: "Dumbbell" },
  { id: "protein", label: "Protein", icon: "Beef" },
  { id: "fiber", label: "Fiber", icon: "Wheat" },
  { id: "hair", label: "Hair", icon: "Sparkles" },
  { id: "skin", label: "Skin", icon: "Droplet" },
];

const moodCycle = ["Happy", "Energetic", "Tired", "Calm", "Happy", "Stressed", "Calm", "Energetic", "Happy", "Tired", "Calm", "Energetic", "Happy", "Stressed"];

export const mockCheckins = Array.from({ length: 14 }, (_, i) => {
  const dayIndex = 13 - i;
  return {
    date: isoDaysAgo(dayIndex),
    gym: dayIndex % 2 === 0 || dayIndex === 0,
    protein: dayIndex % 3 !== 0,
    tasks: dayIndex % 4 !== 1,
    water: parseFloat((1.0 + (dayIndex % 5) * 0.25).toFixed(2)),
    sleep: 6 + ((dayIndex % 4) * 0.5),
    mood: moodCycle[i],
    notes: dayIndex === 0 ? "Feeling soft and glowy today ✨" : "",
  };
});

export const mockBody = [
  { date: isoDaysAgo(28), weight: 64.5, height: 165, waist: 71, hip: 96, chest: 88, bodyFat: 27 },
  { date: isoDaysAgo(21), weight: 64.0, height: 165, waist: 70.5, hip: 95.5, chest: 88, bodyFat: 26.5 },
  { date: isoDaysAgo(14), weight: 63.4, height: 165, waist: 69.8, hip: 95, chest: 87.5, bodyFat: 26 },
  { date: isoDaysAgo(7), weight: 63.0, height: 165, waist: 69, hip: 94.5, chest: 87.5, bodyFat: 25.4 },
  { date: isoDaysAgo(0), weight: 62.4, height: 165, waist: 68.2, hip: 94, chest: 87, bodyFat: 24.8 },
];

export const mockDiet = Array.from({ length: 7 }, (_, i) => {
  const dayIndex = 6 - i;
  return {
    date: isoDaysAgo(dayIndex),
    proteinGoal: 70,
    proteinConsumed: 55 + (dayIndex % 5) * 8,
    fiberGoal: 25,
    fiberConsumed: 14 + (dayIndex % 4) * 5,
    calories: 1500 + (dayIndex % 4) * 120,
    meals: [
      { type: "Breakfast", name: dayIndex % 2 === 0 ? "Greek yogurt + berries" : "Paneer paratha" },
      { type: "Lunch", name: "Dal, rice & salad" },
      { type: "Snacks", name: "Protein shake + almonds" },
      { type: "Dinner", name: dayIndex % 3 === 0 ? "Grilled chicken & veggies" : "Tofu stir fry" },
    ],
    notes: "",
  };
});

export const mockWorkouts = [
  {
    date: isoDaysAgo(2),
    exercises: [
      { id: "e1", name: "Squats", sets: 3, reps: 12, weight: 20 },
      { id: "e2", name: "Lunges", sets: 3, reps: 10, weight: null },
    ],
  },
  {
    date: isoDaysAgo(1),
    exercises: [
      { id: "e3", name: "Push-ups", sets: 3, reps: 15, weight: null },
      { id: "e4", name: "Plank", sets: 3, reps: 1, weight: null },
    ],
  },
];

export const mockMedicines = [
  { id: "m1", name: "Vitamin D3", dose: "1 tablet", time: "08:00 AM", taken: true, notes: "With breakfast" },
  { id: "m2", name: "Iron Supplement", dose: "1 capsule", time: "01:00 PM", taken: false, notes: "After lunch" },
  { id: "m3", name: "Omega 3", dose: "2 softgels", time: "08:30 PM", taken: false, notes: "" },
];

export const mockTasks = [
  { id: "t1", text: "Drink 2L water", category: "Health", completed: true, date: isoDaysAgo(0) },
  { id: "t2", text: "Read 10 pages", category: "Study", completed: false, date: isoDaysAgo(0) },
  { id: "t3", text: "Skincare routine", category: "Beauty", completed: true, date: isoDaysAgo(0) },
  { id: "t4", text: "Call mom", category: "Personal", completed: false, date: isoDaysAgo(0) },
  { id: "t5", text: "Declutter desk", category: "Random", completed: false, date: isoDaysAgo(0) },
];

export const mockSettings = {
  profileName: "Glow Girl",
  theme: "dark",
  accent: "rose",
};

export const mockAiSummary = {
  comparison:
    "Compared to last week, your present routine looks more consistent and balanced overall.",
  weeklyImprovement:
    "You completed gym 4 times this week, improved protein intake by 15%, and stayed on top of your tasks.",
  goingWell: ["Consistent gym sessions", "Better protein intake", "Skincare routine on point"],
  toImprove: ["Sleep is a little inconsistent", "Water intake dipped midweek"],
  consistencyScore: 82,
  motivation: "You're glowing harder than last month, keep showing up for yourself 💗",
};
