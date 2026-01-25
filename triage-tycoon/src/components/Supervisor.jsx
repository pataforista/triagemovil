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

    // React to state changes
    useEffect(() => {
        let text = "";
        if (state === 'START') text = random(QUOTES.start);
        else if (state === 'GOOD') text = random(QUOTES.good);
        else if (state === 'BAD') text = random(QUOTES.bad);
        else if (state === 'COMBO') text = random(QUOTES.combo);

        if (text) {
            setMsg(text);
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [state, score]);

    // Force show at mount
    useEffect(() => {
        setMsg(random(QUOTES.start));
        setVisible(true);
        const t = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(t);
    }, []);

    if (!visible) return null;

    return (
        <div className="absolute top-16 right-4 z-50 flex items-start max-w-[200px] animate-bounce-in">
            <div className="glass p-3 rounded-tr-none rounded-br-2xl border-l-4 border-l-cyan-500 text-xs text-slate-200 shadow-xl mr-2 relative bg-slate-900/90">
                <span className="font-bold text-cyan-400 block mb-1">Dr. Jaspers:</span>
                "{msg}"
                {/* Speech arrow */}
                <div className="absolute top-2 -right-2 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-slate-900 border-b-[8px] border-b-transparent"></div>
            </div>
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500 shadow-lg bg-slate-800 flex items-center justify-center text-3xl">
                👨‍⚕️
            </div>
        </div>
    );
}
