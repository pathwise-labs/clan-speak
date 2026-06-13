import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';
import { cx } from '@/utils/classNames';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Optional leading element (icon). */
  leading?: ReactNode;
  children: ReactNode;
}

/** The chunky, Duolingo-style 3D button. Press collapses the bottom edge. */
export function Button({
  variant = 'primary',
  size = 'lg',
  fullWidth,
  leading,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('btn', `btn--${variant}`, `btn--${size}`, fullWidth && 'btn--full', className)}
      {...rest}
    >
      {leading && <span className="btn__leading">{leading}</span>}
      <span className="btn__label">{children}</span>
    </button>
  );
}
