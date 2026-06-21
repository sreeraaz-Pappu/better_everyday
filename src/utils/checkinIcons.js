import {
  Dumbbell,
  Beef,
  Wheat,
  Sparkles,
  Droplet,
  Pill,
  CircleCheck,
} from "lucide-react";

export const CHECKIN_ICONS = {
  Dumbbell,
  Beef,
  Wheat,
  Sparkles,
  Droplet,
  Pill,
};

export function getCheckinIcon(name) {
  return CHECKIN_ICONS[name] || CircleCheck;
}
