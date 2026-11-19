import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, KeyRound, Search, Users, User } from 'lucide-react';
import { AvatarCodename, DifficultyLevel, PlayMode } from '../types/game';
import { TEAMS } from '../data/teamMissions';
import { getDifficultyConfig } from '../utils/gameEngine';
import { ResilientImage } from './ResilientImage';

interface OnboardingViewProps {
  initialName: string;
  initialPartnerName: string;
  initialPlayMode: PlayMode;
  initialDifficulty: DifficultyLevel;
  initialCodename: AvatarCodename;
  onRegister: (
    name: string,
    partnerName: string,
    playMode: PlayMode,
    difficulty: DifficultyLevel,
    codename: AvatarCodename
  ) => void;
}

const CITY_IMAGE = '/src/assets/images/cyber_city_skyline_1794674511788.jpg';
const DEX_PORTRAIT = '/src/assets/images/detective_dex_avatar_1794674513530.jpg';

const DIFFICULTIES: DifficultyLevel[] = ['easy', 'medium', 'expert'];

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  initialName,
  initialPartnerName,
  initialPlayMode,
  initialDifficulty,
  initialCodename,
  onRegister,
}) => {
  const [name, setName] = useState(initialName);
  const [partnerName, setPartnerName] = useState(initialPartnerName);
  const [playMode, setPlayMode] = useState<PlayMode>(initialPlayMode);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialDifficulty);
  const [codename, setCodename] = useState<AvatarCodename>(initialCodename);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = name.trim();
    if (cleaned.length < 2) {
      setErrorMsg('Въведи име или псевдоним на главния детектив (поне 2 символа).');
      return;
    }
    if (playMode === 'duo' && partnerName.trim().length < 2) {
      setErrorMsg('Въведи име на втория детектив за екипния режим.');
      return;
    }
    setErrorMsg('');
    onRegister(cleaned, partnerName.trim(), playMode, difficulty, codename);
  };

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between panel-surface rounded-2xl p-7 lg:p-10">
          <div>
            <div className="text-xs font-medium text-cyan-300 tracking-wide">
              Детективска академия „Cyber City“ · 12 нива · 3 бонуса · Финален бос
            </div>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight text-white">
              Операция „Безопасен интернет“: Пътят до Легендарен детектив
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Премини през трите глави на академията, разкрий тайни досиета, събери до 1000 точки и
              победи мистериозния злодей Фантома, който застрашава Cyber City.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {/* Play Mode Switch */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">
                Режим на игра
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlayMode('solo')}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold border transition-all ${
                    playMode === 'solo'
                      ? 'bg-cyan-500/15 border-cyan-400 text-white'
                      : 'bg-[#081022] border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <User className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span>Един детектив</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlayMode('duo')}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold border transition-all ${
                    playMode === 'duo'
                      ? 'bg-violet-500/20 border-violet-400 text-white'
                      : 'bg-[#081022] border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <Users className="w-4 h-4 text-violet-300 shrink-0" />
                  <span>Екип (2-ма играчи)</span>
                </button>
              </div>
            </div>

            <div className={`grid grid-cols-1 ${playMode === 'duo' ? 'sm:grid-cols-2' : ''} gap-4`}>
              <div>
                <label
                  htmlFor="detective-name"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  {playMode === 'duo' ? 'Детектив 1 (име или псевдоним)' : 'Твоето детективско име'}
                </label>
                <input
                  id="detective-name"
                  type="text"
                  maxLength={28}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Напр. Алекс"
                  className="w-full rounded-xl bg-[#070D1D] border border-slate-700 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {playMode === 'duo' && (
                <div>
                  <label
                    htmlFor="partner-name"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Детектив 2 (партньор в екипа)
                  </label>
                  <input
                    id="partner-name"
                    type="text"
                    maxLength={28}
                    value={partnerName}
                    onChange={(e) => {
                      setPartnerName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Напр. Мария"
                    className="w-full rounded-xl bg-[#070D1D] border border-slate-700 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {errorMsg && (
              <p className="text-xs font-medium text-rose-400" role="alert">
                {errorMsg}
              </p>
            )}

            {/* Difficulty Selection */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">
                Степен на трудност
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {DIFFICULTIES.map((lvl) => {
                  const cfg = getDifficultyConfig(lvl);
                  const active = difficulty === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDifficulty(lvl)}
                      className={`rounded-xl p-3 text-left border transition-all ${
                        active
                          ? 'bg-cyan-500/15 border-cyan-400 text-white'
                          : 'bg-[#081022] border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-display text-sm font-bold">{cfg.label}</div>
                      <div className="mt-0.5 text-[11px] text-slate-400 leading-snug">
                        Грешка: -{cfg.mistakePenalty} т. · Подсказка: -{cfg.hintPenalty} т. · Блиц: {cfg.blitzSeconds}с
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Team Selection */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">
                Избери своя отбор (всеки отбор има различни мисии)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TEAMS.map((item) => {
                  const selected = codename === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCodename(item.id)}
                      className={`rounded-xl p-3 text-left transition-all border ${
                        selected
                          ? 'bg-cyan-500/15 border-cyan-400 text-white'
                          : 'bg-[#081022] border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold">{item.teamTitle}</span>
                        <span className="text-[11px] font-medium text-cyan-300">
                          {item.operationName}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-slate-300">{item.specialty}</div>
                      <div className="mt-0.5 text-[11px] text-slate-400 leading-snug">
                        {item.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-all whitespace-nowrap shrink-0"
              >
                <span>Влез в Академията</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">
                Напредъкът се пази автоматично в браузъра
              </span>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-slate-800">
            <ResilientImage
              src={CITY_IMAGE}
              alt="Нощен изглед на дигиталния град Cyber City"
              className="w-full h-full object-cover"
              fallbackLabel="Cyber City"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/45 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-xs font-medium text-cyan-300">
                Скала до 1000 точки
              </div>
              <div className="mt-1 font-display text-xl font-semibold text-white">
                3 глави · 12 нива · 3 бонуса · Среща с Фантома
              </div>
            </div>
          </div>

          <div className="panel-surface rounded-2xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-cyan-500/30">
              <ResilientImage
                src={DEX_PORTRAIT}
                alt="Детективски помощник ДЕКС"
                className="w-full h-full object-cover"
                fallbackLabel="ДЕКС"
              />
            </div>
            <div>
              <div className="font-display text-sm font-semibold text-white">
                ДЕКС · Наставник в Академията
              </div>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                „Всяка глава отключва нови киберзаплахи — от измамни писма до Wi-Fi капани и AI
                фалшификати. Избери трудност и да тръгваме!“
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="panel-surface rounded-xl p-5">
          <div className="flex items-center gap-2.5 text-cyan-300 font-display text-sm font-semibold">
            <Search className="w-4 h-4 shrink-0" />
            <span>Различни игрови механики</span>
          </div>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Маркиране на имейли, влачене на карти, сканиране на Wi-Fi, одит на файлове, 60-секунден
            блиц и подреждане на защитни стъпки.
          </p>
        </div>

        <div className="panel-surface rounded-xl p-5">
          <div className="flex items-center gap-2.5 text-violet-300 font-display text-sm font-semibold">
            <KeyRound className="w-4 h-4 shrink-0" />
            <span>Тайна мисия и Бонус стая</span>
          </div>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Отключвай специални предизвикателства чрез постиженията си и изграждай картата на
            спасените райони в града.
          </p>
        </div>

        <div className="panel-surface rounded-xl p-5">
          <div className="flex items-center gap-2.5 text-emerald-300 font-display text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Среща с Фантома</span>
          </div>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Завърши трите глави и пробий 10-слойния щит на Фантома за титлата Легендарен
            кибердетектив.
          </p>
        </div>
      </div>
    </main>
  );
};
