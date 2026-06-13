import type { TranslateGaToEnExercise as Ex } from '@/types';
import type { ExerciseComponentProps } from '../exerciseProps';
import { TileBuilder } from './TileBuilder';

export function TranslateGaToEnExercise({
  exercise,
  disabled,
  onAnswerableChange,
  onEvaluate,
  checkNonce,
}: ExerciseComponentProps<Ex>) {
  return (
    <div className="ex">
      <div className="ex__stimulus ex__stimulus--word">
        <span className="ex__bigword gaelic">{exercise.gaelic}</span>
      </div>
      <TileBuilder
        tiles={exercise.tiles}
        answer={exercise.answer}
        disabled={disabled}
        checkNonce={checkNonce}
        onAnswerableChange={onAnswerableChange}
        onEvaluate={onEvaluate}
        seedKey={exercise.id}
      />
    </div>
  );
}
