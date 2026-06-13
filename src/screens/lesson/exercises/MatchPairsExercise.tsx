import { useEffect, useMemo, useState } from 'react';
import { WordTile } from '@/components';
import type { TileState } from '@/components/WordTile/WordTile';
import type { MatchPairsExercise as Ex } from '@/types';
import type { ExerciseComponentProps } from '../exerciseProps';
import { shuffle, seedFromString } from '@/utils/shuffle';

interface MatchCard {
  key: string;
  label: string;
  pairIndex: number;
  side: 'ga' | 'en';
}

export function MatchPairsExercise({
  exercise,
  disabled,
  onAnswerableChange,
  onEvaluate,
}: ExerciseComponentProps<Ex>) {
  const cards = useMemo<MatchCard[]>(() => {
    const all = exercise.pairs.flatMap((p, i) => [
      { key: `g${i}`, label: p.ga, pairIndex: i, side: 'ga' as const },
      { key: `e${i}`, label: p.en, pairIndex: i, side: 'en' as const },
    ]);
    return shuffle(all, seedFromString(exercise.id));
  }, [exercise.id, exercise.pairs]);

  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<MatchCard | null>(null);
  const [wrong, setWrong] = useState<Set<string>>(new Set());

  // Self-completing exercise: the Check button stays disabled/hidden.
  useEffect(() => {
    onAnswerableChange(false);
  }, [onAnswerableChange]);

  const tap = (card: MatchCard) => {
    if (disabled || matched.has(card.pairIndex) || wrong.size > 0) return;
    if (!selected) {
      setSelected(card);
      return;
    }
    if (card.key === selected.key) {
      setSelected(null);
      return;
    }
    if (card.pairIndex === selected.pairIndex && card.side !== selected.side) {
      const next = new Set(matched).add(card.pairIndex);
      setMatched(next);
      setSelected(null);
      if (next.size === exercise.pairs.length) {
        onEvaluate({ correct: true, correctAnswerLabel: '' });
      }
    } else {
      const flash = new Set([card.key, selected.key]);
      setWrong(flash);
      setSelected(null);
      window.setTimeout(() => setWrong(new Set()), 600);
    }
  };

  const stateFor = (card: MatchCard): TileState => {
    if (matched.has(card.pairIndex)) return 'correct';
    if (wrong.has(card.key)) return 'incorrect';
    if (selected?.key === card.key) return 'selected';
    return 'idle';
  };

  return (
    <div className="ex">
      <div className="match-grid">
        {cards.map((card) => (
          <WordTile
            key={card.key}
            label={card.label}
            gaelic={card.side === 'ga'}
            state={matched.has(card.pairIndex) ? 'correct' : stateFor(card)}
            onClick={() => tap(card)}
            className="match-card"
          />
        ))}
      </div>
    </div>
  );
}
