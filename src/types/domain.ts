/* ==========================================================================
   Domain types — the player, gamification, settings, and meta content.
   ========================================================================== */

import type { LessonId } from './content';

export type GoalChoice = 'casual' | 'regular' | 'serious';
export type LevelChoice = 'beginner' | 'some';
export type ThemeName = 'light' | 'dark';
export type AvatarId = 'cow' | 'stag' | 'fox' | 'seal' | 'owl' | 'thistle';

export interface UserProfile {
  name: string;
  avatarId: AvatarId;
  level: LevelChoice;
  goal: GoalChoice;
  onboarded: boolean;
  joinedLabel: string; // e.g. "June 2026" — placeholder, baked at first run
}

export interface GamificationState {
  xp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  streakDays: number;
  longestStreak: number;
  /** Number of streak-freeze items owned. */
  streakFreezes: number;
  /** Whether a double-XP boost is currently "active" (visual only). */
  doubleXpActive: boolean;
}

export type LessonStatus =
  | 'locked'
  | 'available'
  | 'inProgress'
  | 'completed'
  | 'gold'
  | 'legendary';

export interface LessonProgress {
  status: LessonStatus;
  /** Best accuracy 0..100. */
  bestAccuracy: number;
  completions: number;
}

export type LeagueTier =
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Sapphire'
  | 'Ruby'
  | 'Diamond';

export interface LeagueState {
  tier: LeagueTier;
  /** XP earned this week (drives leaderboard position). */
  weeklyXp: number;
}

export interface Settings {
  sound: boolean;
  haptics: boolean;
  reminderOn: boolean;
  reminderTime: string; // "19:00"
  theme: ThemeName;
}

/** Transient overlay driver — NOT persisted. */
export interface ActiveLesson {
  lessonId: LessonId;
  status: 'running' | 'complete';
  result?: LessonResult;
}

export interface LessonResult {
  lessonId: LessonId;
  xpEarned: number;
  comboBonus: number;
  accuracy: number; // 0..100
  totalExercises: number;
  correctCount: number;
  /** Elapsed seconds. */
  timeSeconds: number;
  maxCombo: number;
  outOfHearts: boolean;
}

export type AchievementId = string;

export interface Achievement {
  id: AchievementId;
  name: string; // Gaelic name
  english: string; // English gloss
  desc: string;
  icon: string; // IconName
  /** Tint token, e.g. "var(--c-flame)". */
  tint: string;
}

export type ShopItemId = 'streak_freeze' | 'heart_refill' | 'double_xp';

export interface ShopItem {
  id: ShopItemId;
  name: string;
  desc: string;
  price: number;
  icon: string; // IconName
  tint: string;
}

export interface LeagueUser {
  id: string;
  name: string;
  avatarId: AvatarId;
  weeklyXp: number;
  isCurrentUser?: boolean;
}

export interface HeatmapDay {
  /** Day label for a11y, e.g. "Mon". */
  label: string;
  /** 0 (none) .. 4 (intense). */
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface OnboardingSlide {
  title: string;
  body: string;
  mascotMood: 'happy' | 'cheer' | 'wave' | 'sleepy';
  accent: string; // color token
}
