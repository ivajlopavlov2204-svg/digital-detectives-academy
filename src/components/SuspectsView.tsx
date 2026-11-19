import React from 'react';
import { Lock, AlertTriangle } from 'lucide-react';
import { DetectiveState } from '../types/game';
import { SUSPECTS } from '../data/missionsData';
import { ResilientImage } from './ResilientImage';

interface SuspectsViewProps {
  state: DetectiveState;
}

const PHANTOM_AVATAR = '/src/assets/images/suspect_phantom_avatar_1794674520798.jpg';

export const SuspectsView: React.FC<SuspectsViewProps> = ({ state }) => {
  return (
    <main className="mx-auto max-w-[1280px] px-6 py-8 lg:py-10 space-y-8">
      <div>
        <div className="text-xs font-medium text-violet-300">
          Сектор „Криминален анализ“ · Cyber City
        </div>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
          Досиета на заподозрените
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl">
          С напредването през трите глави разкриваш ключовите профили и дигиталните им следи в
          мрежата на града.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SUSPECTS.map((suspect) => {
          const isUnlocked = state.unlockedMainIndex >= suspect.unlockAtMainIndex;

          return (
            <article
              key={suspect.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between ${
                isUnlocked
                  ? 'panel-surface'
                  : 'bg-[#080E1E]/80 border-slate-800/70 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-violet-500/30 bg-[#0A1022]">
                    {isUnlocked ? (
                      <ResilientImage
                        src={PHANTOM_AVATAR}
                        alt={`Портрет на ${suspect.name}`}
                        className="w-full h-full object-cover"
                        fallbackLabel={suspect.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Lock className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-medium text-violet-300">
                      {isUnlocked
                        ? `${suspect.role} · ${suspect.riskLevel}`
                        : `Отключва се в Ниво ${suspect.unlockAtMainIndex + 1}`}
                    </div>
                    <h2 className="mt-1 font-display text-lg font-bold text-white">
                      {isUnlocked ? suspect.name : 'Неизвестен субект'}
                    </h2>
                    <div className="mt-0.5 text-xs text-slate-400">
                      {isUnlocked ? suspect.alias : 'Данните все още се дешифрират'}
                    </div>
                  </div>
                </div>

                {isUnlocked ? (
                  <>
                    <p className="mt-5 text-sm text-slate-300 leading-relaxed">
                      {suspect.summary}
                    </p>
                    <div className="mt-5 pt-4 border-t border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-2.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Открити дигитални следи</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {suspect.digitalFootprint.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p className="mt-5 text-sm text-slate-400 leading-relaxed">
                    Продължи с нивата в Академията, за да събереш достатъчно доказателства и да
                    отвориш това досие.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
