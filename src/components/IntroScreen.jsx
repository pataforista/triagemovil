import React, { useState } from 'react';
import InteractiveOrb from './ui/InteractiveOrb';
import VolumetricBeam from './ui/VolumetricBeam';
import { playPop, playSuccess } from '../utils/audio';
import { vibratePop, vibrateSuccess } from '../utils/haptics';
import TutorialModal from './TutorialModal';

export default function IntroScreen({ onStart }) {
    const [showTutorial, setShowTutorial] = useState(false);

    const handleStart = () => {
        playSuccess();
        vibrateSuccess();
        onStart();
    };

    const handleTutorial = () => {
        playPop();
        vibratePop();
        setShowTutorial(true);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center anim-pop relative overflow-hidden bg-slate-950">
            {/* Background Layer */}
            <VolumetricBeam 
                color="#0f172a" 
                fogIntensity={0.2} 
                flowSpeed={0.2} 
                className="opacity-40" 
            />
            <div className="game-background" />

            {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}

            {/* Logo/Icon Area */}
            <div className="mb-10 z-10 relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full animate-pulse" />
                <div className="relative group hover:scale-105 transition-transform duration-500">
                    <InteractiveOrb hue={200} hoverIntensity={0.6} />
                </div>
            </div>

            <div className="z-10 relative w-full max-w-sm">
                <h1 className="text-5xl font-black neon-text tracking-tighter italic mb-4">
                    TRIAGE <span className="block text-cyan-400 not-italic font-black">TYCOON</span>
                </h1>
                
                <div className="hud-pill inline-block mb-10 border-cyan-500/30">
                    <span className="text-[10px] text-cyan-300 font-black uppercase tracking-[0.4em]">Resident Edition v2.0</span>
                </div>

                <div className="glass card-vibrant p-8 mb-10 text-left border-t-4 border-t-cyan-500 shadow-2xl">
                    <p className="mb-6 text-slate-100 font-medium leading-relaxed">
                        Bienvenido, <strong className="text-cyan-300">R1</strong>. 🩺<br/>
                        Tu beca no ha llegado y tienes hambre. Tu única esperanza de cenar es hacer triages rápidos y precisos.
                    </p>

                    <button
                        onClick={handleTutorial}
                        className="w-full bg-white/5 hover:bg-white/10 text-cyan-300 text-[10px] font-black py-3 px-4 rounded-xl border border-cyan-500/20 uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                        <span>📚</span> MANUAL DE OPERACIONES
                    </button>
                </div>

                <button
                    onClick={handleStart}
                    className="btn-premium btn-blue w-full py-5 text-2xl z-10 relative group hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.4)]"
                >
                    <span className="relative z-10 tracking-tighter font-black">INICIAR GUARDIA ⮕</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
            </div>
        </div>
    );
}
