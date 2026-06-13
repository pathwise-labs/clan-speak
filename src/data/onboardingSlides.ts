import type { GoalChoice, LevelChoice, OnboardingSlide } from '@/types';

export const onboardingSlides: OnboardingSlide[] = [
  {
    title: 'Fàilte gu Cànan!',
    body: 'Welcome! Learn Scottish Gaelic — Gàidhlig — in wee, bite-sized lessons. Just a few minutes a day.',
    mascotMood: 'wave',
    accent: 'var(--c-heather)',
  },
  {
    title: 'Meet Hamish',
    body: "He's a wee Highland coo, and he'll cheer you on through every lesson. Keep him happy by practising daily!",
    mascotMood: 'happy',
    accent: 'var(--c-saltire)',
  },
  {
    title: 'Build a streak',
    body: 'Practise every day to grow your streak, earn gems, and climb the leagues against other learners.',
    mascotMood: 'cheer',
    accent: 'var(--c-flame)',
  },
  {
    title: 'Ready to begin?',
    body: "Let's set up your goal and get started. Tha mi cinnteach gun còrd e riut! (I'm sure you'll enjoy it!)",
    mascotMood: 'happy',
    accent: 'var(--c-green)',
  },
];

export interface GoalOption {
  id: GoalChoice;
  title: string;
  minutes: string;
  desc: string;
}

export const goalOptions: GoalOption[] = [
  { id: 'casual', title: 'Casual', minutes: '5 min / day', desc: 'A relaxed wee bit each day' },
  { id: 'regular', title: 'Regular', minutes: '10 min / day', desc: 'Steady, dependable progress' },
  { id: 'serious', title: 'Serious', minutes: '20 min / day', desc: 'Go all in on your Gàidhlig' },
];

export interface LevelOption {
  id: LevelChoice;
  title: string;
  desc: string;
  icon: string;
}

export const levelOptions: LevelOption[] = [
  {
    id: 'beginner',
    title: "I'm brand new",
    desc: 'Start from the very beginning',
    icon: 'sprout',
  },
  {
    id: 'some',
    title: 'I know some Gàidhlig',
    desc: 'A few words and phrases already',
    icon: 'star',
  },
];
