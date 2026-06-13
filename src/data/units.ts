import type {
  Exercise,
  FillBlankExercise,
  Lesson,
  ListeningExercise,
  MatchPairsExercise,
  MultipleChoiceExercise,
  TranslateEnToGaExercise,
  TranslateGaToEnExercise,
  Unit,
} from '@/types';

/* --------------------------------------------------------------------------
   Builder helpers — keep the authentic Gàidhlig content readable.
   Exercise ids are sequential & deterministic (module evaluates once per load),
   which is all the engine needs (React keys + tile-shuffle seeds).
   -------------------------------------------------------------------------- */
let _n = 0;
const eid = () => `ex${++_n}`;

const mc = (
  gaelic: string,
  options: string[],
  answerIndex: number,
  prompt = 'Select the meaning',
): MultipleChoiceExercise => ({ id: eid(), kind: 'multipleChoice', prompt, gaelic, options, answerIndex });

const gaEn = (
  gaelic: string,
  answer: string[],
  distractors: string[],
  prompt = 'Tap the translation',
): TranslateGaToEnExercise => ({
  id: eid(),
  kind: 'translateGaToEn',
  prompt,
  gaelic,
  answer,
  tiles: [...answer, ...distractors],
});

const enGa = (
  english: string,
  answer: string[],
  distractors: string[],
  prompt = 'Write this in Gàidhlig',
): TranslateEnToGaExercise => ({
  id: eid(),
  kind: 'translateEnToGa',
  prompt,
  english,
  answer,
  wordBank: [...answer, ...distractors],
});

const match = (
  pairs: { ga: string; en: string }[],
  prompt = 'Tap the matching pairs',
): MatchPairsExercise => ({ id: eid(), kind: 'matchPairs', prompt, pairs });

const listen = (
  audioWord: string,
  answer: string[],
  distractors: string[],
  prompt = 'Tap what you hear',
): ListeningExercise => ({
  id: eid(),
  kind: 'listening',
  prompt,
  audioWord,
  answer,
  tiles: [...answer, ...distractors],
});

const fill = (
  sentence: string,
  options: string[],
  answerIndex: number,
  prompt = 'Complete the sentence',
): FillBlankExercise => ({ id: eid(), kind: 'fillBlank', prompt, sentence, options, answerIndex });

const lesson = (
  id: string,
  unitId: string,
  title: string,
  subtitle: string,
  exercises: Exercise[],
  xpReward = 20,
): Lesson => ({ id, unitId, title, subtitle, xpReward, exercises });

/* --------------------------------------------------------------------------
   The curriculum
   -------------------------------------------------------------------------- */

