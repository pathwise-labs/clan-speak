import type { LeagueTier } from '@/types';

export const leagueTiers: LeagueTier[] = [
  'Bronze',
  'Silver',
  'Gold',
  'Sapphire',
  'Ruby',
  'Diamond',
];

export function nextTier(tier: LeagueTier): LeagueTier {
  const i = leagueTiers.indexOf(tier);
  return leagueTiers[Math.min(leagueTiers.length - 1, i + 1)];
}

export function prevTier(tier: LeagueTier): LeagueTier {
  const i = leagueTiers.indexOf(tier);
  return leagueTiers[Math.max(0, i - 1)];
}
