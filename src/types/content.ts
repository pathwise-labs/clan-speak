/* ==========================================================================
   Content types — the learning material model.
   Exercise is a discriminated union keyed by `kind`. A Lesson is an ordered
   list of Exercises; a Unit groups Lessons. Everything in the lesson engine
   and the seed data depends on these types.
   ========================================================================== */

export type UnitId = string;
export type LessonId = string;
export type ExerciseId = string;

export type ExerciseKind =
  | 'multipleChoice'
  | 'translateGaToEn'
  | 'translateEnToGa'
  | 'matchPairs'
  | 'listening'
  | 'fillBlank';

interface ExerciseBase {
  id: ExerciseId;
  /** Instruction shown above the exercise, e.g. "Select the meaning". */
  prompt: string;
}

/** Pick the English meaning of a Gaelic word. */
export interface MultipleChoiceExercise extends ExerciseBase {
  kind: 'multipleChoice';
  gaelic: string;
  options: string[];
  answerIndex: number;
}

/** Build the English translation by tapping word tiles. */
export interface TranslateGaToEnExercise extends ExerciseBase {
  kind: 'translateGaToEn';
  gaelic: string;
  /** Tiles offered (includes distractors); order is shuffled at runtime. */
  tiles: string[];
  /** The correct ordered sequence of tile labels. */
  answer: string[];
}

/** Assemble the Gàidhlig translation from a word bank. */
export interface TranslateEnToGaExercise extends ExerciseBase {
  kind: 'translateEnToGa';
  english: string;
  wordBank: string[];
  answer: string[];
}

/** Tap matching Gaelic/English cards until all pairs are cleared. */
export interface MatchPairsExercise extends ExerciseBase {
  kind: 'matchPairs';
  pairs: { ga: string; en: string }[];
}

/** Listening placeholder — "play" button has no real audio; transcribe by tiles. */
export interface ListeningExercise extends ExerciseBase {
  kind: 'listening';
  /** The phrase the (fake) audio "says" — also shown after answering. */
  audioWord: string;
  tiles: string[];
  answer: string[];
}

/** Sentence with a missing word; choose the word that completes it. */
export interface FillBlankExercise extends ExerciseBase {
  kind: 'fillBlank';
  /** Sentence with the blank written as "___". */
  sentence: string;
  options: string[];
  answerIndex: number;
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslateGaToEnExercise
  | TranslateEnToGaExercise
  | MatchPairsExercise
  | ListeningExercise
  | FillBlankExercise;

export interface Lesson {
  id: LessonId;
  unitId: UnitId;
  title: string;
  /** Short Gaelic flavour subtitle, e.g. "Beannachdan". */
  subtitle?: string;
  xpReward: number;
  exercises: Exercise[];
}

export interface Unit {
  id: UnitId;
  index: number;
  title: string;
  subtitle: string;
  /** CSS color token reference, e.g. "var(--c-heather)". */
  color: string;
  lessons: Lesson[];
}

export interface VocabEntry {
  ga: string;
  en: string;
}
