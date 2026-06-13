import type { AvatarId } from '@/types';
import { cx } from '@/utils/classNames';

interface AvatarProps {
  id: AvatarId;
  size?: number;
  className?: string;
  /** Draw a ring around the avatar. */
  ring?: boolean;
}

const BG: Record<AvatarId, [string, string]> = {
  cow: ['#e2a566', '#c97b3c'],
  stag: ['#a9764e', '#7c5230'],
  fox: ['#f08c4a', '#d9622a'],
  seal: ['#9aa6bd', '#6f7d99'],
  owl: ['#9277bd', '#6a4c93'],
  thistle: ['#c08fd6', '#7b5aa6'],
};

/** Small hand-built animal/plant avatars on a 64×64 grid. */
export function Avatar({ id, size = 48, className, ring }: AvatarProps) {
  const gid = `av-${id}`;
  return (
    <svg
      className={cx('avatar', className)}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${id} avatar`}
      style={ring ? { borderRadius: '50%', boxShadow: '0 0 0 3px var(--bg-surface), 0 0 0 6px var(--brand)' } : undefined}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BG[id][0]} />
          <stop offset="1" stopColor={BG[id][1]} />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={`url(#${gid})`} />
      <g fill="#fff">{glyph(id)}</g>
    </svg>
  );
}

function glyph(id: AvatarId) {
  switch (id) {
    case 'cow':
      return (
        <>
          <path d="M18 24c-4-3-9-3-12-1 1 4 6 6 11 5M46 24c4-3 9-3 12-1-1 4-6 6-11 5" opacity="0.85" />
          <path d="M32 20c-9 0-15 6-15 15s7 13 15 13 15-5 15-13-6-15-15-15Z" />
          <ellipse cx="32" cy="42" rx="9" ry="6" fill="#f6d9c2" />
          <circle cx="26" cy="33" r="2.4" fill="#3a2a1a" />
          <circle cx="38" cy="33" r="2.4" fill="#3a2a1a" />
          <circle cx="29" cy="42" r="1.5" fill="#c97b3c" />
          <circle cx="35" cy="42" r="1.5" fill="#c97b3c" />
        </>
      );
    case 'stag':
      return (
        <>
          <path
            d="M24 16l-5-8-4 4M24 16l-9-2M40 16l5-8 4 4M40 16l9-2"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M32 18c-8 0-13 6-13 14s5 14 13 14 13-6 13-14-5-14-13-14Z" />
          <ellipse cx="32" cy="40" rx="6.5" ry="5" fill="#5a3d24" />
          <circle cx="27" cy="31" r="2.2" fill="#3a2a1a" />
          <circle cx="37" cy="31" r="2.2" fill="#3a2a1a" />
        </>
      );
    case 'fox':
      return (
        <>
          <path d="M16 18l6 8-9-1zM48 18l-6 8 9-1z" />
          <path d="M32 20c-9 0-15 7-15 14 0 8 7 14 15 14s15-6 15-14c0-7-6-14-15-14Z" />
          <path d="M32 48l-9-7c5 2 13 2 18 0l-9 7Z" fill="#fff" />
          <circle cx="26" cy="32" r="2.4" fill="#3a2a1a" />
          <circle cx="38" cy="32" r="2.4" fill="#3a2a1a" />
          <circle cx="32" cy="39" r="2.2" fill="#3a2a1a" />
        </>
      );
    case 'seal':
      return (
        <>
          <ellipse cx="32" cy="34" rx="16" ry="15" />
          <ellipse cx="32" cy="40" rx="7" ry="5.5" fill="#d8def0" />
          <circle cx="26" cy="31" r="2.6" fill="#2a3245" />
          <circle cx="38" cy="31" r="2.6" fill="#2a3245" />
          <circle cx="32" cy="38" r="1.8" fill="#2a3245" />
          <path
            d="M30 41c-4 1-7 1-10 0M34 41c4 1 7 1 10 0"
            stroke="#9aa6bd"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    case 'owl':
      return (
        <>
          <path d="M18 20l-3-7 8 3zM46 20l3-7-8 3z" />
          <path d="M32 18c-9 0-16 7-16 16s7 15 16 15 16-6 16-15-7-16-16-16Z" />
          <circle cx="25" cy="31" r="6.5" fill="#fff" />
          <circle cx="39" cy="31" r="6.5" fill="#fff" />
          <circle cx="25" cy="31" r="3" fill="#2a2238" />
          <circle cx="39" cy="31" r="3" fill="#2a2238" />
          <path d="M32 36l-4 4h8l-4-4Z" fill="#ffb43c" />
        </>
      );
    case 'thistle':
      return (
        <>
          <path
            d="M32 12c-2 4-6 5-6 9 0 3 2 5 4 6-3-1-7 0-9-3 0 4 3 7 7 7-3 1-7 0-9-3 1 5 5 8 10 8h6c5 0 9-3 10-8-2 3-6 4-9 3 4 0 7-3 7-7-2 3-6 2-9 3 2-1 4-3 4-6 0-4-4-5-6-9Z"
          />
          <path
            d="M26 41c-3 4-3 8-1 11M38 41c3 4 3 8 1 11M32 44v9"
            stroke="#4e8a3a"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
  }
}

export const AVATAR_IDS: AvatarId[] = ['cow', 'stag', 'fox', 'seal', 'owl', 'thistle'];