export const units: Unit[] = [
  // ===== UNIT 1 — Greetings ================================================
  {
    id: 'u1',
    index: 1,
    title: 'Fàilte',
    subtitle: 'Greetings & courtesy',
    color: 'var(--c-heather)',
    lessons: [
      // Showcase lesson — uses ALL SIX exercise types
      lesson('u1l1', 'u1', 'Beannachdan', 'Greetings', [
        mc('halò', ['hello', 'goodbye', 'thank you', 'water'], 0),
        gaEn('madainn mhath', ['good', 'morning'], ['night', 'evening']),
        enGa('thank you', ['tapadh', 'leat'], ['leibh', 'halò']),
        match([
          { ga: 'halò', en: 'hello' },
          { ga: 'tapadh leat', en: 'thank you' },
          { ga: 'mar sin leat', en: 'goodbye' },
          { ga: 'slàinte', en: 'cheers' },
        ]),
        listen('madainn mhath', ['madainn', 'mhath'], ['feasgar', 'oidhche']),
        fill('Ciamar a tha ___?', ['thu', 'mi', 'math', 'halò'], 0),
      ]),
      lesson('u1l2', 'u1', 'Cùirteas', 'Courtesy', [
        mc('tapadh leat', ['thank you', 'sorry', 'please', 'hello'], 0),
        mc("'s e do bheatha", ["you're welcome", 'good night', 'goodbye', 'cheers'], 0),
        gaEn('feasgar math', ['good', 'afternoon'], ['morning', 'water']),
        enGa('good night', ['oidhche', 'mhath'], ['madainn', 'math']),
        match([
          { ga: 'tapadh leibh', en: 'thank you (formal)' },
          { ga: 'feasgar math', en: 'good afternoon' },
          { ga: 'oidhche mhath', en: 'good night' },
        ]),
      ]),
      lesson('u1l3', 'u1', 'Ciamar a tha thu?', 'How are you?', [
        mc('ciamar a tha thu?', ['how are you?', 'where are you?', 'who are you?', 'what is that?'], 0),
        mc('tha gu math', ["I'm well", 'I am tired', 'not bad', 'goodbye'], 0),
        fill('Tha mi ___ math, tapadh leat.', ['gu', 'a', 'an', 'mi'], 0),
        listen('tha gu math', ['tha', 'gu', 'math'], ['mi', 'thu']),
        enGa('how are you?', ['ciamar', 'a', 'tha', 'thu'], ['mi', 'gu']),
      ]),
      lesson('u1l4', 'u1', 'Mar sin leat', 'Farewells', [
        mc('mar sin leat', ['goodbye', 'good morning', 'welcome', 'sorry'], 0),
        gaEn('oidhche mhath', ['good', 'night'], ['morning', 'evening']),
        match([
          { ga: 'halò', en: 'hello' },
          { ga: 'mar sin leat', en: 'goodbye' },
          { ga: 'madainn mhath', en: 'good morning' },
          { ga: 'feasgar math', en: 'good evening' },
        ]),
        fill('___ leat — see you!', ['Mar sin', 'Tapadh', 'Madainn', 'Halò'], 0),
      ]),
    ],
  },

  // ===== UNIT 2 — Food & drink =============================================
  {
    id: 'u2',
    index: 2,
    title: 'Biadh is Deoch',
    subtitle: 'Food & drink',
    color: 'var(--c-saltire)',
    lessons: [
      lesson('u2l1', 'u2', 'Deoch', 'Drinks', [
        mc('uisge', ['water', 'bread', 'milk', 'tea'], 0),
        mc('bainne', ['milk', 'water', 'coffee', 'cheese'], 0),
        gaEn('tì', ['tea'], ['coffee', 'water']),
        match([
          { ga: 'uisge', en: 'water' },
          { ga: 'bainne', en: 'milk' },
          { ga: 'cofaidh', en: 'coffee' },
          { ga: 'tì', en: 'tea' },
        ]),
        listen('cofaidh', ['cofaidh'], ['bainne', 'uisge']),
        fill('Tha mi ag òl ___.', ['uisge', 'aran', 'cat', 'beinn'], 0, 'Choose: "I am drinking ___."'),
      ]),
      lesson('u2l2', 'u2', 'Biadh', 'Food', [
        mc('aran', ['bread', 'cheese', 'egg', 'fish'], 0),
        mc('iasg', ['fish', 'meat', 'milk', 'potato'], 0),
        gaEn('càise', ['cheese'], ['butter', 'bread']),
        enGa('an egg', ['ugh'], ['aran', 'iasg']),
        match([
          { ga: 'aran', en: 'bread' },
          { ga: 'càise', en: 'cheese' },
          { ga: 'iasg', en: 'fish' },
          { ga: 'feòil', en: 'meat' },
        ]),
      ]),
      lesson('u2l3', 'u2', 'Aig a’ bhòrd', 'At the table', [
        mc('buntàta', ['potato', 'bread', 'meat', 'egg'], 0),
        fill('Tha an t-acras ___.', ['orm', 'leat', 'math', 'thu'], 0, 'Choose: "I am hungry."'),
        listen('aran', ['aran'], ['ugh', 'càise']),
        enGa('fish and bread', ['iasg', 'agus', 'aran'], ['feòil', 'bainne']),
        gaEn('feòil', ['meat'], ['fish', 'egg']),
      ]),
    ],
  },

  // ===== UNIT 3 — Animals & nature =========================================
  {
    id: 'u3',
    index: 3,
    title: 'Ainmhidhean',
    subtitle: 'Animals & nature',
    color: 'var(--c-green)',
    lessons: [
      lesson('u3l1', 'u3', 'Beathaichean', 'Animals', [
        mc('cù', ['dog', 'cat', 'horse', 'bird'], 0),
        mc('cat', ['cat', 'cow', 'sheep', 'dog'], 0),
        gaEn('each', ['horse'], ['sheep', 'cow']),
        match([
          { ga: 'cù', en: 'dog' },
          { ga: 'cat', en: 'cat' },
          { ga: 'each', en: 'horse' },
          { ga: 'eun', en: 'bird' },
        ]),
        listen('caora', ['caora'], ['bò', 'each']),
        fill('Tha ___ agam — I have a dog.', ['cù', 'cat', 'bò', 'eun'], 0),
      ]),
      lesson('u3l2', 'u3', 'Air a’ chroit', 'On the croft', [
        mc('bò', ['cow', 'sheep', 'dog', 'bird'], 0),
        mc('caora', ['sheep', 'horse', 'cat', 'cow'], 0),
        enGa('a bird', ['eun'], ['bò', 'each']),
        match([
          { ga: 'bò', en: 'cow' },
          { ga: 'caora', en: 'sheep' },
          { ga: 'eun', en: 'bird' },
        ]),
      ]),
      lesson('u3l3', 'u3', 'Nàdar', 'Nature', [
        mc('beinn', ['mountain', 'sea', 'river', 'sun'], 0),
        mc('grian', ['sun', 'moon', 'sea', 'mountain'], 0),
        gaEn('muir', ['sea'], ['mountain', 'moon']),
        listen('gealach', ['gealach'], ['grian', 'beinn']),
        fill('Tha a’ ___ àrd — the mountain is high.', ['bheinn', 'mhuir', 'ghrian', 'cat'], 0),
      ]),
    ],
  },

  // ===== UNIT 4 — Family & people ==========================================
  {
    id: 'u4',
    index: 4,
    title: 'Teaghlach',
    subtitle: 'Family & people',
    color: 'var(--c-thistle)',
    lessons: [
      lesson('u4l1', 'u4', 'An teaghlach', 'The family', [
        mc('màthair', ['mother', 'father', 'sister', 'brother'], 0),
        mc('athair', ['father', 'mother', 'friend', 'boy'], 0),
        gaEn('piuthar', ['sister'], ['brother', 'mother']),
        match([
          { ga: 'màthair', en: 'mother' },
          { ga: 'athair', en: 'father' },
          { ga: 'piuthar', en: 'sister' },
          { ga: 'bràthair', en: 'brother' },
        ]),
        listen('teaghlach', ['teaghlach'], ['caraid', 'caileag']),
        fill('Seo mo ___ — this is my mother.', ['mhàthair', 'athair', 'piuthar', 'cù'], 0),
      ]),
      lesson('u4l2', 'u4', 'Daoine', 'People', [
        mc('caileag', ['girl', 'boy', 'woman', 'man'], 0),
        mc('balach', ['boy', 'girl', 'friend', 'father'], 0),
        enGa('a friend', ['caraid'], ['caileag', 'balach']),
        match([
          { ga: 'caileag', en: 'girl' },
          { ga: 'balach', en: 'boy' },
          { ga: 'caraid', en: 'friend' },
        ]),
      ]),
      lesson('u4l3', 'u4', 'Mi fhìn', 'Myself', [
        mc('dè an t-ainm a th’ ort?', ["what's your name?", 'how are you?', 'where are you?', 'who is that?'], 0),
        fill("'S mise ___ — I am Mairead.", ['Mairead', 'thu', 'gu', 'math'], 0),
        listen('caraid', ['caraid'], ['teaghlach', 'caileag']),
        enGa('I love you', ['tha', 'gaol', 'agam', 'ort'], ['mi', 'gu']),
      ]),
    ],
  },

  // ===== UNIT 5 — Numbers & colours ========================================
  {
    id: 'u5',
    index: 5,
    title: 'Àireamhan',
    subtitle: 'Numbers & colours',
    color: 'var(--c-flame)',
    lessons: [
      lesson('u5l1', 'u5', 'A h-aon, a dhà', 'Counting', [
        mc('trì', ['three', 'two', 'four', 'five'], 0),
        mc('còig', ['five', 'four', 'three', 'one'], 0),
        gaEn('dhà', ['two'], ['one', 'three']),
        match([
          { ga: 'aon', en: 'one' },
          { ga: 'dhà', en: 'two' },
          { ga: 'trì', en: 'three' },
          { ga: 'ceithir', en: 'four' },
        ]),
        listen('còig', ['còig'], ['trì', 'aon']),
        fill('A h-___, a dhà, a trì.', ['aon', 'ceithir', 'còig', 'cat'], 0),
      ]),
      lesson('u5l2', 'u5', 'Dathan', 'Colours', [
        mc('dearg', ['red', 'blue', 'green', 'black'], 0),
        mc('gorm', ['blue', 'yellow', 'red', 'white'], 0),
        gaEn('uaine', ['green'], ['yellow', 'black']),
        match([
          { ga: 'dearg', en: 'red' },
          { ga: 'gorm', en: 'blue' },
          { ga: 'uaine', en: 'green' },
          { ga: 'buidhe', en: 'yellow' },
        ]),
        enGa('a black cat', ['cat', 'dubh'], ['dearg', 'gorm']),
      ]),
      lesson('u5l3', 'u5', 'Cuir còmhla', 'Putting it together', [
        mc('trì cait', ['three cats', 'two dogs', 'four sheep', 'one cow'], 0),
        fill('Tha ___ cù agam — I have one dog.', ['aon', 'dhà', 'trì', 'gorm'], 0),
        listen('cat dubh', ['cat', 'dubh'], ['cù', 'dearg']),
        enGa('two red birds', ['dà', 'eun', 'dhearg'], ['cat', 'gorm']),
        match([
          { ga: 'aon', en: 'one' },
          { ga: 'dearg', en: 'red' },
          { ga: 'cat', en: 'cat' },
          { ga: 'gorm', en: 'blue' },
        ]),
      ]),
    ],
  },
];

/* --------------------------------------------------------------------------
   Lookups
   -------------------------------------------------------------------------- */
export const allLessons: Lesson[] = units.flatMap((u) => u.lessons);

export const lessonById: Record<string, Lesson> = Object.fromEntries(
  allLessons.map((l) => [l.id, l]),
);

export const unitByLessonId: Record<string, Unit> = Object.fromEntries(
  units.flatMap((u) => u.lessons.map((l) => [l.id, u])),
);

/** Ordered list of lesson ids — used to unlock the "next" node on completion. */
export const lessonOrder: string[] = allLessons.map((l) => l.id);

export const firstLessonId = lessonOrder[0];
