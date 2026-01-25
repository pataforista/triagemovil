export const NAMES = [
    "Carmen", "Jorge", "Pedro", "Luisa", "Marco", "Valeria", "Sofía",
    "Roberto", "Teresa", "Kevin", "Ángel", "Daniela", "Mauricio", "Beatriz",
    "Anahí", "Héctor", "Cynthia", "Miguel", "Laura", "Rocío", "Iván",
    "Claudia", "Felipe", "Eduardo", "Brenda", "Jazmín", "Luis", "Karina",
    "Santiago", "Fernanda", "Diego", "Valentina", "Mateo", "Camila", "Sebastián"
];

/* 
   GUÍA DE INTEGRIDAD CLÍNICA & LENGUAJE:
   - Evitar términos peyorativos (ej. "loco", "maniaco" como insulto).
   - Usar terminología técnica precisa para 'vitals'.
   - Mantener el tono educativo pero lúdico.
*/

/* 1. CASOS ALTA (30) */
/* Pacientes estables, problemas menores o psicosociales leves. */
export const CASES_ALTA = [
    // Ansiedad / Estrés
    { type: "ALTA", score: 80, sprite: "😰", diag: "Ansiedad Situacional", txt: ["Tengo examen mañana y siento que me falta el aire."], vitals: ["FC 90 | Sat 99% | Pulmones limpios"] },
    { type: "ALTA", score: 80, sprite: "😖", diag: "Cefalea tensional", txt: ["Me duele la cabeza como una banda apretada."], vitals: ["FC 78 | TA 120/80 | Neuro focal normal"] },
    { type: "ALTA", score: 80, sprite: "😴", diag: "Higiene de sueño deficiente", txt: ["No puedo dormir bien desde hace una semana."], vitals: ["FC 70 | Pupilas normales | Afebril"] },
    { type: "ALTA", score: 80, sprite: "😢", diag: "Duelo no complicado", txt: ["Falleció mi abuela y no dejo de llorar."], vitals: ["FC 76 | TA 118/76 | Orientado"] },
    { type: "ALTA", score: 80, sprite: "💼", diag: "Burnout laboral", txt: ["Odio mi trabajo, me siento agotado siempre."], vitals: ["FC 80 | TA 125/85 | Físicamente sano"] },
    { type: "ALTA", score: 80, sprite: "💔", diag: "Ruptura amorosa", txt: ["Mi pareja me dejó y siento un dolor en el pecho."], vitals: ["ECG Normal | FC 85 | Dolor no anginoso"] },
    { type: "ALTA", score: 80, sprite: "😨", diag: "Fobia específica (Agujas)", txt: ["Me mareé al ver que me iban a sacar sangre."], vitals: ["FC 60 (Recuperado) | TA 110/70"] },
    { type: "ALTA", score: 80, sprite: "🗣️", diag: "Disfonía funcional", txt: ["Me quedé sin voz después de gritar en el concierto."], vitals: ["Afebril | Orofaringe normal"] },

    // Problemas Sociales / Administrativos
    { type: "ALTA", score: 80, sprite: "📄", diag: "Solicitud administrativa", txt: ["Solo vengo por un justificante médico para el trabajo."], vitals: ["FC 72 | TA 120/80 | Asintomático"] },
    { type: "ALTA", score: 80, sprite: "💊", diag: "Resurtido de receta", txt: ["Se me acabó mi sertralina, ¿me da otra receta?"], vitals: ["Estable | Paciente conocido"] },

    // Psiquiatría Leve / Somatización
    { type: "ALTA", score: 80, sprite: "🦵", diag: "Somatización leve", txt: ["Siento hormigueo en las manos cuando me enojo."], vitals: ["FC 88 | Hiperventilación leve | Carpopedal no"] },
    { type: "ALTA", score: 80, sprite: "😣", diag: "Hipocondría (T. Ansiedad)", txt: ["Leí en internet que mi lunar es cáncer terminal."], vitals: ["Lesión benigna | FC 90 por ansiedad"] },
    { type: "ALTA", score: 80, sprite: "🧼", diag: "Rasgos obsesivos leves", txt: ["Me lavo las manos 10 veces al día, ¿es normal?"], vitals: ["Piel integra | Sin datos de dermatitis"] },
    { type: "ALTA", score: 80, sprite: "😡", diag: "Irritabilidad inespecífica", txt: ["Estoy muy de malas, peleo con todos."], vitals: ["FC 85 | TA 130/85 | Sin agresividad física"] },
    { type: "ALTA", score: 80, sprite: "🍫", diag: "Atracón alimenticio", txt: ["Comí demasiado por ansiedad y me duele la panza."], vitals: ["Abd blando | Ruidos presentes | FC 80"] },

    // Neurología / Otros leves
    { type: "ALTA", score: 80, sprite: "😵", diag: "Vértigo postural benigno", txt: ["Si me levanto rápido se me mueve el piso."], vitals: ["Dix-Hallpike + | Neuro focal normal"] },
    { type: "ALTA", score: 80, sprite: "🔑", diag: "Olvidos benignos", txt: ["Olvido dónde dejo las llaves, ¿tengo Alzheimer?"], vitals: ["Mini-mental 30/30 | FC 70"] },
    { type: "ALTA", score: 80, sprite: "🎮", diag: "Fatiga visual", txt: ["Veo borroso tras jugar 12 horas seguidas."], vitals: ["Agudeza visual normal | Ojos rojos leves"] },
];

