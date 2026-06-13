import type { ShopItem } from '@/types';

export const shopItems: ShopItem[] = [
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    desc: 'Keep your streak alive on a day you miss.',
    price: 200,
    icon: 'snowflake',
    tint: 'var(--c-saltire)',
  },
  {
    id: 'heart_refill',
    name: 'Heart Refill',
    desc: 'Refill all your hearts and get back to learning.',
    price: 350,
    icon: 'heart',
    tint: 'var(--c-heart)',
  },
  {
    id: 'double_xp',
    name: 'Double XP Boost',
    desc: 'Earn 2× XP for your next lessons.',
    price: 100,
    icon: 'bolt',
    tint: 'var(--c-gold-deep)',
  },
];
