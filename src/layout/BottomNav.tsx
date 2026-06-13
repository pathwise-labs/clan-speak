import './BottomNav.css';
import { Icon } from '@/art/icons/Icon';
import { TABS } from '@/app/routes';
import { useNavigation } from '@/app/router';
import { cx } from '@/utils/classNames';

export function BottomNav() {
  const { path, navigate } = useNavigation();
  return (
    <nav className="bottomnav" aria-label="Main">
      {TABS.map((tab) => {
        const active = path === tab.path;
        return (
          <button
            key={tab.path}
            type="button"
            className={cx('bottomnav__tab', active && 'bottomnav__tab--active')}
            aria-current={active ? 'page' : undefined}
            onClick={() => navigate(tab.path)}
          >
            <Icon name={tab.icon} size={26} strokeWidth={active ? 2.6 : 2.2} />
            <span className="bottomnav__label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
