import React, { useMemo, useState } from 'react';
import { CheckCircle2, AlertCircle, Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { getMission2Candidates } from '../../data/teamMissions';
import { analyzePasswordStrength, shuffleArray } from '../../utils/gameEngine';

interface Mission2Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Mission2CodeBreaker: React.FC<Mission2Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const candidates = useMemo(() => shuffleArray(getMission2Candidates(team)), [team]);
  const [stage, setStage] = useState<'audit' | 'forge'>('audit');
  const [flaggedWeak, setFlaggedWeak] = useState<string[]>([]);
  const [auditFeedback, setAuditFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [customPassword, setCustomPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [forgeCompleted, setForgeCompleted] = useState(false);

  const weakTargetCount = candidates.filter((c) => c.isWeak).length;
  const foundWeakCount = flaggedWeak.filter((id) => {
    const item = candidates.find((c) => c.id === id);
    return Boolean(item?.isWeak);
  }).length;

  const isAuditComplete = foundWeakCount === weakTargetCount;

  const handleSelectCandidate = (id: string) => {
    if (flaggedWeak.includes(id) || isAuditComplete) return;
    const item = candidates.find((c) => c.id === id);
    if (!item) return;

    setFlaggedWeak((prev) => [...prev, id]);

    if (item.isWeak) {
      onAddPoints(8);
      onSound('clue');
      setAuditFeedback({
        type: 'success',
        text: `+8 точки · Слаба парола! ${item.reason}`,
      });
    } else {
      onRecordMistake();
      onSound('error');
      setAuditFeedback({
        type: 'error',
        text: `Грешка: „${item.value}“ всъщност е силна парола! ${item.reason}`,
      });
      onUpdateDexTip('Силната парола смесва главни и малки букви, цифри и символи като # или !.');
    }
  };

  const analysis = analyzePasswordStrength(customPassword);
  const isStrongEnough =
    analysis.score >= 90 &&
    analysis.hasMinLength &&
    analysis.hasUppercase &&
    analysis.hasLowercase &&
    analysis.hasDigit &&
    analysis.hasSymbol &&
    analysis.hasNoCommonPattern;

  const handleConfirmForge = () => {
    if (!isStrongEnough || forgeCompleted) return;
    setForgeCompleted(true);
    onAddPoints(26);
    onSound('success');
    onUpdateDexTip('Паролата е непробиваема! Системата на училището е защитена.');
  };

  return (
    <div className="space-y-6">
      {stage === 'audit' ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-cyan-300">
                Етап 1 от 2 · Одит на компрометирани пароли
              </div>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                Открий трите слаби пароли в списъка
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-slate-300">
              Открити слаби: {foundWeakCount} / {weakTargetCount}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {candidates.map((cand) => {
              const isPicked = flaggedWeak.includes(cand.id);
              return (
                <button
                  key={cand.id}
                  type="button"
                  onClick={() => handleSelectCandidate(cand.id)}
                  className={`rounded-xl p-4 text-left border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isPicked
                      ? cand.isWeak
                        ? 'bg-emerald-950/40 border-emerald-400/50'
                        : 'bg-rose-950/40 border-rose-400/50'
                      : 'bg-[#081022] border-slate-800 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-base font-bold text-white">
                      {cand.value}
                    </span>
                    {isPicked ? (
                      cand.isWeak ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
                      )
                    ) : (
                      <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    {isPicked
                      ? cand.isWeak
                        ? 'Потвърдена слаба парола'
                        : 'Тази парола всъщност е надеждна'
                      : 'Натисни, ако смяташ, че е слаба'}
                  </div>
                </button>
              );
            })}
          </div>

          {auditFeedback && (
            <div
              className={`rounded-xl p-4 border text-sm leading-relaxed ${
                auditFeedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-400/45 text-emerald-100'
                  : 'bg-rose-950/40 border-rose-400/45 text-rose-100'
              }`}
            >
              {auditFeedback.text}
            </div>
          )}

          {isAuditComplete && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setStage('forge');
                  onSound('click');
                  onUpdateDexTip(
                    'Сега създай примерна сигурна парола — никога не въвеждай истинската си парола в тестови форми!'
                  );
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Към лабораторията за пароли</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-violet-300">
                Етап 2 от 2 · Генератор и оценка на сложност
              </div>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                Създай примерна непробиваема парола
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-cyan-300">
              Сила: {analysis.score} / 100 ({analysis.label})
            </div>
          </div>

          <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-5 sm:p-6 space-y-5">
            <div>
              <label
                htmlFor="forge-password"
                className="block text-xs font-semibold text-slate-300 mb-2"
              >
                Въведи тестова парола (не използвай истинската си парола):
              </label>
              <div className="relative">
                <input
                  id="forge-password"
                  type={showPassword ? 'text' : 'password'}
                  value={customPassword}
                  disabled={forgeCompleted}
                  onChange={(e) => setCustomPassword(e.target.value)}
                  placeholder="Напр. Snejna#Planina26!"
                  className="w-full rounded-xl bg-[#0C152B] border border-slate-700 pl-4 pr-12 py-3 font-mono-tabular text-base text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Скрий символите' : 'Покажи символите'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-200 ${
                    analysis.score >= 90
                      ? 'bg-emerald-400'
                      : analysis.score >= 60
                        ? 'bg-cyan-400'
                        : analysis.score >= 35
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                  }`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
              <p className="text-sm text-slate-200">{analysis.feedback}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {[
                { ok: analysis.hasMinLength, text: 'Поне 10 символа дължина' },
                { ok: analysis.hasUppercase, text: 'Поне 1 главна буква (A–Z / А–Я)' },
                { ok: analysis.hasLowercase, text: 'Поне 1 малка буква (a–z / а–я)' },
                { ok: analysis.hasDigit, text: 'Поне 1 цифра (0–9)' },
                { ok: analysis.hasSymbol, text: 'Специален знак (!, @, #, $, %)' },
                { ok: analysis.hasNoCommonPattern, text: 'Без лесни думи (1234, parola, qwerty)' },
              ].map((rule, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${
                    rule.ok
                      ? 'bg-emerald-950/30 border-emerald-500/35 text-emerald-200'
                      : 'bg-[#0B1326] border-slate-800 text-slate-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      rule.ok ? 'text-emerald-300' : 'text-slate-600'
                    }`}
                  />
                  <span>{rule.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {!forgeCompleted ? (
              <button
                type="button"
                disabled={!isStrongEnough}
                onClick={handleConfirmForge}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                  isStrongEnough
                    ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Заключи училищната система (+26 т.)</span>
              </button>
            ) : (
              <>
                <div className="text-sm font-medium text-emerald-300">
                  +26 точки · Новата защита е активирана успешно!
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onComplete('Открити слабите пароли и създадена надеждна защита.')
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Завърши Ниво 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
