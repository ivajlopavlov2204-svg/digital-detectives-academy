import React from 'react';
import { ShieldCheck, Lock, Zap } from 'lucide-react';
import { DetectiveState, LevelId } from '../types/game';
import { getMissionsForTeam } from '../data/teamMissions';
import { isLevelUnlocked } from '../utils/gameEngine';

interface CyberCityMapProps {
  state: DetectiveState;
  onSelectLevel: (levelId: LevelId) => void;
}

export const CyberCityMap: React.FC<CyberCityMapProps> = ({ state, onSelectLevel }) => {
  const ch1Done = ['mission1', 'mission2', 'mission3', 'mission4'].filter((id) =>
    Boolean(state.results[id as LevelId]?.completed)
  ).length;
  const ch2Done = ['mission5', 'mission6', 'mission7', 'mission8'].filter((id) =>
    Boolean(state.results[id as LevelId]?.completed)
  ).length;
  const ch3Done = ['mission9', 'mission10', 'mission11', 'mission12'].filter((id) =>
    Boolean(state.results[id as LevelId]?.completed)
  ).length;
  const bossDone = Boolean(state.results.boss?.completed);

  const districts: {
    title: string;
    subtitle: string;
    doneCount: number;
    totalCount: number;
    nextLevelId: LevelId;
    x: number;
    y: number;
  }[] = [
    {
      title: 'Сектор I · Училище и Поща',
      subtitle: 'Нива 1–4 (Млад детектив)',
      doneCount: ch1Done,
      totalCount: 4,
      nextLevelId: 'mission1',
      x: 15,
      y: 25,
    },
    {
      title: 'Сектор II · Социална мрежа',
      subtitle: 'Нива 5–8 (Опитен изследовател)',
      doneCount: ch2Done,
      totalCount: 4,
      nextLevelId: 'mission5',
      x: 42,
      y: 62,
    },
    {
      title: 'Сектор III · Облак и Медии',
      subtitle: 'Нива 9–12 (Майстор детектив)',
      doneCount: ch3Done,
      totalCount: 4,
      nextLevelId: 'mission9',
      x: 68,
      y: 28,
    },
    {
      title: 'Сървърна кула на Фантома',
      subtitle: 'Финален бос (250 т.)',
      doneCount: bossDone ? 1 : 0,
      totalCount: 1,
      nextLevelId: 'boss',
      x: 86,
      y: 64,
    },
  ];

  const teamMissions = getMissionsForTeam(state.codename);

  // Намираме първото незавършено отключено ниво в даден сектор
  const resolveSectorTarget = (defaultId: LevelId, idxStart: number, idxEnd: number): LevelId => {
    const slice = teamMissions.slice(idxStart, idxEnd + 1);
    for (let i = 0; i < slice.length; i++) {
      if (!state.results[slice[i].id]?.completed && isLevelUnlocked(slice[i].id, state)) {
        return slice[i].id;
      }
    }
    return defaultId;
  };

  const targetIds: LevelId[] = [
    resolveSectorTarget('mission1', 0, 3),
    resolveSectorTarget('mission5', 4, 7),
    resolveSectorTarget('mission9', 8, 11),
    'boss',
  ];

  return (
    <section className="panel-surface rounded-2xl p-6 space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-white">
            Детективска карта на Cyber City
          </h2>
          <p className="text-xs text-slate-400">
            Проследи кои райони на града вече са спасени и премини към активния сектор
          </p>
        </div>
        <div className="text-xs font-mono-tabular text-cyan-300">
          Спасени сектори: {[ch1Done === 4, ch2Done === 4, ch3Done === 4, bossDone].filter(Boolean).length} / 4
        </div>
      </div>

      {/* Interactive SVG Connection Grid + District Nodes */}
      <div className="relative rounded-xl bg-[#070D1D] border border-slate-800 p-5 overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 800 180"
          className="hidden lg:block w-full h-36 opacity-80"
          preserveAspectRatio="none"
        >
          <path
            d="M 100 50 C 210 50, 230 130, 320 130 C 420 130, 440 50, 530 50 C 620 50, 640 130, 720 130"
            fill="none"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <circle cx="100" cy="50" r="8" fill={ch1Done === 4 ? '#34D399' : '#38BDF8'} />
          <circle cx="320" cy="130" r="8" fill={ch2Done === 4 ? '#34D399' : ch1Done === 4 ? '#38BDF8' : '#475569'} />
          <circle cx="530" cy="50" r="8" fill={ch3Done === 4 ? '#34D399' : ch2Done === 4 ? '#38BDF8' : '#475569'} />
          <circle cx="720" cy="130" r="9" fill={bossDone ? '#34D399' : ch3Done === 4 ? '#A78BFA' : '#475569'} />
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:-mt-2">
          {districts.map((dist, idx) => {
            const targetId = targetIds[idx];
            const unlocked = isLevelUnlocked(targetId, state);
            const saved = dist.doneCount === dist.totalCount;

            return (
              <button
                key={dist.title}
                type="button"
                disabled={!unlocked}
                onClick={() => onSelectLevel(targetId)}
                className={`text-left rounded-xl p-4 border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  saved
                    ? 'bg-emerald-950/30 border-emerald-400/50 hover:border-emerald-300'
                    : unlocked
                      ? 'bg-[#0E1A36] border-cyan-400/45 hover:border-cyan-300'
                      : 'bg-[#080F22] border-slate-800/70 opacity-65 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className={saved ? 'text-emerald-300 font-semibold' : unlocked ? 'text-cyan-300 font-semibold' : 'text-slate-500'}>
                    {saved ? 'Секторът е спасен' : unlocked ? 'Активен сектор' : 'Заключен'}
                  </span>
                  {saved ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                  ) : unlocked ? (
                    <Zap className="w-4 h-4 text-cyan-300 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </div>

                <div className="mt-2 font-display text-sm font-bold text-white">
                  {dist.title}
                </div>
                <div className="mt-0.5 text-xs text-slate-400">{dist.subtitle}</div>
                <div className="mt-2.5 text-xs font-mono-tabular text-slate-300">
                  Напредък: {dist.doneCount} / {dist.totalCount}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
