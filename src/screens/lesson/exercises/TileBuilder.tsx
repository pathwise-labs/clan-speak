import { useEffect, useMemo, useRef, useState } from 'react';
import { WordTile } from '@/components';
import type { TileState } from '@/components/WordTile/WordTile';
import { shuffle, seedFromString } from '@/utils/shuffle';
import { sameSequence } from '../exerciseProps';

interface TileBuilderProps {
  tiles: string[];
  answer: string[];
  /** Render the assembled answer (and tiles) in the Gaelic display font. */
  gaelic?: boolean;
  disabled: boolean;
  checkNonce: number;
  onAnswerableChange: (ready: boolean) => void;
  onEvaluate: (r: { correct: boolean; correctAnswerLabel: string }) => void;
  seedKey: string;
}

interface Tile {
  id: number;
  label: string;
}

/** Tap-to-build answer assembly shared by the translate & listening exercises. */
export function TileBuilder({
  tiles,
  answer,
  gaelic,
  disabled,
  checkNonce,
  onAnswerableChange,
  onEvaluate,
  seedKey,
}: TileBuilderProps) {
  const shuffled = useMemo<Tile[]>(
    () => shuffle(tiles.map((label, id) => ({ id, label })), seedFromString(seedKey)),
    [tiles, seedKey],
  );

  const [picked, setPicked] = useState<Tile[]>([]);
  const correctRef = useRef<boolean | null>(null);

  const usedIds = new Set(picked.map((t) => t.id));

  const pick = (tile: Tile) => {
    if (disabled || usedIds.has(tile.id)) return;
    setPicked((p) => [...p, tile]);
  };
  const unpick = (tile: Tile) => {
    if (disabled) return;
    setPicked((p) => p.filter((t) => t.id !== tile.id));
  };

  useEffect(() => {
    onAnswerableChange(picked.length > 0);
  }, [picked.length, onAnswerableChange]);

  useEffect(() => {
    if (checkNonce <= 0) return;
    const built = picked.map((t) => t.label);
    const correct = sameSequence(built, answer);
    correctRef.current = correct;
    onEvaluate({ correct, correctAnswerLabel: answer.join(' ') });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkNonce]);

  const pickedState: TileState = disabled
    ? correctRef.current
      ? 'correct'
      : 'incorrect'
    : 'selected';

  return (
    <div className="builder">
      <div className="builder__answer">
        {picked.length === 0 && <span className="builder__placeholder" />}
        {picked.map((t) => (
          <WordTile key={t.id} label={t.label} state={pickedState} gaelic={gaelic} onClick={() => unpick(t)} />
        ))}
      </div>
      <div className="builder__bank">
        {shuffled.map((t) => (
          <WordTile
            key={t.id}
            label={t.label}
            gaelic={gaelic}
            state={usedIds.has(t.id) ? 'used' : disabled ? 'disabled' : 'idle'}
            onClick={() => pick(t)}
          />
        ))}
      </div>
    </div>
  );
}
