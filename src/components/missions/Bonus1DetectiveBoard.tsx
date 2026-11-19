import React, { useMemo, useState } from 'react';
import { Link2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { BONUS1_EVIDENCE_CARDS } from '../../data/advancedLevelsData';
import { shuffleArray } from '../../utils/gameEngine';

interface Bonus1Props {
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Bonus1DetectiveBoard: React.FC<Bonus1Props> = ({
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const leftCards = useMemo(
    () => BONUS1_EVIDENCE_CARDS.filter((c) => c.group === 'left'),
    []
  );
  const rightCards = useMemo(
    () => shuffleArray(BONUS1_EVIDENCE_CARDS.filter((c) => c.group === 'right')),
    []
  );

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [culpritSolved, setCulpritSolved] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const allPaired = matchedPairs.length === leftCards.length;

  const handleRightClick = (rightCard: (typeof BONUS1_EVIDENCE_CARDS)[number]) => {
    if (!selectedLeft || matchedPairs.includes(rightCard.pairId)) return;
    const leftCard = leftCards.find((c) => c.id === selectedLeft);
    if (!leftCard) return;

    if (leftCard.pairId === rightCard.pairId) {
      // 5 двойки × 8 точки = 40 точки
      onAddPoints(8);
      onSound('clue');
      setMatchedPairs((prev) => [...prev, rightCard.pairId]);
      setSelectedLeft(null);
      setFeedback({
        type: 'success',
        text: `+8 точки · Свързана следа: „${leftCard.text}“ <-> „${rightCard.text}“`,
      });
    } else {
      onRecordMistake();
      onSound('error');
      setSelectedLeft(null);
      setFeedback({
        type: 'error',
        text: 'Тези две доказателства не съвпадат. Сравни внимателно метода на атака.',
      });
    }
  };

  const handleIdentifyCulprit = (isPhantom: boolean) => {
    if (culpritSolved) return;
    if (isPhantom) {
      setCulpritSolved(true);
      onAddPoints(10);
      onSound('success');
      setFeedback({
        type: 'success',
        text: '+10 точки · Точно заключение! Всички 10 доказателства водят към Фантома („Сянка-404“).',
      });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({
        type: 'error',
        text: 'Не е този! Погледни следите за фалшив Wi-Fi, домейни и зловредни файлове заедно.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-amber-300">
            Следствено табло · 10 доказателства
          </div>
          <h2 className="mt-1 font-display text-xl font-bold text-white">
            Свържи всяка находка отляво с нейния метод отдясно
          </h2>
        </div>
        <div className="text-xs font-mono-tabular text-slate-300">
          Свързани двойки: {matchedPairs.length} / {leftCards.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-cyan-300">Находки от разследването</div>
          {leftCards.map((card) => {
            const isMatched = matchedPairs.includes(card.pairId);
            const isSelected = selectedLeft === card.id;
            return (
              <button
                key={card.id}
                type="button"
                disabled={isMatched}
                onClick={() => {
                  setSelectedLeft(isSelected ? null : card.id);
                  onSound('click');
                }}
                className={`w-full text-left rounded-xl p-3.5 text-sm border transition-all flex items-center justify-between gap-2 ${
                  isMatched
                    ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200 opacity-75'
                    : isSelected
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300 font-semibold'
                      : 'bg-[#070D1D] border-slate-800 hover:border-cyan-400/60 text-slate-200'
                }`}
              >
                <span>{card.text}</span>
                {isMatched ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                ) : (
                  <Link2 className="w-4 h-4 opacity-60 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-violet-300">Метод на атака</div>
          {rightCards.map((card) => {
            const isMatched = matchedPairs.includes(card.pairId);
            return (
              <button
                key={card.id}
                type="button"
                disabled={isMatched || !selectedLeft}
                onClick={() => handleRightClick(card)}
                className={`w-full text-left rounded-xl p-3.5 text-sm border transition-all flex items-center justify-between gap-2 ${
                  isMatched
                    ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200 opacity-75'
                    : selectedLeft
                      ? 'bg-[#0D1836] border-violet-400/55 hover:bg-[#14234C] text-white'
                      : 'bg-[#070D1D] border-slate-800 text-slate-300'
                }`}
              >
                <span>{card.text}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {allPaired && !culpritSolved && (
        <div className="rounded-2xl bg-[#0B142B] border border-amber-400/40 p-5 space-y-4">
          <h3 className="font-display text-base font-bold text-white">
            Финален извод на таблото: Кой стои зад координираните атаки?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleIdentifyCulprit(false)}
              className="rounded-xl p-3.5 text-sm text-left bg-[#070D1D] border border-slate-700 hover:border-cyan-400 text-slate-200"
            >
              Обикновен случаен вирус без цел
            </button>
            <button
              type="button"
              onClick={() => handleIdentifyCulprit(true)}
              className="rounded-xl p-3.5 text-sm text-left bg-[#070D1D] border border-slate-700 hover:border-cyan-400 text-slate-200"
            >
              Фантомът („Сянка-404“) чрез многоканална кампания
            </button>
            <button
              type="button"
              onClick={() => handleIdentifyCulprit(false)}
              className="rounded-xl p-3.5 text-sm text-left bg-[#070D1D] border border-slate-700 hover:border-cyan-400 text-slate-200"
            >
              Училищният уеб администратор
            </button>
          </div>
        </div>
      )}

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

      {culpritSolved && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              onUpdateDexTip('Отличен анализ в Детективската стая!');
              onComplete('Свързани 10 доказателства на таблото и потвърдена следата към Фантома.');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Завърши Бонус 1</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
