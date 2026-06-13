import './AppShell.css';
import { TopStatBar } from './TopStatBar';
import { BottomNav } from './BottomNav';
import { useNavigation } from '@/app/router';
import { Routes, isTabPath } from '@/app/routes';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { PracticeScreen } from '@/screens/practice/PracticeScreen';
import { LeaderboardScreen } from '@/screens/leaderboard/LeaderboardScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';
import { ShopScreen } from '@/screens/shop/ShopScreen';
import { SettingsScreen } from '@/screens/settings/SettingsScreen';
import { LessonOverlay } from '@/screens/lesson/LessonOverlay';

function renderScreen(path: string) {
  switch (path) {
    case Routes.Practice:
      return <PracticeScreen />;
    case Routes.Leaderboard:
      return <LeaderboardScreen />;
    case Routes.Profile:
      return <ProfileScreen />;
    case Routes.Shop:
      return <ShopScreen />;
    case Routes.Settings:
      return <SettingsScreen />;
    case Routes.Home:
    default:
      return <HomeScreen />;
  }
}

export function AppShell() {
  const { path } = useNavigation();
  const showTopBar = isTabPath(path);

  return (
    <div className="shell">
      {showTopBar && <TopStatBar />}
      <main className="shell__main" key={path}>
        {renderScreen(path)}
      </main>
      <BottomNav />
      <LessonOverlay />
    </div>
  );
}