/* 2. CASOS OBS (30) */
/* Urgencias reales, requieren monitoreo o tratamiento agudo, pero no riesgo vital inmediato. */
export const CASES_OBS = [
    // Crisis de Ansiedad / Pánico
    { type: "OBS", score: 120, sprite: "😱", diag: "Crisis de Pánico", txt: ["¡Me estoy infartando! ¡Ayuda!"], vitals: ["FC 130 | EKG Sinusal | Troponinas (-)"] },
    { type: "OBS", score: 120, sprite: "💨", diag: "Hiperventilación Psicógena", txt: ["Siento que no me entra aire (jadeando)."], vitals: ["Sat 100% | PaCO2 bajo | Parestesias"] },

    // Intoxicaciones / Abstinencia moderada
    { type: "OBS", score: 120, sprite: "🥴", diag: "Intoxicación Etílica", txt: ["(Habla pastoso) Todo me da vueltas doc..."], vitals: ["Glasgow 14 | Ataxia | Olor etílico ++"] },
    { type: "OBS", score: 120, sprite: "🌿", diag: "Intoxicación Cannabis", txt: ["Siento que el tiempo se detuvo. Tengo miedo."], vitals: ["FC 115 | Conjuntivas hiperémicas | Boca seca"] },
    { type: "OBS", score: 120, sprite: "🍄", diag: "Mal viaje (Alucinógenos)", txt: ["Las paredes respiran y me juzgan."], vitals: ["FC 110 | Pupilas dilatadas | Orientado parcialmente"] },
    { type: "OBS", score: 120, sprite: "🫳", diag: "Abstinencia Alcohólica Leve", txt: ["Dejé de beber ayer y estoy temblando."], vitals: ["FC 100 | Temblor distal | TA 140/90"] },

    // Psicosis / Agitación moderada
    { type: "OBS", score: 120, sprite: "👁️", diag: "Psicosis Breve", txt: ["El vecino me espía por las tomas de corriente."], vitals: ["FC 90 | Alerta | Sin agresividad actual"] },
    { type: "OBS", score: 120, sprite: "🤨", diag: "Delirio Celotípico", txt: ["Mi esposa me es infiel con el cartero invisible."], vitals: ["FC 85 | TA 130/80 | Juicio alterado"] },
    { type: "OBS", score: 120, sprite: "👻", diag: "Alucinaciones auditivas", txt: ["Escucho voces que murmuran mi nombre."], vitals: ["FC 80 | Orientado | Sin comandos imperativos"] },

    // Trastornos del Ánimo / Personalidad
    { type: "OBS", score: 120, sprite: "🌑", diag: "Ideación Suicida (Sin plan)", txt: ["A veces pienso que sería mejor no despertar."], vitals: ["FC 75 | Tristeza profunda | Sin plan activo"] },
    { type: "OBS", score: 120, sprite: "🎢", diag: "Hipomanía", txt: ["¡Tengo mil ideas! ¡Voy a escribir 5 libros hoy!"], vitals: ["FC 105 | Verborrea | Ánimo expansivo"] },
    { type: "OBS", score: 120, sprite: "🔪", diag: "Auto-lesiones no suicidas", txt: ["Me corté el brazo para aliviar el dolor emocional."], vitals: ["Heridas superficiales | FC 90 | Hemorragia yugulada"] },
    { type: "OBS", score: 120, sprite: "🎭", diag: "Crisis Disociativa", txt: ["No siento mi cuerpo, es como si no fuera yo."], vitals: ["FC 88 | Pupilas normales | Mirada perpleja"] },

    // Orgánicos / Geriátricos
    { type: "OBS", score: 120, sprite: "👴", diag: "Delirium Hipoactivo", txt: ["(Paciente anciano, muy quieto y confundido)"], vitals: ["Desorientado T/E | FC 70 | Sin fiebre"] },
    { type: "OBS", score: 120, sprite: "🗺️", diag: "Fuga Disociativa", txt: ["No sé quién soy ni cómo llegué a esta ciudad."], vitals: ["FC 80 | Sin identificación | Neurológico normal"] },
    { type: "OBS", score: 120, sprite: "🍟", diag: "Descontrol metabólico leve", txt: ["Me siento mareado, soy diabético."], vitals: ["Glu 250 mg/dL | Cetonas (-) | Hidratado"] },
];

