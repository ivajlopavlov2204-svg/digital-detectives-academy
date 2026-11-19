import React, { useMemo, useState } from 'react';
import { Shield, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { StoryChoice } from '../../data/missionsData';
import { getMission5Scenes } from '../../data/teamMissions';

interface Mission5Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Mission5CyberHero: React.FC<Mission5Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const scenes = useMemo(() => getMission5Scenes(team), [team]);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [safetyIndex, setSafetyIndex] = useState(50);
  const [chosenOption, setChosenOption] = useState<StoryChoice | null>(null);
  const [branchHistory, setBranchHistory] = useState<string[]>([]);

  const currentScene = scenes[sceneIdx];

  const handleSelectChoice = (choice: StoryChoice) => {
    if (chosenOption) return;
    setChosenOption(choice);

    const nextSafety = Math.max(0, Math.min(100, safetyIndex + choice.safetyImpact));
    setSafetyIndex(nextSafety);
    setBranchHistory((prev) => [...prev, choice.consequenceText]);

    if (choice.isResponsible) {
      onAddPoints(choice.points);
      onSound('clue');
      onUpdateDexTip('Отговорно решение! Виждаш как действията ти защитиха общността.');
    } else {
      if (choice.points > 0) onAddPoints(choice.points);
      onRecordMistake();
      onSound('error');
      onUpdateDexTip(
        'Тази разклонена пътека доведе до риск. Прочети внимателно последствието и запомни по-сигурния ход.'
      );
    }
  };

  const handleNextScene = () => {
    if (sceneIdx + 1 < scenes.length) {
      setSceneIdx((prev) => prev + 1);
      setChosenOption(null);
      onSound('click');
    } else {
      onSound('success');
      onComplete(
        `Индекс на сигурност в общността: ${safetyIndex}%. Решенията оформиха развитието на историята.`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Branching Community Safety Bar */}
      <div className="rounded-xl bg-[#070D1D] border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <Shield className="w-4 h-4" />
            <span>Сигурност на училищната общност</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Променя се в реално време според твоите избори
          </div>
        </div>
        <div className="w-full sm:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-mono-tabular">
            <span className="text-slate-400">Ниво</span>
            <span className="text-white font-bold">{safetyIndex}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-200 ${
                safetyIndex >= 75
                  ? 'bg-emerald-400'
                  : safetyIndex >= 45
                    ? 'bg-cyan-400'
                    : 'bg-amber-400'
              }`}
              style={{ width: `${safetyIndex}%` }}
            />
          </div>
        </div>
      </div>

      {/* Story Scene Card */}
      <div className="rounded-2xl bg-[#070D1D] border border-slate-700/80 p-6 space-y-5">
        <div>
          <div className="text-xs font-medium text-violet-300">
            {currentScene.stepTitle} ({sceneIdx + 1} / {scenes.length})
          </div>
          <p className="mt-3 text-base sm:text-lg font-medium text-white leading-relaxed">
            {currentScene.situation}
          </p>
        </div>

        <div className="space-y-3">
          {currentScene.choices.map((choice) => {
            const isSelected = chosenOption?.id === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                disabled={Boolean(chosenOption)}
                onClick={() => handleSelectChoice(choice)}
                className={`w-full text-left rounded-xl p-4 text-sm leading-relaxed border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  isSelected
                    ? choice.isResponsible
                      ? 'bg-emerald-950/40 border-emerald-400/60 text-emerald-100'
                      : 'bg-amber-950/40 border-amber-400/60 text-amber-100'
                    : chosenOption
                      ? 'bg-[#0A1124] border-slate-800/60 text-slate-500 opacity-65'
                      : 'bg-[#0C162F] border-slate-700 hover:border-cyan-400/60 text-slate-200'
                }`}
              >
                {choice.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Consequence Branch Output */}
      {chosenOption && (
        <div
          className={`rounded-xl p-4 border text-sm leading-relaxed flex items-start gap-3 ${
            chosenOption.isResponsible
              ? 'bg-emerald-950/40 border-emerald-400/45 text-emerald-100'
              : 'bg-amber-950/40 border-amber-400/45 text-amber-100'
          }`}
        >
          {chosenOption.isResponsible ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-semibold mb-1">
              Последствие от твоя избор ({chosenOption.isResponsible ? `+${chosenOption.points} т.` : chosenOption.points > 0 ? `+${chosenOption.points} т. / наказание за грешка` : 'наказание за грешка'}):
            </div>
            <p>{chosenOption.consequenceText}</p>
          </div>
        </div>
      )}

      {chosenOption && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNextScene}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>
              {sceneIdx + 1 < scenes.length
                ? 'Продължи историята'
                : 'Завърши Мисия 5'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {branchHistory.length > 0 && (
        <div className="text-xs text-slate-400">
          Хроника на решенията: {branchHistory.length} от {scenes.length} етапа
        </div>
      )}
    </div>
  );
};
