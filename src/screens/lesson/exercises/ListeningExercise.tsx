import { useState } from 'react';
import { Icon } from '@/art/icons/Icon';
import type { ListeningExercise as Ex } from '@/types';
import type { ExerciseComponentProps } from '../exerciseProps';
import { TileBuilder } from './TileBuilder';
import { cx } from '@/utils/classNames';

export function ListeningExercise({
  exercise,
  disabled,
  onAnswerableChange,
  onEvaluate,
  checkNonce,
}: ExerciseComponentProps<Ex>) {
  const [playing, setPlaying] = useState(false);

  // Placeholder "play" — no real audio engine; just a visual pulse.
  const play = () => {
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 700);
  };

  return (
    <div className="ex">
      <div className="ex__audio">
        <button
          type="button"
          className={cx('audio-btn', playing && 'audio-btn--playing')}
          onClick={play}
          aria-label="Play audio (placeholder)"
        >
          <Icon name="volume" size={34} strokeWidth={2.4} />
        </button>
        <button type="button" className="audio-btn audio-btn--slow" onClick={play} aria-label="Play slowly (placeholder)">
          <Icon name="play" size={18} />
          <span>SLOW</span>
        </button>
      </div>
      {disabled && <p className="ex__heard gaelic">“{exercise.audioWord}”</p>}
      <TileBuilder
        tiles={exercise.tiles}
        answer={exercise.answer}
        gaelic
        disabled={disabled}
        checkNonce={checkNonce}
        onAnswerableChange={onAnswerableChange}
        onEvaluate={onEvaluate}
        seedKey={exercise.id}
      />
    </div>
  );
}
