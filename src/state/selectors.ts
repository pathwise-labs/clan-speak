import type { AchievementId, LeagueUser, LessonResult } from '@/types';
import { allLessons, lessonOrder, units } from '@/data/units';
import { achievements } from '@/data/achievements';
import { leaderboardSeed } from '@/data/leaderboard';
import { levelFromXp, type LevelInfo } from '@/utils/xp';
import type { GameState } from './gameTypes';

export function levelInfo(state: GameState): LevelInfo {
  return levelFromXp(state.stats.xp);
}

/** The lesson the learner is currently on — first available/in-progress node. */
export function currentLessonId(state: GameState): string | null {
  for (const id of lessonOrder) {
    const s = state.progress[id]?.status;
    if (s === 'available' || s === 'inProgress') return id;
  }
  return null;
}

export function nextLessonId(lessonId: string): string | null {
  const i = lessonOrder.indexOf(lessonId);
  return i >= 0 && i < lessonOrder.length - 1 ? lessonOrder[i + 1] : null;
}

export interface UnitCompletion {
  completed: number;
  total: number;
  done: boolean;
}

export function unitCompletion(unitId: string, state: GameState): UnitCompletion {
  const unit = units.find((u) => u.id === unitId);
  if (!unit) return { completed: 0, total: 0, done: false };
  const total = unit.lessons.length;
  const completed = unit.lessons.filter((l) => (state.progress[l.id]?.completions ?? 0) > 0).length;
  return { completed, total, done: completed === total };
}

export function totalLessonsCompleted(state: GameState): number {
  return allLessons.filter((l) => (state.progress[l.id]?.completions ?? 0) > 0).length;
}

export function anyUnitComplete(state: GameState): boolean {
  return units.some((u) => unitCompletion(u.id, state).done);
}

/** Leaderboard with the live current-user XP merged in and re-sorted. */
export function leaderboardRanked(state: GameState): LeagueUser[] {
  const rows = leaderboardSeed.map((u) =>
    u.isCurrentUser
      ? { ...u, name: state.user.name || 'You', avatarId: state.user.avatarId, weeklyXp: state.league.weeklyXp }
      : u,
  );
  return rows.sort((a, b) => b.weeklyXp - a.weeklyXp);
}

/** Compute the full set of achievement ids the player should now have. */
export function evaluateAchievements(
  state: GameState,
  ctx?: { result?: LessonResult; bought?: boolean },
): AchievementId[] {
  const have = new Set(state.unlockedAchievements);
  const add = (id: AchievementId, cond: boolean) => {
    if (cond) have.add(id);
  };
  const lessonsDone = totalLessonsCompleted(state);

  add('first_lesson', lessonsDone >= 1);
  add('streak_3', state.stats.streakDays >= 3);
  add('streak_7', state.stats.streakDays >= 7);
  add('xp_100', state.stats.xp >= 100);
  add('xp_500', state.stats.xp >= 500);
  add('unit_1', anyUnitComplete(state));
  if (ctx?.result) {
    add('perfect', ctx.result.accuracy === 100 && !ctx.result.outOfHearts);
    add('combo_5', ctx.result.maxCombo >= 5);
  }
  if (ctx?.bought) add('shopper', true);

  // keep only known achievements, stable order
  return achievements.map((a) => a.id).filter((id) => have.has(id));
}
