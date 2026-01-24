import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard';
import { generatePatient } from '../data/patients';

export default function GameScreen({ levelData, onLevelComplete }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(levelData.duration);
    const [waiting, setWaiting] = useState([]);
    const [bedsOBS, setBedsOBS] = useState(Array(levelData.beds).fill(null));
    const [bedsUCE, setBedsUCE] = useState(Array(levelData.uce).fill(null));
    const [alert, setAlert] = useState(null);

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) {
            onLevelComplete(score);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Spawner Logic
    useEffect(() => {
        if (waiting.length === 0) setWaiting([generatePatient(levelData.id)]);

        const spawner = setInterval(() => {
            if (waiting.length < 10) {
                setWaiting(prev => [...prev, generatePatient(levelData.id)]);
            }
        }, levelData.spawnRate);
        return () => clearInterval(spawner);
    }, [levelData, waiting.length]);

    function pushAlert(msg) {
        setAlert(null);
        setTimeout(() => setAlert(msg), 10);
    }

    function handleAssign(p, target) {
        let points = 0;
        let isTrap = (p.type === 'TRAP');
        let currentAlert = "";

        // 1. Lógica de Puntos y Mensaje
        if (isTrap) {
            if (target === p.real) {
                points = p.score + 50;
                currentAlert = `🎯 ¡BIEN HECHO! Era ${p.diag} (Médico). (+${points})`;
            } else {
                points = -40;
                currentAlert = `🚨 ¡FALLO CRÍTICO! Era ${p.diag} (Médico). (-${40})`;
            }
        } else {
            if (target === p.type) {
                points = p.score;
                if (target === 'ALTA') currentAlert = `🟢 ¡PERFECTO! Desalojo de sala. (+${points})`;
                if (target === 'OBS') currentAlert = `🟡 ESTABILIZADO. Se queda en observación. (+${points})`;
                if (target === 'UCE') currentAlert = `🔴 ¡SALVADO! Triage correcto a Choque. (+${points})`;
            } else {
                points = -20;
                if (target === 'ALTA' && p.type === 'UCE') currentAlert = `¡ERROR! Paciente UCE enviado a casa. (-${20})`;
                else if (target === 'OBS' && p.type === 'UCE') currentAlert = `¡CUIDADO! Es grave, OBS no basta. (-${20})`;
                else if (target === 'UCE' && p.type === 'ALTA') currentAlert = `¡SOBRECARGA! Gasto de cama UCE innecesario. (-${20})`;
                else currentAlert = `✖ Triage incorrecto. Revisar el cuadro clínico. (-${20})`;
            }
        }

        // 2. Lógica de Camas (Solo si el destino es OBS o UCE)
        let isBedPenalty = false;
        if (target === 'OBS') {
            const idx = bedsOBS.indexOf(null);
            if (idx === -1) {
                isBedPenalty = true;
                points = -15;
                currentAlert = `⚠ ¡OBS LLENO! (-15 pts) - No había dónde poner a ${p.name}.`;
            } else {
                let newBeds = [...bedsOBS]; newBeds[idx] = p; setBedsOBS(newBeds);
                setTimeout(() => {
                    setBedsOBS(curr => { let c = [...curr]; if (c[idx] === p) c[idx] = null; return c; });
                }, 5000);
            }
        } else if (target === 'UCE') {
            const idx = bedsUCE.indexOf(null);
            if (idx === -1) {
                isBedPenalty = true;
                points = -15;
                currentAlert = `⚠ ¡UCE LLENO! (-15 pts) - No había dónde poner a ${p.name}.`;
            } else {
                let newBeds = [...bedsUCE]; newBeds[idx] = p; setBedsUCE(newBeds);
                setTimeout(() => {
                    setBedsUCE(curr => { let c = [...curr]; if (c[idx] === p) c[idx] = null; return c; });
                }, 8000);
            }
        }

        // Muestra la alerta, priorizando la de cama llena si aplica
        if (!isBedPenalty) {
            pushAlert(currentAlert);
        } else if (isBedPenalty) {
            pushAlert(currentAlert);
        }

        setScore(s => Math.max(0, s + points));
        setWaiting(prev => prev.filter(x => x.id !== p.id));
    }

    // Progreso visual
    const progressPercent = Math.min(100, (score / levelData.goal) * 100);

    return (
        <div className="flex flex-col h-full relative">
            {/* Header / HUD */}
            <div className="p-4 bg-slate-800/90 backdrop-blur border-b border-slate-700 shadow-xl z-20">
                <div className="flex justify-between text-xs hud-font text-slate-400 mb-2 uppercase tracking-wide">
                    <span>{levelData.name}</span>
                    <span>Meta: ${levelData.goal}</span>
                </div>

                {/* Barra de Progreso */}
                <div className="relative w-full h-5 bg-slate-950 rounded-full overflow-hidden border border-slate-600 mb-2 shadow-inner">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white shadow-black drop-shadow-md">
                        {levelData.meal}
                    </div>
                </div>

                <div className="flex justify-between items-end mt-1">
                    <div className="text-4xl font-bold text-white neon-text leading-none">${score}</div>
                    <div className={`text-2xl hud-font font-bold leading-none ${timeLeft < 15 ? 'text-red-500 animate-pulse' : 'text-slate-200'}`}>
                        00:{String(timeLeft).padStart(2, '0')}
                    </div>
                </div>
            </div>

            {/* Alerta Flotante */}
            {alert && <div className="alert-float text-white font-bold text-sm">{alert}</div>}

            {/* Área Scrollable */}
            <div className="flex-1 overflow-y-auto p-3 scroll-hide pb-24">

                {/* Pacientes en Espera */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                        <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase">Sala de Espera ({waiting.length})</h3>
                    </div>

                    {waiting.length === 0 && (
                        <div className="text-center py-10 opacity-30">
                            <div className="text-4xl mb-2">☕</div>
                            <p>Sala vacía... por ahora.</p>
                        </div>
                    )}

                    {waiting.map(p => (
                        <PatientCard key={p.id} p={p} onAssign={handleAssign} />
                    ))}
                </div>

                {/* Camas Visuales */}
                <div className="grid grid-cols-2 gap-4 pb-4">
                    <div className="glass p-2 border-t-2 border-t-yellow-500">
                        <h3 className="text-yellow-500 text-[10px] font-bold uppercase mb-2 text-center">Observación</h3>
                        <div className="space-y-2">
                            {bedsOBS.map((b, i) => (
                                <div key={i} className={`h-10 rounded border flex items-center justify-center text-lg transition-all ${b ? 'bg-yellow-900/40 border-yellow-500 text-white' : 'bg-slate-800/30 border-dashed border-slate-700 text-slate-600'}`}>
                                    {b ? b.sprite : <span className="text-[10px]">LIBRE</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass p-2 border-t-2 border-t-red-500">
                        <h3 className="text-red-500 text-[10px] font-bold uppercase mb-2 text-center">Choque / UCE</h3>
                        <div className="space-y-2">
                            {bedsUCE.map((b, i) => (
                                <div key={i} className={`h-10 rounded border flex items-center justify-center text-lg transition-all ${b ? 'bg-red-900/40 border-red-500 text-white' : 'bg-slate-800/30 border-dashed border-slate-700 text-slate-600'}`}>
                                    {b ? b.sprite : <span className="text-[10px]">LIBRE</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
