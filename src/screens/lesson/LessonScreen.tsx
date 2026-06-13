import { useState } from 'react';
import './lesson.css';
import { Banner, Button, Modal } from '@/components';
import { Icon } from '@/art/icons/Icon';
import { LessonHeader } from './LessonHeader';
import { renderExercise } from './exercises/renderExercise';
import { useLessonEngine } from '@/hooks/useLessonEngine';
import { useGame } from '@/state/GameContext';
import { shopItems } from '@/data/shopItems';
import type { Lesson } from '@/types';
import { cx } from '@/utils/classNames';

const PRAISE = ['Ceart! · Correct', 'Sgoinneil! · Brilliant', 'Math fhèin! · Well done', 'Glè mhath! · Very good'];
const HEART_REFILL_PRICE = shopItems.find((i) => i.id === 'heart_refill')?.price ?? 350;

export function LessonScreen({ lesson }: { lesson: Lesson }) {
  const engine = useLessonEngine(lesson);
  const { state, dispatch } = useGame();
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);
  const [showQuit, setShowQuit] = useState(false);

  const {
    exercise,
    index,
    total,
    phase,
    answerable,
    setAnswerable,
    checkNonce,
    lastResult,
    combo,
    hearts,
    requestCheck,
    submitEvaluation,
    proceed,
    abandon,
  } = engine;

  const checked = phase === 'checked';
  const progress = (index + (checked ? 1 : 0)) / total;
  const isMatch = exercise.kind === 'matchPairs';
  const isLast = index === total - 1;

  const handleContinue = () => {
    if (!isLast && hearts === 0) {
      setShowOutOfHearts(true);
      return;
    }
    proceed();
  };

  const refillAndContinue = () => {
    if (state.stats.gems < HEART_REFILL_PRICE) return;
    dispatch({ type: 'BUY_ITEM', payload: { itemId: 'heart_refill' } });
    setShowOutOfHearts(false);
    proceed();
  };

  return (
    <div className="lesson">
      <LessonHeader progress={progress} hearts={hearts} onClose={() => setShowQuit(true)} />

      {combo >= 2 && checked && lastResult?.correct && (
        <div className="lesson__combo" aria-hidden="true">
          <Icon name="bolt" size={16} /> Combo ×{combo}
        </div>
      )}

      <div className="lesson__body">
        <h2 className="lesson__prompt">{exercise.prompt}</h2>
        <div className="lesson__exercise" key={exercise.id}>
          {renderExercise(exercise, {
            disabled: checked,
            onAnswerableChange: setAnswerable,
            onEvaluate: submitEvaluation,
            checkNonce,
          })}
        </div>
      </div>

      {!checked && (
        <footer className="lesson__footer">
          {isMatch ? (
            <p className="lesson__hint">Tap a Gàidhlig word, then its English match.</p>
          ) : (
            <Button fullWidth disabled={!answerable} onClick={requestCheck}>
              Check
            </Button>
          )}
        </footer>
      )}

      {checked && lastResult && (
        <Banner
          tone={lastResult.correct ? 'success' : 'error'}
          title={lastResult.correct ? PRAISE[index % PRAISE.length] : 'Cha b’ e · Not quite'}
          detail={!lastResult.correct ? `Answer: ${lastResult.correctAnswerLabel}` : undefined}
          onContinue={handleContinue}
        />
      )}

      <Modal
        open={showOutOfHearts}
        onClose={() => setShowOutOfHearts(false)}
        title="Out of hearts!"
        hideClose
      >
        <div className="ooh">
          <p className="ooh__text">
            You’ve run out of hearts. Refill to keep going, or come back later.
          </p>
          <Button
            fullWidth
            leading={<Icon name="heart" size={18} />}
            disabled={state.stats.gems < HEART_REFILL_PRICE}
            onClick={refillAndContinue}
          >
            Refill · {HEART_REFILL_PRICE} gems
          </Button>
          <Button variant="ghost" fullWidth onClick={abandon}>
            Quit lesson
          </Button>
        </div>
      </Modal>

      <Modal open={showQuit} onClose={() => setShowQuit(false)} title="Quit lesson?">
        <div className="ooh">
          <p className="ooh__text">Your progress in this lesson won’t be saved.</p>
          <Button variant="danger" fullWidth onClick={abandon}>
            Quit
          </Button>
          <Button variant="ghost" fullWidth onClick={() => setShowQuit(false)}>
            Keep learning
          </Button>
        </div>
      </Modal>

      <span className={cx('lesson__srprogress', 'sr-only')} aria-live="polite">
        Exercise {index + 1} of {total}
      </span>
    </div>
  );
}
