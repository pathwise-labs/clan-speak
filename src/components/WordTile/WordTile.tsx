import './WordTile.css';
import { cx } from '@/utils/classNames';

export type TileState = 'idle' | 'selected' | 'correct' | 'incorrect' | 'disabled' | 'used';

interface WordTileProps {
  label: string;
  state?: TileState;
  /** Render the label in the Gaelic display font. */
  gaelic?: boolean;
  onClick?: () => void;
  className?: string;
}

export function WordTile({ label, state = 'idle', gaelic, onClick, className }: WordTileProps) {
  const inert = state === 'disabled' || state === 'used';
  return (
    <button
      type="button"
      className={cx('tile', `tile--${state}`, gaelic && 'gaelic', className)}
      onClick={onClick}
      disabled={inert && state !== 'used'}
      aria-pressed={state === 'selected'}
    >
      {label}
    </button>
  );
}
