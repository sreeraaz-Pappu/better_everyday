import {
  Sparkles,
  CalendarCheck,
  Ruler,
  Apple,
  Dumbbell,
  ListChecks,
  History,
  Wand2,
  Settings,
} from "lucide-react";

export const navItems = [
  { to: "/", label: "Dashboard", icon: Sparkles },
  { to: "/checkin", label: "Check-in", icon: CalendarCheck },
  { to: "/body", label: "Body", icon: Ruler },
  { to: "/diet", label: "Diet", icon: Apple },
  { to: "/gym", label: "Gym", icon: Dumbbell },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/history", label: "History", icon: History },
  { to: "/ai-summary", label: "AI Summary", icon: Wand2 },
  { to: "/settings", label: "Settings", icon: Settings },
];
