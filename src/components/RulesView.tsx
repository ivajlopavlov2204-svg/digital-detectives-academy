import React from 'react';
import { Shield, Cpu, CheckSquare, Sparkles } from 'lucide-react';

export const RulesView: React.FC = () => {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-8 lg:py-10 space-y-8">
      <div>
        <div className="text-xs font-medium text-cyan-300">
          Наръчник на Детективската академия · 1000-точкова система
        </div>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
          Правила на Академията, глави и алгоритмична логика
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
          Академията съчетава 12 основни киберинцидента в 3 глави, 3 специални предизвикателства и
          финален сблъсък с Фантома.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="panel-surface rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2.5 text-cyan-300 font-display text-base font-bold">
            <Shield className="w-5 h-5" />
            <span>Точкуване (общо 1000 точки)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
            <li>• 12 основни нива × 50 точки = 600 точки</li>
            <li>• 3 специални бонус предизвикателства × 50 точки = 150 точки</li>
            <li>• Финален бос „Среща с Фантома“ (10 слоя) = 250 точки</li>
            <li>• При допусната грешка се отнемат точки според трудността (-2, -3 или -5 т.; при Боса -5, -8 или -12 т.)</li>
            <li>• Подсказките от ДЕКС помагат, но намаляват възможния бонус (-2, -5 или -8 т.)</li>
          </ul>
        </section>

        <section className="panel-surface rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2.5 text-violet-300 font-display text-base font-bold">
            <CheckSquare className="w-5 h-5" />
            <span>Звания и глави</span>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
            <li>• Глава I (Нива 1–4): Млад детектив</li>
            <li>• Глава II (Нива 5–8): Опитен изследовател</li>
            <li>• Глава III (Нива 9–12): Майстор детектив</li>
            <li>• Победа над Фантома (700+ т.): ЛЕГЕНДАРЕН КИБЕРДЕТЕКТИВ</li>
          </ul>
        </section>
      </div>

      <section className="panel-surface rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-300 font-display text-base font-bold">
          <Cpu className="w-5 h-5" />
          <span>Как работи програмната логика</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="rounded-xl bg-[#080F22] border border-slate-800 p-4">
            <div className="font-semibold text-white mb-1">Случайно разбъркване</div>
            <p className="leading-relaxed">
              Алгоритъмът Fisher-Yates подрежда карти, имейли и блиц въпроси по нов начин при
              всяко преиграване.
            </p>
          </div>
          <div className="rounded-xl bg-[#080F22] border border-slate-800 p-4">
            <div className="font-semibold text-white mb-1">Цикли (for) и проверки (if/else)</div>
            <p className="leading-relaxed">
              Оценяват силата на паролите символ по символ, изчисляват сумарните точки и отключват
              бонуси и тайни мисии.
            </p>
          </div>
          <div className="rounded-xl bg-[#080F22] border border-slate-800 p-4">
            <div className="font-semibold text-white mb-1">Режим за 2-ма играчи и localStorage</div>
            <p className="leading-relaxed">
              Редува ходовете в екипен режим и пази целия дневник на разследването локално в
              браузъра.
            </p>
          </div>
        </div>
      </section>

      <section className="panel-surface rounded-2xl p-6 flex items-start gap-4">
        <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
        <div className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-white">Важно правило за истинския интернет:</strong> При
          кибертормоз, опит за измама или откраднат профил винаги се обръщай към родител, учител
          или към Националната линия за безопасен интернет на телефон{' '}
          <span className="font-mono-tabular text-cyan-300 font-semibold">124 123</span> (safenet.bg).
        </div>
      </section>
    </main>
  );
};
