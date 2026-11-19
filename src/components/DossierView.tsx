import React, { useState } from 'react';
import { Award, CheckCircle2, Lock, FileText, UserCheck } from 'lucide-react';
import { AvatarCodename, DetectiveState } from '../types/game';
import { BADGES } from '../data/missionsData';
import { TEAMS, getMissionsForTeam, getTeamInfo } from '../data/teamMissions';
import {
  calculateAcademyScore,
  formatTimeMMSS,
  getDetectiveRank,
} from '../utils/gameEngine';
import { ResilientImage } from './ResilientImage';

interface DossierViewProps {
  state: DetectiveState;
  onUpdateProfile: (name: string, partnerName: string, codename: AvatarCodename) => void;
  onOpenCertificate: () => void;
}

const BADGE_EMBLEM = '/src/assets/images/detective_badge_emblem_1794674514306.jpg';

export const DossierView: React.FC<DossierViewProps> = ({
  state,
  onUpdateProfile,
  onOpenCertificate,
}) => {
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(state.detectiveName);
  const [partnerInput, setPartnerInput] = useState(state.partnerName);
  const [codenameInput, setCodenameInput] = useState<AvatarCodename>(state.codename);

  const teamInfo = getTeamInfo(state.codename);
  const teamMissions = getMissionsForTeam(state.codename);
  const summary = calculateAcademyScore(state.results, teamMissions);
  const rank = getDetectiveRank(
    summary.mainCompletedCount,
    summary.bossCompleted,
    summary.totalScore
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim().length >= 2) {
      onUpdateProfile(nameInput.trim(), partnerInput.trim(), codenameInput);
      setEditing(false);
    }
  };

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-8 lg:py-10 space-y-8">
      <section className="panel-surface rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-cyan-500/30">
            <ResilientImage
              src={BADGE_EMBLEM}
              alt="Емблема на Дигитален детектив"
              className="w-full h-full object-cover"
              fallbackLabel="Емблема"
            />
          </div>
          <div>
            <div className="text-xs font-medium text-cyan-300">
              Дневник и досие · {teamInfo.teamTitle} · {teamInfo.operationName} · {rank.chapterBadge}
            </div>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              {state.playMode === 'duo'
                ? `${state.detectiveName} и ${state.partnerName}`
                : state.detectiveName}
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Звание: <strong className="text-white">{rank.title}</strong> · Точки:{' '}
              <span className="font-mono-tabular text-cyan-300 font-bold">
                {summary.totalScore} / 1000
              </span>{' '}
              · Време:{' '}
              <span className="font-mono-tabular text-slate-200">
                {formatTimeMMSS(state.totalTimeSeconds)}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-[#12203F] border border-slate-700 rounded-xl hover:border-cyan-400/50 transition-colors whitespace-nowrap shrink-0"
          >
            <UserCheck className="w-4 h-4 text-cyan-300" />
            <span>{editing ? 'Затвори редакцията' : 'Редактирай профила'}</span>
          </button>

          {summary.bossCompleted && (
            <button
              type="button"
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>Отвори сертификата</span>
            </button>
          )}
        </div>
      </section>

      {editing && (
        <form
          onSubmit={handleSave}
          className="panel-elevated rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label htmlFor="edit-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Детектив 1
            </label>
            <input
              id="edit-name"
              type="text"
              maxLength={28}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full rounded-xl bg-[#070D1D] border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {state.playMode === 'duo' && (
            <div>
              <label htmlFor="edit-partner" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Детектив 2
              </label>
              <input
                id="edit-partner"
                type="text"
                maxLength={28}
                value={partnerInput}
                onChange={(e) => setPartnerInput(e.target.value)}
                className="w-full rounded-xl bg-[#070D1D] border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label htmlFor="edit-codename" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Отбор
            </label>
            <select
              id="edit-codename"
              value={codenameInput}
              onChange={(e) => setCodenameInput(e.target.value as AvatarCodename)}
              className="w-full rounded-xl bg-[#070D1D] border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {TEAMS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.teamTitle} — {t.operationName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            Запази
          </button>
        </form>
      )}

      {/* Investigation Journal (16 entries) */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-white">
            Дневник на разследването (събрани доказателства)
          </h2>
          <span className="text-xs font-mono-tabular text-slate-400">
            Разкрити: {state.discoveredClues.length} / {teamMissions.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMissions.map((mission) => {
            const res = state.results[mission.id];
            const unlocked = res?.completed;

            return (
              <div
                key={mission.id}
                className="panel-surface rounded-xl p-5 flex items-start gap-4"
              >
                <div className="mt-0.5 shrink-0">
                  {unlocked ? (
                    <FileText className="w-5 h-5 text-cyan-300" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-300">
                      {mission.numberLabel} · {mission.title}
                    </span>
                    {unlocked && res ? (
                      <span className="font-mono-tabular text-emerald-300 font-semibold">
                        {res.score}/{res.maxScore} т. · {formatTimeMMSS(res.timeSeconds)}
                      </span>
                    ) : (
                      <span className="text-slate-500">Неразкрита</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {unlocked
                      ? `${mission.clueRewardTitle}: ${mission.clueRewardText}`
                      : 'Завърши това ниво, за да запишеш доказателството в дневника.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12 Badges Gallery */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-white">
            Детективски значки и отличия
          </h2>
          <span className="text-xs font-mono-tabular text-slate-400">
            Отключени: {state.earnedBadges.length} / {BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const earned = state.earnedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`rounded-xl p-5 border transition-colors ${
                  earned
                    ? 'bg-[#101B36] border-cyan-400/40'
                    : 'bg-[#080E1E] border-slate-800/70 opacity-65'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className={earned ? 'text-cyan-300 font-semibold' : 'text-slate-500'}>
                    {badge.conditionLabel}
                  </span>
                  {earned ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                </div>
                <h3 className="mt-2.5 font-display text-base font-bold text-white">
                  {badge.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
