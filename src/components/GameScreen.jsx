import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard';
import { generatePatient } from '../data/patients';
import Supervisor from './Supervisor';
import VolumetricBeam from './ui/VolumetricBeam';
import { playSuccess, playError, playAlarm } from '../utils/audio';
import { vibrateSuccess, vibrateError, vibrateWarning } from '../utils/haptics';

export default function GameScreen({ levelData, onLevelComplete }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(levelData.duration);
    const [waiting, setWaiting] = useState([]);
    const [bedsOBS, setBedsOBS] = useState(Array(levelData.beds).fill(null));
    const [bedsUCE, setBedsUCE] = useState(Array(levelData.uce).fill(null));
    const [alert, setAlert] = useState(null);
    const [supervisorState, setSupervisorState] = useState('START'); // START, GOOD, BAD, COMBO

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) {
            onLevelComplete(score);
            return;
        }
        if (timeLeft <= 10 && timeLeft % 2 === 0) {
            playAlarm();
            vibrateWarning();
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
        let newState = "";
        let success = false;

        // 1. Lógica de Puntos y Mensaje
        if (isTrap) {
            if (target === p.real) {
                points = p.score + 50;
                currentAlert = `🎯 ¡EXCELENTE OJO! Era ${p.diag} (Médico). (+${points})`;
                newState = "GOOD";
                success = true;
            } else {
                points = -50;
                currentAlert = `🚨 ¡FALLO CRÍTICO! Era ${p.diag}. Ignoraste los signos vitales. (-50)`;
                newState = "BAD";
            }
        } else {
            if (target === p.type) {
                points = p.score;
                if (target === 'ALTA') currentAlert = `🟢 ¡PERFECTO! Desalojo de sala. (+${points})`;
                if (target === 'OBS') currentAlert = `🟡 ESTABILIZADO. Se queda en observación. (+${points})`;
                if (target === 'UCE') currentAlert = `🔴 ¡SALVADO! Triage correcto a Choque. (+${points})`;

                success = true;
                if (Math.random() > 0.7) newState = "GOOD";
            } else {
                if (target === 'ALTA' && p.type === 'UCE') {
                    points = -100;
                    currentAlert = `💀 ¡NEGLIGENCIA! Paciente crítico enviado a casa. (-100)`;
                } else if (target === 'OBS' && p.type === 'UCE') {
                    points = -40;
                    currentAlert = `🚨 ¡POCA PRECAUCIÓN! Es grave, OBS no basta. (-40)`;
                } else if (target === 'ALTA' && p.type === 'OBS') {
                    points = -30;
                    currentAlert = `⚠ Error: El paciente aún requiere monitoreo. (-30)`;
                } else if (target === 'UCE' && p.type === 'ALTA') {
                    points = -25;
                    currentAlert = `🏥 ¡SOBRECARGA! Cama UCE desperdiciada. (-25)`;
                } else {
                    points = -20;
                    currentAlert = `✖ Triage incorrecto. Revisar el cuadro clínico. (-20)`;
                }
                newState = "BAD";
            }
        }

        // 2. Lógica de Camas
        if (target === 'OBS') {
            const idx = bedsOBS.indexOf(null);
            if (idx === -1) {
                points = -15;
                currentAlert = `⚠ ¡OBS LLENO! (-15 pts) - No hay espacio para ${p.name}.`;
                newState = "BAD";
                success = false;
            } else {
                let newBeds = [...bedsOBS]; newBeds[idx] = p; setBedsOBS(newBeds);
                setTimeout(() => {
                    setBedsOBS(curr => { let c = [...curr]; if (c[idx] === p) c[idx] = null; return c; });
                }, 6000); 
            }
        } else if (target === 'UCE') {
            const idx = bedsUCE.indexOf(null);
            if (idx === -1) {
                points = -15;
                currentAlert = `⚠ ¡UCE LLENO! (-15 pts) - ¡Emergencia saturada!`;
                newState = "BAD";
                success = false;
            } else {
                let newBeds = [...bedsUCE]; newBeds[idx] = p; setBedsUCE(newBeds);
                setTimeout(() => {
                    setBedsUCE(curr => { let c = [...curr]; if (c[idx] === p) c[idx] = null; return c; });
                }, 12000);
            }
        }

        // Audio & Haptic Triggers
        if (success) {
            playSuccess();
            vibrateSuccess();
        } else {
            playError();
            vibrateError();
        }

        pushAlert(currentAlert);
        if (newState) setSupervisorState(newState);
        setScore(s => Math.max(0, s + points));
        setWaiting(prev => prev.filter(x => x.id !== p.id));
    }

    const progressPercent = Math.min(100, (score / levelData.goal) * 100);

    return (
        <div className="flex flex-col h-full relative overflow-hidden bg-slate-950">
            <VolumetricBeam 
                color="#0f172a" 
                fogIntensity={0.2} 
                flowSpeed={0.2} 
                className="opacity-40" 
            />
            <div className="game-background" />
            <Supervisor state={supervisorState} score={score} />

            <header className="p-4 pt-6 z-20 flex flex-col gap-4">
                <div className="flex justify-between items-center gap-3">
                    <div className="hud-pill flex items-center gap-2">
                        <span className="text-[10px] text-white/50 font-black uppercase">Cash</span>
                        <span className="text-xl font-black text-green-400 hud-font">${score}</span>
                    </div>
                    <div className="flex-1">
                        <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10 relative shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 transition-all duration-700 ease-out" 
                                 style={{ width: `${progressPercent}%` }} />
                            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white px-2 uppercase tracking-tighter mix-blend-difference overflow-hidden whitespace-nowrap">
                                {levelData.meal}
                            </div>
                        </div>
                    </div>
                    <div className="hud-pill flex items-center gap-2">
                        <span className="text-[10px] text-white/50 font-black uppercase">Time</span>
                        <span className={`text-xl font-black hud-font ${timeLeft < 15 ? 'text-rose-500 animate-pulse' : 'text-yellow-400'}`}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                    <div>
                        <h1 className="neon-text text-xl tracking-tighter leading-none">{levelData.name}</h1>
                        <p className="text-[9px] text-cyan-400 uppercase font-black tracking-[0.2em] mt-1 opacity-70">
                            Meta Objetivo: <span className="text-white">${levelData.goal}</span>
                        </p>
                    </div>
                </div>
            </header>

            {alert && (
                <div key={Date.now()} className="alert-float">
                    {alert}
                </div>
            )}

            <main className="flex-1 overflow-y-auto px-4 pt-2 scroll-hide z-10 pb-60">
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                    <h3 className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">Sala de Espera ({waiting.length})</h3>
                </div>

                {waiting.map(p => (
                    <PatientCard key={p.id} p={p} onAssign={handleAssign} />
                ))}

                {waiting.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 opacity-20 animate-float">
                        <div className="text-8xl mb-4">🏥</div>
                        <p className="hud-font text-xs uppercase tracking-[0.4em]">Standby Loop...</p>
                    </div>
                )}
            </main>

            <footer className="absolute bottom-0 left-0 right-0 p-4 pb-8 z-30 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="glass p-3 border border-yellow-500/20 bg-yellow-500/5">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">OBS MONITOR</span>
                            <span className="text-[9px] text-white/30 hud-font">{bedsOBS.filter(b => b).length}/{levelData.beds}</span>
                        </div>
                        <div className="flex gap-1.5 justify-center">
                            {bedsOBS.map((b, i) => (
                                <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 border-2 ${b ? 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse' : 'bg-white/5 border-white/10 opacity-10'}`}>
                                    {b ? b.sprite : ''}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-3 border border-rose-500/20 bg-rose-500/5">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">UCE CRITICAL</span>
                            <span className="text-[9px] text-white/30 hud-font">{bedsUCE.filter(b => b).length}/{levelData.uce}</span>
                        </div>
                        <div className="flex gap-1.5 justify-center">
                            {bedsUCE.map((b, i) => (
                                <div key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 border-2 ${b ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] critical-pulse' : 'bg-white/5 border-white/10 opacity-5'}`}>
                                    {b ? b.sprite : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
