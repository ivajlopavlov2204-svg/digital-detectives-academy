import React, { useMemo, useState } from 'react';
import { MessageSquare, Camera, ThumbsUp, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { getLevel10Items } from '../../data/teamMissions';
import { shuffleArray } from '../../utils/gameEngine';

interface Level10Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Level10DigitalFootprint: React.FC<Level10Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const items = useMemo(() => shuffleArray(getLevel10Items(team)), [team]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const totalRisky = items.filter((i) => i.isRisky).length;
  const foundRisky = checkedIds.filter((id) =>
    Boolean(items.find((i) => i.id === id)?.isRisky)
  ).length;
  const allFound = foundRisky === totalRisky;

  const handleInspect = (id: string) => {
    if (checkedIds.includes(id) || allFound) return;
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setCheckedIds((prev) => [...prev, id]);

    if (item.isRisky) {
      // 4 рискови следи: първите 3 по 12 т., 4-тата 14 т. -> 50 точки
      const pts = foundRisky + 1 === totalRisky ? 14 : 12;
      onAddPoints(pts);
      onSound('clue');
      setFeedback({ type: 'success', text: `+${pts} точки · ${item.explanation}` });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text: item.explanation });
    }
  };

  const renderIcon = (kind: string) => {
    if (kind === 'Снимка') return <Camera className="w-4 h-4 text-cyan-300 shrink-0" />;
    if (kind === 'Коментар') return <MessageSquare className="w-4 h-4 text-violet-300 shrink-0" />;
    if (kind === 'Харесване') return <ThumbsUp className="w-4 h-4 text-amber-300 shrink-0" />;
    return <FileText className="w-4 h-4 text-cyan-300 shrink-0" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-cyan-300">
            Профил на виртуалния герой Мартин · Публична хронология
          </div>
          <h2 className="mt-1 font-display text-xl font-bold text-white">
            Открий 4-те действия, които създават риск в бъдеще
          </h2>
        </div>
        <div className="text-xs font-mono-tabular text-slate-300">
          Открити рискове: {foundRisky} / {totalRisky}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleInspect(item.id)}
              className={`text-left rounded-xl p-4 border transition-all flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                isChecked
                  ? item.isRisky
                    ? 'bg-emerald-950/40 border-emerald-400/55'
                    : 'bg-amber-950/35 border-amber-400/50'
                  : 'bg-[#070D1D] border-slate-800 hover:border-cyan-400/55'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-200">
                    {renderIcon(item.kind)}
                    <span>{item.kind}</span>
                  </span>
                  {isChecked && item.isRisky && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  )}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">{item.content}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs text-cyan-300">
                {isChecked
                  ? item.isRisky
                    ? 'Маркирано като рискова следа'
                    : 'Безопасно действие'
                  : 'Маркирай като рисково'}
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

      {allFound && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              onSound('success');
              onUpdateDexTip('Запомни: мисли преди да публикуваш, коментираш или харесваш онлайн.');
              onComplete('Открити всички рискови дигитални следи в публичния профил.');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Завърши Ниво 10</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
