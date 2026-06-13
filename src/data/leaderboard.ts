import type { LeagueUser } from '@/types';

/**
 * Placeholder weekly league table. The current user ('me') has weeklyXp 0 here;
 * the live value is taken from game state at render time and the table re-sorted,
 * so your position climbs as you earn XP.
 */
export const leaderboardSeed: LeagueUser[] = [
  { id: 'me', name: 'You', avatarId: 'cow', weeklyXp: 0, isCurrentUser: true },
  { id: 'u2', name: 'Mairead', avatarId: 'fox', weeklyXp: 642 },
  { id: 'u3', name: 'Calum', avatarId: 'seal', weeklyXp: 588 },
  { id: 'u4', name: 'Iseabail', avatarId: 'owl', weeklyXp: 531 },
  { id: 'u5', name: 'Dòmhnall', avatarId: 'stag', weeklyXp: 470 },
  { id: 'u6', name: 'Catrìona', avatarId: 'thistle', weeklyXp: 416 },
  { id: 'u7', name: 'Eilidh', avatarId: 'fox', weeklyXp: 372 },
  { id: 'u8', name: 'Hamish', avatarId: 'seal', weeklyXp: 305 },
  { id: 'u9', name: 'Floraidh', avatarId: 'owl', weeklyXp: 268 },
  { id: 'u10', name: 'Seumas', avatarId: 'stag', weeklyXp: 214 },
  { id: 'u11', name: 'Anna', avatarId: 'thistle', weeklyXp: 180 },
  { id: 'u12', name: 'Ruairidh', avatarId: 'fox', weeklyXp: 132 },
  { id: 'u13', name: 'Mòrag', avatarId: 'owl', weeklyXp: 95 },
  { id: 'u14', name: 'Tormod', avatarId: 'seal', weeklyXp: 60 },
  { id: 'u15', name: 'Peigi', avatarId: 'thistle', weeklyXp: 28 },
];

/** Promotion zone (top N advance), demotion zone (bottom M drop). */
export const PROMOTION_COUNT = 5;
export const DEMOTION_COUNT = 5;
