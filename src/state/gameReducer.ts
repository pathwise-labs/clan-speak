import type { LessonProgress, LessonStatus } from '@/types';
import { shopItems } from '@/data/shopItems';
import { createInitialState, MAX_HEARTS, START_GEMS } from './initialState';
import { evaluateAchievements, nextLessonId } from './selectors';
import type { GameAction, GameState } from './gameTypes';

const GEMS_PER_LESSON = 10;
const PERFECT_GEM_BONUS = 5;

/** Resolve the new node status after a completion, never downgrading. */
function nextStatus(prev: LessonStatus, accuracy: number, completions: number): LessonStatus {
  const perfect = accuracy === 100;
  if (perfect && completions >= 3) return 'legendary';
  if (perfect) return 'gold';
  if (prev === 'gold' || prev === 'legendary') return prev; // keep earned glory
  return 'completed';
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'FINISH_ONBOARDING': {
      const { name, avatarId, level, goal } = action.payload;
      return {
        ...state,
        user: { ...state.user, name: name.trim() || 'Caraid', avatarId, level, goal, onboarded: true },
        stats: { ...state.stats, streakDays: 1, longestStreak: Math.max(1, state.stats.longestStreak) },
      };
    }

    case 'START_LESSON': {
      const { lessonId } = action.payload;
      const prev = state.progress[lessonId];
      const progress =
        prev && prev.status === 'available'
          ? { ...state.progress, [lessonId]: { ...prev, status: 'inProgress' as LessonStatus } }
          : state.progress;
      return { ...state, progress, activeLesson: { lessonId, status: 'running' } };
    }

    case 'LOSE_HEART':
      return { ...state, stats: { ...state.stats, hearts: Math.max(0, state.stats.hearts - 1) } };

    case 'REFILL_HEARTS':
      return { ...state, stats: { ...state.stats, hearts: state.stats.maxHearts } };

    case 'COMPLETE_LESSON': {
      const result = action.payload;
      const prev: LessonProgress = state.progress[result.lessonId] ?? {
        status: 'available',
        bestAccuracy: 0,
        completions: 0,
      };
      const isNewLesson = prev.completions === 0;
      const completions = prev.completions + 1;
      const updated: LessonProgress = {
        status: nextStatus(prev.status, result.accuracy, completions),
        bestAccuracy: Math.max(prev.bestAccuracy, result.accuracy),
        completions,
      };

      const progress = { ...state.progress, [result.lessonId]: updated };

      // Unlock the next node the first time this lesson is cleared.
      if (isNewLesson) {
        const nextId = nextLessonId(result.lessonId);
        if (nextId && progress[nextId]?.status === 'locked') {
          progress[nextId] = { ...progress[nextId], status: 'available' };
        }
      }

      const gemsEarned = GEMS_PER_LESSON + (result.accuracy === 100 ? PERFECT_GEM_BONUS : 0);
      const streakDays = isNewLesson ? state.stats.streakDays + 1 : state.stats.streakDays;

      const stats = {
        ...state.stats,
        xp: state.stats.xp + result.xpEarned,
        gems: state.stats.gems + gemsEarned,
        streakDays,
        longestStreak: Math.max(state.stats.longestStreak, streakDays),
        doubleXpActive: false, // boost consumed
      };

      const league = { ...state.league, weeklyXp: state.league.weeklyXp + result.xpEarned };

      const partial: GameState = {
        ...state,
        progress,
        stats,
        league,
        activeLesson: { lessonId: result.lessonId, status: 'complete', result },
      };

      return { ...partial, unlockedAchievements: evaluateAchievements(partial, { result }) };
    }

    case 'CLOSE_LESSON':
      return { ...state, activeLesson: null };

    case 'BUY_ITEM': {
      const item = shopItems.find((i) => i.id === action.payload.itemId);
      if (!item || state.stats.gems < item.price) return state;
      const stats = { ...state.stats, gems: state.stats.gems - item.price };
      if (item.id === 'streak_freeze') stats.streakFreezes += 1;
      if (item.id === 'heart_refill') stats.hearts = stats.maxHearts;
      if (item.id === 'double_xp') stats.doubleXpActive = true;
      const partial = { ...state, stats };
      return { ...partial, unlockedAchievements: evaluateAchievements(partial, { bought: true }) };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'SET_THEME':
      return { ...state, settings: { ...state.settings, theme: action.payload } };

    case 'RESET_PROGRESS': {
      const fresh = createInitialState();
      return {
        ...fresh,
        // keep who you are and how you like the app
        user: { ...state.user },
        settings: { ...state.settings },
        stats: { ...fresh.stats, gems: START_GEMS, maxHearts: MAX_HEARTS },
      };
    }

    default:
      return state;
  }
}
