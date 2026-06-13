import { useEffect, useRef, useState } from 'react';

/** Animate a number from 0 to `target` over `duration` ms with requestAnimationFrame. */
export function useCountUp(target: number, duration = 900, delay = 0): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    let startTs: number | null = null;
    let timeoutId = 0;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };

    timeoutId = window.setTimeout(() => {
      raf.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(raf.current);
    };
  }, [target, duration, delay]);

  return value;
}
