import type { LeagueTier } from '@/types';

interface LeagueCrestProps {
  tier: LeagueTier;
  size?: number;
  className?: string;
  /** Render desaturated (e.g. a tier you haven't reached). */
  locked?: boolean;
}

const TIER_COLORS: Record<LeagueTier, [string, string, string]> = {
  // [light stop, dark stop, gem/emblem color]
  Bronze: ['#d99a5b', '#a86a32', '#7a4a1f'],
  Silver: ['#e8edf3', '#aeb8c6', '#7e8a9c'],
  Gold: ['#ffe07a', '#e8af26', '#b07c00'],
  Sapphire: ['#7db8f0', '#2f6fc4', '#1a4d92'],
  Ruby: ['#f08aa0', '#d13a5c', '#9c1f3c'],
  Diamond: ['#bdeaff', '#73c7ec', '#3f9bc4'],
};

/** A shield crest with a metal/gem gradient per league tier. */
export function LeagueCrest({ tier, size = 56, className, locked }: LeagueCrestProps) {
  const [light, dark, gem] = TIER_COLORS[tier];
  const gid = `crest-${tier}`;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${tier} league crest`}
      style={locked ? { filter: 'grayscale(1) opacity(0.45)' } : undefined}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path
        d="M32 4l22 7v15c0 14-9 24-22 30C19 50 10 40 10 26V11l22-7Z"
        fill={`url(#${gid})`}
        stroke={gem}
        strokeWidth="2.5"
      />
      {/* Inner bevel */}
      <path
        d="M32 11l15 5v10c0 10-6 17-15 21-9-4-15-11-15-21V16l15-5Z"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      {/* Emblem — a thistle-y star */}
      <path
        d="M32 19l3.3 6.7 7.4 1.1-5.3 5.2 1.2 7.3L32 43l-6.6 3.6 1.2-7.3-5.3-5.2 7.4-1.1L32 19Z"
        fill="#ffffff"
        fillOpacity="0.92"
      />
      <circle cx="32" cy="31" r="3" fill={gem} />
    </svg>
  );
}
