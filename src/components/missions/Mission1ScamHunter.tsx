import React, { useMemo, useState } from 'react';
import { CheckCircle2, AlertCircle, Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { getMission1Cases } from '../../data/teamMissions';
import { shuffleArray } from '../../utils/gameEngine';

interface Mission1Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Mission1ScamHunter: React.FC<Mission1Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const cases = useMemo(() => shuffleArray(getMission1Cases(team)), [team]);
  const [caseIdx, setCaseIdx] = useState(0);
  const [markedIds, setMarkedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [verifiedSafe, setVerifiedSafe] = useState(false);

  const currentCase = cases[caseIdx];

  const totalTargetsInCase =
    (currentCase.isSenderSuspicious ? 1 : 0) +
    currentCase.segments.filter((s) => s.isSuspicious).length;

  const foundTargetsCount = markedIds.filter((id) => {
    if (id === 'sender') return currentCase.isSenderSuspicious;
    const seg = currentCase.segments.find((s) => s.id === id);
    return Boolean(seg?.isSuspicious);
  }).length;

  const isCaseDone = currentCase.isScamMessage
    ? foundTargetsCount === totalTargetsInCase
    : verifiedSafe;

  const handleInspectElement = (
    elementId: string,
    isSuspicious: boolean,
    explanation: string
  ) => {
    if (markedIds.includes(elementId) || isCaseDone) return;

    setMarkedIds((prev) => [...prev, elementId]);

    if (isSuspicious) {
      onAddPoints(8);
      onSound('clue');
      setFeedback({ type: 'success', text: `+8 точки · ${explanation}` });
      onUpdateDexTip('Точно попадение! Провери дали в това писмо има още червени флагове.');
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text: explanation });
      onUpdateDexTip(
        'Внимавай: търси непознат подател, искане на парола/данни или изкуствена спешност.'
      );
    }
  };

  const handleMarkSafeEmail = () => {
    if (isCaseDone) return;

    if (!currentCase.isScamMessage) {
      setVerifiedSafe(true);
      onAddPoints(10);
      onSound('success');
      setFeedback({
        type: 'success',
        text: `+10 точки · ${currentCase.safeSummary}`,
      });
      onUpdateDexTip('Отличен усет! Разпозна истинското училищно съобщение.');
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({
        type: 'error',
        text: 'Това съобщение НЕ е безопасно! Провери подателя и исканията в текста.',
      });
    }
  };

  const handleNextCase = () => {
    if (caseIdx + 1 < cases.length) {
      setCaseIdx((prev) => prev + 1);
      setMarkedIds([]);
      setFeedback(null);
      setVerifiedSafe(false);
      onSound('click');
      onUpdateDexTip('Ново писмо в пощата! Провери подателя и съдържанието му.');
    } else {
      onSound('success');
      onComplete('Проверени и анализирани 3 входящи съобщения.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-cyan-300">
            Писмо {caseIdx + 1} от {cases.length}
          </div>
          <h2 className="mt-1 font-display text-xl font-bold text-white">
            Провери съобщението за признаци на измама
          </h2>
        </div>

        <div className="text-xs font-mono-tabular text-slate-300">
          {currentCase.isScamMessage
            ? `Открити улики: ${foundTargetsCount} / ${totalTargetsInCase}`
            : isCaseDone
              ? 'Писмото е потвърдено като безопасно'
              : 'Очаква проверка'}
        </div>
      </div>

      <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 overflow-hidden">
        <div className="border-b border-slate-800 bg-[#0B142B] px-5 py-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Mail className="w-4 h-4 text-cyan-300" />
            <span>Входяща поща на Cyber City</span>
          </div>
          <div className="font-display text-base sm:text-lg font-bold text-white">
            Тема: {currentCase.subject}
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() =>
                handleInspectElement(
                  'sender',
                  currentCase.isSenderSuspicious,
                  currentCase.senderExplanation
                )
              }
              className={`w-full text-left rounded-xl px-4 py-2.5 border transition-all flex flex-wrap items-center justify-between gap-2 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                markedIds.includes('sender')
                  ? currentCase.isSenderSuspicious
                    ? 'bg-emerald-950/40 border-emerald-400/50 text-emerald-100'
                    : 'bg-rose-950/35 border-rose-400/50 text-rose-100'
                  : 'bg-[#101C3B] border-slate-700 hover:border-cyan-400/60 text-slate-200'
              }`}
            >
              <div className="text-sm">
                <span className="text-slate-400">От: </span>
                <strong className="text-white">{currentCase.senderName}</strong>{' '}
                <span className="font-mono-tabular text-xs text-cyan-300">
                  &lt;{currentCase.senderAddress}&gt;
                </span>
              </div>
              <span className="text-xs font-medium text-cyan-300">
                {markedIds.includes('sender')
                  ? currentCase.isSenderSuspicious
                    ? 'Улика маркирана'
                    : 'Безопасен подател'
                  : 'Провери подателя'}
              </span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-3">
          <p className="text-xs text-slate-400">
            Натисни върху подозрителните изречения в текста, за да ги маркираш като доказателства:
          </p>

          <div className="space-y-2.5">
            {currentCase.segments.map((seg) => {
              const isMarked = markedIds.includes(seg.id);
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() =>
                    handleInspectElement(seg.id, seg.isSuspicious, seg.explanation)
                  }
                  className={`w-full text-left rounded-xl px-4 py-3 text-sm leading-relaxed border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isMarked
                      ? seg.isSuspicious
                        ? 'bg-emerald-950/40 border-emerald-400/55 text-emerald-100'
                        : 'bg-amber-950/35 border-amber-400/50 text-amber-100'
                      : 'bg-[#0D162F] border-slate-800 hover:border-cyan-400/50 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span>{seg.text}</span>
                    {isMarked && (
                      <span className="shrink-0 mt-0.5">
                        {seg.isSuspicious ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-300" />
                        )}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
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
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        {!isCaseDone ? (
          <button
            type="button"
            onClick={handleMarkSafeEmail}
            className="px-4 py-2.5 text-sm font-semibold text-slate-200 bg-[#132142] border border-slate-700 rounded-xl hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Това съобщение е безопасно
          </button>
        ) : (
          <div className="text-sm font-medium text-emerald-300">
            Случаят с това писмо е приключен!
          </div>
        )}

        {isCaseDone && (
          <button
            type="button"
            onClick={handleNextCase}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>
              {caseIdx + 1 < cases.length ? 'Следващо писмо' : 'Завърши Ниво 1'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
