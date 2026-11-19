import React from 'react';
import { ActiveView } from '../types/game';

interface TopBarProps {
  activeView: ActiveView;
  isRegistered: boolean;
  isBossCompleted: boolean;
  onNavigate: (view: ActiveView) => void;
  onPrimaryAction: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  isRegistered,
  isBossCompleted,
  onNavigate,
  onPrimaryAction,
}) => {
  const navItems: { id: ActiveView; label: string }[] = [
    { id: 'hq', label: 'Щаб' },
    { id: 'dossier', label: 'Дневник' },
    { id: 'suspects', label: 'Заподозрени' },
    { id: 'rules', label: 'Правила' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#060B18]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4">
        <button
          type="button"
          onClick={() => onNavigate(isRegistered ? 'hq' : 'onboarding')}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          Digital Detectives
        </button>

        {isRegistered ? (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`whitespace-nowrap shrink-0 pb-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
                    isActive
                      ? 'text-cyan-300 border-b border-cyan-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        ) : (
          <div className="hidden md:block text-sm text-slate-400 whitespace-nowrap shrink-0">
            Детективска академия · Операция „Безопасен интернет“
          </div>
        )}

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="px-4 py-2 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            {!isRegistered
              ? 'Регистрация'
              : isBossCompleted
                ? 'Сертификат'
                : 'Следващо ниво'}
          </button>
        </div>
      </div>

      {isRegistered && (
        <nav className="flex md:hidden items-center justify-around border-t border-slate-800/70 px-4 py-2 text-xs font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-1.5 whitespace-nowrap shrink-0 ${
                activeView === item.id ? 'text-cyan-300 font-semibold' : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
