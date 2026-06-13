import type { ButtonHTMLAttributes } from 'react';
import './IconButton.css';
import { Icon, type IconName } from '@/art/icons/Icon';
import { cx } from '@/utils/classNames';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Accessible label (required — icon-only button). */
  label: string;
  size?: number;
  variant?: 'plain' | 'soft';
}

export function IconButton({
  icon,
  label,
  size = 24,
  variant = 'plain',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cx('icon-btn', `icon-btn--${variant}`, className)}
      aria-label={label}
      {...rest}
    >
      <Icon name={icon} size={size} />
    </button>
  );
}
