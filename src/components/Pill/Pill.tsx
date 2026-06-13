import './Pill.css';
import { Icon, type IconName } from '@/art/icons/Icon';
import { cx } from '@/utils/classNames';

export type PillTone = 'flame' | 'gem' | 'heart' | 'xp' | 'neutral';

interface PillProps {
  icon: IconName;
  value: string | number;
  tone?: PillTone;
  /** Pulse animation when the value changes. */
  pulse?: boolean;
  label?: string;
  onClick?: () => void;
  className?: string;
}

/** Compact stat chip used in the top bar (streak / gems / hearts). */
export function Pill({ icon, value, tone = 'neutral', pulse, label, onClick, className }: PillProps) {
  const inner = (
    <>
      <Icon name={icon} size={18} className="pill__icon" />
      <span className={cx('pill__value', pulse && 'pill__value--pulse')} key={String(value)}>
        {value}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={cx('pill', `pill--${tone}`, 'pill--button', className)}
        onClick={onClick}
        aria-label={label}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={cx('pill', `pill--${tone}`, className)} aria-label={label}>
      {inner}
    </div>
  );
}
