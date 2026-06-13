import type { Exercise } from '@/types';

export interface EvaluateResult {
  correct: boolean;
  /** Human-readable correct answer, shown in the feedback banner. */
  correctAnswerLabel: string;
}

export interface ExerciseComponentProps<E extends Exercise = Exercise> {
  exercise: E;
  /** True once the answer has been checked (locks further input). */
  disabled: boolean;
  /** Report whether a checkable answer currently exists (gates Check button). */
  onAnswerableChange: (ready: boolean) => void;
  /** Called to report the outcome after the engine requests a check. */
  onEvaluate: (result: EvaluateResult) => void;
  /** Engine bumps this to request evaluation; child evaluates on change (>0). */
  checkNonce: number;
}

/** Sequence equality for tile-built answers. */
export function sameSequence(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}
