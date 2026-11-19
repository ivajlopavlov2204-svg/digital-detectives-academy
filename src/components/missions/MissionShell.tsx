import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Trophy, CheckCircle2, ArrowRight, Users } from 'lucide-react';
import { DetectiveState, LevelId, MissionMetadata, MissionResult } from '../../types/game';
import { BADGES } from '../../data/missionsData';
import { getTeamInfo } from '../../data/teamMissions';
import { formatTimeMMSS, getDifficultyConfig } from '../../utils/gameEngine';
import { DexAssistant } from '../DexAssistant';
import { Mission1ScamHunter } from './Mission1ScamHunter';
import { Mission2CodeBreaker } from './Mission2CodeBreaker';
import { Mission3DangerLink } from './Mission3DangerLink';
import { Mission4TruthOrLie } from './Mission4TruthOrLie';
import { Mission5CyberHero } from './Mission5CyberHero';
import { Level6PersonalData } from './Level6PersonalData';
import { Level7StrangerChat } from './Level7StrangerChat';
import { Level8VirusSystem } from './Level8VirusSystem';
import { Level9WifiTrap } from './Level9WifiTrap';
import { Level10DigitalFootprint } from './Level10DigitalFootprint';
import { Level11DeepfakeLab } from './Level11DeepfakeLab';
import { Level12LastDefense } from './Level12LastDefense';
import { Bonus1DetectiveBoard } from './Bonus1DetectiveBoard';
import { Bonus2SixtySeconds } from './Bonus2SixtySeconds';
import { Bonus3SecretMission } from './Bonus3SecretMission';
import { BossPhantomEncounter } from './BossPhantomEncounter';

interface MissionShellProps {
  mission: MissionMetadata;
  state: DetectiveState;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error' | 'unlock' | 'victory') => void;
  onBackToHq: () => void;
  onMissionComplete: (result: MissionResult) => {
    newlyUnlockedBadges: string[];
    levelUnlocked: boolean;
  };
  onOpenNextOrCertificate: (missionId: LevelId) => void;
}

