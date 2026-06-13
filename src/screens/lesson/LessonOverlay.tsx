import { createPortal } from 'react-dom';
import { useOverlayRoot } from '@/layout/Overlay';
import { useGame } from '@/state/GameContext';
import { lessonById } from '@/data/units';
import { LessonScreen } from './LessonScreen';
import { LessonCompleteScreen } from '@/screens/complete/LessonCompleteScreen';

/** Mounts the lesson / complete screens above the app shell when a lesson is active. */
export function LessonOverlay() {
  const { state } = useGame();
  const root = useOverlayRoot();
  const active = state.activeLesson;

  if (!active || !root) return null;
  const lesson = lessonById[active.lessonId];
  if (!lesson) return null;

  const content =
    active.status === 'complete' && active.result ? (
      <LessonCompleteScreen lesson={lesson} result={active.result} />
    ) : (
      <LessonScreen lesson={lesson} />
    );

  return createPortal(<div className="lesson-overlay">{content}</div>, root);
}
