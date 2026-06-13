import { useRef, useState } from 'react';

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** Min horizontal px to count as a swipe. */
  threshold?: number;
}

/** Pointer-based horizontal swipe with live drag offset for follow-the-finger UX. */
export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const [dragX, setDragX] = useState(0);

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      start.current = { x: e.clientX, y: e.clientY };
      setDragX(0);
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!start.current) return;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      // Ignore mostly-vertical gestures
      if (Math.abs(dy) > Math.abs(dx) * 1.4) return;
      setDragX(dx);
    },
    onPointerUp: () => {
      if (!start.current) return;
      const dx = dragX;
      if (dx <= -threshold) onSwipeLeft?.();
      else if (dx >= threshold) onSwipeRight?.();
      start.current = null;
      setDragX(0);
    },
    onPointerCancel: () => {
      start.current = null;
      setDragX(0);
    },
  };

  return { handlers, dragX, dragging: start.current !== null };
}
