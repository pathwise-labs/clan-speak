import type { ReactNode } from 'react';
import './SwipeDeck.css';
import { useSwipe } from '@/hooks/useSwipe';
import { cx } from '@/utils/classNames';

interface SwipeDeckProps {
  index: number;
  onIndexChange: (next: number) => void;
  children: ReactNode[];
  /** Show dot indicators. */
  dots?: boolean;
}

/** Generic swipeable, horizontally-paged container with dot indicators. */
export function SwipeDeck({ index, onIndexChange, children, dots = true }: SwipeDeckProps) {
  const count = children.length;
  const go = (next: number) => onIndexChange(Math.min(count - 1, Math.max(0, next)));
  const { handlers, dragX, dragging } = useSwipe({
    onSwipeLeft: () => go(index + 1),
    onSwipeRight: () => go(index - 1),
  });

  return (
    <div className="deck">
      <div className="deck__viewport" {...handlers}>
        <div
          className={cx('deck__track', dragging && 'deck__track--dragging')}
          style={{ transform: `translateX(calc(${-index * 100}% + ${dragX}px))` }}
        >
          {children.map((child, i) => (
            <div className="deck__slide" key={i} aria-hidden={i !== index}>
              {child}
            </div>
          ))}
        </div>
      </div>
      {dots && (
        <div className="deck__dots" role="tablist" aria-label="Slides">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cx('deck__dot', i === index && 'deck__dot--active')}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
