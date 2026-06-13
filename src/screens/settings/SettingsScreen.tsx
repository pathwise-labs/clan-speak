import { useState, type ReactNode } from 'react';
import './settings.css';
import { Button, Modal } from '@/components';
import { Icon, type IconName } from '@/art/icons/Icon';
import { useGame } from '@/state/GameContext';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation } from '@/app/router';
import { Routes } from '@/app/routes';
import { cx } from '@/utils/classNames';

export function SettingsScreen() {
  const { state, dispatch } = useGame();
  const { theme, toggleTheme } = useTheme();
  const { navigate } = useNavigation();
  const { settings } = state;
  const [confirmReset, setConfirmReset] = useState(false);

  const update = (patch: Partial<typeof settings>) => dispatch({ type: 'UPDATE_SETTINGS', payload: patch });

  const doReset = () => {
    dispatch({ type: 'RESET_PROGRESS' });
    setConfirmReset(false);
    navigate(Routes.Home);
  };

  return (
    <div className="settings">
      <header className="screen-header">
        <button className="settings__back" onClick={() => navigate(Routes.Profile)} aria-label="Back">
          <Icon name="arrowLeft" size={24} />
        </button>
        <h1 className="screen-header__title">Settings</h1>
      </header>

      <div className="settings__body">
        <Group title="Preferences">
          <ToggleRow
            icon="volume"
            label="Sound effects"
            on={settings.sound}
            onToggle={() => update({ sound: !settings.sound })}
          />
          <ToggleRow
            icon="bolt"
            label="Haptic feedback"
            on={settings.haptics}
            onToggle={() => update({ haptics: !settings.haptics })}
          />
        </Group>

        <Group title="Reminders">
          <ToggleRow
            icon="bell"
            label="Daily reminder"
            sublabel={settings.reminderOn ? `Every day at ${settings.reminderTime}` : 'Off'}
            on={settings.reminderOn}
            onToggle={() => update({ reminderOn: !settings.reminderOn })}
          />
        </Group>

        <Group title="Appearance">
          <ToggleRow
            icon={theme === 'dark' ? 'moon' : 'sun'}
            label="Dark mode"
            on={theme === 'dark'}
            onToggle={toggleTheme}
          />
        </Group>

        <Group title="Account">
          <button className="settings-row settings-row--danger" onClick={() => setConfirmReset(true)}>
            <span className="settings-row__icon settings-row__icon--danger">
              <Icon name="refresh" size={20} />
            </span>
            <span className="settings-row__label">Reset all progress</span>
            <Icon name="chevronRight" size={18} className="settings-row__chev" />
          </button>
        </Group>

        <p className="settings__version">Cànan · UI prototype · v0.1</p>
      </div>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset progress?">
        <div className="settings__confirm">
          <p>
            This clears your XP, streak, hearts, gems and lesson progress. Your profile and settings are
            kept. This can’t be undone.
          </p>
          <Button variant="danger" fullWidth onClick={doReset}>
            Reset everything
          </Button>
          <Button variant="ghost" fullWidth onClick={() => setConfirmReset(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="settings-group">
      <h2 className="settings-group__title">{title}</h2>
      <div className="settings-group__rows">{children}</div>
    </section>
  );
}

function ToggleRow({
  icon,
  label,
  sublabel,
  on,
  onToggle,
}: {
  icon: IconName;
  label: string;
  sublabel?: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button className="settings-row" onClick={onToggle} aria-pressed={on}>
      <span className="settings-row__icon">
        <Icon name={icon} size={20} />
      </span>
      <span className="settings-row__text">
        <span className="settings-row__label">{label}</span>
        {sublabel && <span className="settings-row__sub">{sublabel}</span>}
      </span>
      <span className={cx('switch', on && 'switch--on')} aria-hidden="true">
        <span className="switch__knob" />
      </span>
    </button>
  );
}
