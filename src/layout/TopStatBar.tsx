import './TopStatBar.css';
import { Pill } from '@/components';
import { useGame } from '@/state/GameContext';
import { useNavigation } from '@/app/router';
import { Routes } from '@/app/routes';

export function TopStatBar() {
  const { state } = useGame();
  const { navigate } = useNavigation();
  const { streakDays, gems, hearts } = state.stats;

  return (
    <header className="topbar">
      <Pill
        icon="flame"
        tone="flame"
        value={streakDays}
        pulse
        label={`${streakDays} day streak`}
        onClick={() => navigate(Routes.Profile)}
      />
      <Pill
        icon="gem"
        tone="gem"
        value={gems}
        pulse
        label={`${gems} gems`}
        onClick={() => navigate(Routes.Shop)}
      />
      <Pill
        icon="heart"
        tone="heart"
        value={hearts}
        pulse
        label={`${hearts} hearts`}
        onClick={() => navigate(Routes.Shop)}
      />
    </header>
  );
}
