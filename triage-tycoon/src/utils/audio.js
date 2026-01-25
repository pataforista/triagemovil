// Simple Procedural Audio Synthesizer
// Generates arcade-style sounds using Web Audio API

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const playTone = (freq, type, duration, vol = 0.1) => {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
};

export const playSuccess = () => {
    // High pitched happy chord
    playTone(523.25, 'sine', 0.1, 0.1); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.1, 0.1), 50); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.3, 0.1), 100); // G5
};

export const playError = () => {
    // Low buzzy square
    playTone(150, 'sawtooth', 0.3, 0.15);
    setTimeout(() => playTone(140, 'sawtooth', 0.3, 0.15), 100);
};

export const playPop = () => {
    // UI click
    playTone(800, 'triangle', 0.05, 0.05);
};

export const playAlarm = () => {
    // Siren
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.2);

    gain.gain.value = 0.05;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
};
