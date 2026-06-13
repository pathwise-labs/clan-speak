/* XP / level maths and the combo multiplier. Pure, testable helpers. */

/** XP needed to reach each level. Level 1 starts at 0. */
const LEVEL_STEP = 100;
const LEVEL_GROWTH = 1.18;

/** Cumulative XP threshold required to be AT a given level (1-indexed). */
export function xpForLevel(level: number): number {
  let total = 0;
  for (let l = 1; l < level; l++) {
    total += Math.round(LEVEL_STEP * Math.pow(LEVEL_GROWTH, l - 1));
  }
  return total;
}

export interface LevelInfo {
  level: number;
  /** XP into the current level. */
  intoLevel: number;
  /** XP span of the current level. */
  levelSpan: number;
  /** 0..1 progress through the current level. */
  progress: number;
  xpToNext: number;
}

export function levelFromXp(xp: number): LevelInfo {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const levelSpan = next - base;
  const intoLevel = xp - base;
  return {
    level,
    intoLevel,
    levelSpan,
    progress: levelSpan === 0 ? 0 : intoLevel / levelSpan,
    xpToNext: next - xp,
  };
}

/**
 * Combo multiplier: every 3 consecutive correct answers steps the multiplier up
 * (1× → 1.5× → 2× → 2.5×, capped at 3×). `combo` is the count of consecutive
 * correct answers BEFORE this one.
 */
export function comboMultiplier(combo: number): number {
  const steps = Math.floor(combo / 3);
  return Math.min(3, 1 + steps * 0.5);
}

/** XP awarded for a single correct answer given base XP and current combo. */
export function xpForAnswer(baseXp: number, combo: number, doubleXp: boolean): number {
  const mult = comboMultiplier(combo) * (doubleXp ? 2 : 1);
  return Math.round(baseXp * mult);
}
