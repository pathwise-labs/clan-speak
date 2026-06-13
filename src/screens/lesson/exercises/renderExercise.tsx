import type { Exercise } from '@/types';
import type { ExerciseComponentProps } from '../exerciseProps';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { TranslateGaToEnExercise } from './TranslateGaToEnExercise';
import { TranslateEnToGaExercise } from './TranslateEnToGaExercise';
import { MatchPairsExercise } from './MatchPairsExercise';
import { ListeningExercise } from './ListeningExercise';
import { FillBlankExercise } from './FillBlankExercise';

type CommonProps = Omit<ExerciseComponentProps, 'exercise'>;

/** Dispatch to the right exercise component, narrowing the union by `kind`. */
export function renderExercise(exercise: Exercise, common: CommonProps) {
  switch (exercise.kind) {
    case 'multipleChoice':
      return <MultipleChoiceExercise exercise={exercise} {...common} />;
    case 'translateGaToEn':
      return <TranslateGaToEnExercise exercise={exercise} {...common} />;
    case 'translateEnToGa':
      return <TranslateEnToGaExercise exercise={exercise} {...common} />;
    case 'matchPairs':
      return <MatchPairsExercise exercise={exercise} {...common} />;
    case 'listening':
      return <ListeningExercise exercise={exercise} {...common} />;
    case 'fillBlank':
      return <FillBlankExercise exercise={exercise} {...common} />;
  }
}
