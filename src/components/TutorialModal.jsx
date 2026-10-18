import { useEffect } from 'react';
import { RULES } from '../game/rules';

const AREAS = [
  { key: 'ALTA', color: 'text-alta', desc: 'Leves o "quejosos". Se van a casa.', ex: 'Resfriado, ansiedad situacional, receta.' },
  { key: 'OBS', color: 'text-obs', desc: 'Urgencia real pero estable. Ocupa cama.', ex: 'Dolor abdominal, asma leve, intoxicación estable.' },
  { key: 'UCE', color: 'text-uce', desc: 'Riesgo vital o agresividad. Ocupa cama.', ex: 'Infarto, sepsis, Glasgow bajo, psicosis agresiva.' },
];

export default function TutorialModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-3"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
    >
      <div
        className="panel bg-slate-950/95 w-full max-w-md max-h-[88dvh] overflow-y-auto no-scrollbar p-5 anim-rise"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="tutorial-title" className="text-xl font-black mb-4">Manual del residente</h2>

        <section className="space-y-2 mb-5">
          <h3 className="eyebrow">1 · Destinos</h3>
          {AREAS.map((a) => (
            <div key={a.key} className="rounded-xl border border-white/10 p-3">
              <p><strong className={a.color}>{a.key}</strong> <span className="text-slate-300">{a.desc}</span></p>
              <p className="text-xs text-slate-400 mt-1">Ej.: {a.ex}</p>
            </div>
          ))}
        </section>

        <section className="mb-5">
          <h3 className="eyebrow mb-2">2 · Trampas clínicas</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Desde la guardia 3 aparecen casos que parecen psiquiátricos o banales pero no lo son (y al revés).
            Lee los <strong>signos vitales</strong>: los valores en ámbar o rojo están fuera de rango.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="eyebrow mb-2">3 · Puntuación</h3>
          <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
            <li>Acierto: puntos del caso; +{RULES.speedBonus} si decides en menos de {RULES.speedBonusMs / 1000} s.</li>
            <li>Error: −{RULES.wrongPenalty}. Mandar a casa a un paciente de UCE: −{RULES.undertriagePenalty}.</li>
            <li>Sin cama libre: −{RULES.fullObsPenalty} (OBS) o −{RULES.fullUcePenalty} (UCE).</li>
            <li>{RULES.pityErrors} errores seguidos te regalan +{RULES.pitySeconds} s para respirar.</li>
            <li>Si no llegas a la meta, cenas galletas saladas.</li>
          </ul>
        </section>

        <button onClick={onClose} className="btn btn-primary w-full">¡Entendido, doc!</button>
      </div>
    </div>
  );
}
