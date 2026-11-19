import React, { useMemo, useState } from 'react';
import { UserPlus, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { getLevel7Chat } from '../../data/teamMissions';

interface Level7Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Level7StrangerChat: React.FC<Level7Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const messages = useMemo(() => getLevel7Chat(team), [team]);
  const [phase, setPhase] = useState<'inspect' | 'action'>('inspect');
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [actionSolved, setActionSolved] = useState(false);

  const totalFlags = messages.filter((m) => m.isRedFlag).length;
  const foundFlags = flaggedIds.filter((id) =>
    Boolean(messages.find((m) => m.id === id)?.isRedFlag)
  ).length;
  const allFlagsFound = foundFlags === totalFlags;

  const handleFlagMessage = (id: string) => {
    if (flaggedIds.includes(id) || allFlagsFound) return;
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;

    setFlaggedIds((prev) => [...prev, id]);

    if (msg.isRedFlag) {
      // 5 червени флага × 7 точки = 35 точки
      onAddPoints(7);
      onSound('clue');
      setFeedback({
        type: 'success',
        text: `+7 точки · Открит признак (${msg.flagLabel}): ${msg.explanation}`,
      });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text: msg.explanation });
    }
  };

  const handleSelectAction = (isCorrect: boolean, text: string) => {
    if (actionSolved) return;
    if (isCorrect) {
      setActionSolved(true);
      onAddPoints(15);
      onSound('success');
      setFeedback({ type: 'success', text: `+15 точки · ${text}` });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text });
    }
  };

  return (
    <div className="space-y-6">
      {phase === 'inspect' ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-cyan-300">
                Социална мрежа на Cyber City · Профил под наблюдение
              </div>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                Открий 5-те подозрителни признака в чата с непознатия
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-slate-300">
              Открити признаци: {foundFlags} / {totalFlags}
            </div>
          </div>

          <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 overflow-hidden">
            <div className="border-b border-slate-800 bg-[#0C152B] px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-white">
                    Dani_6B_Real (Покана за приятелство)
                  </div>
                  <div className="text-xs text-slate-400">
                    Създаден преди 3 дни · Няма общи приятели от класа
                  </div>
                </div>
              </div>
              <span className="text-xs text-amber-300 font-medium">
                Натисни опасните реплики
              </span>
            </div>

            <div className="p-5 space-y-3">
              {messages.map((msg) => {
                const isFlagged = flaggedIds.includes(msg.id);
                return (
                  <button
                    key={msg.id}
                    type="button"
                    onClick={() => handleFlagMessage(msg.id)}
                    className={`w-full text-left rounded-xl p-3.5 text-sm border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                      isFlagged
                        ? msg.isRedFlag
                          ? 'bg-emerald-950/40 border-emerald-400/55 text-emerald-100'
                          : 'bg-amber-950/35 border-amber-400/50 text-amber-100'
                        : 'bg-[#0D162F] border-slate-800 hover:border-cyan-400/50 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>„{msg.text}“</span>
                      {isFlagged && msg.isRedFlag && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      )}
                    </div>
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
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {allFlagsFound && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPhase('action');
                  setFeedback(null);
                  onSound('click');
                  onUpdateDexTip('Сега избери как трябва да постъпиш веднага след като откриеш опит за манипулация.');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Избери правилна реакция</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <div className="text-xs font-medium text-violet-300">
              Стъпка 2 от 2 · Безопасна реакция
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-white">
              Как постъпваш с профила „Dani_6B_Real“?
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                text: 'Отказвам да споделям лична информация, прекратявам контакта, блокирам/докладвам профила и показвам чата на родител или учител.',
                correct: true,
                explanation:
                  'Точно така! Никога не пази в тайна подозрителни разговори от доверен възрастен.',
              },
              {
                text: 'Съгласявам се на кратка среща пред училище, но водя един съученик с мен.',
                correct: false,
                explanation:
                  'Никога не се срещай с непознати от интернет! Това излага и теб, и съученика ти на опасност.',
              },
              {
                text: 'Пращам само фалшива снимка от интернет, за да видя какъв подарък ще даде.',
                correct: false,
                explanation:
                  'Продължаването на контакта те оставя подложен на натиск и манипулация.',
              },
            ].map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectAction(opt.correct, opt.explanation)}
                className={`w-full text-left rounded-xl p-4 text-sm border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  actionSolved && opt.correct
                    ? 'bg-emerald-950/40 border-emerald-400/50 text-emerald-100'
                    : 'bg-[#081022] border-slate-800 hover:border-cyan-400/50 text-slate-200'
                }`}
              >
                {opt.text}
              </button>
            ))}
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

          {actionSolved && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onComplete('Разобличен фалшив профил и прекратен опасен контакт.')
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Завърши Ниво 7</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
