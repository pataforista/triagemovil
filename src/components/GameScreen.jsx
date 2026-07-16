import React, { useState, useEffect, useRef } from 'react';
import { generatePatient, resetPatientHistory } from '../data/patients';
import PatientCard from './PatientCard';
import Supervisor from './Supervisor';
import { playError, playPop, playAmbient, stopAmbient } from '../utils/audio';

export default function GameScreen({ levelData, onLevelComplete }) {
    const [timeLeft, setTimeLeft] = useState(levelData.time);
    const [score, setScore] = useState(0);
    const [waiting, setWaiting] = useState([]);
    
    // Beds are now { patient, timeLeft, maxTime, initial }
    const [bedsOBS, setBedsOBS] = useState(Array(levelData.beds).fill(null));
    const [bedsUCE, setBedsUCE] = useState(Array(levelData.uce).fill(null));
    
    // { msg: string, type: 'success' | 'error' | 'warning' }
    const [alert, setAlert] = useState(null); 
    const [alertKey, setAlertKey] = useState(0);

    const [supState, setSupState] = useState('START');
    const [combo, setCombo] = useState(0);
    const [errorStreak, setErrorStreak] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Refs for safe callback from interval
    const scoreRef = useRef(score);
    const onLevelCompleteRef = useRef(onLevelComplete);
    const lastTickRef = useRef(Date.now());
    
    useEffect(() => { scoreRef.current = score; }, [score]);
    useEffect(() => { onLevelCompleteRef.current = onLevelComplete; }, [onLevelComplete]);

    // Initial Setup
    useEffect(() => {
        resetPatientHistory();
        playAmbient();
        setSupState('START');
        return () => stopAmbient();
    }, [levelData.id]);

    // Main Game Timer & Bed Manager
    useEffect(() => {
        if (isPaused) return;

        lastTickRef.current = Date.now();
        const timer = setInterval(() => {
            const now = Date.now();
            const deltaSecs = Math.round((now - lastTickRef.current) / 1000);
            
            if (deltaSecs >= 1) {
                lastTickRef.current = now;
                
                setTimeLeft(prev => {
                    const next = Math.max(0, prev - deltaSecs);
                    if (next <= 0) {
                        setTimeout(() => onLevelCompleteRef.current(scoreRef.current), 0);
                    }
                    return next;
                });

                // Update beds time
                setBedsOBS(curr => curr.map(b => {
                    if (!b) return null;
                    const newTime = b.timeLeft - deltaSecs;
                    return newTime <= 0 ? null : { ...b, timeLeft: newTime };
                }));

                setBedsUCE(curr => curr.map(b => {
                    if (!b) return null;
                    const newTime = b.timeLeft - deltaSecs;
                    return newTime <= 0 ? null : { ...b, timeLeft: newTime };
                }));
            }
        }, 1000); // 1s tick

        return () => clearInterval(timer);
    }, [isPaused]);

    // Patient Spawner
    useEffect(() => {
        if (isPaused) return;

        const spawner = setInterval(() => {
            setWaiting(prev => {
                if (prev.length < 10) {
                    return [...prev, generatePatient(levelData.id)];
                }
                return prev;
            });
        }, levelData.spawnRate);

        return () => clearInterval(spawner);
    }, [levelData, isPaused]);

    const pushAlert = (msg, type = 'success') => {
        setAlertKey(k => k + 1);
        setAlert({ msg, type });
    };

    const handleAssign = (p, decision) => {
        if (isPaused) return;

        setWaiting(prev => prev.filter(x => x.id !== p.id));

        let currentCombo = combo;
        let points = 0;
        let speedBonus = 0;
        const timeToTriage = Date.now() - p.spawnTime;

        if (timeToTriage < 3000) speedBonus = 10;

        if (p.type === decision) {
            points = p.score + speedBonus;
            setScore(s => s + points);
            currentCombo += 1;
            setCombo(currentCombo);
            setErrorStreak(0); // Resetea la racha de errores al acertar

            if (currentCombo >= 3) {
                setSupState('COMBO');
                pushAlert(`¡RACHA x${currentCombo}! +${points}${speedBonus > 0 ? ' ⚡ RAPIDEZ' : ''}`, 'success');
            } else {
                setSupState('GOOD');
                pushAlert(`¡Acierto! +${points}${speedBonus > 0 ? ' ⚡ RAPIDEZ' : ''}`, 'success');
            }
        } else {
            playError();
            currentCombo = 0;
            setCombo(0);
            
            setErrorStreak(prev => {
                const newStreak = prev + 1;
                // Mecánica de piedad: cada 3 errores seguidos, regala tiempo.
                if (newStreak >= 3) {
                    setTimeLeft(t => t + 15);
                    setTimeout(() => pushAlert('Respira hondo doctor. Tómate tu tiempo (+15s)', 'success'), 500);
                    return 0;
                }
                return newStreak;
            });
            
            if (p.real && p.type === 'ALTA' && decision !== 'ALTA') {
                // False negative
                setScore(s => s - 20);
                setSupState('BAD');
                pushAlert(`¡Error Crítico! Mandaste de alta a un paciente real. (-20)`, 'error');
            } else {
                setScore(s => s - 10);
                setSupState('BAD');
                pushAlert(`Diagnóstico incorrecto. Era ${p.type}. (-10)`, 'error');
            }
        }

        // Assign to bed
        if (decision === 'OBS') {
            const idx = bedsOBS.findIndex(b => b === null);
            if (idx !== -1) {
                let newBeds = [...bedsOBS];
                newBeds[idx] = { patient: p, timeLeft: 6, maxTime: 6, initial: p.name.charAt(0) };
                setBedsOBS(newBeds);
            } else {
                playError();
                setScore(s => s - 5);
                pushAlert('¡Sala OBS llena! Penalización (-5)', 'warning');
                setCombo(0);
            }
        } else if (decision === 'UCE') {
            const idx = bedsUCE.findIndex(b => b === null);
            if (idx !== -1) {
                let newBeds = [...bedsUCE];
                newBeds[idx] = { patient: p, timeLeft: 12, maxTime: 12, initial: p.name.charAt(0) };
                setBedsUCE(newBeds);
            } else {
                playError();
                setScore(s => s - 10);
                pushAlert('¡UCE llena! Peligro inminente (-10)', 'error');
                setCombo(0);
            }
        }
    };

    const togglePause = () => {
        playPop();
        setIsPaused(!isPaused);
        if (!isPaused) {
            stopAmbient();
        } else {
            playAmbient();
        }
    };

    // Calculate progress (0 to 100)
    const progress = Math.min((score / levelData.goal) * 100, 100);

    return (
        <div className="flex flex-col h-full bg-slate-950 relative">
            {/* Ambient Lighting Volumetric Beams (Reduced Opacity) */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[100px] rounded-full"></div>
                <div className="absolute top-[40%] right-[-20%] w-[60%] h-[60%] bg-rose-600/10 blur-[120px] rounded-full"></div>
            </div>

            {/* Top Header HUD */}
            <header className="pt-2 px-4 pb-2 z-20 bg-gradient-to-b from-slate-950/90 to-transparent shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] backdrop-blur-sm border-b border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        {/* Pause Button */}
                        <button 
                            onClick={togglePause}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-600/50 hover:bg-slate-700 transition active:scale-95 shadow-md"
                        >
                            <span className="text-xl leading-none translate-y-[-1px]">{isPaused ? '▶️' : '⏸️'}</span>
                        </button>

                        <div className="hud-pill flex items-center justify-center min-w-[90px] border border-emerald-500/30 bg-slate-900/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden group">
                            {/* Animated Dinner Progress Fill */}
                            <div 
                                className="absolute top-0 left-0 bottom-0 bg-emerald-500/30 transition-all duration-700 ease-out z-0" 
                                style={{ width: `${progress}%` }} 
                            />
                            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                <span className="text-[8px] font-black tracking-widest text-emerald-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-[1]">
                                    PREMIO
                                </span>
                                <span className="text-base font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-[1] mt-0.5 hud-font">
                                    ${score}
                                </span>
                            </div>
                        </div>

                        {/* Combo Indicator */}
                        {combo > 1 && (
                            <div className="hud-pill bg-orange-500/20 border border-orange-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.3)] animate-bounce-in">
                                <span className="text-sm font-black text-orange-400">🔥 x{combo}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Timer */}
                        <div className="hud-pill flex items-center gap-2 bg-slate-950/60 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                            <svg viewBox="0 0 100 20" className={`w-8 h-4 transition-all duration-300 ${timeLeft < 15 ? 'text-rose-500 animate-[ping_0.5s_infinite]' : 'text-cyan-400 opacity-60'}`}>
                                <path d="M 0 10 L 25 10 L 32 3 L 40 17 L 48 10 L 100 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={`text-lg font-black hud-font leading-none ${timeLeft < 15 ? 'text-rose-500 animate-pulse' : 'text-yellow-400'}`}>
                                {timeLeft}s
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end border-b border-white/10 pb-1.5 mt-1">
                    <div>
                        <h1 className="text-lg font-extrabold text-white tracking-tight leading-tight">{levelData.name}</h1>
                        <p className="text-[8px] text-cyan-400 uppercase font-black tracking-[0.2em] mt-0.5 opacity-80">
                            Meta: <span className="text-white font-extrabold">${levelData.goal}</span>
                        </p>
                    </div>
                    <div className="text-[8px] hud-font text-white/40 tracking-wider">
                        DEPT: EMER-R1-0{levelData.id}
                    </div>
                </div>
            </header>

            {/* Dr. Jaspers */}
            <Supervisor state={supState} score={score} />

            {alert && (
                <div key={alertKey} className={`alert-float alert-${alert.type}`}>
                    {alert.msg}
                </div>
            )}

            {/* Waiting list */}
            <main className="flex-1 overflow-y-auto px-4 pt-2 scroll-hide z-10 pb-56 custom-scrollbar relative">
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_rgba(52,211,153,1)]"></div>
                    <h3 className="text-slate-400 text-[9px] font-bold tracking-[0.25em] uppercase">Pacientes ({waiting.length})</h3>
                </div>

                {waiting.map(p => (
                    <PatientCard key={p.id} p={p} onAssign={handleAssign} />
                ))}

                {waiting.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 opacity-20">
                        <div className="text-7xl mb-4 animate-[bounce_2s_infinite]">🩺</div>
                        <p className="hud-font text-[10px] uppercase tracking-[0.4em] animate-pulse">Telemetry Loop Standby...</p>
                    </div>
                )}
            </main>

            {/* Pause Overlay */}
            {isPaused && (
                <div className="absolute inset-0 z-40 bg-slate-950/60 backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="text-6xl mb-4">⏸️</div>
                    <h2 className="text-3xl font-black text-white neon-text tracking-widest">EN PAUSA</h2>
                    <p className="text-slate-400 mt-2 font-bold tracking-widest text-sm uppercase">Toca el botón para reanudar</p>
                </div>
            )}

            {/* Ward Monitors */}
            <footer className="absolute bottom-0 left-0 right-0 p-3 pb-5 z-30 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {/* OBS */}
                    <div className="glass p-2 border border-yellow-500/20 bg-slate-950/80 backdrop-blur-md rounded-[20px]">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[8px] font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></span>
                                OBS
                            </span>
                            <span className="text-[9px] text-white/40 hud-font font-bold">{bedsOBS.filter(b => b).length}/{levelData.beds}</span>
                        </div>
                        <div className="flex gap-1.5 justify-center">
                            {bedsOBS.map((b, i) => (
                                <div key={i} className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border relative overflow-hidden ${b ? 'bg-yellow-500/10 border-yellow-500/70' : 'bg-slate-900/50 border-white/5 border-dashed'}`}>
                                    {b ? (
                                        <>
                                            <span className="text-lg font-black text-yellow-500 mb-2 z-10">{b.initial}</span>
                                            <span className="absolute bottom-[6px] text-[10px] font-bold text-yellow-400 z-10">{b.timeLeft}s</span>
                                            <div className="absolute bottom-0 left-0 h-[4px] bg-yellow-500 transition-all duration-1000 linear" style={{ width: `${(b.timeLeft / b.maxTime) * 100}%` }} />
                                        </>
                                    ) : (
                                        <span className="text-[10px] text-slate-700 font-bold hud-font">0{i+1}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* UCE */}
                    <div className="glass p-2 border border-rose-500/20 bg-slate-950/80 backdrop-blur-md rounded-[20px]">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                UCE
                            </span>
                            <span className="text-[9px] text-white/40 hud-font font-bold">{bedsUCE.filter(b => b).length}/{levelData.uce}</span>
                        </div>
                        <div className="flex gap-1.5 justify-center">
                            {bedsUCE.map((b, i) => (
                                <div key={i} className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border relative overflow-hidden ${b ? 'bg-rose-500/10 border-rose-500/70 critical-pulse' : 'bg-slate-900/50 border-white/5 border-dashed'}`}>
                                    {b ? (
                                        <>
                                            <span className="text-lg font-black text-rose-500 mb-2 z-10">{b.initial}</span>
                                            <span className="absolute bottom-[6px] text-[10px] font-bold text-rose-400 z-10">{b.timeLeft}s</span>
                                            <div className="absolute bottom-0 left-0 h-[4px] bg-rose-500 transition-all duration-1000 linear" style={{ width: `${(b.timeLeft / b.maxTime) * 100}%` }} />
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
