import { useEffect, useState } from 'react';
import { mealEmoji } from '../data/levels';
import { playError, playSuccess, playTone } from '../utils/audio';

const TICK_MS = 1100;

export default function ReportScreen({ level, score, isLast, onNext, onRetry }) {
  const success = score >= level.goal;
  const [shown, setShown] = useState(0);
  const [stamped, setStamped] = useState(false);

  // Contador animado del puntaje y después el sello.
  useEffect(() => {
    let raf;
    let stampTimer;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min((now - t0) / TICK_MS, 1);
      const eased = 1 - (1 - k) ** 2;
      setShown(Math.round(eased * Math.max(score, 0)));
      if (k < 1) {
        raf = requestAnimationFrame(step);
      } else {
        stampTimer = setTimeout(() => {
          setStamped(true);
          (success ? playSuccess : playError)();
        }, 150);
      }
    };
    playTone(600, 'triangle', 0.05, 0.03);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(stampTimer);
    };
  }, [score, success]);

  const [levelTag, levelTitle] = level.name.split(': ');

  return (
    <main className="flex-1 flex flex-col justify-center px-6 py-8 gap-6 anim-rise">
      <header className="text-center">
        <p className="eyebrow">{levelTag} · Reporte</p>
        <h1 className="text-2xl font-black mt-1">{levelTitle}</h1>
      </header>

      <section className="panel p-5">
        <dl className="mono text-sm space-y-2 pb-4 border-b border-white/10">
          <div className="flex justify-between">
            <dt className="text-slate-400">Balance</dt>
            <dd className={`font-bold ${success ? 'text-alta' : 'text-uce'}`}>${score < 0 ? score : shown}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400">Meta</dt>
            <dd className="font-bold text-obs">${level.goal}</dd>
          </div>
        </dl>

        <div className="text-center pt-5 min-h-[190px]">
          <span
            className={`mono inline-block text-base font-black tracking-[0.2em] px-3 py-1 mb-4 border-[3px] rounded-lg -rotate-6 ${
              success ? 'text-alta border-alta' : 'text-uce border-uce'
            } ${stamped ? 'anim-stamp' : 'invisible'}`}
          >
            {success ? 'APROBADO' : 'REPROBADO'}
          </span>
          {success ? (
            <>
              <div className="text-6xl mb-3">{mealEmoji(level.meal)}</div>
              <p className="font-extrabold text-lg">{level.meal.replace(/^\S+\s/, '')}</p>
              <p className="text-xs text-obs mt-3 rounded-lg bg-obs/10 border border-obs/30 px-3 py-2 inline-block">{level.premio}</p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-3 grayscale opacity-60">🦗</div>
              <p className="font-extrabold text-lg text-slate-300">Galletas saladas</p>
              <p className="text-sm text-slate-400 mt-2">No alcanzaste la meta. Toca cenar lo que quede en el comedor.</p>
            </>
          )}
        </div>

      </section>

      <div className="space-y-3">
        <button onClick={onNext} className="btn btn-primary w-full text-lg">
          {isLast ? 'Graduación 🎓' : 'Siguiente guardia'}
        </button>
        {!success && (
          <button onClick={onRetry} className="btn btn-ghost w-full text-sm">
            Repetir esta guardia
          </button>
        )}
      </div>
    </main>
  );
}
