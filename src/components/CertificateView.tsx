import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, Printer } from 'lucide-react';
import { DetectiveState } from '../types/game';
import { BADGES } from '../data/missionsData';
import { getMissionsForTeam, getTeamInfo } from '../data/teamMissions';
import {
  calculateAcademyScore,
  formatTimeMMSS,
  getDetectiveRank,
  getDifficultyConfig,
} from '../utils/gameEngine';
import { ResilientImage } from './ResilientImage';

interface CertificateViewProps {
  state: DetectiveState;
  onBackToHq: () => void;
}

const BADGE_EMBLEM = '/src/assets/images/detective_badge_emblem_1794674514306.jpg';

export const CertificateView: React.FC<CertificateViewProps> = ({
  state,
  onBackToHq,
}) => {
  const [copied, setCopied] = useState(false);

  const teamInfo = getTeamInfo(state.codename);
  const teamMissions = getMissionsForTeam(state.codename);
  const summary = calculateAcademyScore(state.results, teamMissions);
  const rank = getDetectiveRank(
    summary.mainCompletedCount,
    summary.bossCompleted,
    summary.totalScore
  );
  const diffConfig = getDifficultyConfig(state.difficulty);
  const earnedBadgeTitles = BADGES.filter((b) => state.earnedBadges.includes(b.id)).map(
    (b) => b.title
  );

  const agentLabel =
    state.playMode === 'duo'
      ? `${state.detectiveName} и ${state.partnerName}`
      : state.detectiveName;

  const todayFormatted = new Date().toLocaleDateString('bg-BG', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const certificateText = [
    '================================================',
    'DIGITAL DETECTIVES – ОПЕРАЦИЯ БЕЗОПАСЕН ИНТЕРНЕТ',
    'ДОСИЕ НА ДЕТЕКТИВА · УСПЕШНО РАЗСЛЕДВАНЕ',
    '================================================',
    `Детектив / Екип: ${agentLabel} (${teamInfo.teamTitle} · ${teamInfo.operationName})`,
    `Трудност: ${diffConfig.label}`,
    `Общ резултат: ${summary.totalScore} / 1000 точки`,
    `Разбивка: Основни нива ${summary.mainScore}/600 · Бонуси ${summary.bonusScore}/150 · Бос ${summary.bossScore}/250`,
    `Твоето звание: ${rank.title}`,
    `Завършени етапи: ${summary.totalCompletedCount} / ${teamMissions.length}`,
    `Общо време: ${formatTimeMMSS(state.totalTimeSeconds)}`,
    `Значки: ${earnedBadgeTitles.length > 0 ? earnedBadgeTitles.join(', ') : 'Няма'}`,
    `Дата: ${todayFormatted}`,
    '------------------------------------------------',
    'Поздравления! Победи Фантома и възстанови сигурността в Cyber City.',
    '================================================',
  ].join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(certificateText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="mx-auto max-w-[960px] px-6 py-8 lg:py-12 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToHq}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Обратно към Щаба</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-[#111C35] border border-slate-700 rounded-xl hover:border-slate-500 transition-colors whitespace-nowrap shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Отпечатай</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Сертификатът е копиран</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Копирай сертификата</span>
              </>
            )}
          </button>
        </div>
      </div>

      <section className="rounded-3xl border border-cyan-400/35 bg-gradient-to-b from-[#0E1833] to-[#080E1E] p-8 sm:p-12 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold tracking-widest text-cyan-300">
              ДОСИЕ НА ДЕТЕКТИВСКАТА АКАДЕМИЯ · CYBER CITY
            </div>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
              УСПЕШНО РАЗСЛЕДВАНЕ
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Издаден на <strong className="text-white">{agentLabel}</strong> ·{' '}
              <span className="text-cyan-300 font-semibold">
                {teamInfo.teamTitle} ({teamInfo.operationName})
              </span>{' '}
              · Трудност <span className="text-slate-200">{diffConfig.label}</span>
            </p>
          </div>

          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-cyan-400/35">
            <ResilientImage
              src={BADGE_EMBLEM}
              alt="Официален печат на Cyber City"
              className="w-full h-full object-cover"
              fallbackLabel="Печат"
            />
          </div>
        </div>

        <div className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-slate-800">
          <div>
            <div className="text-xs text-slate-400">Общ резултат</div>
            <div className="mt-1 font-mono-tabular text-4xl font-bold text-cyan-300">
              {summary.totalScore}/1000
            </div>
            <div className="mt-1 text-xs text-slate-400 font-mono-tabular">
              Нива {summary.mainScore} · Бонус {summary.bonusScore} · Бос {summary.bossScore}
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400">Твоето звание</div>
            <div className="mt-1 font-display text-2xl font-bold text-amber-300">
              {rank.title}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Завършени етапи: {summary.totalCompletedCount} от {teamMissions.length}
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400">Време и дата</div>
            <div className="mt-1 font-mono-tabular text-2xl font-bold text-white">
              {formatTimeMMSS(state.totalTimeSeconds)}
            </div>
            <div className="mt-1 text-xs text-slate-400">{todayFormatted}</div>
          </div>
        </div>

        <div className="pt-8 space-y-4">
          <p className="text-base text-slate-200 leading-relaxed">
            Поздравления! Ти премина през всички глави на Академията, победи Фантома и възстанови
            сигурността в Cyber City.
          </p>

          {earnedBadgeTitles.length > 0 && (
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Присъдени отличия ({earnedBadgeTitles.length}):
              </div>
              <div className="text-sm text-cyan-200 leading-relaxed">
                {earnedBadgeTitles.join(' · ')}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
