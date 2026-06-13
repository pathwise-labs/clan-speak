import { LessonNode } from '@/components';
import { UnitBanner } from './UnitBanner';
import { units } from '@/data/units';
import { useGame } from '@/state/GameContext';
import { currentLessonId } from '@/state/selectors';
import type { Unit } from '@/types';

const ROW_H = 92; // vertical gap between nodes
const NODE_W = 88;
const TRACK_W = 280; // coordinate width of the winding lane
const AMP = 78; // horizontal swing

function nodeX(i: number): number {
  // Smooth winding lane: a sine curve gives the classic Duolingo "S".
  return TRACK_W / 2 + Math.sin(i * 0.9) * AMP;
}

export function LearningPath() {
  const { state, dispatch } = useGame();
  const current = currentLessonId(state);

  return (
    <div className="path">
      {units.map((unit) => (
        <UnitBlock
          key={unit.id}
          unit={unit}
          currentLessonId={current}
          onStart={(id) => dispatch({ type: 'START_LESSON', payload: { lessonId: id } })}
          progress={state.progress}
        />
      ))}
      <div className="path__end">
        <span className="path__end-flag">Tuilleadh ri thighinn…</span>
        <span className="path__end-sub">More units coming soon</span>
      </div>
    </div>
  );
}

function UnitBlock({
  unit,
  currentLessonId: current,
  onStart,
  progress,
}: {
  unit: Unit;
  currentLessonId: string | null;
  onStart: (id: string) => void;
  progress: ReturnType<typeof useGame>['state']['progress'];
}) {
  const n = unit.lessons.length;
  const laneHeight = n * ROW_H + 24;

  // Build a smooth SVG path through the node centres.
  const points = unit.lessons.map((_, i) => ({ x: nodeX(i), y: i * ROW_H + ROW_H / 2 }));
  const d = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const midY = (prev.y + p.y) / 2;
      return `C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
    })
    .join(' ');

  return (
    <section className="unit" aria-label={`Unit ${unit.index}: ${unit.title}`}>
      <UnitBanner unit={unit} />
      <div className="lane" style={{ height: laneHeight, width: TRACK_W }}>
        <svg className="lane__path" viewBox={`0 0 ${TRACK_W} ${laneHeight}`} preserveAspectRatio="none">
          <path d={d} className="lane__path-base" />
          <path d={d} className="lane__path-dash" />
        </svg>
        {unit.lessons.map((lesson, i) => {
          const status = progress[lesson.id]?.status ?? 'locked';
          const x = nodeX(i);
          return (
            <div
              key={lesson.id}
              className="lane__node"
              style={{ left: x - NODE_W / 2, top: i * ROW_H + ROW_H / 2 - 39 }}
            >
              <LessonNode
                status={status}
                isCurrent={lesson.id === current}
                label={lesson.title}
                onClick={() => onStart(lesson.id)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
