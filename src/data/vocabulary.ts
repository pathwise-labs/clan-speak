import type { VocabEntry } from '@/types';

/**
 * Canonical beginner Gàidhlig vocabulary — authentic, correct Scottish Gaelic.
 * Used by the Practice "weak words" shell and as a single reference list.
 * (Lessons in units.ts embed their own copies for the exercise engine.)
 */
export const vocabulary: Record<string, VocabEntry> = {
  // Greetings & courtesy
  halo: { ga: 'halò', en: 'hello' },
  madainnMhath: { ga: 'madainn mhath', en: 'good morning' },
  feasgarMath: { ga: 'feasgar math', en: 'good afternoon / evening' },
  oidhcheMhath: { ga: 'oidhche mhath', en: 'good night' },
  tapadhLeat: { ga: 'tapadh leat', en: 'thank you' },
  tapadhLeibh: { ga: 'tapadh leibh', en: 'thank you (formal)' },
  marSinLeat: { ga: 'mar sin leat', en: 'goodbye' },
  ciamar: { ga: 'ciamar a tha thu?', en: 'how are you?' },
  thaGuMath: { ga: 'tha gu math', en: "I'm well" },
  seDoBheatha: { ga: "'s e do bheatha", en: "you're welcome" },
  slainte: { ga: 'slàinte', en: 'cheers / good health' },

  // Food & drink
  uisge: { ga: 'uisge', en: 'water' },
  aran: { ga: 'aran', en: 'bread' },
  bainne: { ga: 'bainne', en: 'milk' },
  cofaidh: { ga: 'cofaidh', en: 'coffee' },
  ti: { ga: 'tì', en: 'tea' },
  caise: { ga: 'càise', en: 'cheese' },
  ugh: { ga: 'ugh', en: 'egg' },
  iasg: { ga: 'iasg', en: 'fish' },
  feoil: { ga: 'feòil', en: 'meat' },
  buntata: { ga: 'buntàta', en: 'potato' },

  // Animals & nature
  cat: { ga: 'cat', en: 'cat' },
  cu: { ga: 'cù', en: 'dog' },
  each: { ga: 'each', en: 'horse' },
  caora: { ga: 'caora', en: 'sheep' },
  bo: { ga: 'bò', en: 'cow' },
  eun: { ga: 'eun', en: 'bird' },
  beinn: { ga: 'beinn', en: 'mountain' },
  muir: { ga: 'muir', en: 'sea' },
  grian: { ga: 'grian', en: 'sun' },
  gealach: { ga: 'gealach', en: 'moon' },

  // Family & people
  mathair: { ga: 'màthair', en: 'mother' },
  athair: { ga: 'athair', en: 'father' },
  piuthar: { ga: 'piuthar', en: 'sister' },
  brathair: { ga: 'bràthair', en: 'brother' },
  caileag: { ga: 'caileag', en: 'girl' },
  balach: { ga: 'balach', en: 'boy' },
  teaghlach: { ga: 'teaghlach', en: 'family' },
  caraid: { ga: 'caraid', en: 'friend' },

  // Numbers
  aon: { ga: 'aon', en: 'one' },
  dha: { ga: 'dhà', en: 'two' },
  tri: { ga: 'trì', en: 'three' },
  ceithir: { ga: 'ceithir', en: 'four' },
  coig: { ga: 'còig', en: 'five' },

  // Colours
  dearg: { ga: 'dearg', en: 'red' },
  gorm: { ga: 'gorm', en: 'blue' },
  uaine: { ga: 'uaine', en: 'green' },
  buidhe: { ga: 'buidhe', en: 'yellow' },
  dubh: { ga: 'dubh', en: 'black' },
};
