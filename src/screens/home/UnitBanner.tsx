import { Icon } from '@/art/icons/Icon';
import { useGame } from '@/state/GameContext';
import { unitCompletion } from '@/state/selectors';
import type { Unit } from '@/types';

/** The coloured unit header card with title, subtitle and completion. */
export function UnitBanner({ unit }: { unit: Unit }) {
  const { state } = useGame();
  const { completed, total } = unitCompletion(unit.id, state);

  return (
    <div className="unit-banner" style={{ background: unit.color }}>
      <div className="unit-banner__hills" aria-hidden="true">
        <svg viewBox="0 0 280 60" preserveAspectRatio="none" width="100%" height="60">
          <path d="M0 60 V34 C40 18 70 40 110 28 C150 16 180 36 220 24 C250 16 270 28 280 22 V60 Z" fill="rgba(255,255,255,0.12)" />
          <path d="M0 60 V44 C50 32 90 50 140 40 C190 30 230 48 280 38 V60 Z" fill="rgba(0,0,0,0.10)" />
        </svg>
      </div>
      <div className="unit-banner__content">
        <div className="unit-banner__text">
          <span className="unit-banner__eyebrow">Unit {unit.index}</span>
          <h2 className="unit-banner__title">{unit.title}</h2>
          <span className="unit-banner__subtitle">{unit.subtitle}</span>
        </div>
        <div className="unit-banner__count" aria-label={`${completed} of ${total} lessons complete`}>
          <Icon name="check" size={16} strokeWidth={3} />
          {completed}/{total}
        </div>
      </div>
    </div>
  );
}