/* 3. CASOS UCE (30) */
/* Peligro de vida, riesgo inminente para sí o terceros, inestabilidad hemodinámica. */
export const CASES_UCE = [
    // Agitación Psicomotriz Severa
    { type: "UCE", score: 200, sprite: "🤬", diag: "Agitación Violenta", txt: ["¡Los voy a matar a todos! ¡Suéltenme!"], vitals: ["FC 140 | Requiere sujeción | Riesgo inminente"] },
    { type: "UCE", score: 200, sprite: "⚡", diag: "Intox. Estimulantes (Coca/Met)", txt: ["¡Soy Dios! ¡Nada puede lastimarme!"], vitals: ["FC 160 | TA 180/110 | Midriasis | Diaforesis"] },
    { type: "UCE", score: 200, sprite: "🦁", diag: "Manía con Psicosis", txt: ["¡El presidente me busca para salvar al mundo!"], vitals: ["FC 120 | Insomnio severo | Juicio nulo"] },

    // Riesgo Suicida Alto
    { type: "UCE", score: 200, sprite: "💊", diag: "Sobredosis de Fármacos", txt: ["Me tomé todo el frasco hace 30 minutos."], vitals: ["Somnolencia | FC y TA inestables | Lavado urgente"] },
    { type: "UCE", score: 200, sprite: "🩸", diag: "Intento Suicida Violento", txt: ["(Herida profunda en cuello/muñeca)"], vitals: ["Sangrado activo | Hipotensión | Pálidez"] },
    { type: "UCE", score: 200, sprite: "🪑", diag: "Plan Suicida Estructurado", txt: ["Tengo la pistola cargada en mi mochila."], vitals: ["FC 100 | Frialdad afectiva | Alto riesgo"] },

    // Cuadros Orgánicos Graves / Delirium
    { type: "UCE", score: 200, sprite: "👺", diag: "Delirium Tremens", txt: ["¡Quiténme las arañas de encima! Fuego!"], vitals: ["FC 140 | TA 170/100 | Temblor severo | Fiebre"] },
    { type: "UCE", score: 200, sprite: "🌡️", diag: "Síndrome Neuroléptico Maligno", txt: ["(Rigidez extrema, no responde)"], vitals: ["Temp 40°C | Rigidez muscular | CPK alta"] },
    { type: "UCE", score: 200, sprite: "🦋", diag: "Tormenta Tiroidea / Psicosis", txt: ["(Terror extremo, ojos saltones)"], vitals: ["FC 180 (FA) | Temp 39°C | Exoftalmos"] },
    { type: "UCE", score: 200, sprite: "🔋", diag: "Intoxicación por Litio", txt: ["(Tiembla, camina como ebrio, vomita)"], vitals: ["Ataxia severa | Disartria | Nistagmo"] },

    // Depresión Grave / Catatonia
    { type: "UCE", score: 200, sprite: "🗿", diag: "Catatonia Maligna", txt: ["(Inmóvil, postura extraña, no come)"], vitals: ["Flexibilidad cérea | Fiebre central | Deshidratación"] },
    { type: "UCE", score: 200, sprite: "😶", diag: "Depresión Psicótica", txt: ["Estoy muerto, mis órganos se pudrieron."], vitals: ["Delirio nihilista (Cotard) | Rechazo a ingesta"] },

    // Otros
    { type: "UCE", score: 200, sprite: "👶", diag: "Psicosis Puerperal", txt: ["Mi bebé es el diablo, debo proteger al mundo."], vitals: ["Post-parto reciente | Desorganización severa"] },
    { type: "UCE", score: 200, sprite: "👵", diag: "Demencia con Agitación", txt: ["(No reconoce, golpea cuidadores)"], vitals: ["Desorientación total | Combativo"] },
];

