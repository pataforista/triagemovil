import React from 'react';
import { getMealEmoji } from '../data/levels';

export default function ReportScreen({ level, score, onNext }) {
    const success = score >= level.goal;

    return (
        <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-8 anim-pop">
            <div className="game-background" />

            <div className="z-10 relative w-full max-w-sm flex flex-col items-center">
                <h2 className="text-4xl font-black neon-text mb-2 tracking-tighter italic">REPORTE</h2>
                <div className="hud-pill mb-10 border-white/10">
                    <span className="text-[10px] text-white/50 font-black uppercase tracking-[0.3em]">{level.name} Finalizado</span>
                </div>

                <div className="glass card-vibrant p-8 w-full mb-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-500" />
                    
                    <div className="flex justify-between mb-4 text-xs hud-font">
                        <span className="text-slate-400 uppercase font-bold">Balance de Guardia:</span>
                        <span className={success ? "text-green-400 font-black" : "text-rose-400 font-black"}>${score}</span>
                    </div>
                    <div className="flex justify-between mb-6 text-xs hud-font">
                        <span className="text-slate-400 uppercase font-bold">Costo de la Cena:</span>
                        <span className="text-yellow-400 font-black">${level.goal}</span>
                    </div>

                    <div className="h-px bg-white/10 mb-8" />

                    <div className="text-center">
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mb-6">RECOMPENSA DEVENGADA</div>
                        {success ? (
                            <div className="anim-pop">
                                <div className="text-7xl mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-float">
                                    {getMealEmoji(level.meal)}
                                </div>
                                <div className="text-2xl font-black text-white mb-2 tracking-tighter">{level.meal}</div>
                                <div className="text-[10px] text-yellow-300 border border-yellow-500/40 bg-yellow-500/10 rounded-xl px-4 py-2 inline-block mb-6 font-black uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                                    {level.premio}
                                </div>
                                <div className="text-xs text-green-400 font-bold block italic opacity-70">¡Buen provecho, R1!</div>
                            </div>
                        ) : (
                            <div className="anim-pop">
                                <div className="text-7xl mb-4 grayscale opacity-50">🦗</div>
                                <div className="text-2xl font-black text-slate-500 mb-2 tracking-tighter">Galletas Saladas</div>
                                <p className="text-xs text-rose-400 font-bold leading-relaxed px-4">
                                    No alcanzaste la meta. Te toca cenar lo que sobró en el comedor de empleados... si es que sobró algo.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <button onClick={onNext} className="btn-premium btn-blue w-full py-5 text-xl group hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
                    <span className="relative z-10 font-black tracking-tighter">
                        {level.id === 8 ? "GRADUACIÓN FINAL" : "SIGUIENTE GUARDIA ⮕"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
            </div>
        </div>
    );
}
