/* ==========================================================================
   Icon path data. Each icon is hand-built on a 24×24 grid and uses
   currentColor, so icons inherit text color and re-theme automatically.
   mode 'stroke' → drawn as outlines; mode 'fill' → solid shapes.
   ========================================================================== */

export interface IconDef {
  d: string | string[];
  mode: 'stroke' | 'fill';
  evenodd?: boolean;
}

export const iconPaths = {
  // ---- Gamification / stats ----
  flame: { mode: 'fill', d: 'M12 2C9 7 6 9 6 12.5a6 6 0 0 0 12 0C18 9 15 7 12 2Z' },
  heart: {
    mode: 'fill',
    d: 'M12 20.7 4.5 13.2a4.6 4.6 0 1 1 6.5-6.5l1 1 1-1a4.6 4.6 0 1 1 6.5 6.5L12 20.7Z',
  },
  gem: { mode: 'fill', d: 'M5.5 3h13l3.2 5.2L12 21.5 2.3 8.2 5.5 3Z' },
  bolt: { mode: 'fill', d: 'M13 2 4 13.5h6l-1 8.5 9-12h-6l1-8Z' },
  star: {
    mode: 'fill',
    d: 'M12 2.6l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.66l-5.91 3.1 1.13-6.56L2.45 9.54l6.6-.96L12 2.6Z',
  },
  trophy: {
    mode: 'fill',
    evenodd: true,
    d: 'M7 3h10v2h2a1 1 0 0 1 1 1c0 2.6-1.9 4.7-4.4 5A5 5 0 0 1 13 13.9V16h2.6l1 4H7.4l1-4H11v-2.1a5 5 0 0 1-2.6-2C6 11.7 4 9.6 4 6a1 1 0 0 1 1-1h2V3Zm0 4H6.1C6.4 8.4 7.5 9.6 9 10 8.2 9.2 7.6 8.2 7 7Zm10 0c-.6 1.2-1.2 2.2-2 3 1.5-.4 2.6-1.6 2.9-3H17Z',
  },
  crown: {
    mode: 'fill',
    d: 'M3 7l4 3 5-6 5 6 4-3-1.7 10H4.7L3 7Zm1.7 11.5h14.6V21H4.7Z',
  },
  snowflake: {
    mode: 'stroke',
    d: 'M12 2v20M3.5 7l17 10M20.5 7l-17 10M12 6l-2.5-2M12 6l2.5-2M12 18l-2.5 2M12 18l2.5 2M5 9.7 5.7 6.6 8.7 7.3M19 9.7l-.7-3.1-3 .7M5 14.3l.7 3.1 3-.7M19 14.3l-.7 3.1-3-.7',
  },
  sprout: {
    mode: 'stroke',
    d: 'M12 21v-8M12 13C9 13 7 11 7 8c3 0 5 2 5 5Zm0 0c0-3 2-5 5-5 0 3-2 5-5 5Z',
  },

  // ---- Controls ----
  check: { mode: 'stroke', d: 'M5 12.5 10 17.5 19.5 6' },
  close: { mode: 'stroke', d: 'M6 6 18 18M18 6 6 18' },
  play: { mode: 'fill', d: 'M8 5.2v13.6L19 12 8 5.2Z' },
  lock: { mode: 'stroke', d: 'M6.5 11h11v9.5h-11zM9 11V7.5a3 3 0 0 1 6 0V11' },
  volume: {
    mode: 'stroke',
    d: 'M4 9.5v5h3.5L12 18.5V5.5L7.5 9.5H4ZM15.5 9.2a4 4 0 0 1 0 5.6M18.2 7a7.5 7.5 0 0 1 0 10',
  },
  plus: { mode: 'stroke', d: 'M12 5v14M5 12h14' },
  minus: { mode: 'stroke', d: 'M5 12h14' },
  refresh: {
    mode: 'stroke',
    d: 'M20 11a8 8 0 0 0-13.7-4.9L3.5 8M3.5 4v4h4M4 13a8 8 0 0 0 13.7 4.9L20.5 16M20.5 20v-4h-4',
  },
  chevronLeft: { mode: 'stroke', d: 'M15 5 8 12l7 7' },
  chevronRight: { mode: 'stroke', d: 'M9 5l7 7-7 7' },
  chevronDown: { mode: 'stroke', d: 'M5 9l7 7 7-7' },
  arrowLeft: { mode: 'stroke', d: 'M19 12H5M11 6l-6 6 6 6' },

  // ---- Nav / sections ----
  book: { mode: 'stroke', d: 'M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5V4.5ZM5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3' },
  dumbbell: { mode: 'stroke', d: 'M4 9v6M7 6.5v11M17 6.5v11M20 9v6M7 12h10' },
  shield: { mode: 'stroke', d: 'M12 3l7 3v5c0 4.6-3 8.2-7 9.3C8 19.2 5 15.6 5 11V6l7-3Z' },
  user: { mode: 'stroke', d: 'M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0' },
  bag: { mode: 'stroke', d: 'M6 8h12l1 12.5H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2' },
  gear: {
    mode: 'fill',
    evenodd: true,
    d: 'M19.4 12.9a7.8 7.8 0 0 0 0-1.8l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-1.6-.9l-.4-2.6H10.9l-.4 2.6c-.6.2-1.1.5-1.6.9l-2.4-1-2 3.4 2 1.6a7.8 7.8 0 0 0 0 1.8l-2 1.6 2 3.4 2.4-1c.5.4 1 .7 1.6.9l.4 2.6h4.2l.4-2.6c.6-.2 1.1-.5 1.6-.9l2.4 1 2-3.4-2-1.6ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
  },
  settings: {
    mode: 'stroke',
    d: 'M4 7h8M16 7h4M4 12h4M12 12h8M4 17h12M18 17h2',
  },

  // ---- Misc UI ----
  clock: { mode: 'stroke', d: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM12 8v4.2l3 1.8' },
  target: {
    mode: 'stroke',
    d: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 3.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z',
  },
  calendar: { mode: 'stroke', d: 'M5 6.5h14v13H5zM5 10h14M8.5 4v3M15.5 4v3' },
  sun: {
    mode: 'stroke',
    d: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8',
  },
  moon: { mode: 'fill', d: 'M20.5 14.8A8.2 8.2 0 0 1 9.2 3.5 7.5 7.5 0 1 0 20.5 14.8Z' },
  bell: { mode: 'stroke', d: 'M6 16V10a6 6 0 0 1 12 0v6l2 2H4l2-2ZM9.5 20a2.5 2.5 0 0 0 5 0' },
  flag: { mode: 'stroke', d: 'M6 21V4M6 5h11l-2 3 2 3H6' },
  spark: { mode: 'fill', d: 'M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z' },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof iconPaths;
