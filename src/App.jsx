import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import GameScreen from './components/GameScreen';
import ReportScreen from './components/ReportScreen';
import { LEVELS } from './data/levels';

function App() {
  const [phase, setPhase] = useState(() => {
    return localStorage.getItem('triage_phase') || 'INTRO';
  });
  const [levelIndex, setLevelIndex] = useState(() => {
    const saved = localStorage.getItem('triage_level_index');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lastScore, setLastScore] = useState(() => {
    const saved = localStorage.getItem('triage_last_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('triage_phase', phase);
  }, [phase]);

  useEffect(() => {
    localStorage.setItem('triage_level_index', String(levelIndex));
  }, [levelIndex]);

  useEffect(() => {
    localStorage.setItem('triage_last_score', String(lastScore));
  }, [lastScore]);

  const startLevel = () => setPhase('GAME');

  const handleLevelComplete = (finalScore) => {
    setLastScore(finalScore);
    setPhase('REPORT');
  };

  const nextLevel = () => {
    if (levelIndex + 1 >= LEVELS.length) {
      setPhase('END');
      localStorage.removeItem('triage_level_index');
      localStorage.removeItem('triage_last_score');
      localStorage.removeItem('triage_phase');
    } else {
      setLevelIndex(prev => prev + 1);
      setPhase('GAME');
    }
  };

  const resetProgress = () => {
    localStorage.clear();
    setPhase('INTRO');
    setLevelIndex(0);
    setLastScore(0);
  };

  return (
    <div className="h-full w-full max-w-md mx-auto relative shadow-2xl overflow-hidden glass-panel">
      <div className="game-background"></div>
      
      {/* Dynamic residency reset helper button in Intro */}
      {phase === 'INTRO' && levelIndex > 0 && (
        <button 
          onClick={resetProgress}
          className="absolute top-4 right-4 z-50 bg-slate-950/80 hover:bg-slate-900 border border-rose-500/30 hover:border-rose-500 text-rose-400 font-mono text-[8px] font-bold px-2.5 py-1.5 rounded-full transition-all active:scale-95 shadow-md"
        >
          🗑️ REINICIAR R1
        </button>
      )}

      {phase === 'INTRO' && (
        <IntroScreen onStart={startLevel} />
      )}

      {phase === 'GAME' && (
        <GameScreen
          key={levelIndex}
          levelData={LEVELS[levelIndex]}
          onLevelComplete={handleLevelComplete}
        />
      )}

      {phase === 'REPORT' && (
        <ReportScreen
          level={LEVELS[levelIndex]}
          score={lastScore}
          onNext={nextLevel}
        />
      )}

      {phase === 'END' && (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center anim-pop">
          <div className="text-6xl mb-6 animate-bounce">🎓</div>
          <h1 className="text-3xl font-bold neon-text text-purple-400 mb-4">¡RESIDENCIA COMPLETADA!</h1>
          <p className="mb-8 text-slate-300 text-sm leading-relaxed">
            Has sobrevivido a todas las guardias, alimentado tu cuerpo y mantenido tu cordura (casi).
          </p>
          <div className="glass p-4 mb-8 w-full border border-cyan-500/20">
            <p className="text-cyan-300 hud-font text-xs">Próxima meta: <br />Sobrevivir al R2 en el Instituto Nacional.</p>
          </div>
          <button 
            onClick={resetProgress} 
            className="btn-premium btn-blue w-full py-4 text-sm font-black"
          >
            VOLVER A EMPEZAR LA RESIDENCIA
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
