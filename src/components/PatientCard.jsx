export default function PatientCard({ p, onAssign }) {
    const borderColor = p.type === 'UCE' ? '#f43f5e' : p.type === 'OBS' ? '#f59e0b' : '#2dd4bf';

    return (
        <div className="glass card-vibrant p-5 mb-4 patient-enter flex flex-col gap-4 border-l-[6px] relative overflow-hidden group hover:scale-[1.01] transition-transform"
            style={{ borderColor: borderColor }}>
            
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="flex items-start gap-4 z-10">
                <div className="text-5xl pt-1 drop-shadow-xl animate-float">{p.sprite}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <strong className="text-xl font-extrabold text-white tracking-tight">{p.name}, {p.age}a</strong>
                        <span className="hud-font text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full border border-white/5">
                            ID-{String(Math.floor(p.id)).slice(-4)}
                        </span>
                    </div>
                    <div className="text-base text-cyan-300/90 font-medium italic mb-2 leading-tight">
                        "{p.complaint}"
                    </div>
                </div>
            </div>

            <div className="bg-slate-950/40 rounded-xl px-4 py-3 text-sm text-slate-200 hud-font border border-white/10 backdrop-blur-sm z-10">
                <span className="text-cyan-500 mr-2 opacity-70">VITALS:</span> {p.vitals}
            </div>

            <div className="grid grid-cols-3 gap-3 z-10">
                <button onClick={() => onAssign(p, 'ALTA')} className="btn-premium btn-alta py-3">🏠 ALTA</button>
                <button onClick={() => onAssign(p, 'OBS')} className="btn-premium btn-obs py-3">🟡 OBS</button>
                <button onClick={() => onAssign(p, 'UCE')} className="btn-premium btn-uce py-3">🚨 UCE</button>
            </div>
        </div>
    );
}
