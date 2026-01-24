import React from 'react';

export default function PatientCard({ p, onAssign }) {
    const borderColor = p.type === 'UCE' ? '#ef4444' : p.type === 'OBS' ? '#eab308' : '#22c55e';

    return (
        <div className="glass p-4 mb-3 patient-enter flex items-start gap-3 border-l-4 relative overflow-hidden"
            style={{ borderColor: borderColor }}>

            <div className="text-4xl pt-1 filter drop-shadow-md">{p.sprite}</div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <strong className="text-lg text-white truncate">{p.name}, {p.age}a</strong>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                        #{String(Math.floor(p.id)).slice(-3)}
                    </span>
                </div>

                <div className="text-sm text-cyan-200 italic mb-2 leading-tight">"{p.complaint}"</div>

                <div className="inline-block bg-slate-950/60 rounded px-2 py-1 text-xs text-slate-300 hud-font border border-white/5 mb-3">
                    {p.vitals}
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => onAssign(p, 'ALTA')} className="btn-premium btn-green py-2 text-sm">ALTA</button>
                    <button onClick={() => onAssign(p, 'OBS')} className="btn-premium btn-yellow py-2 text-sm">OBS</button>
                    <button onClick={() => onAssign(p, 'UCE')} className="btn-premium btn-red py-2 text-sm">UCE</button>
                </div>
            </div>
        </div>
    );
}
