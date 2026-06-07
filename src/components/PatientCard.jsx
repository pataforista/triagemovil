import React from 'react';
import { playPop } from '../utils/audio';

export default function PatientCard({ p, onAssign }) {
    const borderColor = p.type === 'UCE' ? '#f43f5e' : p.type === 'OBS' ? '#f59e0b' : '#2dd4bf';
    const shadowColor = p.type === 'UCE' ? 'rgba(244, 63, 94, 0.25)' : p.type === 'OBS' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(45, 212, 191, 0.15)';

    // Helper to parse vitals into structured objects with status alerts
    const parseVitals = (vitalsStr) => {
        if (!vitalsStr) return [];
        const parts = vitalsStr.split('|').map(x => x.trim());

        return parts.map(part => {
            let label = "CLINICAL FINDING";
            let value = part;
            let icon = "📋";
            let status = "normal"; // normal, warning, danger
            let pulseClass = "";

            const lowerPart = part.toLowerCase();

            // 1. Heart Rate (FC)
            if (/\bfc\b/.test(lowerPart) || lowerPart.includes("bradicardia") || lowerPart.includes("pulso") || lowerPart.includes("fa con rvr")) {
                label = "HEART RATE / FC";
                icon = "🫀";
                // Extract number
                const numMatch = part.match(/(\d+)/);
                if (numMatch) {
                    const fc = parseInt(numMatch[1]);
                    value = `${fc} BPM`;
                    if (fc > 100 || fc < 50) {
                        status = "danger";
                        pulseClass = "animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]";
                    } else if (fc > 90 || fc < 60) {
                        status = "warning";
                        pulseClass = "animate-pulse";
                    }
                }
            }
            // 2. Oxygen Saturation (Sat)
            else if (lowerPart.includes("sat") || lowerPart.includes("paco2") || lowerPart.includes("cianosis")) {
                label = "OXIMETRY / SPO2";
                icon = "📈";
                const numMatch = part.match(/(\d+)/);
                if (numMatch) {
                    const sat = parseInt(numMatch[1]);
                    value = `${sat}%`;
                    if (sat < 90) {
                        status = "danger";
                    } else if (sat < 95) {
                        status = "warning";
                    }
                }
            }
            // 3. Blood Pressure (TA)
            else if (/\bta\b/.test(lowerPart) || lowerPart.includes("hipotensión") || lowerPart.includes("tensión")) {
                label = "BP / PRESS";
                icon = "⚡";
                const taMatch = part.match(/(\d+\/\d+)/);
                if (taMatch) {
                    value = taMatch[1];
                    const systolic = parseInt(taMatch[1].split('/')[0]);
                    if (systolic > 150 || systolic < 90) {
                        status = "danger";
                    } else if (systolic > 135 || systolic < 100) {
                        status = "warning";
                    }
                } else if (lowerPart.includes("hipotensión")) {
                    status = "danger";
                    value = "Low Press";
                }
            }
            // 4. Temperature (Temp / Fiebre)
            else if (lowerPart.includes("temp") || lowerPart.includes("fiebre") || lowerPart.includes("afebril")) {
                label = "TEMPERATURE";
                icon = "🌡️";
                const numMatch = part.match(/(\d+\.\d+|\d+)/);
                if (numMatch) {
                    const temp = parseFloat(numMatch[1]);
                    value = `${temp}°C`;
                    if (temp >= 38.5 || temp < 35) {
                        status = "danger";
                    } else if (temp >= 37.5 || temp < 36) {
                        status = "warning";
                    }
                } else if (lowerPart.includes("afebril")) {
                    value = "Normal Temp";
                }
            }
            // 5. Respiratory Rate (FR)
            else if (/\bfr\b/.test(lowerPart) || lowerPart.includes("taquipnea") || lowerPart.includes("respiratoria")) {
                label = "RESP RATE / FR";
                icon = "🫁";
                const numMatch = part.match(/(\d+)/);
                if (numMatch) {
                    const fr = parseInt(numMatch[1]);
                    value = `${fr} rpm`;
                    if (fr < 8 || fr > 30) {
                        status = "danger";
                    } else if (fr < 12 || fr > 24) {
                        status = "warning";
                    }
                } else {
                    // "Taquipnea" / "insuficiencia respiratoria" sin valor numérico
                    status = "warning";
                }
            }
            // 6. Blood Glucose (Glu)
            else if (lowerPart.includes("glu")) {
                label = "GLUCOSE / GLU";
                icon = "🍬";
                const numMatch = part.match(/(\d+)/);
                if (numMatch) {
                    const glu = parseInt(numMatch[1]);
                    value = `${glu} mg/dL`;
                    if (glu < 60 || glu > 250) {
                        status = "danger";
                    } else if (glu < 75 || glu > 140) {
                        status = "warning";
                    }
                }
            }
            // 7. Consciousness (Glasgow)
            else if (lowerPart.includes("glasgow")) {
                label = "CONSCIOUSNESS";
                icon = "🧠";
                const numMatch = part.match(/(\d+)/);
                if (numMatch) {
                    const g = parseInt(numMatch[1]);
                    value = `GCS ${g}/15`;
                    if (g <= 12) {
                        status = "danger";
                    } else if (g <= 14) {
                        status = "warning";
                    }
                }
            }

            return { label, value, icon, status, pulseClass, raw: part };
        });
    };

    const vitalBadges = parseVitals(p.vitals);

    return (
        <div 
            className="glass card-vibrant p-5 mb-4 patient-enter flex flex-col gap-4 border-l-[6px] relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 shadow-lg"
            style={{ 
                borderColor: borderColor,
                boxShadow: `0 8px 30px -10px ${shadowColor}`
            }}
        >
            {/* Hologram scan line inside card for sci-fi atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/2 to-cyan-500/0 translate-y-[-100%] group-hover:animate-[scanline_3s_linear_infinite] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Header info */}
            <div className="flex items-start gap-4 z-10">
                <div className="text-5xl pt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] animate-float">{p.sprite}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <strong className="text-xl font-extrabold text-white tracking-tight leading-none">
                            {p.name}, <span className="text-slate-300 font-medium text-base">{p.age}a</span>
                        </strong>
                        <span className="hud-font text-[9px] bg-slate-950/60 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">
                            ID-{String(Math.floor(p.id)).slice(-4)}
                        </span>
                    </div>
                    {/* Chief complaint speech bubble style */}
                    <div className="text-sm text-cyan-200/90 font-medium italic mt-2 pl-2 border-l-2 border-cyan-500/20 py-0.5 leading-snug">
                        "{p.complaint}"
                    </div>
                </div>
            </div>

            {/* Structured telemetry clinical grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 z-10">
                {vitalBadges.map((badge, idx) => {
                    const statusColor = 
                        badge.status === 'danger' ? 'text-rose-400 border-rose-500/30 bg-rose-500/10' :
                        badge.status === 'warning' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                        'text-cyan-300 border-cyan-500/15 bg-cyan-500/5';
                    
                    const indicatorDot = 
                        badge.status === 'danger' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' :
                        badge.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' :
                        'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]';

                    return (
                        <div 
                            key={idx}
                            className={`flex flex-col p-2.5 rounded-xl border hud-font backdrop-blur-sm transition-all duration-300 ${statusColor}`}
                        >
                            <div className="flex items-center justify-between text-[8px] tracking-wider opacity-65 mb-1">
                                <span>{badge.label}</span>
                                <div className="flex items-center gap-1">
                                    <span className={`w-1.5 h-1.5 rounded-full ${indicatorDot} ${badge.pulseClass}`}></span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-base">{badge.icon}</span>
                                <span className="font-extrabold text-sm tracking-tight text-white leading-none">
                                    {badge.value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Futuristic ER triage action controller buttons */}
            <div className="grid grid-cols-3 gap-2.5 z-10 mt-1">
                <button 
                    onClick={() => { playPop(); onAssign(p, 'ALTA'); }} 
                    className="btn-premium btn-alta py-3 relative group overflow-hidden border border-teal-400/20 hover:shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-1">
                        <span>🏠</span> ALTA
                    </span>
                </button>
                <button 
                    onClick={() => { playPop(); onAssign(p, 'OBS'); }} 
                    className="btn-premium btn-obs py-3 relative group overflow-hidden border border-yellow-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-1">
                        <span>🟡</span> OBS
                    </span>
                </button>
                <button 
                    onClick={() => { playPop(); onAssign(p, 'UCE'); }} 
                    className="btn-premium btn-uce py-3 relative group overflow-hidden border border-rose-400/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.5)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-1">
                        <span>🚨</span> UCE
                    </span>
                </button>
            </div>
        </div>
    );
}
