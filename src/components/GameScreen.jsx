import { useEffect, useRef, useState } from 'react';
import PatientCard from './PatientCard';
import Supervisor from './Supervisor';
import SoundToggle from './SoundToggle';
import Ward from './Ward';
import { generatePatient, resetPatientHistory } from '../data/patients';
import { RULES, admitToBed, evaluateDecision, tickBeds } from '../game/rules';
import {
  playArrival,
  playBlocked,
  playBreath,
  playCorrect,
  playCritical,
  playError,
  playGoal,
  playMonitor,
  playPop,
  playWhistle,
} from '../utils/audio';
import { vibrateError, vibratePop, vibrateSuccess } from '../utils/haptics';

const MAX_WAITING = 10;
const EXIT_MS = 300; // duración de la animación de salida de la tarjeta
const URGENT_SECONDS = 10;

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
  const [delta, setDelta] = useState(null); // { id, value } puntos flotantes
  const [goalReached, setGoalReached] = useState(false);

  const over = timeLeft <= 0;
  const running = !paused && !over;
  const urgent = running && timeLeft <= URGENT_SECONDS;
  // Pacientes que siguen en espera (sin contar las tarjetas que están saliendo).
  const queue = waiting.filter((p) => !p.exiting);
  const queueSize = useRef(queue.length);
  useEffect(() => {
    queueSize.current = queue.length;
  });

  // Reloj: 1 tick por segundo para la guardia y las camas.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
      setBeds((b) => ({ OBS: tickBeds(b.OBS), UCE: tickBeds(b.UCE) }));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // Pitido de monitor: tenue cada 2 s; agudo cada segundo en los últimos 10 s.
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= URGENT_SECONDS) playMonitor(true);
    else if (timeLeft % 2 === 0) playMonitor(false);
  }, [timeLeft, running]);

  // Llegada de pacientes.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (queueSize.current >= MAX_WAITING) return;
      const patient = generatePatient(level.id);
      queueSize.current += 1;
      playArrival();
      setWaiting((w) => [...w, patient]);
    }, level.spawnRate);
    return () => clearInterval(id);
  }, [running, level.id, level.spawnRate]);

  // Fin de la guardia: silbato y aviso al padre una sola vez (con una pausa breve para el efecto).
  const finished = useRef(false);
  useEffect(() => {
    if (!over || finished.current) return;
    finished.current = true;
    playWhistle();
    const t = setTimeout(() => onFinish(score), 700);
    return () => clearTimeout(t);
  }, [over, score, onFinish]);

  // Pausa automática si el usuario cambia de app o bloquea el teléfono.
  useEffect(() => {
    const onHide = () => document.hidden && setPaused(true);
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, []);

  const notify = (msg, tone) => setToast({ id: Date.now(), msg, tone });

  const handleAssign = (patient, decision) => {
    if (!running || patient.exiting) return;

    // La tarjeta se marca como "saliendo" para animarla y se retira al terminar.
    setWaiting((w) => w.map((p) => (p.id === patient.id ? { ...p, exiting: decision } : p)));
    setTimeout(() => setWaiting((w) => w.filter((p) => p.id !== patient.id)), EXIT_MS);

    const r = evaluateDecision(patient, decision);
    let points = r.points;
    let nextCombo = 0;
    const messages = [];

    if (r.correct) {
      nextCombo = combo + 1;
      playCorrect(nextCombo);
      vibratePop();
      setErrorStreak(0);
      messages.push(`${nextCombo >= RULES.comboThreshold ? `Racha x${nextCombo}` : 'Acierto'} +${r.points}${r.fast ? ' ⚡' : ''}`);
      setReaction((s) => ({ id: s.id + 1, mood: nextCombo >= RULES.comboThreshold ? 'COMBO' : 'GOOD' }));
    } else {
      (r.undertriage ? playCritical : playError)();
      vibrateError();
      messages.push(`${r.undertriage ? '¡Error crítico! ' : ''}Era ${r.expected}: ${patient.diag} (${r.points})`);
      setReaction((s) => ({ id: s.id + 1, mood: 'BAD' }));
      const streak = errorStreak + 1;
      if (streak >= RULES.pityErrors) {
        setTimeLeft((t) => t + RULES.pitySeconds);
        setTimeout(playBreath, 350);
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
        points -= penalty;
        nextCombo = 0;
        setTimeout(playBlocked, 120);
        messages.push(`${decision} llena (−${penalty})`);
      }
    }

    const newScore = score + points;
    if (!goalReached && newScore >= level.goal) {
      setGoalReached(true);
      vibrateSuccess();
      setTimeout(playGoal, 250);
      messages.push('¡Meta alcanzada! 🍽️');
    }

    setScore(newScore);
    setDelta({ id: Date.now(), value: points });
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
      {/* La cabecera tiembla en cada error (se remonta con otra key; no tiene estado propio). */}
      <header
        key={reaction.mood === 'BAD' ? `hdr-${reaction.id}` : 'hdr'}
        className={`px-4 pt-3 pb-3 border-b border-white/5 bg-slate-950/70 backdrop-blur-md z-20 ${reaction.mood === 'BAD' ? 'anim-shake' : ''}`}
      >
        <div className="flex items-center gap-2">
          <button onClick={togglePause} className="btn btn-ghost w-11 min-h-[44px] px-0" aria-label={paused ? 'Reanudar' : 'Pausar'}>
            {paused ? '▶' : '❚❚'}
          </button>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">{levelTag}</p>
            <h1 className="font-extrabold leading-tight truncate">{levelTitle}</h1>
          </div>
          <div
            key={urgent ? `t-${timeLeft}` : "t"}
            className={`mono text-2xl font-bold tabular-nums ${urgent ? 'text-uce anim-bump' : 'text-slate-100'}`}
          >
            {timeLeft}s
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemax={level.goal}>
            <div
              className={`h-full transition-[width] duration-500 ease-out ${goalReached ? 'bar-goal' : 'bg-gradient-to-r from-sky-500 to-alta'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="relative mono text-sm font-bold tabular-nums">
            <span key={`score-${score}`} className={score ? 'anim-bump' : ''}>${score}</span>
            <span className="text-slate-500">/{level.goal}</span>
            {delta && (
              <span key={`delta-${delta.id}`} className={`float-points text-sm ${delta.value >= 0 ? 'text-alta' : 'text-uce'}`}>
                {delta.value >= 0 ? `+${delta.value}` : delta.value}
              </span>
            )}
          </span>
          {combo > 1 && (
            <span key={`combo-${combo}`} className="text-sm font-black text-orange-400 anim-pop">🔥x{combo}</span>
          )}
        </div>
      </header>

      <Supervisor key={`sup-${reaction.id}`} mood={reaction.mood} />
      {toast && (
        <div key={`toast-${toast.id}`} className={`toast bottom-32 ${toast.tone === 'ok' ? 'text-alta' : 'text-uce'}`} role="status">
          {toast.msg}
        </div>
      )}
      {reaction.id > 0 && (
        <div key={`flash-${reaction.id}`} className={`screen-flash ${reaction.mood === 'BAD' ? 'screen-flash-bad' : 'screen-flash-ok'}`} />
      )}
      {urgent && <div className="urgent-vignette" />}

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar px-4 pt-3">
        <p className="eyebrow mb-2">Sala de espera · {queue.length}</p>
        {waiting.map((p) => (
          <PatientCard key={p.id} patient={p} onAssign={handleAssign} disabled={!running} />
        ))}
        {waiting.length === 0 && (
          <p className="text-center text-slate-500 py-16 anim-rise">Sala vacía. Disfruta el silencio… dura poco.</p>
        )}
      </main>

      <footer className="grid grid-cols-2 gap-2 p-3 border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
        <Ward area="OBS" beds={beds.OBS} />
        <Ward area="UCE" beds={beds.UCE} />
      </footer>

      {paused && (
        <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 px-8 anim-rise">
          <h2 className="text-3xl font-black tracking-widest">EN PAUSA</h2>
          <p className="text-slate-400 text-sm">La sala de espera también se detuvo.</p>
          <button onClick={togglePause} className="btn btn-primary w-full max-w-xs">Reanudar guardia</button>
          <SoundToggle />
        </div>
      )}
    </div>
  );
}
