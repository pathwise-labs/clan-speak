import './complete.css';
import { Button } from '@/components';
import { Icon, type IconName } from '@/art/icons/Icon';
import { HighlandCow } from '@/art/mascot/HighlandCow';
import { Confetti } from '@/art/Confetti';
import { useCountUp } from '@/hooks/useCountUp';
import { useGame } from '@/state/GameContext';
import { formatDuration } from '@/utils/time';
import type { Lesson, LessonResult } from '@/types';

export function LessonCompleteScreen({ lesson, result }: { lesson: Lesson; result: LessonResult }) {
  const { dispatch } = useGame();
  const xp = useCountUp(result.xpEarned, 1000, 250);
  const accuracy = useCountUp(result.accuracy, 1000, 450);

  const perfect = result.accuracy === 100 && !result.outOfHearts;
  const title = result.outOfHearts ? 'Lesson ended' : perfect ? 'Foirfe! · Flawless' : 'Sgoinneil! · Nice work';

  return (
    <div className="complete">
      {!result.outOfHearts && <Confetti seed={lesson.id} />}

      <div className="complete__hero">
        <HighlandCow mood={result.outOfHearts ? 'sad' : 'cheer'} size={140} />
        <h1 className="complete__title">{title}</h1>
        <p className="complete__subtitle">
          {lesson.title} · {lesson.subtitle}
        </p>
      </div>

      <div className="complete__stats">
        <StatCard icon="bolt" tint="var(--c-gold-deep)" label="Total XP" value={`+${xp}`} />
        <StatCard icon="target" tint="var(--c-green)" label="Accuracy" value={`${accuracy}%`} />
        <StatCard icon="clock" tint="var(--c-saltire)" label="Time" value={formatDuration(result.timeSeconds)} />
        <StatCard
          icon="flame"
          tint="var(--c-flame)"
          label="Best combo"
          value={`×${Math.max(1, result.maxCombo)}`}
        />
      </div>

      {result.comboBonus > 0 && (
        <p className="complete__bonus">
          <Icon name="spark" size={16} /> Combo bonus: +{result.comboBonus} XP
        </p>
      )}

      <div className="complete__footer">
        <Button fullWidth onClick={() => dispatch({ type: 'CLOSE_LESSON' })}>
          Continue
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  tint,
  label,
  value,
}: {
  icon: IconName;
  tint: string;
  label: string;
  value: string;
}) {
  return (
    <div className="statcard" style={{ ['--stat-tint' as string]: tint }}>
      <span className="statcard__icon">
        <Icon name={icon} size={22} />
      </span>
      <div className="statcard__text">
        <span className="statcard__value">{value}</span>
        <span className="statcard__label">{label}</span>
      </div>
    </div>
  );
}
