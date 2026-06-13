import { createInitialState, freshProgress, STATE_VERSION } from './initialState';
import type { GameState } from './gameTypes';

const KEY = 'canan.state.v1';

/** Load saved state, reconciling shape drift. Returns null to start fresh. */
export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    if (!parsed || parsed.version !== STATE_VERSION) return null;

    const base = createInitialState();
    // Ensure every known lesson has a progress entry (content may have grown).
    const progress = { ...freshProgress(), ...(parsed.progress ?? {}) };

    return {
      ...base,
      ...parsed,
      user: { ...base.user, ...parsed.user },
      stats: { ...base.stats, ...parsed.stats },
      settings: { ...base.settings, ...parsed.settings },
      league: { ...base.league, ...parsed.league },
      unlockedAchievements: parsed.unlockedAchievements ?? [],
      progress,
      // Transient: never resume a half-finished lesson after reload.
      activeLesson: null,
    };
  } catch {
    return null;
  }
}

export function saveState(state: GameState): void {
  try {
    // Don't persist the transient overlay.
    const { activeLesson: _omit, ...persistable } = state;
    void _omit;
    localStorage.setItem(KEY, JSON.stringify(persistable));
  } catch {
    /* storage unavailable — ignore (prototype is fine without persistence) */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
