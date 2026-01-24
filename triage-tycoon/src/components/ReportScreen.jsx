import React from 'react';
import { getMealEmoji } from '../data/levels';

export default function ReportScreen({ level, score, onNext }) {
    const success = score >= level.goal;

    return (
        <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 anim-pop">
            <h2 className="text-3xl font-bold neon-text mb-2 text-white">REPORTE DE GUARDIA</h2>
            <div className="text-lg text-slate-400 mb-8">{level.name} Finalizado</div>

            <div className="glass p-8 w-full max-w-xs mb-8">
                <div className="flex justify-between mb-3 text-sm">
                    <span>Dinero acumulado:</span>
                    <span className={success ? "text-green-400 font-bold" : "text-red-400 font-bold"}>${score}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                    <span>Costo de la cena:</span>
                    <span className="text-yellow-400 font-bold">${level.goal}</span>
                </div>
                <div className="h-px bg-white/10 mb-4"></div>

                <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">TU CENA HOY</div>
                    {success ? (
                        <div className="anim-pop">
                            <div className="text-6xl mb-2">{getMealEmoji(level.meal)}</div>
                            <div className="text-xl font-bold text-cyan-300">{level.meal}</div>
                            <div className="text-xs text-green-400 mt-1">¡Te lo mereces, doc!</div>
                        </div>
                    ) : (
                        <div className="anim-pop">
                            <div className="text-6xl mb-2">🦗</div>
                            <div className="text-xl font-bold text-slate-500">Galletas saladas</div>
                            <div className="text-xs text-red-400 mt-1">Inténtalo en la siguiente guardia...</div>
                        </div>
                    )}
                </div>
            </div>

            <button onClick={onNext} className="btn-premium btn-green w-full max-w-xs py-3 text-lg">
                {level.id === 5 ? "VER FINAL" : "SIGUIENTE GUARDIA ➡"}
            </button>
        </div>
    );
}
