import { useGame } from '@/state/GameContext';
import type { ThemeName } from '@/types';

export function useTheme() {
  const { state, dispatch } = useGame();
  const theme = state.settings.theme;
  const setTheme = (t: ThemeName) => dispatch({ type: 'SET_THEME', payload: t });
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return { theme, setTheme, toggleTheme };
}
