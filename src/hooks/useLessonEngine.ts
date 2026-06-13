import { useRef, useState } from 'react';
import type { Lesson, LessonResult } from '@/types';
import { useGame } from '@/state/GameContext';
import { xpForAnswer } from '@/utils/xp';
import type { EvaluateResult } from '@/screens/lesson/exerciseProps';

type Phase = 'answering' | 'checked';

/**
 * The shared lesson core-loop state machine. Exercise-type-agnostic: it only
 * knows the contract (answerable → check → evaluate → continue) and owns
 * progress, combo, XP accumulation, hearts (via dispatch) and finishing.
 */
export function useLessonEngine(lesson: Lesson) {
  const { state, dispatch } = useGame();
  const total = lesson.exercises.length;
  const baseXp = Math.max(5, Math.round(lesson.xpReward / total));

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');
  const [answerable, setAnswerable] = useState(false);
  const [checkNonce, setCheckNonce] = useState(0);
  const [lastResult, setLastResult] = useState<EvaluateResult | null>(null);

  // Running tallies (transient — committed only on finish).
  const [combo, setCombo] = useState(0);
  const tally = useRef({ correct: 0, maxCombo: 0, xp: 0 });
  const startedAt = useRef<number>(performance.now());

  const exercise = lesson.exercises[index];
  const isLast = index === total - 1;

  /** User pressed Check → ask the active exercise to evaluate itself. */
  const requestCheck = () => {
    if (phase !== 'answering' || !answerable) return;
    setCheckNonce((n) => n + 1);
  };

  /** Exercise reports its outcome. */
  const submitEvaluation = (result: EvaluateResult) => {
    if (phase === 'checked') return;
    setPhase('checked');
    setLastResult(result);

    if (result.correct) {
      const gained = xpForAnswer(baseXp, combo, state.stats.doubleXpActive);
      tally.current.correct += 1;
      tally.current.xp += gained;
      const nextCombo = combo + 1;
      tally.current.maxCombo = Math.max(tally.current.maxCombo, nextCombo);
      setCombo(nextCombo);
    } else {
      setCombo(0);
      dispatch({ type: 'LOSE_HEART' });
    }
  };

  /** Advance to the next exercise, or finish the lesson. */
  const proceed = () => {
    if (isLast) {
      finish(false);
      return;
    }
    setIndex((i) => i + 1);
    setPhase('answering');
    setAnswerable(false);
    setCheckNonce(0);
    setLastResult(null);
  };

  const finish = (outOfHearts: boolean) => {
    const answered = outOfHearts ? index + (phase === 'checked' ? 1 : 0) : total;
    const accuracy = answered > 0 ? Math.round((tally.current.correct / answered) * 100) : 0;
    const result: LessonResult = {
      lessonId: lesson.id,
      xpEarned: tally.current.xp,
      comboBonus: Math.max(0, tally.current.xp - tally.current.correct * baseXp),
      accuracy,
      totalExercises: total,
      correctCount: tally.current.correct,
      timeSeconds: (performance.now() - startedAt.current) / 1000,
      maxCombo: tally.current.maxCombo,
      outOfHearts,
    };
    dispatch({ type: 'COMPLETE_LESSON', payload: result });
  };

  const abandon = () => dispatch({ type: 'CLOSE_LESSON' });

  return {
    exercise,
    index,
    total,
    phase,
    answerable,
    setAnswerable,
    checkNonce,
    lastResult,
    combo,
    hearts: state.stats.hearts,
    requestCheck,
    submitEvaluation,
    proceed,
    abandon,
  };
}
