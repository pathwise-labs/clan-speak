import { useState } from 'react';
import './onboarding.css';
import { Button, Card, SwipeDeck } from '@/components';
import { HighlandCow } from '@/art/mascot/HighlandCow';
import { Icon, type IconName } from '@/art/icons/Icon';
import { Avatar, AVATAR_IDS } from '@/art/Avatar';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { onboardingSlides, goalOptions, levelOptions } from '@/data/onboardingSlides';
import { useGame } from '@/state/GameContext';
import { useNavigation } from '@/app/router';
import { Routes } from '@/app/routes';
import type { AvatarId, GoalChoice, LevelChoice } from '@/types';
import { cx } from '@/utils/classNames';

type Phase = 'intro' | 'goal' | 'level' | 'profile';
const PHASES: Phase[] = ['intro', 'goal', 'level', 'profile'];

export function OnboardingScreen() {
  const { dispatch } = useGame();
  const { navigate } = useNavigation();

  const [phase, setPhase] = useState<Phase>('intro');
  const [slide, setSlide] = useState(0);
  const [goal, setGoal] = useState<GoalChoice | null>(null);
  const [level, setLevel] = useState<LevelChoice | null>(null);
  const [avatarId, setAvatarId] = useState<AvatarId>('cow');
  const [name, setName] = useState('');

  const phaseIndex = PHASES.indexOf(phase);
  const lastSlide = slide >= onboardingSlides.length - 1;

  const goNextPhase = () => setPhase(PHASES[Math.min(PHASES.length - 1, phaseIndex + 1)]);
  const goPrevPhase = () => setPhase(PHASES[Math.max(0, phaseIndex - 1)]);

  const handlePrimary = () => {
    if (phase === 'intro') {
      if (lastSlide) goNextPhase();
      else setSlide((s) => s + 1);
    } else if (phase === 'profile') {
      dispatch({
        type: 'FINISH_ONBOARDING',
        payload: { name, avatarId, level: level ?? 'beginner', goal: goal ?? 'regular' },
      });
      navigate(Routes.Home);
    } else {
      goNextPhase();
    }
  };

  const canContinue =
    phase === 'intro' ||
    (phase === 'goal' && goal !== null) ||
    (phase === 'level' && level !== null) ||
    phase === 'profile';

  const primaryLabel =
    phase === 'profile' ? 'Start learning' : phase === 'intro' && !lastSlide ? 'Next' : 'Continue';

  return (
    <div className="onboarding">
      <div className="onboarding__top">
        {phase !== 'intro' ? (
          <button className="onboarding__back" onClick={goPrevPhase} aria-label="Back">
            <Icon name="arrowLeft" size={24} />
          </button>
        ) : (
          <span className="onboarding__back" aria-hidden="true" />
        )}
        <ProgressBar value={phaseIndex + 1} max={PHASES.length} height={12} />
      </div>

      <div className="onboarding__body">
        {phase === 'intro' && (
          <SwipeDeck index={slide} onIndexChange={setSlide}>
            {onboardingSlides.map((s) => (
              <div className="slide" key={s.title}>
                <div className="slide__art" style={{ background: `color-mix(in srgb, ${s.accent} 14%, transparent)` }}>
                  <HighlandCow mood={s.mascotMood} size={150} />
                </div>
                <h1 className="slide__title">{s.title}</h1>
                <p className="slide__body">{s.body}</p>
              </div>
            ))}
          </SwipeDeck>
        )}

        {phase === 'goal' && (
          <div className="onboarding__step">
            <StepHeader title="Choose your goal" subtitle="How much Gàidhlig a day?" />
            <div className="option-list">
              {goalOptions.map((o) => (
                <Card
                  key={o.id}
                  interactive
                  selected={goal === o.id}
                  onClick={() => setGoal(o.id)}
                  className="option"
                >
                  <div className="option__main">
                    <span className="option__title">{o.title}</span>
                    <span className="option__desc">{o.desc}</span>
                  </div>
                  <span className="option__pill">{o.minutes}</span>
                </Card>
              ))}
            </div>
          </div>
        )}

        {phase === 'level' && (
          <div className="onboarding__step">
            <StepHeader title="What's your level?" subtitle="We'll start you in the right place." />
            <div className="option-list">
              {levelOptions.map((o) => (
                <Card
                  key={o.id}
                  interactive
                  selected={level === o.id}
                  onClick={() => setLevel(o.id)}
                  className="option"
                >
                  <span className="option__icon">
                    <Icon name={o.icon as IconName} size={26} />
                  </span>
                  <div className="option__main">
                    <span className="option__title">{o.title}</span>
                    <span className="option__desc">{o.desc}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {phase === 'profile' && (
          <div className="onboarding__step">
            <StepHeader title="Make it yours" subtitle="Pick a character and a name." />
            <div className="avatar-grid">
              {AVATAR_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={cx('avatar-pick', avatarId === id && 'avatar-pick--on')}
                  onClick={() => setAvatarId(id)}
                  aria-pressed={avatarId === id}
                  aria-label={`Choose ${id}`}
                >
                  <Avatar id={id} size={64} />
                </button>
              ))}
            </div>
            <label className="field">
              <span className="field__label">Your name</span>
              <input
                className="field__input"
                value={name}
                maxLength={18}
                placeholder="e.g. Mairead"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>

      <div className="onboarding__footer">
        <Button fullWidth onClick={handlePrimary} disabled={!canContinue}>
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="step-header">
      <h1 className="step-header__title">{title}</h1>
      <p className="step-header__subtitle">{subtitle}</p>
    </div>
  );
}
