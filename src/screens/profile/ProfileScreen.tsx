import './profile.css';
import { Icon, type IconName } from '@/art/icons/Icon';
import { Avatar } from '@/art/Avatar';
import { IconButton, ProgressBar } from '@/components';
import { BadgeGrid } from './BadgeGrid';
import { ActivityHeatmap } from './ActivityHeatmap';
import { useGame } from '@/state/GameContext';
import { levelInfo } from '@/state/selectors';
import { useNavigation } from '@/app/router';
import { Routes } from '@/app/routes';
import { goalOptions } from '@/data/onboardingSlides';

export function ProfileScreen() {
  const { state } = useGame();
  const { navigate } = useNavigation();
  const lvl = levelInfo(state);
  const { xp, streakDays, longestStreak } = state.stats;
  const goalLabel = goalOptions.find((g) => g.id === state.user.goal)?.minutes ?? '';

  const stats: { icon: IconName; tint: string; label: string; value: string }[] = [
    { icon: 'bolt', tint: 'var(--c-gold-deep)', label: 'Total XP', value: String(xp) },
    { icon: 'star', tint: 'var(--c-heather)', label: 'Level', value: String(lvl.level) },
    { icon: 'flame', tint: 'var(--c-flame)', label: 'Day streak', value: String(streakDays) },
    { icon: 'crown', tint: 'var(--c-saltire)', label: 'Longest streak', value: String(longestStreak) },
  ];

  return (
    <div className="screen profile">
      <div className="profile__topbar">
        <IconButton icon="settings" label="Settings" variant="soft" onClick={() => navigate(Routes.Settings)} />
      </div>

      <header className="profile__head">
        <Avatar id={state.user.avatarId} size={92} ring />
        <h1 className="profile__name">{state.user.name || 'Caraid'}</h1>
        <p className="profile__meta">
          {state.user.level === 'beginner' ? 'Beginner' : 'Some Gàidhlig'} · {goalLabel} · Joined{' '}
          {state.user.joinedLabel}
        </p>
      </header>

      <div className="profile__level">
        <div className="profile__level-row">
          <span>Level {lvl.level}</span>
          <span className="profile__level-next">{lvl.xpToNext} XP to level {lvl.level + 1}</span>
        </div>
        <ProgressBar value={lvl.progress * 100} tone="gold" height={12} />
      </div>

      <div className="profile__stats">
        {stats.map((s) => (
          <div className="profile-stat" key={s.label} style={{ ['--stat-tint' as string]: s.tint }}>
            <span className="profile-stat__icon">
              <Icon name={s.icon} size={20} />
            </span>
            <span className="profile-stat__value">{s.value}</span>
            <span className="profile-stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      <BadgeGrid />
      <ActivityHeatmap />
    </div>
  );
}
