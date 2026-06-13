import './ProgressBar.css';
import { cx } from '@/utils/classNames';

interface ProgressBarProps {
  value: number;
  max?: number;
  tone?: 'brand' | 'success' | 'gold' | 'accent';
  /** Show a soft shine highlight on the fill. */
  shine?: boolean;
  height?: number;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  tone = 'brand',
  shine = true,
  height = 14,
  className,
}: ProgressBarProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cx('progress', `progress--${tone}`, className)}
      style={{ height }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className="progress__fill" style={{ width: `${pct}%` }}>
        {shine && pct > 6 && <span className="progress__shine" />}
      </div>
    </div>
  );
}
