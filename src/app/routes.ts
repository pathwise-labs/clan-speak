import type { IconName } from '@/art/icons/Icon';

export const Routes = {
  Onboarding: '/onboarding',
  Home: '/home',
  Practice: '/practice',
  Leaderboard: '/leaderboard',
  Profile: '/profile',
  Shop: '/shop',
  Settings: '/settings',
} as const;

export type RoutePath = (typeof Routes)[keyof typeof Routes];

export interface TabDef {
  path: RoutePath;
  label: string;
  icon: IconName;
}

/** The five bottom-nav tabs, in order. */
export const TABS: TabDef[] = [
  { path: Routes.Home, label: 'Learn', icon: 'book' },
  { path: Routes.Practice, label: 'Practice', icon: 'dumbbell' },
  { path: Routes.Leaderboard, label: 'Leagues', icon: 'shield' },
  { path: Routes.Profile, label: 'Profile', icon: 'user' },
  { path: Routes.Shop, label: 'Shop', icon: 'bag' },
];

export const TAB_PATHS = TABS.map((t) => t.path);

export function isTabPath(path: string): path is RoutePath {
  return TAB_PATHS.includes(path as RoutePath);
}
