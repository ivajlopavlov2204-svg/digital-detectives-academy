import React, { useState } from 'react';
import { QrCode, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface Bonus3Props {
  onAddPoints: (pts: number) => void;
  onRecordMistake: () => void;
  onUpdateDexTip: (tip: string) => void;
  onSound: (kind: 'click' | 'clue' | 'success' | 'error') => void;
  onComplete: (finalNotes?: string) => void;
}

export const Bonus3SecretMission: React.FC<Bonus3Props> = ({
  onAddPoints,
  onRecordMistake,
  onUpdateDexTip,
  onSound,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleAnswer = (isCorrect: boolean, text: string) => {
    if (solved) return;
    if (isCorrect) {
      setSolved(true);
      onAddPoints(25);
      onSound('clue');
      setFeedback({ type: 'success', text: `+25 точки · ${text}` });
    } else {
      onRecordMistake();
      onSound('error');
      setFeedback({ type: 'error', text });
    }
  };

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <>
          <div className="rounded-2xl bg-[#070D1D] border border-violet-500/40 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-violet-300">
              <QrCode className="w-4 h-4" />
              <span>Тайна мисия · Етап 1 от 2</span>
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              На спирката в Cyber City има залепен лист с QR код: „Сканирай за безплатен градски билет и подарък!“. Забелязваш, че лепенката е сложена върху друг плакат. Какво правиш?
            </h2>

            <div className="space-y-3 pt-2">
              {[
                {
                  text: 'Сканирам веднага — QR кодовете не могат да съдържат опасни линкове.',
                  ok: false,
                  msg: 'QR кодът просто съхранява уеб адрес! Подменена лепенка може да отвори фишинг сайт.',
                },
                {
                  text: 'НЕ сканирам подозрителния стикер, проверявам официалното приложение на градския транспорт и предупреждавам възрастен.',
                  ok: true,
                  msg: 'Точно! Физически подменените QR кодове са реален фишинг капан („quishing“).',
                },
              ].map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(opt.ok, opt.msg)}
                  className={`w-full text-left rounded-xl p-4 text-sm border transition-all ${
                    solved && opt.ok
                      ? 'bg-emerald-950/40 border-emerald-400/55 text-emerald-100'
                      : 'bg-[#0C162F] border-slate-700 hover:border-cyan-400 text-slate-200'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          {feedback && (
            <div
              className={`rounded-xl p-4 border text-sm flex items-start gap-3 ${
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

          {solved && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  setSolved(false);
                  setFeedback(null);
                  onSound('click');
                  onUpdateDexTip('Провери разрешенията на приложението, преди да го инсталираш.');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300"
              >
                <span>Следваща следа</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="rounded-2xl bg-[#070D1D] border border-violet-500/40 p-6 space-y-4">
            <div className="text-xs font-semibold text-violet-300">
              Тайна мисия · Етап 2 от 2
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              Инсталираш обикновено приложение „Фенерче“ на телефона, но то иска достъп до: Контакти, SMS съобщения, Камера и Местоположение. Как реагираш?
            </h2>

            <div className="space-y-3 pt-2">
              {[
                {
                  text: 'Отказвам инсталацията! Едно фенерче няма нужда от контактите и SMS-ите ми — това е опит за шпиониране.',
                  ok: true,
                  msg: 'Блестящо! Проверката на разрешенията пази телефона ти от скрити шпионски приложения.',
                },
                {
                  text: 'Натискам „Разреши всички“, за да тръгне по-бързо.',
                  ok: false,
                  msg: 'Излишните разрешения позволяват на приложението да чете личните ти съобщения и кодове.',
                },
              ].map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(opt.ok, opt.msg)}
                  className={`w-full text-left rounded-xl p-4 text-sm border transition-all ${
                    solved && opt.ok
                      ? 'bg-emerald-950/40 border-emerald-400/55 text-emerald-100'
                      : 'bg-[#0C162F] border-slate-700 hover:border-cyan-400 text-slate-200'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          {feedback && (
            <div
              className={`rounded-xl p-4 border text-sm flex items-start gap-3 ${
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

          {solved && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onComplete('Неутрализирани подменени QR кодове и опасни мобилни разрешения.')
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300"
              >
                <span>Завърши Тайната мисия</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
