import React, { useMemo, useState } from 'react';
import { GripVertical, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AvatarCodename } from '../../types/game';
import { DataPrivacyCategory, PersonalDataCard } from '../../data/advancedLevelsData';
import { getLevel6Cards } from '../../data/teamMissions';
import { shuffleArray } from '../../utils/gameEngine';

interface Level6Props {
  team: AvatarCodename;
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

const CATEGORIES: { id: DataPrivacyCategory; title: string; subtitle: string }[] = [
  {
    id: 'careful',
    title: 'Може да се споделя внимателно',
    subtitle: 'Общи интереси без лични координати',
  },
  {
    id: 'trusted',
    title: 'Само с доверени хора при нужда',
    subtitle: 'Семейство, учители и официални платформи',
  },
  {
    id: 'never',
    title: 'Никога не се публикува публично',
    subtitle: 'Критични тайни и адресни данни',
  },
];

export const Level6PersonalData: React.FC<Level6Props> = ({
  team,
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const cards = useMemo(() => shuffleArray(getLevel6Cards(team)), [team]);
  const [placedMap, setPlacedMap] = useState<Partial<Record<string, DataPrivacyCategory>>>({});
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const remainingCards = cards.filter((c) => !placedMap[c.id]);
  const allPlaced = remainingCards.length === 0;

  const tryPlaceCard = (card: PersonalDataCard, targetCategory: DataPrivacyCategory) => {
    if (placedMap[card.id]) return;

    if (card.category === targetCategory) {
      const nextCount = Object.keys(placedMap).length + 1;
      // 7 карти общо: първите 6 носят по 7 т., 7-мата носи 8 т. -> общо 50 точки
      const pts = nextCount === cards.length ? 8 : 7;
      onAddPoints(pts);
      onSound('clue');
      setPlacedMap((prev) => ({ ...prev, [card.id]: targetCategory }));
      setSelectedCardId(null);
      setDraggedCardId(null);
      setFeedback({
        type: 'success',
        text: `+${pts} точки · Вярно за „${card.label}“! ${card.explanation}`,
      });
      onUpdateDexTip('Чудесна преценка! Продължи със следващата карта.');
    } else {
      onRecordMistake();
      onSound('error');
      setSelectedCardId(null);
      setDraggedCardId(null);
      setFeedback({
        type: 'error',
        text: `Помисли пак за „${card.label}“: ${card.explanation}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-cyan-300">
            Интерактивно сортиране (Влачене или докосване)
          </div>
          <h2 className="mt-1 font-display text-xl font-bold text-white">
            Разпредели 7-те карти с данни в правилната категория
          </h2>
        </div>
        <div className="text-xs font-mono-tabular text-slate-300">
          Разпределени: {Object.keys(placedMap).length} / {cards.length}
        </div>
      </div>

      {/* Unplaced Cards Tray */}
      {!allPlaced && (
        <div className="rounded-2xl bg-[#070D1D] border border-slate-800 p-5 space-y-3">
          <div className="text-xs text-slate-400">
            Провлачи карта в категория по-долу или я избери с клик и после натисни категорията:
          </div>
          <div className="flex flex-wrap gap-3">
            {remainingCards.map((card) => {
              const isSelected = selectedCardId === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  draggable
                  onDragStart={() => setDraggedCardId(card.id)}
                  onDragEnd={() => setDraggedCardId(null)}
                  onClick={() => {
                    setSelectedCardId(isSelected ? null : card.id);
                    onSound('click');
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border cursor-grab active:cursor-grabbing transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                      : 'bg-[#111D3B] text-white border-slate-700 hover:border-cyan-400/60'
                  }`}
                >
                  <GripVertical className="w-4 h-4 opacity-70" />
                  <span>{card.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3 Target Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const cardsInBucket = cards.filter((c) => placedMap[c.id] === cat.id);
          const canAcceptTap = Boolean(selectedCardId);

          return (
            <div
              key={cat.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const idToPlace = draggedCardId || selectedCardId;
                const cardObj = cards.find((c) => c.id === idToPlace);
                if (cardObj) tryPlaceCard(cardObj, cat.id);
              }}
              onClick={() => {
                if (!selectedCardId) return;
                const cardObj = cards.find((c) => c.id === selectedCardId);
                if (cardObj) tryPlaceCard(cardObj, cat.id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && selectedCardId) {
                  e.preventDefault();
                  const cardObj = cards.find((c) => c.id === selectedCardId);
                  if (cardObj) tryPlaceCard(cardObj, cat.id);
                }
              }}
              className={`rounded-2xl p-5 border min-h-[210px] flex flex-col justify-between transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                canAcceptTap
                  ? 'bg-[#0E1A36] border-cyan-400/60 hover:bg-[#132245]'
                  : 'bg-[#080F22] border-slate-800 hover:border-slate-600'
              }`}
            >
              <div>
                <h3 className="font-display text-sm font-bold text-white">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">{cat.subtitle}</p>

                <div className="mt-4 space-y-2">
                  {cardsInBucket.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg bg-emerald-950/40 border border-emerald-500/35 px-3 py-2 text-xs font-medium text-emerald-100 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {canAcceptTap && (
                <div className="mt-4 text-xs font-semibold text-cyan-300">
                  Натисни тук, за да поставиш избраната карта
                </div>
              )}
            </div>
          );
        })}
      </div>

      {feedback && (
        <div
          className={`rounded-xl p-4 border text-sm leading-relaxed flex items-start gap-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-400/45 text-emerald-100'
              : 'bg-rose-950/40 border-rose-400/45 text-rose-100'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {allPlaced && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              onSound('success');
              onComplete('Всички 7 категории лични данни са защитени правилно.');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Завърши Ниво 6</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
