import './mascot.css';
import { cx } from '@/utils/classNames';

export type CowMood = 'happy' | 'cheer' | 'sad' | 'sleepy' | 'wave';

interface HighlandCowProps {
  mood?: CowMood;
  size?: number;
  className?: string;
  /** Disables the idle bob/blink animation. */
  still?: boolean;
}

/**
 * A wee Highland coo (Bò Ghàidhealach). Drawn on a 120×120 grid. The body/horns
 * are constant; only the face (eyes + mouth + extras) swaps with `mood`.
 * Colours come from CSS tokens so the mascot re-themes automatically.
 */
export function HighlandCow({ mood = 'happy', size = 120, className, still }: HighlandCowProps) {
  return (
    <svg
      className={cx('coo', !still && 'coo--idle', className)}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Highland cow mascot"
    >
      {/* Horns */}
      <g fill="var(--cow-horn)" stroke="var(--cow-coat-deep)" strokeWidth="1.5">
        <path d="M44 44C32 40 22 44 16 36c-4-6 0-13 6-12 8 2 14 10 22 14z" />
        <path d="M76 44C88 40 98 44 104 36c4-6 0-13-6-12-8 2-14 10-22 14z" />
      </g>

      {/* Ears */}
      <g fill="var(--cow-coat-deep)">
        <ellipse cx="32" cy="62" rx="11" ry="8" transform="rotate(-18 32 62)" />
        <ellipse cx="88" cy="62" rx="11" ry="8" transform="rotate(18 88 62)" />
      </g>

      {/* Head */}
      <path
        d="M60 30c20 0 33 14 33 36 0 26-15 42-33 42S27 92 27 66c0-22 13-36 33-36z"
        fill="var(--cow-coat)"
      />

      {/* Muzzle */}
      <ellipse cx="60" cy="92" rx="24" ry="17" fill="var(--cow-muzzle)" />
      <ellipse cx="51" cy="92" rx="3.4" ry="4.6" fill="var(--cow-coat-deep)" opacity="0.6" />
      <ellipse cx="69" cy="92" rx="3.4" ry="4.6" fill="var(--cow-coat-deep)" opacity="0.6" />

      {/* Shaggy fringe — sits over the forehead, eyes peek below */}
      <g className="coo__fringe" fill="var(--cow-fringe)">
        <path d="M28 50c-3 14 0 24 3 30 2-6 4-7 6-3 1-7 3-9 6-4 1-7 4-9 7-4 1-8 5-9 8-4 2-6 5-7 7-3 2-6 4-6 6 1 3-6 5-5 6 3 3-6 6-7 5 6-1-12-6-26-30-22-12 2-18 8-21 13z" />
      </g>

      {/* Face layer (mood-dependent) */}
      <Face mood={mood} />
    </svg>
  );
}

function Face({ mood }: { mood: CowMood }) {
  const eyeFill = 'var(--text-primary)';
  const blush = (
    <>
      <ellipse cx="40" cy="84" rx="5" ry="3.2" fill="var(--c-red)" opacity="0.18" />
      <ellipse cx="80" cy="84" rx="5" ry="3.2" fill="var(--c-red)" opacity="0.18" />
    </>
  );

  switch (mood) {
    case 'cheer':
      return (
        <g>
          {blush}
          <path
            d="M41 74c2-5 9-5 11 0M68 74c2-5 9-5 11 0"
            fill="none"
            stroke={eyeFill}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M50 98c4 5 16 5 20 0"
            fill="none"
            stroke="var(--cow-coat-deep)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case 'sad':
      return (
        <g>
          <circle cx="47" cy="75" r="5.5" fill={eyeFill} />
          <circle cx="73" cy="75" r="5.5" fill={eyeFill} />
          <circle cx="48.5" cy="73.5" r="1.8" fill="#fff" />
          <circle cx="74.5" cy="73.5" r="1.8" fill="#fff" />
          <path
            d="M40 67c3-3 8-3 11-1M69 66c3-2 8-2 11 1"
            fill="none"
            stroke="var(--cow-coat-deep)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M52 100c3-4 13-4 16 0"
            fill="none"
            stroke="var(--cow-coat-deep)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case 'sleepy':
      return (
        <g>
          <path
            d="M41 74c3 3 8 3 11 0M68 74c3 3 8 3 11 0"
            fill="none"
            stroke={eyeFill}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="92"
            y="46"
            fontFamily="var(--font-display)"
            fontSize="13"
            fontWeight="900"
            fill="var(--text-muted)"
          >
            z
          </text>
          <text
            x="100"
            y="34"
            fontFamily="var(--font-display)"
            fontSize="17"
            fontWeight="900"
            fill="var(--text-muted)"
          >
            Z
          </text>
        </g>
      );
    case 'wave':
      return (
        <g>
          {blush}
          {/* winking left eye */}
          <path
            d="M41 74c2-4 9-4 11 0"
            fill="none"
            stroke={eyeFill}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="73" cy="75" r="5.5" fill={eyeFill} />
          <circle cx="74.6" cy="73.4" r="1.9" fill="#fff" />
          <path
            d="M51 98c4 4 14 4 18 0"
            fill="none"
            stroke="var(--cow-coat-deep)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
    case 'happy':
    default:
      return (
        <g className="coo__eyes">
          {blush}
          <circle cx="47" cy="75" r="5.8" fill={eyeFill} />
          <circle cx="73" cy="75" r="5.8" fill={eyeFill} />
          <circle cx="48.8" cy="73.2" r="2" fill="#fff" />
          <circle cx="74.8" cy="73.2" r="2" fill="#fff" />
          <path
            d="M51 99c4 4 14 4 18 0"
            fill="none"
            stroke="var(--cow-coat-deep)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );
  }
}
