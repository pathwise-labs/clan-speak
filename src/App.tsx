import { Providers } from '@/app/Providers';
import { PhoneFrame } from '@/layout/PhoneFrame';
import { AppShell } from '@/layout/AppShell';
import { OnboardingScreen } from '@/screens/onboarding/OnboardingScreen';
import { useGame } from '@/state/GameContext';

function Root() {
  const { state } = useGame();
  return state.user.onboarded ? <AppShell /> : <OnboardingScreen />;
}

export default function App() {
  return (
    <Providers>
      <PhoneFrame>
        <Root />
      </PhoneFrame>
    </Providers>
  );
}