/* 4. TRAMPAS (15) */
/* Parecen una cosa pero son otra. Requieren leer los signos vitales. */
export const CASES_TRAMPA = [
    // Parecen Psiquiátricos (OBS/ALTA) -> Son Médicos Graves (UCE)
    { type: "TRAP", real: "UCE", score: 150, sprite: "🍬", diag: "Hipoglucemia Severa", txt: ["Actitud extraña, agresiva y sudoroso."], vitals: ["Glu 35 mg/dL (!)| Piel fría"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🥵", diag: "Meningitis / Encefalitis", txt: ["Está 'loco', grita y tiene fiebre."], vitals: ["Rigidez de nuca | Temp 39.5°C | Kernig (+)"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧠", diag: "EVC (Ictus)", txt: ["Dejó de hablar de repente, parece confuso."], vitals: ["Asimetría facial | Hemiparesia derecha"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🫁", diag: "Hipoxia Cerebral", txt: ["Está combativo y muy agitado de la nada."], vitals: ["Sat 82% (!) | Cianosis distal | Taquipnea"] },

    // Parecen Graves (UCE) -> Son Leves/Simulación (ALTA)
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🎭", diag: "Pseudocrisis (Conversiva)", txt: ["(Convulsiona en el suelo con ojos cerrados)"], vitals: ["Resistencia apertura ocular | No hay cianosis | Sat 99%"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🤥", diag: "Simulación (Malingering)", txt: ["¡Me duele la espalda, denme opioides o demando!"], vitals: ["Marcha antálgica inconstante | Se ríe con celular"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🧛", diag: "Personalidad Dramática", txt: ["¡Me voy a matar si no me atienden YA!"], vitals: ["Cortes superficiales antiguos | Signos vitales normales"] },

    // Parecen Borrachos -> Son otra cosa
    { type: "TRAP", real: "UCE", score: 150, sprite: "🤕", diag: "Hematoma Subdural", txt: ["Se cayó ayer, hoy está 'dormilón' y raro."], vitals: ["Pupilas anisocóricas (desiguales) | Bradicardia"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🚽", diag: "Globo Vesical", txt: ["(Anciano gritando y agitado, se toca abdomen)"], vitals: ["Masa suprapúbica | No orina hace 12h"] },

    // Parecen Infartos -> Son Ansiedad
    { type: "TRAP", real: "ALTA", score: 150, sprite: "⚡", diag: "Costocondritis", txt: ["¡Dolor en el pecho! ¡Es un infarto!"], vitals: ["Dolor a la palpación costal | EKG Normal"] },
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

export function generatePatient(levelId) {
    let pool = [...CASES_ALTA, ...CASES_OBS];

    // Increase difficulty progressively
    if (levelId >= 2) pool = [...pool, ...CASES_UCE];

    // Add traps essentially from level 3 onwards
    if (levelId >= 3) {
        // Higher chance of traps in higher levels
        const trapChance = levelId >= 6 ? 0.4 : 0.2;
        if (Math.random() < trapChance) {
            pool = CASES_TRAMPA;
        } else {
            pool = [...pool, ...CASES_TRAMPA];
        }
    }

    const base = random(pool);

    return {
        id: Date.now() + Math.random(),
        name: random(NAMES),
        age: randint(18, 85),
        type: base.type,
        real: base.real || null,
        diag: base.diag,
        score: base.score,
        sprite: base.sprite,
        complaint: random(base.txt),
        vitals: random(base.vitals)
    };
}
