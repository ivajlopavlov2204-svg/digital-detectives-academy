import React, { useMemo, useState } from 'react';
import { Wifi, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { LEVEL9_QUESTIONS } from '../../data/advancedLevelsData';
import { getLevel9Networks } from '../../data/teamMissions';

interface Level9Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Level9WifiTrap: React.FC<Level9Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const networks = useMemo(() => getLevel9Networks(team), [team]);
  const [inspectedWifi, setInspectedWifi] = useState<string | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [solvedQ, setSolvedQ] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const currentQ = LEVEL9_QUESTIONS[qIdx];

  const handleAnswer = (isCorrect: boolean, explanation: string) => {
    if (solvedQ) return;
    if (isCorrect) {
      setSolvedQ(true);
      // 3 въпроса: 17 + 17 + 16 = 50 точки
      const pts = qIdx === 2 ? 16 : 17;
      onAddPoints(pts);
      onSound('clue');
      setFeedback({ type: 'success', text: `+${pts} точки · ${explanation}` });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text: explanation });
    }
  };

  const handleNext = () => {
    if (qIdx + 1 < LEVEL9_QUESTIONS.length) {
      setQIdx((prev) => prev + 1);
      setSolvedQ(false);
      setFeedback(null);
      onSound('click');
    } else {
      onSound('success');
      onComplete('Овладени правилата за обществени Wi-Fi мрежи, мобилни данни и HTTPS.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-medium text-cyan-300">
          Скенер в кафене на Cyber City · Открити безжични мрежи
        </div>
        <h2 className="mt-1 font-display text-xl font-bold text-white">
          Провери наличните Wi-Fi мрежи и вземи безопасни решения
        </h2>
      </div>

      {/* Interactive Wi-Fi Scanner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {networks.map((net) => {
          const active = inspectedWifi === net.id;
          return (
            <button
              key={net.id}
              type="button"
              onClick={() => {
                setInspectedWifi(net.id);
                onSound('click');
                onUpdateDexTip(net.note);
              }}
              className={`rounded-xl p-4 text-left border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                active
                  ? 'bg-[#101C3B] border-cyan-400'
                  : 'bg-[#070D1D] border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tabular text-sm font-bold text-white">
                  {net.ssid}
                </span>
                <Wifi className="w-4 h-4 text-cyan-300 shrink-0" />
              </div>
              <div className="mt-2 text-xs text-slate-400">{net.security}</div>
              <div className="mt-1 text-xs text-slate-500">Сигнал: {net.signal}</div>
              {active && (
                <p className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-cyan-200 leading-relaxed">
                  {net.note}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Tactical Question Card */}
      <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-6 space-y-4">
        <div className="text-xs font-medium text-violet-300">
          Ситуация {qIdx + 1} от {LEVEL9_QUESTIONS.length}
        </div>
        <h3 className="font-display text-lg font-bold text-white">
          {currentQ.question}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleAnswer(opt.isCorrect, opt.explanation)}
              className={`w-full text-left rounded-xl p-4 text-sm border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                solvedQ && opt.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-400/55 text-emerald-100'
                  : 'bg-[#0C162F] border-slate-700 hover:border-cyan-400/60 text-slate-200'
              }`}
            >
              {opt.text}
            </button>
          ))}
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
            <AlertTriangle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {solvedQ && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>
              {qIdx + 1 < LEVEL9_QUESTIONS.length ? 'Следващ въпрос' : 'Завърши Ниво 9'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
