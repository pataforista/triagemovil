import { useEffect, useState } from 'react';

// Dr. Jaspers, el adscrito sarcástico. Reacciona a cada decisión del jugador.
const QUOTES = {
  START: [
    '¿Ya terminaste tu café? Los pacientes no se curan solos.',
    'Mira, un residente nuevo. A ver cuánto duras.',
    'La medicina es simple: entra aire, sale aire. No lo arruines.',
  ],
  GOOD: ['No estuvo mal. Para ser tú.', 'Aceptable. Siguiente.', '¿Por fin leíste un libro?', 'Mmm. ¿Suerte de principiante?'],
  BAD: [
    '¿Intentas reducir la población mundial?',
    'Eso fue vergonzoso. Incluso para un R1.',
    'Mis plantas tienen mejor criterio clínico.',
    '¿Tu título venía en una caja de cereal?',
  ],
  COMBO: ['Estás en racha. No te emociones.', 'Vaya, parece que sabes lo que haces.', 'Casi pareces un doctor de verdad.'],
};

const FACES = { START: '👨‍⚕️', GOOD: '👨‍⚕️', COMBO: '😎', BAD: '😡' };
const TONE = { START: 'border-l-sky-400', GOOD: 'border-l-alta', COMBO: 'border-l-alta', BAD: 'border-l-uce' };

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** El padre lo monta con `key` distinta en cada evento, así cada reacción reinicia el componente. */
export default function Supervisor({ mood }) {
  const [quote] = useState(() => pick(QUOTES[mood] ?? QUOTES.START));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`absolute right-3 top-28 z-30 flex items-start gap-2 max-w-[240px] ${mood === 'BAD' ? 'anim-shake' : 'anim-rise'}`}
      role="status"
    >
      <p className={`panel bg-slate-950/95 border-l-4 ${TONE[mood]} rounded-2xl rounded-tr-sm px-3 py-2 text-[13px] leading-snug text-slate-200`}>
        <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">Dr. Jaspers</span>
        {quote}
      </p>
      <span className="text-3xl leading-none" aria-hidden="true">{FACES[mood]}</span>
    </div>
  );
}
