import { useMemo } from 'react';
import './confetti.css';
import { shuffle, seedFromString } from '@/utils/shuffle';

interface ConfettiProps {
  /** Number of particles. */
  count?: number;
  /** Stable seed so particles don't re-randomise on re-render. */
  seed?: string;
}

const COLORS = [
  'var(--c-heather)',
  'var(--c-thistle)',
  'var(--c-saltire)',
  'var(--c-green)',
  'var(--c-gold)',
  'var(--c-flame)',
  'var(--c-heart)',
];

/** Pure-CSS confetti burst — absolutely-positioned particles, no dependencies. */
export function Confetti({ count = 80, seed = 'confetti' }: ConfettiProps) {
  const particles = useMemo(() => {
    const base = seedFromString(seed);
    const rng = (i: number, salt: number) => {
      // deterministic pseudo-values derived from the seed + index
      const x = Math.sin(base + i * 12.9898 + salt * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    const palette = shuffle(COLORS, base);
    return Array.from({ length: count }, (_, i) => {
      const left = rng(i, 1) * 100;
      const delay = rng(i, 2) * 0.6;
      const duration = 1.8 + rng(i, 3) * 1.6;
      const drift = (rng(i, 4) - 0.5) * 160;
      const rotate = rng(i, 5) * 720 - 360;
      const size = 7 + rng(i, 6) * 7;
      const round = rng(i, 7) > 0.6;
      const color = palette[i % palette.length];
      return { i, left, delay, duration, drift, rotate, size, round, color };
    });
  }, [count, seed]);

  return (
    <div className="confetti" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.i}
          className="confetti__piece"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * (p.round ? 1 : 1.6)}px`,
              background: p.color,
              borderRadius: p.round ? '50%' : '2px',
              '--drift': `${p.drift}px`,
              '--rot': `${p.rotate}deg`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
