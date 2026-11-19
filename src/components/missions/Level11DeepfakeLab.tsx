import React, { useState } from 'react';
import { Video, Mic, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { LEVEL11_CLUES, LEVEL11_QUESTIONS } from '../../data/advancedLevelsData';

interface Level11Props {
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Level11DeepfakeLab: React.FC<Level11Props> = ({
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'clues' | 'questions'>('clues');
  const [markedIds, setMarkedIds] = useState<string[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [solvedQ, setSolvedQ] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const totalSuspicious = LEVEL11_CLUES.filter((c) => c.isSuspicious).length;
  const foundSuspicious = markedIds.filter((id) =>
    Boolean(LEVEL11_CLUES.find((c) => c.id === id)?.isSuspicious)
  ).length;
  const allCluesFound = foundSuspicious === totalSuspicious;

  const handleMarkClue = (id: string) => {
    if (markedIds.includes(id) || allCluesFound) return;
    const clue = LEVEL11_CLUES.find((c) => c.id === id);
    if (!clue) return;

    setMarkedIds((prev) => [...prev, id]);

    if (clue.isSuspicious) {
      // 3 признака × 10 точки = 30 точки
      onAddPoints(10);
      onSound('clue');
      setFeedback({ type: 'success', text: `+10 точки · ${clue.explanation}` });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text: clue.explanation });
    }
  };

  const currentQ = LEVEL11_QUESTIONS[qIdx];

  const handleAnswerQ = (isCorrect: boolean, explanation: string) => {
    if (solvedQ) return;
    if (isCorrect) {
      setSolvedQ(true);
      // 2 въпроса × 10 точки = 20 точки -> общо 50 точки
      onAddPoints(10);
      onSound('clue');
      setFeedback({ type: 'success', text: `+10 точки · ${explanation}` });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text: explanation });
    }
  };

  const handleNextQ = () => {
    if (qIdx + 1 < LEVEL11_QUESTIONS.length) {
      setQIdx((prev) => prev + 1);
      setSolvedQ(false);
      setFeedback(null);
      onSound('click');
    } else {
      onSound('success');
      onComplete('Разпознати deepfake видео, клониран глас и методи за проверка.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Media Exhibits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <Video className="w-4 h-4" />
            <span>Публикация 1 · Видео с известна личност</span>
          </div>
          <p className="text-sm text-white font-semibold">
            „Раздавам по 500 евро на всеки, който въведе данните си на линка под видеото!“
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Наблюдение: движението на устните изостава леко от звука, пръстите изглеждат
            размазани, а в официалния профил на звездата няма такова съобщение.
          </p>
        </div>

        <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
            <Mic className="w-4 h-4" />
            <span>Публикация 2 · Спешно гласово съобщение</span>
          </div>
          <p className="text-sm text-white font-semibold">
            „Имам спешен проблем с картата, прати ми код за превод веднага, не ми звъни!“
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Наблюдение: гласът прилича на познат човек, но интонацията е равна и настоява да НЕ
            се обаждаш по телефона.
          </p>
        </div>
      </div>

      {phase === 'clues' ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-white">
              Открий 3 подозрителни признака в двете публикации
            </h2>
            <div className="text-xs font-mono-tabular text-slate-300">
              Открити: {foundSuspicious} / {totalSuspicious}
            </div>
          </div>

          <div className="space-y-2.5">
            {LEVEL11_CLUES.map((clue) => {
              const isMarked = markedIds.includes(clue.id);
              return (
                <button
                  key={clue.id}
                  type="button"
                  onClick={() => handleMarkClue(clue.id)}
                  className={`w-full text-left rounded-xl p-4 text-sm border transition-all flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isMarked
                      ? clue.isSuspicious
                        ? 'bg-emerald-950/40 border-emerald-400/55 text-emerald-100'
                        : 'bg-amber-950/35 border-amber-400/50 text-amber-100'
                      : 'bg-[#081022] border-slate-800 hover:border-cyan-400/55 text-slate-200'
                  }`}
                >
                  <span>{clue.label}</span>
                  {isMarked && clue.isSuspicious && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  )}
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

          {allCluesFound && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPhase('questions');
                  setFeedback(null);
                  onSound('click');
                  onUpdateDexTip('Сега отговори на 2 ключови въпроса за проверка на AI фалшификати.');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Към проверката на решения</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-6 space-y-4">
            <div className="text-xs font-medium text-violet-300">
              Въпрос {qIdx + 1} от {LEVEL11_QUESTIONS.length}
            </div>
            <h2 className="font-display text-lg font-bold text-white">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAnswerQ(opt.isCorrect, opt.explanation)}
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
              className={`rounded-xl p-4 border text-sm leading-relaxed ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-400/45 text-emerald-100'
                  : 'bg-rose-950/40 border-rose-400/45 text-rose-100'
              }`}
            >
              {feedback.text}
            </div>
          )}

          {solvedQ && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextQ}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>
                  {qIdx + 1 < LEVEL11_QUESTIONS.length
                    ? 'Следващ въпрос'
                    : 'Завърши Ниво 11'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
