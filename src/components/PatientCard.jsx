import { parseVitals } from '../game/vitals';

const STATUS = {
  danger: 'border-uce/40 bg-uce/10 text-uce',
  warning: 'border-obs/40 bg-obs/10 text-obs',
  normal: 'border-white/10 bg-white/[0.03] text-slate-300',
};

const ACTIONS = [
  { key: 'ALTA', icon: '🏠', className: 'btn-alta' },
  { key: 'OBS', icon: '👁️', className: 'btn-obs' },
  { key: 'UCE', icon: '🚨', className: 'btn-uce' },
];

// El estilo de la tarjeta es neutro a propósito: el color nunca debe delatar la respuesta.
export default function PatientCard({ patient, onAssign, disabled }) {
  const vitals = parseVitals(patient.vitals);

  return (
    <article className={`panel p-4 mb-3 ${patient.exiting ? `card-exit card-exit-${patient.exiting}` : 'anim-card-in'}`}>
      <header className="flex items-start gap-3">
        <div className="text-4xl leading-none" aria-hidden="true">{patient.sprite}</div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold leading-tight">
            {patient.name} <span className="text-slate-400 font-medium text-base">· {patient.age} a</span>
          </h3>
          <p className="text-sm text-sky-100/90 italic mt-1 leading-snug">“{patient.complaint}”</p>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-2 mt-3">
        {vitals.map((v, i) => (
          <div key={i} className={`rounded-xl border px-2.5 py-2 ${STATUS[v.status]} ${v.label === 'Hallazgo' ? 'col-span-2' : ''}`}>
            <dt className="text-[11px] font-bold uppercase tracking-wider opacity-80">
              <span aria-hidden="true">{v.icon}</span> {v.label}
            </dt>
            <dd className="mono text-sm font-bold text-slate-50 mt-0.5 break-words">{v.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {ACTIONS.map((a) => (
          <button
            key={a.key}
            disabled={disabled || Boolean(patient.exiting)}
            onClick={() => onAssign(patient, a.key)}
            className={`btn ${a.className} px-0 text-sm disabled:opacity-40`}
          >
            <span aria-hidden="true">{a.icon}</span> {a.key}
          </button>
        ))}
      </div>
    </article>
  );
}
