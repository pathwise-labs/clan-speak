import type {
  AchievementId,
  ActiveLesson,
  AvatarId,
  GamificationState,
  GoalChoice,
  LeagueState,
  LessonProgress,
  LessonResult,
  LevelChoice,
  Settings,
  ShopItemId,
  ThemeName,
  UserProfile,
} from '@/types';
import type { LessonId } from '@/types';

export interface GameState {
  version: number;
  user: UserProfile;
  stats: GamificationState;
  progress: Record<LessonId, LessonProgress>;
  league: LeagueState;
  settings: Settings;
  unlockedAchievements: AchievementId[];
  /** Transient overlay driver — never persisted. */
  activeLesson: ActiveLesson | null;
}

export type GameAction =
  | {
      type: 'FINISH_ONBOARDING';
      payload: { name: string; avatarId: AvatarId; level: LevelChoice; goal: GoalChoice };
    }
  | { type: 'START_LESSON'; payload: { lessonId: LessonId } }
  | { type: 'LOSE_HEART' }
  | { type: 'REFILL_HEARTS' }
  | { type: 'COMPLETE_LESSON'; payload: LessonResult }
  | { type: 'CLOSE_LESSON' }
  | { type: 'BUY_ITEM'; payload: { itemId: ShopItemId } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'SET_THEME'; payload: ThemeName }
  | { type: 'RESET_PROGRESS' };
