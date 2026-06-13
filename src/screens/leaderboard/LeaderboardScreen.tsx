import { Fragment } from 'react';
import './leaderboard.css';
import { Icon } from '@/art/icons/Icon';
import { Avatar } from '@/art/Avatar';
import { LeagueCrest } from '@/art/LeagueCrest';
import { useGame } from '@/state/GameContext';
import { leaderboardRanked } from '@/state/selectors';
import { PROMOTION_COUNT, DEMOTION_COUNT } from '@/data/leaderboard';
import { nextTier, prevTier } from '@/data/leagues';
import { cx } from '@/utils/classNames';

export function LeaderboardScreen() {
  const { state } = useGame();
  const rows = leaderboardRanked(state);
  const tier = state.league.tier;
  const demotionStart = rows.length - DEMOTION_COUNT;

  return (
    <div className="screen leaderboard">
      <header className="league-head">
        <LeagueCrest tier={tier} size={72} />
        <h1 className="league-head__title">{tier} League</h1>
        <p className="league-head__sub">5 days left · top {PROMOTION_COUNT} are promoted</p>
        <div className="league-head__tiers">
          {prevTier(tier) !== tier && (
            <>
              <span className="league-head__tier">
                <LeagueCrest tier={prevTier(tier)} size={26} locked />
                {prevTier(tier)}
              </span>
              <Icon name="chevronRight" size={16} />
            </>
          )}
          <span className="league-head__tier league-head__tier--current">{tier}</span>
          {nextTier(tier) !== tier && (
            <>
              <Icon name="chevronRight" size={16} />
              <span className="league-head__tier">
                <LeagueCrest tier={nextTier(tier)} size={26} locked />
                {nextTier(tier)}
              </span>
            </>
          )}
        </div>
      </header>

      <ol className="league-list">
        {rows.map((u, i) => {
          const rank = i + 1;
          const promo = i < PROMOTION_COUNT;
          const demo = i >= demotionStart;
          return (
            <Fragment key={u.id}>
              {i === PROMOTION_COUNT && (
                <li className="league-zone" aria-hidden="true">
                  Promotion zone above
                </li>
              )}
              <li className={cx('league-row', u.isCurrentUser && 'league-row--me')}>
                <span
                  className={cx(
                    'league-row__rank',
                    promo && 'league-row__rank--promo',
                    demo && 'league-row__rank--demo',
                  )}
                >
                  {rank}
                </span>
                <Avatar id={u.avatarId} size={40} />
                <span className="league-row__name">{u.name}</span>
                <span className="league-row__xp">
                  {u.weeklyXp}
                  <Icon name="bolt" size={14} />
                </span>
              </li>
              {i === demotionStart - 1 && (
                <li className="league-zone league-zone--demo" aria-hidden="true">
                  Demotion zone below
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
