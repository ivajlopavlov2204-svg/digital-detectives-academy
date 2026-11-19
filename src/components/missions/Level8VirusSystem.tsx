import React, { useMemo, useState } from 'react';
import { FileWarning, FileCheck2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { LEVEL8_RECOVERY_STEPS } from '../../data/advancedLevelsData';
import { getLevel8Files } from '../../data/teamMissions';
import { shuffleArray } from '../../utils/gameEngine';

interface Level8Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Level8VirusSystem: React.FC<Level8Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const files = useMemo(() => shuffleArray(getLevel8Files(team)), [team]);
  const shuffledSteps = useMemo(() => shuffleArray(LEVEL8_RECOVERY_STEPS), []);

  const [phase, setPhase] = useState<'quarantine' | 'sequence'>('quarantine');
  const [quarantinedIds, setQuarantinedIds] = useState<string[]>([]);
  const [orderedStepIds, setOrderedStepIds] = useState<string[]>([]);
  const [sequenceSolved, setSequenceSolved] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const dangerousCount = files.filter((f) => f.isDangerous).length;
  const foundDangerousCount = quarantinedIds.filter(
    (id) => Boolean(files.find((f) => f.id === id)?.isDangerous)
  ).length;
  const isQuarantineDone = foundDangerousCount === dangerousCount;

  const handleInspectFile = (id: string) => {
    if (quarantinedIds.includes(id) || isQuarantineDone) return;
    const file = files.find((f) => f.id === id);
    if (!file) return;

    setQuarantinedIds((prev) => [...prev, id]);

    if (file.isDangerous) {
      // 3 опасни файла × 10 точки = 30 точки
      onAddPoints(10);
      onSound('clue');
      setFeedback({
        type: 'success',
        text: `+10 точки · Изолиран опасен файл! ${file.reason}`,
      });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({
        type: 'error',
        text: `Този файл е безопасен: ${file.reason}`,
      });
    }
  };

  const handleToggleStep = (stepId: string) => {
    if (sequenceSolved) return;
    onSound('click');
    setOrderedStepIds((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const handleVerifyOrder = () => {
    if (orderedStepIds.length !== LEVEL8_RECOVERY_STEPS.length || sequenceSolved) return;

    const isExactOrder = orderedStepIds.every((id, index) => {
      const stepObj = LEVEL8_RECOVERY_STEPS.find((s) => s.id === id);
      return stepObj?.order === index + 1;
    });

    if (isExactOrder) {
      setSequenceSolved(true);
      onAddPoints(20);
      onSound('success');
      setFeedback({
        type: 'success',
        text: '+20 точки · Точна последователност! Устройството е защитено без допълнителни щети.',
      });
    } else {
      onRecordMistake();
      onSound('error');
      setOrderedStepIds([]);
      setFeedback({
        type: 'error',
        text: 'Редът не е точен. Помисли: 1. Спираш риска -> 2. Уведомяваш възрастен -> 3. Сканиране и възстановяване.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {phase === 'quarantine' ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-cyan-300">
                Етап 1 от 2 · Карантина на файлове
              </div>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                Избери 3-те подозрителни файла, които НЕ бива да се отварят
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-slate-300">
              Изолирани опасни: {foundDangerousCount} / {dangerousCount}
            </div>
          </div>

          <div className="space-y-3">
            {files.map((file) => {
              const isPicked = quarantinedIds.includes(file.id);
              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => handleInspectFile(file.id)}
                  className={`w-full text-left rounded-xl p-4 border transition-all flex flex-wrap items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isPicked
                      ? file.isDangerous
                        ? 'bg-emerald-950/40 border-emerald-400/55'
                        : 'bg-amber-950/35 border-amber-400/50'
                      : 'bg-[#081022] border-slate-800 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isPicked && file.isDangerous ? (
                      <FileWarning className="w-5 h-5 text-emerald-300 shrink-0" />
                    ) : (
                      <FileCheck2 className="w-5 h-5 text-cyan-300 shrink-0" />
                    )}
                    <div>
                      <div className="font-mono-tabular text-sm font-bold text-white">
                        {file.filename}
                      </div>
                      <div className="text-xs text-slate-400">
                        {file.size} · Източник: {file.source}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-cyan-300">
                    {isPicked
                      ? file.isDangerous
                        ? 'Поставен под карантина'
                        : 'Безопасен документ'
                      : 'Блокирай файла'}
                  </span>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div
              className={`rounded-xl p-4 border text-sm leading-relaxed flex items-start gap-3 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-400/45 text-emerald-100'
                  : 'bg-rose-950/40 border-rose-400/45 text-rose-100'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {isQuarantineDone && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPhase('sequence');
                  setFeedback(null);
                  onSound('click');
                  onUpdateDexTip('Подреди трите стъпки при съмнение за вирус, като ги натискаш от 1-ва до 3-та.');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Към плана за реакция</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <div className="text-xs font-medium text-violet-300">
              Етап 2 от 2 · Последователност при заразяване
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-white">
              Натисни стъпките в правилния ред от 1 до 3
            </h2>
          </div>

          <div className="space-y-3">
            {shuffledSteps.map((step) => {
              const orderPosition = orderedStepIds.indexOf(step.id);
              const isSelected = orderPosition !== -1;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleToggleStep(step.id)}
                  className={`w-full text-left rounded-xl p-4 border transition-all flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white'
                      : 'bg-[#081022] border-slate-800 hover:border-slate-600 text-slate-200'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-tabular text-sm font-bold shrink-0 ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isSelected ? orderPosition + 1 : '?'}
                  </div>
                  <span className="text-sm leading-relaxed">{step.text}</span>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div
              className={`rounded-xl p-4 border text-sm leading-relaxed ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-400/45 text-emerald-100'
                  : 'bg-rose-950/40 border-rose-400/45 text-rose-100'
              }`}
            >
              {feedback.text}
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!sequenceSolved ? (
              <button
                type="button"
                disabled={orderedStepIds.length !== LEVEL8_RECOVERY_STEPS.length}
                onClick={handleVerifyOrder}
                className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                  orderedStepIds.length === LEVEL8_RECOVERY_STEPS.length
                    ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Провери реда (+20 т.)
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  onComplete('Опасните файлове са изолирани и планът за защита е подреден.')
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Завърши Ниво 8</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
