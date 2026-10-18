// Sonidos sintetizados con Web Audio API (sin archivos de audio que descargar).

let ctx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    ctx = new AudioContextClass();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
};

/** Tono simple con retraso opcional, programado sobre el reloj de audio. */
export const playTone = (freq, type, duration, vol = 0.1, delay = 0, pitchEnd = null) => {
  const audioCtx = getAudioContext();
  if (!audioCtx) return;

  const start = audioCtx.currentTime + delay;
  const end = start + duration;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (pitchEnd !== null) osc.frequency.exponentialRampToValueAtTime(pitchEnd, end);
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.001, end);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start(start);
  osc.stop(end);
};

export const playSuccess = () => {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, 'sine', i === 3 ? 0.25 : 0.15, 0.08, i * 0.04));
};

export const playError = () => {
  playTone(180, 'sawtooth', 0.35, 0.1, 0, 80);
  playTone(176, 'triangle', 0.35, 0.1, 0.02, 75);
};

export const playPop = () => playTone(850, 'triangle', 0.04, 0.06);

// Latido de fondo: oscilador grave modulado a ~80 lpm.
let ambient = null;

export const stopAmbient = () => {
  if (!ambient) return;
  ambient.nodes.forEach((n) => {
    try { n.stop?.(); } catch { /* ya detenido */ }
    n.disconnect();
  });
  ambient = null;
};

export const playAmbient = () => {
  const audioCtx = getAudioContext();
  if (!audioCtx) return;
  stopAmbient();

  const osc = audioCtx.createOscillator();
  osc.frequency.value = 65;
  const lfo = audioCtx.createOscillator();
  lfo.frequency.value = 1.33;
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 10;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.015;

  lfo.connect(lfoGain).connect(osc.frequency);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  lfo.start();
  ambient = { nodes: [osc, lfo, lfoGain, gain] };
};
