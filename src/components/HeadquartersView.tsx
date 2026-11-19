import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  Clock,
  FileSearch,
  Users,
  ShieldAlert,
} from 'lucide-react';
import { AvatarCodename, ChapterId, DetectiveState, DifficultyLevel, LevelId } from '../types/game';
import { TEAMS, getMissionsForTeam, getTeamInfo } from '../data/teamMissions';
import {
  MAIN_LEVEL_ORDER,
  calculateAcademyScore,
  formatTimeMMSS,
  getDetectiveRank,
  getDifficultyConfig,
  isLevelUnlocked,
} from '../utils/gameEngine';
import { ResilientImage } from './ResilientImage';
import { CyberCityMap } from './CyberCityMap';

interface HeadquartersViewProps {
  state: DetectiveState;
  onStartMission: (levelId: LevelId) => void;
  onToggleSound: () => void;
  onChangeDifficulty: (difficulty: DifficultyLevel) => void;
  onSwitchTeam: (team: AvatarCodename) => void;
  onResetProgress: () => void;
  onOpenCertificate: () => void;
}

const CITY_BANNER = '/src/assets/images/cyber_city_skyline_1794674511788.jpg';

const CHAPTER_TABS: { id: ChapterId | 'all'; label: string }[] = [
  { id: 'all', label: 'Всички (16)' },
  { id: 'chapter1', label: 'Глава I · Нива 1–4' },
  { id: 'chapter2', label: 'Глава II · Нива 5–8' },
  { id: 'chapter3', label: 'Глава III · Нива 9–12' },
  { id: 'special', label: 'Бонуси и Финален бос' },
];

