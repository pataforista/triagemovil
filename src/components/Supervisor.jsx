import React, { useEffect, useState } from 'react';

// A sarcastic senior doctor
const QUOTES = {
    start: [
        "¿Ya terminaste tu café? Los pacientes no se curan solos.",
        "Mira, un residente nuevo. A ver cuánto duras sin llorar.",
        "Si matas a alguien, asegúrate de llenar el formulario correcto.",
        "La medicina es simple: entra aire, sale aire. No lo arruines."
    ],
    good: [
        "No estuvo mal. Para ser tú.",
        "Aceptable. Siguiente.",
        "¿Leíste un libro de medicina por fin?",
        "Mmm. ¿Suerte de principiante?"
    ],
    bad: [
        "¿Estás intentando reducir la población mundial?",
        "Eso fue vergonzoso. Incluso para un R1.",
        "Mis plantas tienen mejor criterio clínico.",
        "¿Dónde compraste tu título? ¿En una caja de cereal?"
    ],
    combo: [
        "¡Estás en racha! No te emociones.",
        "Vaya, parece que sabes lo que haces.",
        "Impresionante. Casi pareces un doctor de verdad."
    ]
};

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Supervisor({ state, score }) {
    const [msg, setMsg] = useState("");
    const [visible, setVisible] = useState(false);
    const [renderObj, setRenderObj] = useState(false);
    const isFirstMount = React.useRef(true);

    // Reacciona a los cambios de estado (incluye el montaje inicial con state='START')
    useEffect(() => {
        if (isFirstMount.current && state === 'START') {
            isFirstMount.current = false;
            // Solo mostramos mensaje inicial si realmente queremos. En este caso sí, pero de forma controlada.
            // Para evitar el doble render si cambia inmediatamente, lo hacemos así:
        }

        let text = "";
        if (state === 'START') text = random(QUOTES.start);
        else if (state === 'GOOD') text = random(QUOTES.good);
        else if (state === 'BAD') text = random(QUOTES.bad);
        else if (state === 'COMBO') text = random(QUOTES.combo);

        if (!text) return;

        // Patrón intencional "toast al cambiar de prop": muestra un mensaje
        // aleatorio del supervisor y lo auto-oculta tras 5s. La aleatoriedad y
        // el temporizador hacen que deba vivir en un efecto que reacciona a las props.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMsg(text);
        setVisible(true);
        setRenderObj(true);
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    }, [state, score]);

    // Cleanup tras fadeout
    useEffect(() => {
        if (!visible && renderObj) {
            const timer = setTimeout(() => setRenderObj(false), 300); // match transition
            return () => clearTimeout(timer);
        }
    }, [visible, renderObj]);

    if (!renderObj) return null;

    // Define color themes based on the doctor's reaction
    const getReactionStyles = () => {
        switch (state) {
            case 'BAD':
                return {
                    border: 'border-rose-500/80',
                    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.4)]',
                    textColor: 'text-rose-400',
                    badge: 'bg-rose-950/80 text-rose-200 border-rose-500/30',
                    bg: 'bg-slate-950/95 border-l-4 border-l-rose-500',
                    indicator: 'bg-rose-500 animate-ping'
                };
            case 'GOOD':
            case 'COMBO':
                return {
                    border: 'border-emerald-500/80',
                    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.35)]',
                    textColor: 'text-emerald-400',
                    badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
                    bg: 'bg-slate-950/95 border-l-4 border-l-emerald-500',
                    indicator: 'bg-emerald-400 animate-pulse'
                };
            default:
                return {
                    border: 'border-cyan-500/70',
                    glow: 'shadow-[0_0_12px_rgba(6,182,212,0.25)]',
                    textColor: 'text-cyan-400',
                    badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
                    bg: 'bg-slate-950/95 border-l-4 border-l-cyan-500',
                    indicator: 'bg-cyan-400 animate-pulse'
                };
        }
    };

    const styles = getReactionStyles();

    return (
        <div
            key={msg}
            className={`absolute top-[84px] right-4 z-50 flex items-start max-w-[210px] transition-all duration-300 ${
                !visible ? 'opacity-0 scale-95 translate-y-[-10px]' : (state === 'BAD' ? 'shake-heavy opacity-100 scale-100' : 'animate-bounce-in opacity-100 scale-100')
            }`}
        >
            {/* Speach bubble content */}
            <div 
                className={`glass p-3 rounded-tr-none rounded-br-2xl text-[11px] text-slate-100 shadow-2xl mr-2.5 relative leading-relaxed backdrop-blur-md ${styles.bg} ${styles.glow}`}
            >
                <div className="flex items-center justify-between gap-2 mb-1 border-b border-white/5 pb-1">
                    <span className={`font-black uppercase tracking-wider text-[8px] ${styles.textColor}`}>
                        Dr. Jaspers
                    </span>
                    <span className={`text-[7px] font-mono px-1 rounded border ${styles.badge} flex items-center gap-1`}>
                        <span className={`w-1 h-1 rounded-full ${styles.indicator}`}></span>
                        COMS LINK
                    </span>
                </div>
                <p className="italic font-medium text-slate-200">
                    "{msg}"
                </p>
                {/* Speech arrow pointing to doctor */}
                <div className="absolute top-2.5 -right-[6px] w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-slate-950 border-b-[6px] border-b-transparent"></div>
            </div>

            {/* Doctor avatar circle */}
            <div 
                className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-lg bg-slate-900 flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 ${styles.border} ${styles.glow}`}
            >
                {state === 'BAD' ? '😡' : state === 'COMBO' ? '😎' : '👨‍⚕️'}
            </div>
        </div>
    );
}
