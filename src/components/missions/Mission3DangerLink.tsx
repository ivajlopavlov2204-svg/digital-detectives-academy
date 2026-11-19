import React, { useMemo, useState } from 'react';
import { Lock, Unlock, Globe, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { getMission3Rounds } from '../../data/teamMissions';
import { shuffleArray } from '../../utils/gameEngine';

interface Mission3Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Mission3DangerLink: React.FC<Mission3Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const rounds = useMemo(() => shuffleArray(getMission3Rounds(team)).slice(0, 2), [team]);

  const [step, setStep] = useState<'compare' | 'reaction'>('compare');
  const [roundIdx, setRoundIdx] = useState(0);
  const [roundSolved, setRoundSolved] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [reactionSolved, setReactionSolved] = useState(false);

  const currentRound = rounds[roundIdx];

  const handleChooseSite = (isSafe: boolean) => {
    if (roundSolved) return;

    if (isSafe) {
      setRoundSolved(true);
      onAddPoints(15);
      onSound('clue');
      setFeedback({
        type: 'success',
        text: `+15 точки · Вярно! ${currentRound.explanation}`,
      });
      onUpdateDexTip('Страхотно око за детайли! Продължи напред.');
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({
        type: 'error',
        text: `Внимание, това е капан! ${currentRound.differenceHint}`,
      });
      onUpdateDexTip(currentRound.differenceHint);
    }
  };

  const handleNextCompare = () => {
    if (roundIdx + 1 < rounds.length) {
      setRoundIdx((prev) => prev + 1);
      setRoundSolved(false);
      setFeedback(null);
      onSound('click');
    } else {
      setStep('reaction');
      setFeedback(null);
      onSound('click');
      onUpdateDexTip('Сега реши как е най-безопасно да реагираш при получен странен линк.');
    }
  };

  const handleReactionChoice = (isCorrect: boolean, text: string) => {
    if (reactionSolved) return;
    if (isCorrect) {
      setReactionSolved(true);
      onAddPoints(20);
      onSound('success');
      setFeedback({ type: 'success', text: `+20 точки · ${text}` });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text });
    }
  };

  return (
    <div className="space-y-6">
      {step === 'compare' ? (
        <>
          <div>
            <div className="text-xs font-medium text-cyan-300">
              Сравнение {roundIdx + 1} от {rounds.length} · {currentRound.contextTitle}
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-white">
              Избери истинския и безопасен уеб адрес
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: 'Вариант А', site: currentRound.siteA },
              { label: 'Вариант Б', site: currentRound.siteB },
            ].map(({ label, site }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleChooseSite(site.isSafe)}
                className={`rounded-2xl bg-[#070D1D] border p-5 text-left transition-all flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  roundSolved && site.isSafe
                    ? 'border-emerald-400/60 bg-emerald-950/25'
                    : 'border-slate-700 hover:border-cyan-400/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-slate-300">{label}</span>
                    <span className="inline-flex items-center gap-1 font-mono-tabular">
                      {site.isHttps ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-emerald-300" />
                          <span className="text-emerald-300">HTTPS</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-rose-400">HTTP (незащитен)</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#0D1730] border border-slate-700/80 px-3.5 py-2.5 flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono-tabular text-xs sm:text-sm text-cyan-200 break-all">
                      {site.url}
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#0B1224] border border-slate-800 p-4">
                    <div className="text-xs text-slate-400 mb-2">Бутон на страницата:</div>
                    <div
                      className={`inline-block rounded-lg px-3.5 py-2 text-xs font-bold ${
                        site.isSafe
                          ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                          : 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                      }`}
                    >
                      {site.buttonText}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-medium text-cyan-300">
                  {roundSolved && site.isSafe ? 'Потвърден официален сайт' : 'Избери този сайт'}
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

          {roundSolved && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextCompare}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>
                  {roundIdx + 1 < rounds.length ? 'Следващо сравнение' : 'Последна стъпка'}
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
              Стъпка 3 от 3 · Правилна реакция
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-white">
              Съученик ти праща съкратен линк: „Виж снимката си тук!! bit.ly/x9k2“
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Съобщението е странно и не прилича на начина, по който приятелят ти пише обикновено.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                text: 'Отварям линка веднага, защото името на подателя е на мой приятел.',
                correct: false,
                explanation:
                  'Ако профилът на приятеля ти е хакнат, измамникът праща опасни линкове от негово име.',
              },
              {
                text: 'НЕ отварям линка. Питам приятеля си по телефона или на живо дали наистина го е изпратил и го предупреждавам.',
                correct: true,
                explanation:
                  'Отлично! Проверката по друг канал спира верижните фишинг атаки.',
              },
              {
                text: 'Препращам линка на друг съученик, за да го отвори той първи.',
                correct: false,
                explanation:
                  'Така излагаш друг човек на същия риск.',
              },
            ].map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleReactionChoice(opt.correct, opt.explanation)}
                className={`w-full text-left rounded-xl p-4 text-sm border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  reactionSolved && opt.correct
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

          {reactionSolved && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onComplete('Разпознати фалшиви домейни и избрана безопасна реакция.')
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Завърши Ниво 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
