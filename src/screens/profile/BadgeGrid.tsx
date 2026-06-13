import { Badge } from '@/components';
import type { IconName } from '@/art/icons/Icon';
import { achievements } from '@/data/achievements';
import { useGame } from '@/state/GameContext';

export function BadgeGrid() {
  const { state } = useGame();
  const have = new Set(state.unlockedAchievements);
  const count = have.size;

  return (
    <section className="profile-section">
      <div className="profile-section__head">
        <h2 className="profile-section__title">Achievements</h2>
        <span className="profile-section__count">
          {count}/{achievements.length}
        </span>
      </div>
      <div className="badge-grid">
        {achievements.map((a) => {
          const unlocked = have.has(a.id);
          return (
            <div key={a.id} className="badge-grid__item">
              <Badge icon={a.icon as IconName} tint={a.tint} unlocked={unlocked} size={62} />
              <span className="badge-grid__name">{a.name}</span>
              <span className="badge-grid__desc">{unlocked ? a.english : a.desc}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
