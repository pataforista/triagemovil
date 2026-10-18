import { useState } from 'react';
import TutorialModal from './TutorialModal';
import { playPop, playSuccess } from '../utils/audio';
import { vibratePop, vibrateSuccess } from '../utils/haptics';

function EcgMark() {
  return (
    <svg viewBox="0 0 120 40" className="w-32 h-11 text-sky-400" aria-hidden="true">
      <path
        d="M0 22 H38 L46 8 L56 34 L64 4 L72 26 L78 22 H120"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function IntroScreen({ level, hasProgress, onStart, onReset }) {
  const [showTutorial, setShowTutorial] = useState(false);

  const start = () => {
    playSuccess();
    vibrateSuccess();
    onStart();
  };

  const openTutorial = () => {
    playPop();
    vibratePop();
    setShowTutorial(true);
  };

  return (
    <main className="flex-1 flex flex-col justify-center px-6 py-8 gap-8 anim-rise">
      <header className="flex flex-col items-center text-center gap-3">
        <div className="anim-beat"><EcgMark /></div>
        <h1 className="text-5xl font-black tracking-tight leading-none">
          Triage <span className="text-sky-400">Tycoon</span>
        </h1>
        <p className="eyebrow">Resident Life · Urgencias</p>
      </header>

      <section className="panel p-5 space-y-3">
        <p className="text-slate-200 leading-relaxed">
          Bienvenido, <strong className="text-sky-300">R1</strong>. Tu beca no ha llegado y tienes hambre.
          Clasifica bien a cada paciente para ganarte la cena.
        </p>
        <div className="flex gap-2 text-xs font-bold">
          <span className="flex-1 rounded-lg py-2 text-center bg-alta/10 text-alta">ALTA · casa</span>
          <span className="flex-1 rounded-lg py-2 text-center bg-obs/10 text-obs">OBS · vigilar</span>
          <span className="flex-1 rounded-lg py-2 text-center bg-uce/10 text-uce">UCE · choque</span>
        </div>
      </section>

      <div className="space-y-3">
        <button onClick={start} className="btn btn-primary w-full text-lg">
          {hasProgress ? `Continuar · ${level.name.split(':')[0]}` : 'Iniciar guardia'}
        </button>
        <button onClick={openTutorial} className="btn btn-ghost w-full text-sm">
          📚 Manual del residente
        </button>
        {hasProgress && (
          <button onClick={onReset} className="w-full text-xs font-bold text-rose-300/80 py-2">
            Reiniciar residencia
          </button>
        )}
      </div>

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </main>
  );
}
