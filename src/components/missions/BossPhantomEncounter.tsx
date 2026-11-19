import React, { useMemo, useState } from 'react';
import { ShieldAlert, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { getBossChallenges } from '../../data/teamMissions';
import { shuffleArray } from '../../utils/gameEngine';
import { ResilientImage } from '../ResilientImage';

interface BossProps {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error' | 'victory') => void;
  onComplete: (finalNotes?: string) => void;
}

const PHANTOM_IMG = '/src/assets/images/suspect_phantom_avatar_1794674520798.jpg';

export const BossPhantomEncounter: React.FC<BossProps> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const challenges = useMemo(
    () =>
      getBossChallenges(team).map((task) => ({
        ...task,
        options: shuffleArray(task.options),
      })),
    [team]
  );

  const [taskIdx, setTaskIdx] = useState(0);
  const [shieldHealth, setShieldHealth] = useState(100);
  const [taskSolved, setTaskSolved] = useState(false);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const currentTask = challenges[taskIdx];

  const handleSelectOption = (optionId: string) => {
    if (taskSolved) return;
    const option = currentTask.options.find((o) => o.id === optionId);
    if (!option) return;

    setSelectedOptId(optionId);

    if (option.isCorrect) {
      setTaskSolved(true);
      // 10 задачи × 25 точки = 250 точки
      onAddPoints(25);
      const nextShield = Math.max(0, shieldHealth - 10);
      setShieldHealth(nextShield);
      if (taskIdx + 1 === challenges.length) {
        onSound('victory');
      } else {
        onSound('clue');
      }
      setFeedback({
        type: 'success',
        text: `+25 точки · Удар по щита! ${option.explanation}`,
      });
      onUpdateDexTip(`Отлично! Защитата на Фантома падна на ${nextShield}%.`);
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text: option.explanation });
    }
  };

  const handleNext = () => {
    if (taskIdx + 1 < challenges.length) {
      setTaskIdx((prev) => prev + 1);
      setTaskSolved(false);
      setSelectedOptId(null);
      setFeedback(null);
      onSound('click');
    } else {
      onComplete('Защитната система на Фантома (10/10 слоя) е напълно унищожена!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Boss Header & Shield HP Bar */}
      <div className="rounded-2xl bg-[#0B1126] border border-violet-500/45 p-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-violet-400/50">
          <ResilientImage
            src={PHANTOM_IMG}
            alt="Финален бос Фантомът"
            className="w-full h-full object-cover"
            fallbackLabel="Фантомът"
          />
        </div>

        <div className="flex-1 w-full space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-violet-300">
                Финален бос · Сървърната кула
              </div>
              <h2 className="font-display text-xl font-bold text-white">
                Фантомът („Сянка-404“)
              </h2>
            </div>
            <div className="font-mono-tabular text-sm font-bold text-rose-300">
              Щит на злодея: {shieldHealth}%
            </div>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-900 border border-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-rose-500 transition-all duration-200"
              style={{ width: `${shieldHealth}%` }}
            />
          </div>
          <div className="text-xs text-slate-400">
            Задача {taskIdx + 1} от {challenges.length} · Всеки точен отговор нанася -10% удар (+25 т.)
          </div>
        </div>
      </div>

      {/* Current Boss Challenge */}
      <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-6 space-y-4">
        <div className="text-xs font-semibold text-cyan-300">
          {currentTask.categoryLabel}
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
          {currentTask.prompt}
        </h3>
        <div className="rounded-xl bg-[#0C152B] border border-slate-800 px-4 py-3 font-mono-tabular text-xs text-cyan-200">
          {currentTask.evidence}
        </div>

        <div className="space-y-3 pt-1">
          {currentTask.options.map((opt) => {
            const isPicked = selectedOptId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left rounded-xl p-4 text-sm leading-relaxed border transition-all flex items-start justify-between gap-3 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  isPicked && opt.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-400/60 text-emerald-100'
                    : isPicked && !opt.isCorrect
                      ? 'bg-rose-950/40 border-rose-400/60 text-rose-100'
                      : 'bg-[#0C162F] border-slate-700 hover:border-cyan-400 text-slate-200'
                }`}
              >
                <span>{opt.text}</span>
                {isPicked && (
                  <span className="shrink-0 mt-0.5">
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-rose-300" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {feedback && (
        <div
          className={`rounded-xl p-4 border text-sm leading-relaxed flex items-start gap-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-400/45 text-emerald-100'
              : 'bg-rose-950/40 border-rose-400/45 text-rose-100'
          }`}
        >
          <Zap
            className={`w-5 h-5 shrink-0 mt-0.5 ${
              feedback.type === 'success' ? 'text-emerald-300' : 'text-rose-300'
            }`}
          />
          <span>{feedback.text}</span>
        </div>
      )}

      {taskSolved && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>
              {taskIdx + 1 < challenges.length
                ? 'Следващ удар по щита'
                : 'Завърши битката с Фантома'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
