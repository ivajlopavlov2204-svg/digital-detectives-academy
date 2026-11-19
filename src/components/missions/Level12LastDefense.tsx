import React, { useMemo, useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { LEVEL12_STEPS } from '../../data/advancedLevelsData';
import { shuffleArray } from '../../utils/gameEngine';

interface Level12Props {
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Level12LastDefense: React.FC<Level12Props> = ({
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const shuffledSteps = useMemo(() => shuffleArray(LEVEL12_STEPS), []);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleToggleStep = (id: string) => {
    if (solved) return;
    onSound('click');
    setSelectedOrder((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleVerify = () => {
    if (selectedOrder.length !== LEVEL12_STEPS.length || solved) return;

    const isExact = selectedOrder.every((id, idx) => {
      const step = LEVEL12_STEPS.find((s) => s.id === id);
      return step?.correctOrder === idx + 1;
    });

    if (isExact) {
      setSolved(true);
      onAddPoints(50);
      onSound('success');
      setFeedback({
        type: 'success',
        text: '+50 точки · Протоколът е подреден безупречно! Профилът е напълно защитен и пътят към Фантома е отворен.',
      });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({
        type: 'error',
        text: 'Редът не е точен. Логиката е: 1. Официално възстановяване -> 2. Нова парола от чисто устройство -> 3. Активиране на 2FA -> 4. Проверка на сесии -> 5. Уведомяване на отговорно лице.',
      });
      onUpdateDexTip('Започни с официалния механизъм за връщане на достъпа, после смени паролата и включи 2FA!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-violet-300">
            Финална задача на Глава III · Компрометиран училищен профил
          </div>
          <h2 className="mt-1 font-display text-xl font-bold text-white">
            Подреди 5-те стъпки за възстановяване от 1 до 5
          </h2>
        </div>
        <div className="text-xs font-mono-tabular text-slate-300">
          Избрани: {selectedOrder.length} / {LEVEL12_STEPS.length}
        </div>
      </div>

      <div className="space-y-3">
        {shuffledSteps.map((step) => {
          const idx = selectedOrder.indexOf(step.id);
          const isPicked = idx !== -1;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleToggleStep(step.id)}
              className={`w-full text-left rounded-xl p-4 border transition-all flex items-start gap-4 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                isPicked
                  ? 'bg-cyan-500/15 border-cyan-400 text-white'
                  : 'bg-[#070D1D] border-slate-800 hover:border-slate-600 text-slate-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-tabular text-sm font-bold shrink-0 mt-0.5 ${
                  isPicked
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isPicked ? idx + 1 : '?'}
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">
                  {step.title}
                </div>
                <div className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {step.detail}
                </div>
              </div>
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

      <div className="flex flex-wrap items-center justify-between gap-4">
        {!solved ? (
          <>
            <button
              type="button"
              onClick={() => setSelectedOrder([])}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-300 bg-[#111C35] border border-slate-700 rounded-xl hover:border-slate-500"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Изчисти реда</span>
            </button>

            <button
              type="button"
              disabled={selectedOrder.length !== LEVEL12_STEPS.length}
              onClick={handleVerify}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                selectedOrder.length === LEVEL12_STEPS.length
                  ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Провери последователността (+50 т.)</span>
            </button>
          </>
        ) : (
          <div className="ml-auto">
            <button
              type="button"
              onClick={() =>
                onComplete('Изграден пълният 5-стъпков протокол за възстановяване на профил.')
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Завърши Ниво 12</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
