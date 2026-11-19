import React, { useEffect, useMemo, useState } from 'react';
import { Timer, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { BONUS2_BLITZ_POOL } from '../../data/advancedLevelsData';
import { DifficultyLevel } from '../../types/game';
import { getDifficultyConfig, shuffleArray } from '../../utils/gameEngine';

interface Bonus2Props {
  difficulty: DifficultyLevel;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Bonus2SixtySeconds: React.FC<Bonus2Props> = ({
  difficulty,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const diffConfig = getDifficultyConfig(difficulty);
  // Теглим 10 случайни въпроса от пула
  const questions = useMemo(() => shuffleArray(BONUS2_BLITZ_POOL).slice(0, 10), []);

  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(diffConfig.blitzSeconds);
  const [qIdx, setQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      onSound('error');
      return;
    }
    const id = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [started, finished, timeLeft, onSound]);

  const handlePickOption = (optIdx: number) => {
    if (!started || finished) return;
    const current = questions[qIdx];
    const isCorrect = optIdx === current.correctIndex;

    if (isCorrect) {
      onAddPoints(5); // 10 × 5 = 50 точки
      setCorrectCount((prev) => prev + 1);
      onSound('clue');
    } else {
      onRecordMistake();
      onSound('error');
    }

    if (qIdx + 1 < questions.length) {
      setQIdx((prev) => prev + 1);
    } else {
      setFinished(true);
      onSound('success');
      onUpdateDexTip('Светкавично темпо! Проверихме рефлекса ти за киберсигурност.');
    }
  };

  if (!started) {
    return (
      <div className="rounded-2xl bg-[#070D1D] border border-amber-400/35 p-6 sm:p-8 text-center space-y-5">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
          <Timer className="w-7 h-7" />
        </div>
        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="font-display text-2xl font-bold text-white">
            Блиц предизвикателство: 10 бързи въпроса
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Трудност <strong>{diffConfig.label}</strong> ти дава{' '}
            <strong className="text-cyan-300 font-mono-tabular">
              {diffConfig.blitzSeconds} секунди
            </strong>
            . Всеки верен отговор носи +5 точки и спира пробива в системата.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            onSound('click');
          }}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors"
        >
          <Zap className="w-4 h-4" />
          <span>Стартирай хронометъра</span>
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="rounded-2xl bg-[#070D1D] border border-emerald-400/40 p-6 space-y-5">
        <div className="flex items-center gap-3 text-emerald-300">
          <CheckCircle2 className="w-6 h-6" />
          <h2 className="font-display text-xl font-bold text-white">
            {timeLeft > 0 ? 'Терминалът е защитен навреме!' : 'Времето изтече!'}
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          Верни отговори: <strong className="text-white">{correctCount} от {questions.length}</strong> ·
          Оставащо време: <span className="font-mono-tabular text-cyan-300">{timeLeft} сек.</span>
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              onComplete(`Блиц резултат: ${correctCount}/10 верни за ${diffConfig.blitzSeconds - timeLeft} сек.`)
            }
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors"
          >
            <span>Завърши Бонус 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[qIdx];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#070D1D] border border-slate-800 px-5 py-3.5">
        <div className="text-xs font-medium text-cyan-300 font-mono-tabular">
          Въпрос {qIdx + 1} / {questions.length}
        </div>
        <div
          className={`inline-flex items-center gap-2 font-mono-tabular text-lg font-bold ${
            timeLeft <= 15 ? 'text-rose-400' : 'text-amber-300'
          }`}
        >
          <Timer className="w-5 h-5" />
          <span>{timeLeft} сек.</span>
        </div>
      </div>

      <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-6 space-y-4">
        <h2 className="font-display text-lg sm:text-xl font-bold text-white">
          {currentQ.prompt}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePickOption(idx)}
              className="text-left rounded-xl p-4 text-sm bg-[#0C162F] border border-slate-700 hover:border-cyan-400 text-slate-100 transition-all focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
