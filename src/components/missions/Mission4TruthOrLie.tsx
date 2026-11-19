import React, { useMemo, useState } from 'react';
import { Newspaper, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { getMission4Rounds } from '../../data/teamMissions';
import { shuffleArray } from '../../utils/gameEngine';

interface Mission4Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Mission4TruthOrLie: React.FC<Mission4Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const rounds = useMemo(() => shuffleArray(getMission4Rounds(team)), [team]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [phase, setPhase] = useState<'compare' | 'checklist'>('compare');
  const [solvedRound, setSolvedRound] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [checklistSolved, setChecklistSolved] = useState(false);

  const currentRound = rounds[roundIdx];

  const handleChoosePost = (isReliable: boolean) => {
    if (solvedRound) return;

    if (isReliable) {
      setSolvedRound(true);
      onAddPoints(15);
      onSound('clue');
      setFeedback({
        type: 'success',
        text: `+15 точки · Точен избор! ${currentRound.explanation}`,
      });
      onUpdateDexTip('Провери автора и официалния източник — това винаги различава истината от слуха.');
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({
        type: 'error',
        text: 'Тази публикация е манипулативна! Обърни внимание на заглавието, липсата на реален автор и призивите за паника.',
      });
    }
  };

  const handleNext = () => {
    if (roundIdx + 1 < rounds.length) {
      setRoundIdx((prev) => prev + 1);
      setSolvedRound(false);
      setFeedback(null);
      onSound('click');
    } else {
      setPhase('checklist');
      setFeedback(null);
      onSound('click');
      onUpdateDexTip('Избери двете златни правила за проверка на информация в интернет.');
    }
  };

  const checklistOptions = [
    {
      id: 'chk1',
      text: 'Проверявам автора, датата и дали новината присъства в официален или независим източник.',
      valid: true,
    },
    {
      id: 'chk2',
      text: 'Споделям веднага, ако заглавието пише „ШОК!“ с много удивителни, за да изпреваря другите.',
      valid: false,
    },
    {
      id: 'chk3',
      text: 'Търся конкретни доказателства вместо емоционални обещания и верижни заплахи.',
      valid: true,
    },
  ];

  const toggleCheck = (id: string) => {
    if (checklistSolved) return;
    setSelectedChecks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleVerifyChecklist = () => {
    if (checklistSolved) return;
    const pickedCorrectly =
      selectedChecks.length === 2 &&
      selectedChecks.includes('chk1') &&
      selectedChecks.includes('chk3');

    if (pickedCorrectly) {
      setChecklistSolved(true);
      onAddPoints(20);
      onSound('success');
      setFeedback({
        type: 'success',
        text: '+20 точки · Отлично! Вече владееш основните правила на медийната грамотност.',
      });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({
        type: 'error',
        text: 'Избери точно двете надеждни правила за проверка на информация.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {phase === 'compare' ? (
        <>
          <div>
            <div className="text-xs font-medium text-cyan-300">
              Сравнение {roundIdx + 1} от {rounds.length} · {currentRound.topic}
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-white">
              Коя от двете публикации е достоверна?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: 'Публикация А', post: currentRound.postA },
              { label: 'Публикация Б', post: currentRound.postB },
            ].map(({ label, post }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleChoosePost(post.isReliable)}
                className={`rounded-2xl bg-[#070D1D] border p-5 text-left transition-all flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  solvedRound && post.isReliable
                    ? 'border-emerald-400/60 bg-emerald-950/25'
                    : 'border-slate-700 hover:border-cyan-400/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-cyan-300">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white leading-snug">
                    {post.headline}
                  </h3>

                  <div className="text-xs text-slate-400 space-y-1">
                    <div>
                      Автор: <span className="text-slate-200">{post.author}</span>
                    </div>
                    <div>
                      Източник: <span className="text-slate-200">{post.source}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs font-semibold text-cyan-300">
                  {solvedRound && post.isReliable
                    ? 'Потвърден достоверен източник'
                    : 'Избери като достоверна'}
                </div>
              </button>
            ))}
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

          {solvedRound && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>
                  {roundIdx + 1 < rounds.length
                    ? 'Следваща новина'
                    : 'Към проверката на правила'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <div className="text-xs font-medium text-violet-300">
              Финална задача в Ниво 4
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-white">
              Маркирай двете правилни действия преди да споделиш новина
            </h2>
          </div>

          <div className="space-y-3">
            {checklistOptions.map((opt) => {
              const checked = selectedChecks.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleCheck(opt.id)}
                  className={`w-full text-left rounded-xl p-4 text-sm border transition-all flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    checked
                      ? 'bg-cyan-500/15 border-cyan-400 text-white'
                      : 'bg-[#081022] border-slate-800 hover:border-slate-600 text-slate-200'
                  }`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${
                      checked ? 'text-cyan-300' : 'text-slate-600'
                    }`}
                  />
                  <span>{opt.text}</span>
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
            {!checklistSolved ? (
              <button
                type="button"
                onClick={handleVerifyChecklist}
                className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                Провери избора (+20 т.)
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  onComplete('Разграничени достоверни новини от манипулативни слухове.')
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Завърши Ниво 4</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
