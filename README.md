# Cànan — Learn Scottish Gaelic (UI prototype)

A gamified Scottish Gaelic (Gàidhlig) learning app modelled on Duolingo. This is a
**front-end UI prototype**: every screen, component and interaction state is built
on local placeholder data. There is **no backend, authentication, network call,
external link, web view, real audio engine, or real translation engine** — all of
that is meant to be wired in later.

Built with **React + Vite + TypeScript**, mobile-first inside a phone frame, themed
light/dark. All artwork (the wee Highland-cow mascot, icons, badges, league crests)
is **hand-built SVG** — no binary image assets and no icon-library dependency. The
only runtime dependencies are `react` and `react-dom`.

## Run it

```bash
npm install
npm run dev      # open the printed http://localhost:5173 URL in a browser
```

On a desktop browser the app renders inside a centred phone frame. On a narrow
screen the frame drops away and it goes full-bleed.

```bash
npm run build      # type-check + production build to dist/
npm run typecheck  # tsc --noEmit only
npm run preview    # serve the production build
```

## What's in it

- **Onboarding** — swipeable intro slides, daily-goal, level, and avatar/name setup.
- **Home** — the winding learning path: lesson nodes (locked / available / in-progress
  / completed / gold / legendary) grouped into units, a persistent top stat bar
  (streak, gems, hearts) and bottom navigation.
- **Lesson core loop** — one shared engine drives all **six** exercise types:
  multiple choice, Gaelic→English & English→Gaelic tile assembly, match pairs,
  listening (placeholder play button), and fill-in-the-blank. Wrong answers cost a
  heart and reveal the answer; correct answers build a combo multiplier and XP.
- **Lesson complete** — XP / accuracy / time / combo with confetti, unlocking the next node.
- **Practice, Leaderboard, Profile, Shop, Settings** — league table with crests,
  achievement badges, an activity heatmap, a gem shop, and settings (sound, haptics,
  reminder, dark/light theme, reset progress).

Gamification counters (XP, streak, hearts, gems) update live as you interact and
persist across reloads via `localStorage` (local only — never sent anywhere).

## Where to wire in real functionality later

- **Content** — `src/data/units.ts` holds the curriculum (authentic beginner Gàidhlig).
  Swap the seed arrays for fetched content; the `Exercise` union in
  `src/types/content.ts` is the contract.
- **Audio** — `ListeningExercise` has a play button with no sound attached; connect an
  audio source where `play()` is called.
- **State / sync** — `src/state/` (reducer + `localStorage` persistence) is the single
  place to add a backend, auth, or cloud sync.
- **Leaderboard / leagues** — `src/data/leaderboard.ts` is placeholder; replace with a feed.

## Project layout

```
src/
  app/        custom hash router, routes, providers
  layout/     PhoneFrame, AppShell, TopStatBar, BottomNav, overlay portal
  screens/    onboarding, home, lesson (+ exercises), complete, practice,
              leaderboard, profile, shop, settings
  components/ reusable design-system primitives (Button, WordTile, LessonNode, …)
  state/      GameContext + reducer + selectors + persistence
  theme/      CSS-variable design tokens (light/dark) + globals
  data/       local seed content (units, vocabulary, leaderboard, achievements, …)
  art/        hand-built SVG (HighlandCow mascot, icons, avatars, crests, confetti)
  hooks/      useLessonEngine, useTheme, useSwipe, useCountUp, …
  types/      content & domain TypeScript types
```

## Optional smoke test

`scripts/smoke.mjs` drives the app end-to-end (onboarding → a full six-type lesson →
every tab → dark mode) and writes screenshots to `/tmp/canan-shots`. It uses
`playwright-core` (a dev dependency) against your locally-installed Google Chrome:

```bash
npm run dev          # in one terminal (port 5179 for the script, or edit BASE)
node scripts/smoke.mjs
```
