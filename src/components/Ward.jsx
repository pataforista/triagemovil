const THEME = {
  OBS: { text: 'text-obs', bar: 'bg-obs', fill: 'border-obs/60 bg-obs/10' },
  UCE: { text: 'text-uce', bar: 'bg-uce', fill: 'border-uce/60 bg-uce/10' },
};

/** Monitor de camas de un área (OBS o UCE). */
export default function Ward({ area, beds }) {
  const t = THEME[area];
  const used = beds.filter(Boolean).length;

  return (
    <section className="panel bg-slate-950/80 p-2.5" aria-label={`Camas ${area}`}>
      <div className="flex justify-between items-center px-1 mb-2">
        <span className={`text-xs font-black tracking-widest ${t.text}`}>{area}</span>
        <span className="mono text-xs text-slate-400">{beds.length ? `${used}/${beds.length}` : 'cerrada'}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 justify-center min-h-[44px]">
        {beds.length === 0 && <span className="text-xs text-slate-500 self-center">Sin camas esta guardia</span>}
        {beds.map((b, i) => (
          <div
            key={i}
            className={`relative w-11 h-11 rounded-lg border transition-colors duration-300 flex items-center justify-center overflow-hidden ${
              b ? t.fill : 'border-dashed border-white/10'
            }`}
          >
            {b ? (
              <>
                <span key={b.id} className={`font-black ${t.text} anim-pop`}>{b.initial}</span>
                <span
                  className={`absolute bottom-0 left-0 h-1 ${t.bar} transition-[width] duration-1000 ease-linear`}
                  style={{ width: `${(b.timeLeft / b.maxTime) * 100}%` }}
                />
              </>
            ) : (
              <span className="mono text-[11px] text-slate-600">{i + 1}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
