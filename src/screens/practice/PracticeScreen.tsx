import './practice.css';
import { Card } from '@/components';
import { Icon, type IconName } from '@/art/icons/Icon';
import { HighlandCow } from '@/art/mascot/HighlandCow';
import { useGame } from '@/state/GameContext';
import { currentLessonId } from '@/state/selectors';
import { firstLessonId } from '@/data/units';

interface PracticeItem {
  icon: IconName;
  tint: string;
  title: string;
  desc: string;
  action: 'lesson' | 'empty';
}

const ITEMS: PracticeItem[] = [
  {
    icon: 'refresh',
    tint: 'var(--c-green)',
    title: 'Review weak words',
    desc: 'Strengthen the words you find trickiest',
    action: 'lesson',
  },
  {
    icon: 'clock',
    tint: 'var(--c-saltire)',
    title: 'Timed challenge',
    desc: 'Beat the clock for bonus XP',
    action: 'lesson',
  },
  {
    icon: 'target',
    tint: 'var(--c-flame)',
    title: 'Mistakes deck',
    desc: 'Redo the exercises you got wrong',
    action: 'empty',
  },
];

export function PracticeScreen() {
  const { state, dispatch } = useGame();
  const practiceLesson = currentLessonId(state) ?? firstLessonId;
  const hasMistakes = false; // placeholder — no mistake tracking in the prototype

  return (
    <div className="screen practice">
      <header className="practice__hero">
        <HighlandCow mood="happy" size={84} />
        <div>
          <h1 className="screen__title">Practice</h1>
          <p className="screen__subtitle" style={{ margin: 0 }}>
            Cùm ort! · Keep your Gàidhlig sharp.
          </p>
        </div>
      </header>

      <div className="practice__list">
        {ITEMS.map((item) => {
          const isEmpty = item.action === 'empty' && !hasMistakes;
          return (
            <Card
              key={item.title}
              interactive={!isEmpty}
              onClick={
                isEmpty
                  ? undefined
                  : () => dispatch({ type: 'START_LESSON', payload: { lessonId: practiceLesson } })
              }
              className="practice__card"
            >
              <span className="practice__icon" style={{ ['--p-tint' as string]: item.tint }}>
                <Icon name={item.icon} size={24} />
              </span>
              <div className="practice__text">
                <span className="practice__title">{item.title}</span>
                <span className="practice__desc">{isEmpty ? 'No mistakes yet — well done!' : item.desc}</span>
              </div>
              {!isEmpty && <Icon name="chevronRight" size={20} className="practice__chev" />}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
