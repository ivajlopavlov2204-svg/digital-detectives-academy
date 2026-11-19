import React, { useState } from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface DexAssistantProps {
  missionTitle: string;
  hints: string[];
  hintPenalty: number;
  hintsUsedCount: number;
  onUseHint: () => void;
  contextualTip?: string | null;
}

const DEX_PORTRAIT = '/src/assets/images/detective_dex_avatar_1794674513530.jpg';

export const DexAssistant: React.FC<DexAssistantProps> = ({
  missionTitle,
  hints,
  hintPenalty,
  hintsUsedCount,
  onUseHint,
  contextualTip,
}) => {
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleNextHint = () => {
    onUseHint();
    if (!showHint) {
      setShowHint(true);
      setHintIndex(0);
    } else {
      setHintIndex((prev) => (prev + 1) % hints.length);
    }
  };

  return (
    <aside className="panel-surface rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-cyan-500/30">
          <ResilientImage
            src={DEX_PORTRAIT}
            alt="Виртуален помощник ДЕКС"
            className="w-full h-full object-cover"
            fallbackLabel="ДЕКС"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-base font-semibold text-white">
              Помощник ДЕКС
            </h3>
            <span className="text-xs text-cyan-300 font-medium font-mono-tabular">
              {hintsUsedCount > 0 ? `Подсказки: ${hintsUsedCount}` : 'На линия'}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Случай: {missionTitle}
          </p>
        </div>
      </div>

      {contextualTip && (
        <div className="mt-4 rounded-lg bg-cyan-950/40 border border-cyan-500/25 p-3.5 text-sm text-cyan-100 leading-relaxed">
          {contextualTip}
        </div>
      )}

      {showHint && hints.length > 0 && (
        <div className="mt-4 rounded-lg bg-[#091124] border border-violet-500/30 p-3.5">
          <div className="text-xs font-semibold text-violet-300 mb-1">
            Подсказка {hintIndex + 1} от {hints.length}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {hints[hintIndex]}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleNextHint}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-cyan-200 bg-[#132142] border border-cyan-500/30 rounded-lg hover:bg-[#192b54] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          <HelpCircle className="w-4 h-4 text-cyan-300" />
          <span>
            {showHint ? `Следваща (-${hintPenalty} т.)` : `Подсказка (-${hintPenalty} т.)`}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {showHint && (
          <button
            type="button"
            onClick={() => setShowHint(false)}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors whitespace-nowrap shrink-0"
          >
            Скрий
          </button>
        )}
      </div>
    </aside>
  );
};
