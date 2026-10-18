import { useEffect, useRef, useState } from 'react';
import PatientCard from './PatientCard';
import Supervisor from './Supervisor';
import Ward from './Ward';
import { generatePatient, resetPatientHistory } from '../data/patients';
import { RULES, admitToBed, evaluateDecision, tickBeds } from '../game/rules';
import { playAmbient, playError, playPop, stopAmbient } from '../utils/audio';
import { vibrateError, vibratePop } from '../utils/haptics';

const MAX_WAITING = 10;

export default function GameScreen({ level, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(level.duration);
  const [score, setScore] = useState(0);
  const [waiting, setWaiting] = useState(() => {
    resetPatientHistory();
    return [generatePatient(level.id)];
  });
  const [beds, setBeds] = useState(() => ({
    OBS: Array(level.beds).fill(null),
    UCE: Array(level.uce).fill(null),
  }));
  const [combo, setCombo] = useState(0);
  const [errorStreak, setErrorStreak] = useState(0);
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState(null); // { id, msg, tone }
  const [reaction, setReaction] = useState({ id: 0, mood: 'START' });

  const over = timeLeft <= 0;
  const running = !paused && !over;

  // Sonido de fondo mientras la guardia corre.
  useEffect(() => {
    if (!running) return;
    playAmbient();
    return stopAmbient;
  }, [running]);

  // Reloj: 1 tick por segundo para la guardia y las camas.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
      setBeds((b) => ({ OBS: tickBeds(b.OBS), UCE: tickBeds(b.UCE) }));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // Llegada de pacientes.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setWaiting((w) => (w.length < MAX_WAITING ? [...w, generatePatient(level.id)] : w));
    }, level.spawnRate);
    return () => clearInterval(id);
  }, [running, level.id, level.spawnRate]);

  // Fin de la guardia: se avisa una sola vez.
  const finished = useRef(false);
  useEffect(() => {
    if (over && !finished.current) {
      finished.current = true;
      onFinish(score);
    }
  }, [over, score, onFinish]);

  // Pausa automática si el usuario cambia de app o bloquea el teléfono.
  useEffect(() => {
    const onHide = () => document.hidden && setPaused(true);
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, []);

  const notify = (msg, tone) => setToast({ id: Date.now(), msg, tone });

  const handleAssign = (patient, decision) => {
    if (!running) return;
    setWaiting((w) => w.filter((p) => p.id !== patient.id));

    const r = evaluateDecision(patient, decision);
    let delta = r.points;
    let nextCombo = 0;
    const messages = [];

    if (r.correct) {
      vibratePop();
      nextCombo = combo + 1;
      setErrorStreak(0);
      messages.push(`${nextCombo >= RULES.comboThreshold ? `Racha x${nextCombo}` : 'Acierto'} +${r.points}${r.fast ? ' ⚡' : ''}`);
      setReaction((s) => ({ id: s.id + 1, mood: nextCombo >= RULES.comboThreshold ? 'COMBO' : 'GOOD' }));
    } else {
      playError();
      vibrateError();
      messages.push(`${r.undertriage ? '¡Error crítico! ' : ''}Era ${r.expected}: ${patient.diag} (${r.points})`);
      setReaction((s) => ({ id: s.id + 1, mood: 'BAD' }));
      const streak = errorStreak + 1;
      if (streak >= RULES.pityErrors) {
        setTimeLeft((t) => t + RULES.pitySeconds);
        messages.push(`Respira hondo (+${RULES.pitySeconds} s)`);
        setErrorStreak(0);
      } else {
        setErrorStreak(streak);
      }
    }

    if (decision !== 'ALTA') {
      const next = admitToBed(beds[decision], patient, decision);
      if (next) {
        setBeds((b) => ({ ...b, [decision]: next }));
      } else {
        const penalty = decision === 'OBS' ? RULES.fullObsPenalty : RULES.fullUcePenalty;
        delta -= penalty;
        nextCombo = 0;
        messages.push(`${decision} llena (−${penalty})`);
      }
    }

    setScore((s) => s + delta);
    setCombo(nextCombo);
    notify(messages.join(' · '), r.correct ? 'ok' : 'bad');
  };

  const togglePause = () => {
    playPop();
    setPaused((p) => !p);
  };

  const progress = Math.max(0, Math.min((score / level.goal) * 100, 100));
  const [levelTag, levelTitle] = level.name.split(': ');

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <header className="px-4 pt-3 pb-3 border-b border-white/5 bg-slate-950/70 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button onClick={togglePause} className="btn btn-ghost w-11 min-h-[44px] px-0" aria-label={paused ? 'Reanudar' : 'Pausar'}>
            {paused ? '▶' : '❚❚'}
          </button>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">{levelTag}</p>
            <h1 className="font-extrabold leading-tight truncate">{levelTitle}</h1>
          </div>
          <div className={`mono text-2xl font-bold tabular-nums ${timeLeft <= 15 ? 'text-uce animate-pulse' : 'text-slate-100'}`}>
            {timeLeft}s
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemax={level.goal}>
            <div className="h-full bg-gradient-to-r from-sky-500 to-alta transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="mono text-sm font-bold tabular-nums">
            ${score}<span className="text-slate-500">/{level.goal}</span>
          </span>
          {combo > 1 && <span className="text-sm font-black text-orange-400">🔥x{combo}</span>}
        </div>
      </header>

      <Supervisor key={reaction.id} mood={reaction.mood} />
      {toast && (
        <div key={toast.id} className={`toast top-32 ${toast.tone === 'ok' ? 'text-alta' : 'text-uce'}`} role="status">
          {toast.msg}
        </div>
      )}

      <main className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-3">
        <p className="eyebrow mb-2">Sala de espera · {waiting.length}</p>
        {waiting.map((p) => (
          <PatientCard key={p.id} patient={p} onAssign={handleAssign} disabled={!running} />
        ))}
        {waiting.length === 0 && (
          <p className="text-center text-slate-500 py-16">Sala vacía. Disfruta el silencio… dura poco.</p>
        )}
      </main>

      <footer className="grid grid-cols-2 gap-2 p-3 border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
        <Ward area="OBS" beds={beds.OBS} />
        <Ward area="UCE" beds={beds.UCE} />
      </footer>

      {paused && (
        <div className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 px-8">
          <h2 className="text-3xl font-black tracking-widest">EN PAUSA</h2>
          <p className="text-slate-400 text-sm">La sala de espera también se detuvo.</p>
          <button onClick={togglePause} className="btn btn-primary w-full max-w-xs">Reanudar guardia</button>
        </div>
      )}
    </div>
  );
}
