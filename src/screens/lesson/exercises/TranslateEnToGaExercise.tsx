import type { TranslateEnToGaExercise as Ex } from '@/types';
import type { ExerciseComponentProps } from '../exerciseProps';
import { TileBuilder } from './TileBuilder';

export function TranslateEnToGaExercise({
  exercise,
  disabled,
  onAnswerableChange,
  onEvaluate,
  checkNonce,
}: ExerciseComponentProps<Ex>) {
  return (
    <div className="ex">
      <div className="ex__stimulus ex__stimulus--word">
        <span className="ex__bigword">{exercise.english}</span>
      </div>
      <TileBuilder
        tiles={exercise.wordBank}
        answer={exercise.answer}
        gaelic
        disabled={disabled}
        checkNonce={checkNonce}
        onAnswerableChange={onAnswerableChange}
        onEvaluate={onEvaluate}
        seedKey={exercise.id}
      />
    </div>
  );
}
