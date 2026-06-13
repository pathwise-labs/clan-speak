import './LessonNode.css';
import { Icon, type IconName } from '@/art/icons/Icon';
import type { LessonStatus } from '@/types';
import { cx } from '@/utils/classNames';

interface LessonNodeProps {
  status: LessonStatus;
  /** The current node the learner is on — shows a bobbing START bubble. */
  isCurrent?: boolean;
  label: string;
  onClick?: () => void;
}

const ICON_BY_STATUS: Record<LessonStatus, IconName> = {
  locked: 'lock',
  available: 'star',
  inProgress: 'book',
  completed: 'check',
  gold: 'crown',
  legendary: 'trophy',
};

export function LessonNode({ status, isCurrent, label, onClick }: LessonNodeProps) {
  const locked = status === 'locked';
  return (
    <div className={cx('node-wrap', isCurrent && 'node-wrap--current')}>
      {isCurrent && !locked && (
        <div className="node-bubble" aria-hidden="true">
          {status === 'inProgress' ? 'RESUME' : 'START'}
        </div>
      )}
      <button
        type="button"
        className={cx('node', `node--${status}`)}
        onClick={onClick}
        disabled={locked}
        aria-label={`${label} — ${status}`}
      >
        <span className="node__top">
          <Icon name={ICON_BY_STATUS[status]} size={30} strokeWidth={2.6} />
        </span>
      </button>
    </div>
  );
}
