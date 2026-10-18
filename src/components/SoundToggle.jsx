import { useState } from 'react';
import { isMuted, playPop, setMuted } from '../utils/audio';

/** Botón de silencio. La preferencia se guarda en localStorage (`triage_muted`). */
export default function SoundToggle({ className = '' }) {
  const [muted, setLocal] = useState(isMuted);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setLocal(next);
    if (!next) playPop();
  };

  return (
    <button
      onClick={toggle}
      className={`btn btn-ghost w-11 min-h-[44px] px-0 ${className}`}
      aria-label={muted ? 'Activar sonido' : 'Silenciar'}
      aria-pressed={muted}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
