import { useEffect, useState } from 'react';
import { Card } from '@/components';
import { HighlandCow } from '@/art/mascot/HighlandCow';
import type { MultipleChoiceExercise as MCExercise } from '@/types';
import type { ExerciseComponentProps } from '../exerciseProps';
import { cx } from '@/utils/classNames';

export function MultipleChoiceExercise({
  exercise,
  disabled,
  onAnswerableChange,
  onEvaluate,
  checkNonce,
}: ExerciseComponentProps<MCExercise>) {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    onAnswerableChange(selected !== null);
  }, [selected, onAnswerableChange]);

  useEffect(() => {
    if (checkNonce <= 0) return;
    onEvaluate({
      correct: selected === exercise.answerIndex,
      correctAnswerLabel: exercise.options[exercise.answerIndex],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkNonce]);

  return (
    <div className="ex">
      <div className="ex__stimulus">
        <HighlandCow mood="happy" size={84} />
        <div className="ex__bubble gaelic">{exercise.gaelic}</div>
      </div>
      <div className="ex__choices">
        {exercise.options.map((opt, i) => {
          const isAnswer = i === exercise.answerIndex;
          const isPicked = selected === i;
          const stateClass = disabled
            ? isAnswer
              ? 'choice--correct'
              : isPicked
                ? 'choice--incorrect'
                : ''
            : isPicked
              ? 'choice--selected'
              : '';
          return (
            <Card
              key={i}
              interactive={!disabled}
              onClick={disabled ? undefined : () => setSelected(i)}
              className={cx('choice', stateClass)}
            >
              <span className="choice__index">{i + 1}</span>
              {opt}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