export const MissionShell: React.FC<MissionShellProps> = ({
  mission,
  state,
  onSound,
  onBackToHq,
  onMissionComplete,
  onOpenNextOrCertificate,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [rawScore, setRawScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);
  const [dexTip, setDexTip] = useState<string | null>(null);
  const [lastPenaltyNotice, setLastPenaltyNotice] = useState<string | null>(null);
  const [completionSummary, setCompletionSummary] = useState<{
    notes?: string;
    finalScore: number;
    newlyUnlockedBadges: string[];
    levelUnlocked: boolean;
  } | null>(null);

  const diffConfig = getDifficultyConfig(state.difficulty);
  const perMistakePenalty =
    mission.category === 'boss' ? diffConfig.bossMistakePenalty : diffConfig.mistakePenalty;

  useEffect(() => {
    setElapsedSeconds(0);
    setRawScore(0);
    setMistakes(0);
    setHintsUsed(0);
    setTurnIndex(0);
    setDexTip(null);
    setLastPenaltyNotice(null);
    setCompletionSummary(null);
  }, [mission.id, state.codename]);

  useEffect(() => {
    if (completionSummary) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [completionSummary, mission.id]);

  const handleAddPoints = (pts: number) => {
    setRawScore((prev) => Math.min(mission.maxPoints, prev + pts));
    setLastPenaltyNotice(null);
    if (state.playMode === 'duo') {
      setTurnIndex((prev) => (prev === 0 ? 1 : 0));
    }
  };

  const handleRecordMistake = () => {
    setMistakes((prev) => prev + 1);
    setLastPenaltyNotice(`Допусната грешка: -${perMistakePenalty} т.`);
    if (state.playMode === 'duo') {
      setTurnIndex((prev) => (prev === 0 ? 1 : 0));
    }
  };

  const handleUseHint = () => {
    setHintsUsed((prev) => prev + 1);
    onSound('click');
  };

  const hintDeduction = hintsUsed * diffConfig.hintPenalty;
  const mistakeDeduction = mistakes * perMistakePenalty;
  const effectiveScore = Math.max(
    0,
    Math.min(mission.maxPoints, rawScore - hintDeduction - mistakeDeduction)
  );

  const handleFinish = (finalNotes?: string) => {
    const finalScore = Math.max(
      0,
      Math.min(mission.maxPoints, rawScore - hintDeduction - mistakeDeduction)
    );
    const result: MissionResult = {
      missionId: mission.id,
      completed: true,
      score: finalScore,
      maxScore: mission.maxPoints,
      mistakes,
      hintsUsed,
      timeSeconds: elapsedSeconds,
      clueUnlocked: mission.clueRewardTitle,
      completedAt: new Date().toISOString(),
      branchSummary: finalNotes,
    };
    const outcome = onMissionComplete(result);
    if (outcome.levelUnlocked) {
      onSound('unlock');
    }
    setCompletionSummary({
      notes: finalNotes,
      finalScore,
      newlyUnlockedBadges: outcome.newlyUnlockedBadges,
      levelUnlocked: outcome.levelUnlocked,
    });
  };

  const activeDuoDetective =
    turnIndex === 0 ? state.detectiveName : state.partnerName || 'Детектив 2';

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-8 space-y-6">
      <div className="panel-surface rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToHq}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-[#132142] border border-slate-700 rounded-lg hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Щаб</span>
          </button>
          <div>
            <div className="text-xs font-medium text-cyan-300">
              {getTeamInfo(state.codename).teamTitle} · {mission.chapterTitle} · {mission.numberLabel} · {diffConfig.label} (-{perMistakePenalty} т./грешка)
            </div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-white">
              {mission.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm font-mono-tabular">
          {state.playMode === 'duo' && (
            <div className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-violet-200 bg-violet-950/50 border border-violet-500/35 px-3 py-1.5 rounded-lg">
              <Users className="w-3.5 h-3.5 text-violet-300" />
              <span>Ход на: {activeDuoDetective}</span>
            </div>
          )}

          {mistakes > 0 && (
            <div className="text-xs font-semibold text-rose-300">
              Грешки: {mistakes} (-{mistakeDeduction} т.)
            </div>
          )}

          <div className="flex items-center gap-2 text-cyan-300">
            <Trophy className="w-4 h-4" />
            <span>
              {effectiveScore} / {mission.maxPoints} т.
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-violet-300" />
            <span>{formatTimeMMSS(elapsedSeconds)}</span>
          </div>
        </div>
      </div>

      {lastPenaltyNotice && !completionSummary && (
        <div
          role="status"
          className="rounded-xl bg-rose-950/45 border border-rose-500/45 px-4 py-2.5 text-xs font-semibold text-rose-200 flex items-center justify-between gap-4"
        >
          <span>{lastPenaltyNotice}</span>
          <span className="font-mono-tabular text-rose-300">
            Текущ резултат: {effectiveScore} т.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-8 panel-surface rounded-2xl p-6 sm:p-8">
          {!completionSummary ? (
            <>
              <p className="mb-6 pb-5 border-b border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                {mission.briefingStory}
              </p>

              {mission.id === 'mission1' && (
                <Mission1ScamHunter
                  key={`mission1-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission2' && (
                <Mission2CodeBreaker
                  key={`mission2-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission3' && (
                <Mission3DangerLink
                  key={`mission3-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission4' && (
                <Mission4TruthOrLie
                  key={`mission4-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission5' && (
                <Mission5CyberHero
                  key={`mission5-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission6' && (
                <Level6PersonalData
                  key={`mission6-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission7' && (
                <Level7StrangerChat
                  key={`mission7-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission8' && (
                <Level8VirusSystem
                  key={`mission8-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission9' && (
                <Level9WifiTrap
                  key={`mission9-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission10' && (
                <Level10DigitalFootprint
                  key={`mission10-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission11' && (
                <Level11DeepfakeLab
                  key={`mission11-${state.codename}`}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'mission12' && (
                <Level12LastDefense
                  key={`mission12-${state.codename}`}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'bonus1' && (
                <Bonus1DetectiveBoard
                  key={`bonus1-${state.codename}`}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'bonus2' && (
                <Bonus2SixtySeconds
                  key={`bonus2-${state.codename}`}
                  difficulty={state.difficulty}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'bonus3' && (
                <Bonus3SecretMission
                  key={`bonus3-${state.codename}`}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
              {mission.id === 'boss' && (
                <BossPhantomEncounter
                  key={`boss-${state.codename}`}
                  team={state.codename}
                  onAddPoints={handleAddPoints}
                  onRecordMistake={handleRecordMistake}
                  onUpdateDexTip={setDexTip}
                  onSound={onSound}
                  onComplete={handleFinish}
                />
              )}
            </>
          ) : (
            <div className="space-y-6 py-2">
              <div className="flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <div className="text-xs font-medium text-emerald-300">
                    {mission.numberLabel} приключена успешно
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Отлична детективска работа!
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-[#080F22] border border-slate-800 p-4">
                  <div className="text-xs text-slate-400">Краен резултат</div>
                  <div className="mt-1 font-mono-tabular text-2xl font-bold text-cyan-300">
                    {completionSummary.finalScore} / {mission.maxPoints}
                  </div>
                  {(hintsUsed > 0 || mistakes > 0) && (
                    <div className="mt-1 text-xs text-slate-400">
                      {hintsUsed > 0 ? `-${hintDeduction} т. подсказки` : ''}
                      {hintsUsed > 0 && mistakes > 0 ? ' · ' : ''}
                      {mistakes > 0 ? `-${mistakeDeduction} т. грешки` : ''}
                    </div>
                  )}
                </div>
                <div className="rounded-xl bg-[#080F22] border border-slate-800 p-4">
                  <div className="text-xs text-slate-400">Време</div>
                  <div className="mt-1 font-mono-tabular text-2xl font-bold text-white">
                    {formatTimeMMSS(elapsedSeconds)}
                  </div>
                </div>
                <div className="rounded-xl bg-[#080F22] border border-slate-800 p-4">
                  <div className="text-xs text-slate-400">Грешки</div>
                  <div className="mt-1 font-mono-tabular text-2xl font-bold text-slate-200">
                    {mistakes}
                  </div>
                  {mistakes > 0 && (
                    <div className="mt-1 text-xs text-rose-300 font-mono-tabular">
                      Отнети: -{mistakeDeduction} т.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-cyan-950/35 border border-cyan-500/30 p-5 space-y-1.5">
                <div className="text-xs font-semibold text-cyan-300">
                  Добавено в дневника: {mission.clueRewardTitle}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {mission.clueRewardText}
                </p>
                {completionSummary.notes && (
                  <p className="text-xs text-slate-300 pt-1">{completionSummary.notes}</p>
                )}
              </div>

              {completionSummary.newlyUnlockedBadges.length > 0 && (
                <div className="rounded-xl bg-violet-950/35 border border-violet-500/35 p-5 space-y-2">
                  <div className="text-xs font-semibold text-violet-300">
                    Отключени нови значки
                  </div>
                  <div className="text-sm font-medium text-white">
                    {completionSummary.newlyUnlockedBadges
                      .map((id) => BADGES.find((b) => b.id === id)?.title ?? id)
                      .join(' · ')}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={onBackToHq}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-200 bg-[#132142] border border-slate-700 rounded-xl hover:border-slate-500 transition-colors"
                >
                  Към Щаба
                </button>

                <button
                  type="button"
                  onClick={() => onOpenNextOrCertificate(mission.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>
                    {mission.id === 'boss'
                      ? 'Отвори финалния сертификат'
                      : 'Към следващото ниво'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="lg:col-span-4 space-y-5">
          <DexAssistant
            missionTitle={mission.title}
            hints={mission.dexHints}
            hintPenalty={diffConfig.hintPenalty}
            hintsUsedCount={hintsUsed}
            onUseHint={handleUseHint}
            contextualTip={dexTip}
          />

          <div className="panel-surface rounded-xl p-5 space-y-2">
            <div className="text-xs font-semibold text-slate-400">
              Сектор: {mission.citySector}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {mission.subtitle}. Максимален резултат: {mission.maxPoints} точки.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
