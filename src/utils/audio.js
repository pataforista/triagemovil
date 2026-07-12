// Simple Procedural Audio Synthesizer
// Generates arcade-style sounds using Web Audio API

let ctx = null;

const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            ctx = new AudioContextClass();
        }
    }
    if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
    }
    return ctx;
};

/**
 * Play a synthesized tone with an optional scheduled start delay.
 * Scheduling directly in Web Audio (currentTime) is infinitely more precise than setTimeout.
 */
export const playTone = (freq, type, duration, vol = 0.1, delay = 0, pitchEnd = null) => {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const start = now + delay;
    const end = start + duration;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (pitchEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(pitchEnd, end);
    }

    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, end);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(start);
    osc.stop(end);
};

export const playSuccess = () => {
    // Elegant arpeggiated happy major chord (C5, E5, G5, C6) scheduled precisely
    const vol = 0.08;
    playTone(523.25, 'sine', 0.15, vol, 0.0);      // C5
    playTone(659.25, 'sine', 0.15, vol, 0.04);     // E5
    playTone(783.99, 'sine', 0.15, vol, 0.08);     // G5
    playTone(1046.50, 'sine', 0.25, vol, 0.12);    // C6
};

export const playError = () => {
    // Low flatlining buzz with pitch decay (feels clinical and heavy)
    playTone(180, 'sawtooth', 0.35, 0.1, 0, 80);
    playTone(176, 'triangle', 0.35, 0.1, 0.02, 75);
};

export const playPop = () => {
    // Crisp high-passed click/tap
    playTone(850, 'triangle', 0.04, 0.06);
};

export const playAlarm = () => {
    // Clinical emergency telemetry beep (double high alert tone)
    const vol = 0.05;
    playTone(987.77, 'sine', 0.12, vol, 0.0);      // B5
    playTone(987.77, 'sine', 0.12, vol, 0.18);     // B5 double tap
};

let ambientOsc = null;
let ambientGain = null;
let lfo = null;

export const playAmbient = () => {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;
    
    stopAmbient(); // in case it's already running

    ambientOsc = audioCtx.createOscillator();
    ambientOsc.type = 'sine';
    ambientOsc.frequency.value = 65; // low heartbeat frequency

    lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 1.33; // ~80 BPM (80/60 = 1.33 Hz)

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 10; // modulation depth

    lfo.connect(lfoGain);
    lfoGain.connect(ambientOsc.frequency);

    ambientGain = audioCtx.createGain();
    ambientGain.gain.value = 0.015; // very low volume

    ambientOsc.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);

    ambientOsc.start();
    lfo.start();
};

export const stopAmbient = () => {
    if (ambientOsc) {
        try { ambientOsc.stop(); } catch(e) {}
        ambientOsc.disconnect();
        ambientOsc = null;
    }
    if (lfo) {
        try { lfo.stop(); } catch(e) {}
        lfo.disconnect();
        lfo = null;
    }
    if (ambientGain) {
        ambientGain.disconnect();
        ambientGain = null;
    }
};

