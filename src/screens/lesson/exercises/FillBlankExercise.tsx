import { useEffect, useState } from 'react';
import { WordTile } from '@/components';
import type { TileState } from '@/components/WordTile/WordTile';
import type { FillBlankExercise as Ex } from '@/types';
import type { ExerciseComponentProps } from '../exerciseProps';
import { cx } from '@/utils/classNames';

export function FillBlankExercise({
  exercise,
  disabled,
  onAnswerableChange,
  onEvaluate,
  checkNonce,
}: ExerciseComponentProps<Ex>) {
  const [selected, setSelected] = useState<number | null>(null);
  const [before, after] = exercise.sentence.split('___');

  useEffect(() => {
    onAnswerableChange(selected !== null);
  }, [selected, onAnswerableChange]);

  useEffect(() => {
    if (checkNonce <= 0) return;
    onEvaluate({
      correct: selected === exercise.answerIndex,
      correctAnswerLabel: `${before}${exercise.options[exercise.answerIndex]}${after}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkNonce]);

  const correct = selected === exercise.answerIndex;
  const slotLabel = selected !== null ? exercise.options[selected] : '';

  return (
    <div className="ex">
      <p className="ex__sentence gaelic">
        {before}
        <span
          className={cx(
            'blank',
            slotLabel && 'blank--filled',
            disabled && (correct ? 'blank--correct' : 'blank--incorrect'),
          )}
        >
          {slotLabel || '    '}
        </span>
        {after}
      </p>
      <div className="ex__chips">
        {exercise.options.map((opt, i) => {
          let st: TileState = 'idle';
          if (disabled) {
            if (i === exercise.answerIndex) st = 'correct';
            else if (i === selected) st = 'incorrect';
            else st = 'disabled';
          } else if (i === selected) {
            st = 'selected';
          }
          return (
            <WordTile
              key={i}
              label={opt}
              gaelic
              state={st}
              onClick={disabled ? undefined : () => setSelected(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
