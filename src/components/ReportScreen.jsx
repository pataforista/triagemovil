import React, { useState, useEffect } from 'react';
import { getMealEmoji } from '../data/levels';
import VolumetricBeam from './ui/VolumetricBeam';
import { playSuccess, playError, playTone } from '../utils/audio';

export default function ReportScreen({ level, score, onNext }) {
    const success = score >= level.goal;
    const [currentScore, setCurrentScore] = useState(0);
    const [showStamp, setShowStamp] = useState(false);

    // Number ticker logic for the balance/score
    useEffect(() => {
        let start = 0;
        const end = score;
        if (end <= 0) {
            // Trigger stamp early if score is 0
            const timer = setTimeout(() => {
                setShowStamp(true);
                playError();
            }, 500);
            return () => clearTimeout(timer);
        }

        const duration = 1200; // Ticker duration in ms
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quadratic progress for smooth deceleration
            const easeOutProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.round(easeOutProgress * end);

            if (frame >= totalFrames) {
                setCurrentScore(end);
                clearInterval(timer);
                
                // Show Stamp after ticker completes
                setTimeout(() => {
                    setShowStamp(true);
                    if (success) {
                        playSuccess();
                    } else {
                        playError();
                    }
                }, 200);
            } else {
                setCurrentScore(currentVal);
                // Subtle ticker click sound
                if (frame % 3 === 0) {
                    playTone(600, 'triangle', 0.01, 0.02);
                }
            }
        }, frameRate);

        return () => clearInterval(timer);
    }, [score, success]);

    const getThemeColor = (levelId) => {
        switch (levelId) {
            case 1: return "#2dd4bf"; // Teal
            case 2: return "#a78bfa"; // Purple
            case 3: return "#3b82f6"; // Blue
            case 4: return "#06b6d4"; // Cyan
            case 5: return "#f59e0b"; // Gold/Amber
            case 6: return "#f43f5e"; // Pink/Rose
            case 7: return "#0d9488"; // Dark Teal
            case 8: return "#d946ef"; // Fuchsia
            default: return "#22d3ee";
        }
    };

    const themeColor = getThemeColor(level.id);

    return (
        <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-8 anim-pop relative overflow-hidden">
            {/* Ambient Background matching Level Theme */}
            <VolumetricBeam 
                color={themeColor} 
                fogIntensity={0.25} 
                flowSpeed={0.2} 
                className="opacity-45" 
            />
            <div className="game-background" />

            <div className="z-10 relative w-full max-w-sm flex flex-col items-center">
                <h2 className="text-4xl font-black neon-text mb-2 tracking-tighter italic">REPORTE DE GUARDIA</h2>
                
                <div className="hud-pill mb-10 border-white/10 bg-slate-950/60 shadow-[0_0_10px_rgba(255,255,255,0.02)]">
                    <span className="text-[9px] text-white/50 font-black uppercase tracking-[0.25em]">{level.name}</span>
                </div>

                {/* Report Card container */}
                <div className="glass card-vibrant p-8 w-full mb-10 shadow-2xl relative overflow-hidden border border-white/15">
                    {/* Glowing colored header bar */}
                    <div 
                        className="absolute top-0 left-0 w-full h-1.5 transition-all duration-500" 
                        style={{ 
                            background: `linear-gradient(to right, ${themeColor}, #10b981)`,
                            boxShadow: `0 2px 10px ${themeColor}`
                        }} 
                    />
                    
                    <div className="flex justify-between mb-4 text-[10px] hud-font">
                        <span className="text-slate-400 uppercase font-bold tracking-wider">Balance Ganado:</span>
                        <span className={`text-sm font-black transition-all duration-300 ${success ? "text-emerald-400" : "text-rose-400"}`}>
                            ${currentScore}
                        </span>
                    </div>
                    <div className="flex justify-between mb-6 text-[10px] hud-font border-b border-white/15 pb-4">
                        <span className="text-slate-400 uppercase font-bold tracking-wider">Cena (Meta Objetivo):</span>
                        <span className="text-yellow-400 font-black text-sm">${level.goal}</span>
                    </div>

                    <div className="text-center py-2 relative">
                        <div className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.3em] mb-5">RECOMPENSA DEVENGADA</div>
                        
                        {success ? (
                            <div className="anim-pop">
                                <div className="text-7xl mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] animate-float">
                                    {getMealEmoji(level.meal)}
                                </div>
                                <div className="text-xl font-extrabold text-white mb-2 tracking-tight">{level.meal}</div>
                                <div className="text-[9px] text-yellow-300 border border-yellow-500/40 bg-yellow-500/10 rounded-xl px-4 py-2 inline-block mb-4 font-black uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.15)] leading-none">
                                    {level.premio}
                                </div>
                                <div className="text-[10px] text-emerald-400 font-bold block italic opacity-75">¡Excelente guardia, Doctor! Buen provecho.</div>
                            </div>
                        ) : (
                            <div className="anim-pop">
                                <div className="text-7xl mb-4 grayscale opacity-40 animate-[pulse_2s_infinite]">🦗</div>
                                <div className="text-xl font-extrabold text-slate-400 mb-2 tracking-tight">Galletas Saladas</div>
                                <p className="text-[10px] text-rose-400 font-bold leading-relaxed px-4 opacity-80">
                                    No alcanzaste la meta de hoy. Te toca cenar galletas resecas del comedor de empleados... si es que queda alguna.
                                </p>
                            </div>
                        )}

                        {/* Stomped Holographic Stamp Overlay */}
                        {showStamp && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                <div 
                                    className={`stomp-animation text-2xl font-black px-6 py-3 border-4 rounded-2xl hud-font bg-slate-950/90 shadow-2xl tracking-[0.2em] uppercase ${
                                        success 
                                            ? 'text-emerald-400 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)]' 
                                            : 'text-rose-400 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.6)]'
                                    }`}
                                >
                                    {success ? 'APROBADO' : 'REPROBADO'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button 
                    onClick={onNext} 
                    className="btn-premium btn-blue w-full py-4 text-lg group hover:scale-[1.02] transition-all shadow-[0_15px_40px_rgba(37,99,235,0.35)]"
                >
                    <span className="relative z-10 font-black tracking-tight">
                        {level.id === 8 ? "GRADUACIÓN FINAL" : "SIGUIENTE GUARDIA ⮕"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
            </div>
        </div>
    );
}
