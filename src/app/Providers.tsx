import { useEffect, type ReactNode } from 'react';
import { GameProvider } from '@/state/GameContext';
import { RouterProvider } from './router';
import { useTheme } from '@/hooks/useTheme';

/** Applies the current theme to the <html> element. */
function ThemeApplier() {
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GameProvider>
      <ThemeApplier />
      <RouterProvider>{children}</RouterProvider>
    </GameProvider>
  );
}
