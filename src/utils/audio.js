// Motor de sonido sintetizado con Web Audio API: sin archivos que descargar.
// Todo pasa por un bus maestro (ganancia + compresor) para que el volumen sea parejo
// y el botón de silencio actúe en un solo punto.

const MUTE_KEY = 'triage_muted';

let ctx = null;
let master = null;
let noiseBuffer = null;
let muted = (() => {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
})();

const getCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.9;
    master.connect(comp).connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
};

export const isMuted = () => muted;

export const setMuted = (value) => {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? '1' : '0');
  } catch { /* sin almacenamiento */ }
  if (master && ctx) master.gain.setTargetAtTime(value ? 0 : 0.9, ctx.currentTime, 0.02);
};

/** Tono con envolvente ataque/caída. `glide` desliza la frecuencia hasta ese valor. */
export const playTone = (freq, type = 'sine', duration = 0.15, vol = 0.1, delay = 0, glide = null) => {
  const ac = getCtx();
  if (!ac || muted) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glide) osc.frequency.exponentialRampToValueAtTime(glide, t0 + duration);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(master);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
};

/** Ráfaga de ruido filtrado: golpes, sellos, "whoosh". */
const playNoise = (duration, vol, filterFreq, type = 'lowpass', delay = 0) => {
  const ac = getCtx();
  if (!ac || muted) return;
  if (!noiseBuffer) {
    noiseBuffer = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const t0 = ac.currentTime + delay;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer;
  const filter = ac.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = filterFreq;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  src.connect(filter).connect(gain).connect(master);
  src.start(t0);
  src.stop(t0 + duration);
};

// ---------- Interfaz ----------
export const playPop = () => playTone(900, 'triangle', 0.05, 0.05);

// ---------- Decisiones ----------
/** Acierto: dos notas ascendentes; con racha, cada acierto sube medio tono (tope una octava). */
export const playCorrect = (combo = 1) => {
  const step = Math.min(combo - 1, 12);
  const base = 523.25 * 2 ** (step / 12);
  playTone(base, 'sine', 0.12, 0.09);
  playTone(base * 1.5, 'sine', 0.18, 0.08, 0.07);
  if (combo >= 3) playTone(base * 2, 'triangle', 0.2, 0.04, 0.12);
};

/** Error: zumbido grave que cae. */
export const playError = () => {
  playTone(220, 'sawtooth', 0.28, 0.06, 0, 110);
  playTone(110, 'square', 0.22, 0.03, 0.02);
};

/** Error crítico (mandar a casa a un paciente grave): alarma de monitor, tres pitidos. */
export const playCritical = () => {
  [0, 0.16, 0.32].forEach((d) => playTone(988, 'square', 0.11, 0.05, d));
  playTone(180, 'sawtooth', 0.4, 0.05, 0, 90);
};

/** Cama llena: golpe sordo. */
export const playBlocked = () => {
  playNoise(0.18, 0.25, 300);
  playTone(140, 'sine', 0.18, 0.12, 0, 70);
};

/** Llega un paciente: "ding-dong" suave de recepción. */
export const playArrival = () => {
  playTone(1320, 'sine', 0.09, 0.025);
  playTone(990, 'sine', 0.14, 0.025, 0.09);
};

/** Pitido de monitor cardíaco; `urgent` lo vuelve más agudo y fuerte. */
export const playMonitor = (urgent = false) => playTone(urgent ? 1245 : 880, 'sine', 0.07, urgent ? 0.05 : 0.012);

/** Meta de la guardia alcanzada. */
export const playGoal = () => {
  [659.25, 783.99, 987.77, 1318.5].forEach((f, i) => playTone(f, 'triangle', 0.18, 0.06, i * 0.06));
};

/** Piedad: suspiro descendente con "whoosh". */
export const playBreath = () => {
  playNoise(0.6, 0.06, 900, 'bandpass');
  playTone(440, 'sine', 0.5, 0.03, 0, 330);
};

/** Fin del reloj: silbato. */
export const playWhistle = () => {
  playTone(1760, 'sine', 0.35, 0.06, 0, 1480);
  playTone(2093, 'sine', 0.25, 0.03, 0.05);
};

// ---------- Reporte ----------
export const playTick = () => playTone(1400, 'triangle', 0.02, 0.02);

export const playStamp = () => {
  playNoise(0.25, 0.4, 500);
  playTone(90, 'sine', 0.25, 0.2, 0, 50);
};

export const playSuccess = () => {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    playTone(f, 'sine', 0.35, 0.07, i * 0.08);
    playTone(f * 2, 'triangle', 0.2, 0.015, i * 0.08);
  });
};

/** Fracaso: "wah-wah" descendente de trombón triste. */
export const playFail = () => {
  [392, 370, 349, 330].forEach((f, i) => playTone(f, 'sawtooth', i === 3 ? 0.6 : 0.22, 0.035, i * 0.22, i === 3 ? 300 : null));
};
