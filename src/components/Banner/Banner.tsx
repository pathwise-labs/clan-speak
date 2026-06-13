import './Banner.css';
import { Icon } from '@/art/icons/Icon';
import { Button } from '../Button/Button';
import { cx } from '@/utils/classNames';

interface BannerProps {
  tone: 'success' | 'error';
  title: string;
  /** Secondary detail line — e.g. the correct answer after a wrong attempt. */
  detail?: string;
  continueLabel?: string;
  onContinue: () => void;
}

/** The lesson feedback banner that slides up after checking an answer. */
export function Banner({ tone, title, detail, continueLabel = 'Continue', onContinue }: BannerProps) {
  return (
    <div className={cx('banner', `banner--${tone}`)} role="status">
      <div className="banner__row">
        <span className="banner__icon">
          <Icon name={tone === 'success' ? 'check' : 'close'} size={22} strokeWidth={3} />
        </span>
        <div className="banner__text">
          <p className="banner__title">{title}</p>
          {detail && <p className="banner__detail">{detail}</p>}
        </div>
      </div>
      <Button
        variant={tone === 'success' ? 'success' : 'danger'}
        fullWidth
        onClick={onContinue}
        className="banner__cta"
      >
        {continueLabel}
      </Button>
    </div>
  );
}
