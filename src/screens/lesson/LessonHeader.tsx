import { Icon } from '@/art/icons/Icon';
import { ProgressBar } from '@/components';
import { cx } from '@/utils/classNames';

interface LessonHeaderProps {
  progress: number; // 0..1
  hearts: number;
  onClose: () => void;
}

export function LessonHeader({ progress, hearts, onClose }: LessonHeaderProps) {
  return (
    <header className="lesson__header">
      <button className="lesson__close" onClick={onClose} aria-label="Quit lesson">
        <Icon name="close" size={24} strokeWidth={2.6} />
      </button>
      <div className="lesson__progress">
        <ProgressBar value={progress * 100} tone="success" height={16} />
      </div>
      <div className="lesson__hearts" aria-label={`${hearts} hearts left`}>
        <Icon name="heart" size={20} className={cx('lesson__heart', hearts === 0 && 'lesson__heart--empty')} />
        <span className="lesson__heart-count">{hearts}</span>
      </div>
    </header>
  );
}
