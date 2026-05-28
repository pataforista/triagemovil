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
    const [alertKey, setAlertKey] = useState(0);
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
        setAlertKey(k => k + 1);
        setAlert(msg);
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
                currentAlert = `🎯 ¡EXCELENTE OJO CLÍNICO! Detectaste trampa: Era ${p.diag} (requería ${p.real}). (+${points})`;
                newState = "GOOD";
                success = true;
            } else {
                points = -50;
                currentAlert = `🚨 ¡FALLO DE TRIAJE TRAMPA! Era ${p.diag} y requería ${p.real}. ¡Ignoraste signos vitales! (-50)`;
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

    const getThemeColor = (levelId) => {
        switch (levelId) {
            case 1: return "#2dd4bf"; // Mint/Teal
            case 2: return "#a78bfa"; // Violet/Purple
            case 3: return "#3b82f6"; // Royal Blue
            case 4: return "#06b6d4"; // Cyan
            case 5: return "#f59e0b"; // Gold/Amber
            case 6: return "#f43f5e"; // Pink/Rose
            case 7: return "#0d9488"; // Dark Teal
            case 8: return "#d946ef"; // Fuchsia/Purple
            default: return "#22d3ee";
        }
    };

    const themeColor = getThemeColor(levelData.id);

    return (
        <div className="flex flex-col h-full relative overflow-hidden bg-slate-950 hologram-scan">
            {/* Dynamic Volumetric Beam matching Level Theme */}
            <VolumetricBeam 
                color={themeColor} 
                fogIntensity={0.25} 
                flowSpeed={0.22} 
                className="opacity-45" 
            />
            <div className="game-background" />
            <Supervisor state={supervisorState} score={score} />

            {/* Futuristic Holographic Medical Header */}
            <header className="p-4 pt-6 z-20 flex flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                    {/* Cash balance display */}
                    <div className="hud-pill flex items-center gap-2 bg-slate-950/60 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                        <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider">CASH/GUARDIA</span>
                        <span className="text-lg font-black text-emerald-400 hud-font leading-none">${score}</span>
                    </div>

                    {/* Medical progress bar */}
                    <div className="flex-1">
                        <div className="h-5 bg-slate-950/80 rounded-full overflow-hidden border border-white/10 relative shadow-inner">
                            <div 
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 transition-all duration-700 ease-out" 
                                style={{ 
                                    width: `${progressPercent}%`,
                                    boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                                }} 
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-white px-2 uppercase tracking-tighter mix-blend-difference overflow-hidden whitespace-nowrap">
                                PREMIO: {levelData.meal}
                            </div>
                        </div>
                    </div>

                    {/* Timer with pulsing ECG line */}
                    <div className="hud-pill flex items-center gap-2 bg-slate-950/60 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                        <svg viewBox="0 0 100 20" className={`w-8 h-4 transition-all duration-300 ${timeLeft < 15 ? 'text-rose-500 animate-[ping_0.5s_infinite]' : 'text-cyan-400 opacity-60'}`}>
                            <path d="M 0 10 L 25 10 L 32 3 L 40 17 L 48 10 L 100 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className={`text-lg font-black hud-font leading-none ${timeLeft < 15 ? 'text-rose-500 animate-pulse' : 'text-yellow-400'}`}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>

                {/* Level details & Goal display */}
                <div className="flex justify-between items-end border-b border-white/10 pb-1.5">
                    <div>
                        <h1 className="text-lg font-extrabold text-white tracking-tight leading-tight">{levelData.name}</h1>
                        <p className="text-[8px] text-cyan-400 uppercase font-black tracking-[0.2em] mt-0.5 opacity-80">
                            Meta Objetivo: <span className="text-white font-extrabold">${levelData.goal}</span>
                        </p>
                    </div>
                    <div className="text-[8px] hud-font text-white/40 tracking-wider">
                        DEPT: EMER-R1-0{levelData.id}
                    </div>
                </div>
            </header>

            {alert && (
                <div key={alertKey} className="alert-float">
                    {alert}
                </div>
            )}

            {/* Waiting list main area */}
            <main className="flex-1 overflow-y-auto px-4 pt-1.5 scroll-hide z-10 pb-56 custom-scrollbar">
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_rgba(52,211,153,1)]"></div>
                    <h3 className="text-slate-400 text-[9px] font-bold tracking-[0.25em] uppercase">Pacientes en Cola ({waiting.length})</h3>
                </div>

                {waiting.map(p => (
                    <PatientCard key={p.id} p={p} onAssign={handleAssign} />
                ))}

                {waiting.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 opacity-20">
                        <div className="text-7xl mb-4 animate-[bounce_2s_infinite]">🏥</div>
                        <p className="hud-font text-[10px] uppercase tracking-[0.4em] animate-pulse">Telemetry Loop Standby...</p>
                    </div>
                )}
            </main>

            {/* Bottom telemetry central monitor ward */}
            <footer className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-30 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {/* Observation Ward Monitor */}
                    <div className="glass p-3 border border-yellow-500/20 bg-slate-950/70 backdrop-blur-md relative overflow-hidden">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></span>
                                OBS MONITOR
                            </span>
                            <span className="text-[9px] text-white/40 hud-font font-bold">{bedsOBS.filter(b => b).length}/{levelData.beds}</span>
                        </div>
                        
                        <div className="flex gap-1.5 justify-center">
                            {bedsOBS.map((b, i) => (
                                <div 
                                    key={b ? b.id : `empty-obs-${i}`} 
                                    className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center text-xl transition-all duration-300 border relative overflow-hidden ${
                                        b 
                                            ? 'bg-yellow-500/10 border-yellow-500/70 shadow-[0_0_12px_rgba(245,158,11,0.25)]' 
                                            : 'bg-slate-950/80 border-white/5 opacity-30 border-dashed'
                                    }`}
                                >
                                    {b ? (
                                        <>
                                            <span className="animate-float z-10">{b.sprite}</span>
                                            {/* Synchronous CSS progress bar over exactly 6 seconds */}
                                            <div className="absolute bottom-0 left-0 h-[3px] bg-yellow-500 animate-shrink-6s rounded-b-xl" />
                                        </>
                                    ) : (
                                        <span className="text-[10px] text-slate-700 font-bold hud-font">0{i+1}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* UCE Critical Ward Monitor */}
                    <div className="glass p-3 border border-rose-500/20 bg-slate-950/70 backdrop-blur-md relative overflow-hidden">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                UCE SHOCK
                            </span>
                            <span className="text-[9px] text-white/40 hud-font font-bold">{bedsUCE.filter(b => b).length}/{levelData.uce}</span>
                        </div>

                        <div className="flex gap-1.5 justify-center">
                            {bedsUCE.map((b, i) => (
                                <div 
                                    key={b ? b.id : `empty-uce-${i}`} 
                                    className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center text-xl transition-all duration-300 border relative overflow-hidden ${
                                        b 
                                            ? 'bg-rose-500/10 border-rose-500/70 shadow-[0_0_15px_rgba(244,63,94,0.35)] critical-pulse' 
                                            : 'bg-slate-950/80 border-white/5 opacity-30 border-dashed'
                                    }`}
                                >
                                    {b ? (
                                        <>
                                            <span className="critical-pulse z-10">{b.sprite}</span>
                                            {/* Synchronous CSS progress bar over exactly 12 seconds */}
                                            <div className="absolute bottom-0 left-0 h-[3px] bg-rose-500 animate-shrink-12s rounded-b-xl" />
                                        </>
                                    ) : (
                                        <span className="text-[10px] text-slate-700 font-bold hud-font">0{i+1}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
