import './Badge.css';
import { Icon, type IconName } from '@/art/icons/Icon';
import { cx } from '@/utils/classNames';

interface BadgeProps {
  icon: IconName;
  /** Tint token, e.g. "var(--c-flame)". */
  tint?: string;
  unlocked?: boolean;
  size?: number;
  className?: string;
}

/** Achievement medallion. Locked → desaturated with a small lock. */
export function Badge({ icon, tint = 'var(--brand)', unlocked = true, size = 64, className }: BadgeProps) {
  return (
    <div
      className={cx('badge', !unlocked && 'badge--locked', className)}
      style={{ width: size, height: size, ['--badge-tint' as string]: tint }}
    >
      <span className="badge__ring" />
      <Icon name={icon} size={size * 0.42} className="badge__icon" />
      {!unlocked && (
        <span className="badge__lock">
          <Icon name="lock" size={size * 0.26} />
        </span>
      )}
    </div>
  );
}
