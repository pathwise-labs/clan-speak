import type { LessonProgress } from '@/types';
import { firstLessonId, lessonOrder } from '@/data/units';
import type { GameState } from './gameTypes';

export const STATE_VERSION = 1;
export const MAX_HEARTS = 5;
export const START_GEMS = 250;

/** Fresh per-lesson progress: only the first lesson is available. */
export function freshProgress(): Record<string, LessonProgress> {
  const map: Record<string, LessonProgress> = {};
  for (const id of lessonOrder) {
    map[id] = { status: 'locked', bestAccuracy: 0, completions: 0 };
  }
  if (firstLessonId) map[firstLessonId].status = 'available';
  return map;
}

/** A brand-new player who has NOT yet been through onboarding. */
export function createInitialState(): GameState {
  return {
    version: STATE_VERSION,
    user: {
      name: '',
      avatarId: 'cow',
      level: 'beginner',
      goal: 'regular',
      onboarded: false,
      joinedLabel: 'June 2026',
    },
    stats: {
      xp: 0,
      gems: START_GEMS,
      hearts: MAX_HEARTS,
      maxHearts: MAX_HEARTS,
      streakDays: 0,
      longestStreak: 0,
      streakFreezes: 0,
      doubleXpActive: false,
    },
    progress: freshProgress(),
    league: { tier: 'Bronze', weeklyXp: 0 },
    settings: {
      sound: true,
      haptics: true,
      reminderOn: true,
      reminderTime: '19:00',
      theme: 'light',
    },
    unlockedAchievements: [],
    activeLesson: null,
  };
}
