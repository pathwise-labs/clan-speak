import type { HTMLAttributes, ReactNode } from 'react';
import './Card.css';
import { cx } from '@/utils/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  selected?: boolean;
  interactive?: boolean;
  children: ReactNode;
}

export function Card({
  elevated,
  selected,
  interactive,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cx(
        'card',
        elevated && 'card--elevated',
        selected && 'card--selected',
        (interactive || rest.onClick) && 'card--interactive',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
