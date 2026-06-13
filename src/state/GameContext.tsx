import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { gameReducer } from './gameReducer';
import { createInitialState } from './initialState';
import { loadState, saveState } from './persistence';
import type { GameAction, GameState } from './gameTypes';

interface GameContextValue {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => loadState() ?? createInitialState());

  // Debounced persistence — reducer stays pure, side-effect lives here.
  useEffect(() => {
    const t = window.setTimeout(() => saveState(state), 300);
    return () => window.clearTimeout(t);
  }, [state]);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}
