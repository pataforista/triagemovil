import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import GameScreen from './components/GameScreen';
import ReportScreen from './components/ReportScreen';
import { LEVELS } from './data/levels';

function App() {
  const [phase, setPhase] = useState('INTRO'); // INTRO, GAME, REPORT, END
  const [levelIndex, setLevelIndex] = useState(0);
  const [lastScore, setLastScore] = useState(0);

  const startLevel = () => setPhase('GAME');

  const handleLevelComplete = (finalScore) => {
    setLastScore(finalScore);
    setPhase('REPORT');
  };

  const nextLevel = () => {
    if (levelIndex + 1 >= LEVELS.length) {
      setPhase('END');
    } else {
      setLevelIndex(prev => prev + 1);
      setPhase('GAME');
    }
  };

  return (
    <div className="h-full w-full max-w-md mx-auto relative shadow-2xl overflow-hidden glass-panel">
      <div className="game-background"></div>
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
          <p className="mb-8 text-slate-300">
            Has sobrevivido a todas las guardias, alimentado tu cuerpo y mantenido tu cordura (casi).
          </p>
          <div className="glass p-4 mb-8 w-full">
            <p className="text-cyan-300 hud-font text-sm">Próxima meta: <br />Sobrevivir al R2.</p>
          </div>
          <button onClick={() => window.location.reload()} className="btn-premium btn-slate w-full py-3">
            VOLVER A JUGAR
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
