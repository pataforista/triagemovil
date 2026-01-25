import React, { useState } from 'react';
import InteractiveOrb from './ui/InteractiveOrb';
import VolumetricBeam from './ui/VolumetricBeam';
import TutorialModal from './TutorialModal';
import { playPop, playSuccess } from '../utils/audio';

export default function IntroScreen({ onStart }) {
    const [showTutorial, setShowTutorial] = useState(false);

    const handleStart = () => {
        playSuccess();
        onStart();
    };

    const handleTutorial = () => {
        playPop();
        setShowTutorial(true);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center anim-pop relative overflow-hidden">
            <VolumetricBeam />

            {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}

            <div className="mb-6 z-10">
                <InteractiveOrb hue={200} hoverIntensity={0.5} />
            </div>

            <h1 className="text-4xl font-bold neon-text text-cyan-400 mb-2 z-10 relative">TRIAGE TYCOON</h1>
            <h2 className="text-lg text-blue-300 mb-6 tracking-widest hud-font z-10 relative">RESIDENTE EDITION</h2>

            <div className="glass p-6 mb-8 max-w-sm text-left border-l-4 border-l-cyan-500 z-10 relative bg-slate-900/60 backdrop-blur-md">
                <p className="mb-4 text-slate-300 leading-relaxed text-sm">
                    Bienvenido, <strong>Residente de 1er año</strong>.
                    Tu beca no ha llegado y tienes hambre. Tu única esperanza de cenar bien es hacer triages rápidos y precisos.
                </p>

                <button
                    onClick={handleTutorial}
                    className="w-full mb-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold py-2 px-4 rounded border border-cyan-500/30 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                    <span>📚</span> LEER MANUAL DE OPERACIONES
                </button>
            </div>

            <button
                onClick={handleStart}
                className="btn-premium btn-blue w-full max-w-sm py-4 text-xl z-10 relative overflow-hidden group hover:scale-105 transition-transform"
            >
                <span className="relative z-10">INICIAR GUARDIA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
        </div>
    );
}
