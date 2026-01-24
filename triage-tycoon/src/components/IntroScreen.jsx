import React from 'react';

export default function IntroScreen({ onStart }) {
    return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center anim-pop">
            <div className="text-6xl mb-4 animate-float">🏥</div>
            <h1 className="text-4xl font-bold neon-text text-cyan-400 mb-2">TRIAGE TYCOON</h1>
            <h2 className="text-lg text-blue-300 mb-6 tracking-widest hud-font">RESIDENTE EDITION</h2>

            <div className="glass p-6 mb-8 max-w-sm text-left border-l-4 border-l-cyan-500">
                <p className="mb-4 text-slate-300 leading-relaxed text-sm">
                    Bienvenido, <strong>Residente de 1er año</strong>.
                    Tu beca no ha llegado y tienes hambre. Tu única esperanza de cenar bien es hacer triages rápidos y precisos.
                </p>
                <div className="space-y-2 text-xs text-slate-400 hud-font">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <strong>ALTA:</strong> Leves, somatización, quejosos.
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <strong>OBS:</strong> Urgencias reales pero estables.
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <strong>UCE:</strong> Peligro de vida o muy agresivos.
                    </div>
                </div>
            </div>

            <button onClick={onStart} className="btn-premium btn-blue w-full py-4 text-xl">
                INICIAR GUARDIA
            </button>
        </div>
    );
}
