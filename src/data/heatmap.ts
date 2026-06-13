import type { HeatmapDay } from '@/types';

/**
 * Placeholder activity heatmap — last 16 weeks (most recent last), 7 rows
 * (Mon–Sun). Values are baked-in so the calendar always looks "lived-in".
 */
const WEEKS = 16;
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// A fixed pseudo-pattern (no Math.random — stays stable across reloads).
function intensityFor(week: number, day: number): HeatmapDay['intensity'] {
  const v = (week * 7 + day * 3 + ((week * day) % 5)) % 11;
  if (v < 3) return 0;
  if (v < 5) return 1;
  if (v < 7) return 2;
  if (v < 9) return 3;
  return 4;
}

export const heatmapWeeks: HeatmapDay[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => ({
    label: DAY_LABELS[d],
    intensity: intensityFor(w, d),
  })),
);

export const heatmapDayLabels = DAY_LABELS;
