import React from 'react';
import ElectricBorder from './ui/ElectricBorder';

export default function TutorialModal({ onClose }) {
    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 anim-pop"
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
                <ElectricBorder color="#22d3ee" className="w-full max-h-[90vh] overflow-hidden bg-slate-900">
                    <div className="flex flex-col h-full bg-slate-900 p-6 overflow-y-auto custom-scrollbar">

                        <h2 className="text-2xl font-bold text-center text-cyan-400 mb-6 neon-text">MANUAL DE RESIDENTE</h2>

                    <div className="space-y-6 text-sm text-slate-300">

                        <section>
                            <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-1">1. Triage Básico</h3>
                            <p className="mb-2">Tu trabajo es asignar pacientes a su área correcta basándote en su gravedad.</p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-xl">🟢</span>
                                    <div>
                                        <strong className="text-green-400">ALTA:</strong> Pacientes leves o "quejosos".
                                        <div className="text-xs text-slate-500">Ej: Resfriado, dolor de muela, dramas familiares.</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-xl">🟡</span>
                                    <div>
                                        <strong className="text-yellow-400">OBS (Observación):</strong> Urgencias reales pero estables.
                                        <div className="text-xs text-slate-500">Ej: Dolor abdominal fuerte, crisis de asma leve, intoxicaciones estables.</div>
                                        <span className="text-[10px] bg-yellow-900 text-yellow-200 px-1 rounded">OCUPA CAMA</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-xl">🔴</span>
                                    <div>
                                        <strong className="text-red-400">UCE (Choque):</strong> Peligro de vida o muy agresivos.
                                        <div className="text-xs text-slate-500">Ej: Infartos, armas, psicosis agresiva, inconsciencia.</div>
                                        <span className="text-[10px] bg-red-900 text-red-200 px-1 rounded">OCUPA CAMA</span>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-1">2. Trampas Clínicas</h3>
                            <p className="text-xs italic mb-2">"No todo lo que brilla es oro, ni todo el que grita se muere."</p>
                            <div className="bg-slate-800 p-3 rounded border border-purple-500/30">
                                <div className="font-bold text-purple-300 mb-1">¡CUIDADO!</div>
                                <p>Algunos pacientes parecen una cosa pero son otra. Lee bien sus <strong>signos vitales</strong>.</p>
                                <p className="mt-2 text-xs text-slate-400">Ejemplo: Alguien muy borracho (OBS) vs Alguien en coma etílico (UCE).</p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-1">3. Reglas de Oro</h3>
                            <ul className="list-disc list-inside space-y-1 text-slate-400">
                                <li>Si llenas las camas, perderás puntos al intentar ingresar más.</li>
                                <li>Haz combos (aciertos seguidos) para que el Dr. Jaspers no te insulte.</li>
                                <li>Si se acaba el tiempo y no llegas a la meta ($$$), cenas galletas.</li>
                            </ul>
                        </section>

                    </div>

                    <button
                        onClick={onClose}
                        className="mt-8 btn-premium btn-blue w-full py-3 font-bold"
                    >
                        ¡ENTENDIDO, DOC!
                    </button>
                </div>
            </ElectricBorder>
            </div>
        </div>
    );
}