export const HeadquartersView: React.FC<HeadquartersViewProps> = ({
  state,
  onStartMission,
  onToggleSound,
  onChangeDifficulty,
  onSwitchTeam,
  onResetProgress,
  onOpenCertificate,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const [chapterFilter, setChapterFilter] = useState<ChapterId | 'all'>('all');

  const teamInfo = getTeamInfo(state.codename);
  const teamMissions = getMissionsForTeam(state.codename);

  const summary = calculateAcademyScore(state.results, teamMissions);
  const rank = getDetectiveRank(
    summary.mainCompletedCount,
    summary.bossCompleted,
    summary.totalScore
  );
  const diffConfig = getDifficultyConfig(state.difficulty);

  const nextAvailableMainId =
    MAIN_LEVEL_ORDER[Math.min(state.unlockedMainIndex, MAIN_LEVEL_ORDER.length - 1)];
  const nextAvailableMission =
    teamMissions.find((m) => m.id === nextAvailableMainId) ?? teamMissions[0];

  const visibleMissions =
    chapterFilter === 'all'
      ? teamMissions
      : teamMissions.filter((m) => m.chapter === chapterFilter);

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-8 lg:py-10 space-y-8">
      {/* Hero Case Overview */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0B1328]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-8 p-6 lg:p-9 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-300">
                <span>
                  {state.playMode === 'duo'
                    ? `Екип: ${state.detectiveName} и ${state.partnerName}`
                    : `Детектив ${state.detectiveName}`}
                </span>
                <span aria-hidden="true">·</span>
                <span>{teamInfo.teamTitle}</span>
                <span aria-hidden="true">·</span>
                <span>Звание: {rank.title}</span>
              </div>
              <h1 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold text-white">
                {teamInfo.operationName} · Детективска академия
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {teamInfo.description} {rank.summary}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onStartMission(
                    summary.mainCompletedCount === 12 && !summary.bossCompleted
                      ? 'boss'
                      : nextAvailableMission.id
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4" />
                <span>
                  {summary.bossCompleted
                    ? 'Преиграй мисия'
                    : summary.mainCompletedCount === 12
                      ? 'Среща с Фантома'
                      : `Отвори ${nextAvailableMission.numberLabel}`}
                </span>
              </button>

              {summary.bossCompleted && (
                <button
                  type="button"
                  onClick={onOpenCertificate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 rounded-xl hover:bg-violet-500 transition-colors whitespace-nowrap shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>Финален сертификат</span>
                </button>
              )}

              <button
                type="button"
                onClick={onToggleSound}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-slate-200 bg-[#111D38] border border-slate-700 rounded-xl hover:border-slate-500 transition-colors whitespace-nowrap shrink-0"
              >
                {state.soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-cyan-300" />
                    <span>Звук: Вкл.</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-400" />
                    <span>Звук: Изкл.</span>
                  </>
                )}
              </button>

              <select
                aria-label="Смени отбор и мисии"
                value={state.codename}
                onChange={(e) => onSwitchTeam(e.target.value as AvatarCodename)}
                className="rounded-xl bg-[#111D38] border border-cyan-500/40 px-3 py-2.5 text-xs font-semibold text-cyan-200 focus:border-cyan-400 focus:outline-none"
              >
                {TEAMS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.teamTitle}
                  </option>
                ))}
              </select>

              <select
                aria-label="Трудност на играта"
                value={state.difficulty}
                onChange={(e) => onChangeDifficulty(e.target.value as DifficultyLevel)}
                className="rounded-xl bg-[#111D38] border border-slate-700 px-3 py-2.5 text-xs font-medium text-slate-200 focus:border-cyan-400 focus:outline-none"
              >
                <option value="easy">Трудност: Лесно</option>
                <option value="medium">Трудност: Средно</option>
                <option value="expert">Трудност: Експертно</option>
              </select>

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-300 bg-[#111D38] border border-slate-800 rounded-xl hover:border-rose-500/40 hover:text-rose-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Нова игра</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-xl bg-rose-950/50 border border-rose-500/40 px-3 py-1.5">
                  <span className="text-xs text-rose-200">Нулиране?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmReset(false);
                      onResetProgress();
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-500"
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-2 py-1 text-xs text-slate-300 hover:text-white"
                  >
                    Отказ
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 relative min-h-[200px]">
            <ResilientImage
              src={CITY_BANNER}
              alt="Панорама на Cyber City"
              className="w-full h-full object-cover"
              fallbackLabel="Cyber City HQ"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1328] via-[#0B1328]/35 to-transparent hidden lg:block" />
          </div>
        </div>
      </section>

      {/* 4-column 1000-point KPI Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="panel-surface rounded-xl p-5">
          <div className="text-xs text-slate-400">Общ резултат (до 1000)</div>
          <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-cyan-300">
            {summary.totalScore} / 1000
          </div>
          <div className="mt-1 text-xs text-slate-400 font-mono-tabular">
            Основни: {summary.mainScore} · Бонус: {summary.bonusScore} · Бос: {summary.bossScore}
          </div>
        </div>

        <div className="panel-surface rounded-xl p-5">
          <div className="text-xs text-slate-400">Нива в Академията</div>
          <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-white">
            {summary.mainCompletedCount} / 12
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Бонуси: {summary.bonusCompletedCount}/3 · Бос: {summary.bossCompleted ? 'Победен' : 'Очаква'}
          </div>
        </div>

        <div className="panel-surface rounded-xl p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <FileSearch className="w-3.5 h-3.5 text-violet-300" />
            <span>Дневник с улики</span>
          </div>
          <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-violet-300">
            {state.discoveredClues.length} / 16
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Значки: {state.earnedBadges.length} / 12
          </div>
        </div>

        <div className="panel-surface rounded-xl p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            {state.playMode === 'duo' ? (
              <Users className="w-3.5 h-3.5 text-emerald-300" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
            )}
            <span>Време · Режим</span>
          </div>
          <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-emerald-300">
            {formatTimeMMSS(state.totalTimeSeconds)}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {diffConfig.label} · {state.playMode === 'duo' ? 'Екип 2-ма' : 'Соло'}
          </div>
        </div>
      </section>

      {/* Interactive City Sector Map */}
      <CyberCityMap state={state} onSelectLevel={onStartMission} />

      {/* Chapter Filter & Levels Grid */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-white">
            Програма на Академията (12 нива + 3 бонуса + Бос)
          </h2>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0B1328] border border-slate-800 rounded-xl">
            {CHAPTER_TABS.map((tab) => {
              const active = chapterFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setChapterFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleMissions.map((mission) => {
            const unlocked = isLevelUnlocked(mission.id, state);
            const result = state.results[mission.id];
            const isCompleted = Boolean(result?.completed);
            const isBoss = mission.category === 'boss';
            const isBonus = mission.category === 'bonus';

            let lockRequirementText = 'Изисква предходното ниво';
            if (mission.id === 'bonus1') lockRequirementText = 'Отключва се след Ниво 4';
            if (mission.id === 'bonus2') lockRequirementText = 'Отключва се след Ниво 6';
            if (mission.id === 'bonus3') lockRequirementText = 'Отключва се след Ниво 8 и 4 значки';
            if (mission.id === 'boss') lockRequirementText = 'Отключва се след Ниво 12';

            return (
              <div
                key={mission.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all border ${
                  !unlocked
                    ? 'bg-[#080E1E]/75 border-slate-800/70 opacity-75'
                    : isBoss
                      ? 'bg-[#161336] border-violet-400/50 shadow-lg shadow-violet-950/35'
                      : isBonus
                        ? 'bg-[#111B36] border-amber-400/35 hover:border-amber-300/60'
                        : 'panel-surface hover:border-cyan-400/45'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={
                        isBoss
                          ? 'font-semibold text-violet-300'
                          : isBonus
                            ? 'font-semibold text-amber-300'
                            : 'font-semibold text-cyan-300'
                      }
                    >
                      {mission.numberLabel} · {mission.maxPoints} т.
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Завършено</span>
                      </span>
                    ) : unlocked ? (
                      <span className="font-medium text-cyan-200">Отключено</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-medium text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Заключено</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 text-[11px] text-slate-400">
                    {mission.chapterTitle}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">
                    {mission.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    {mission.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  {isCompleted && result ? (
                    <div className="text-xs font-mono-tabular text-slate-300">
                      <strong className="text-white">{result.score}</strong> / {result.maxScore} т.
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      {unlocked ? `Около ${mission.estimatedMinutes} мин.` : lockRequirementText}
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => onStartMission(mission.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      !unlocked
                        ? 'bg-slate-800/70 text-slate-500 cursor-not-allowed'
                        : isCompleted
                          ? 'bg-[#172546] text-cyan-200 hover:bg-[#1E315C]'
                          : isBoss
                            ? 'bg-violet-500 text-white hover:bg-violet-400'
                            : isBonus
                              ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                              : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                    }`}
                  >
                    {!unlocked ? (
                      <span className="inline-flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Заключено</span>
                      </span>
                    ) : isCompleted ? (
                      'Преиграй'
                    ) : (
                      'Стартирай'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
