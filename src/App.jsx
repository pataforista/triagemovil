import { useEffect, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import GameScreen from './components/GameScreen';
import ReportScreen from './components/ReportScreen';
import EndScreen from './components/EndScreen';
import { LEVELS } from './data/levels';

// Progreso guardado en localStorage. Puede fallar (modo privado), por eso el try/catch.
const KEYS = { phase: 'triage_phase', level: 'triage_level_index', score: 'triage_last_score' };
const PHASES = ['INTRO', 'GAME', 'REPORT', 'END'];

const load = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, String(value));
  } catch { /* sin almacenamiento: el juego sigue funcionando */ }
};

const clampLevel = (n) => (Number.isInteger(n) && n >= 0 && n < LEVELS.length ? n : 0);

export default function App() {
  const [phase, setPhase] = useState(() => {
    const p = load(KEYS.phase, 'INTRO');
    return PHASES.includes(p) ? p : 'INTRO';
  });
  const [levelIndex, setLevelIndex] = useState(() => clampLevel(parseInt(load(KEYS.level, '0'), 10)));
  const [lastScore, setLastScore] = useState(() => parseInt(load(KEYS.score, '0'), 10) || 0);

  useEffect(() => save(KEYS.phase, phase), [phase]);
  useEffect(() => save(KEYS.level, levelIndex), [levelIndex]);
  useEffect(() => save(KEYS.score, lastScore), [lastScore]);

  const level = LEVELS[levelIndex];

  const finishLevel = (score) => {
    setLastScore(score);
    setPhase('REPORT');
  };

  const nextLevel = () => {
    if (levelIndex + 1 >= LEVELS.length) {
      setPhase('END');
    } else {
      setLevelIndex((i) => i + 1);
      setPhase('GAME');
    }
  };

  const resetProgress = () => {
    if (!window.confirm('¿Seguro que quieres borrar todo tu progreso?')) return;
    setLevelIndex(0);
    setLastScore(0);
    setPhase('INTRO');
  };

  return (
    <>
      <div className="app-bg" aria-hidden="true" />
      {phase === 'INTRO' && (
        <IntroScreen
          level={level}
          hasProgress={levelIndex > 0}
          onStart={() => setPhase('GAME')}
          onReset={resetProgress}
        />
      )}
      {phase === 'GAME' && <GameScreen key={level.id} level={level} onFinish={finishLevel} />}
      {phase === 'REPORT' && (
        <ReportScreen
          level={level}
          score={lastScore}
          isLast={levelIndex === LEVELS.length - 1}
          onNext={nextLevel}
          onRetry={() => setPhase('GAME')}
        />
      )}
      {phase === 'END' && <EndScreen onRestart={resetProgress} />}
    </>
  );
}
