export const NAMES = [
    "Sra. Carmen", "El Jony", "Don Pedro", "Luisa", "Marco", "Valeria", "Sofía",
    "Roberto", "Doña Tere", "Kevin", "Ángel", "Daniela", "Mauricio", "Beatriz",
    "Anahí", "Héctor", "Cynthia", "Teresa", "Miguel", "Laura", "Rocío", "Iván",
    "Claudia", "Felipe", "Eduardo", "Brenda", "Jazmín", "Luis", "Karina"
];

/* 1. CASOS ALTA (8) */
export const CASES_ALTA = [
    { type: "ALTA", score: 80, sprite: "😖", diag: "Somatización leve", txt: ["Me duele todo desde que discutí con mi jefe."], vitals: ["FC 80 | TA 120/80 | Sat 99%"] },
    { type: "ALTA", score: 80, sprite: "😬", diag: "Ansiedad situacional", txt: ["Tengo entrevista mañana y no puedo dormir."], vitals: ["FC 92 | TA 130/80"] },
    { type: "ALTA", score: 80, sprite: "😴", diag: "Insomnio por estrés", txt: ["Tengo tres días sin dormir por tareas."], vitals: ["FC 78 | Pupilas normales"] },
    { type: "ALTA", score: 80, sprite: "😢", diag: "Duelo sin complicaciones", txt: ["No puedo dejar de llorar desde que falleció mi tía."], vitals: ["FC 72 | TA 118/76"] },
    { type: "ALTA", score: 80, sprite: "🤨", diag: "Simulación administrativa", txt: ["Solo necesito justificante para faltar al trabajo."], vitals: ["FC 70 | Sonríe al felicitar"] },
    { type: "ALTA", score: 80, sprite: "😕", diag: "Crisis adaptativa", txt: ["Estoy abrumado por mis deudas."], vitals: ["FC 85 | Sat 100%"] },
    { type: "ALTA", score: 80, sprite: "😤", diag: "Problema interpersonal", txt: ["Mi pareja me dejó en visto y me alteré."], vitals: ["FC 80 | Pupilas normales"] },
    { type: "ALTA", score: 80, sprite: "😟", diag: "Episodio ansioso leve", txt: ["Me mareé en el metro, pensé que me desmayaba."], vitals: ["FC 90 | Sat 100%"] }
];

/* 2. CASOS OBS (10) */
export const CASES_OBS = [
    { type: "OBS", score: 120, sprite: "😰", diag: "Crisis de pánico", txt: ["Siento que voy a morir, ayúdeme."], vitals: ["FC 130 | Sat 99%"] },
    { type: "OBS", score: 120, sprite: "😶‍🌫️", diag: "Ataque disociativo", txt: ["Todo se siente irreal, floto fuera de mí."], vitals: ["FC 95 | Pupilas normales"] },
    { type: "OBS", score: 120, sprite: "🍃", diag: "Intoxicación cannabis", txt: ["Comí un brownie y escucho mis latidos."], vitals: ["FC 120 | TA 150/90"] },
    { type: "OBS", score: 120, sprite: "🍄", diag: "Intox. alucinógenos", txt: ["Los colores hablan más fuerte que tú."], vitals: ["FC 110 | Pupilas dilatadas"] },
    { type: "OBS", score: 120, sprite: "🍺", diag: "Alcoholización aguda", txt: ["Vine porque mi ex está aquí… creo."], vitals: ["FC 100 | Aliento etílico +"] },
    { type: "OBS", score: 120, sprite: "😞", diag: "Ideación suicida leve", txt: ["A veces pienso que no vale la pena."], vitals: ["FC 80 | Sat 100%"] },
    { type: "OBS", score: 120, sprite: "👁️", diag: "Psicosis breve", txt: ["El vecino me observa por el enchufe."], vitals: ["FC 90 | TA 130/80"] },
    { type: "OBS", score: 120, sprite: "😤", diag: "Hiperventilación", txt: ["Mis manos se entumen, siento que me voy."], vitals: ["FC 140 | PaCO2 bajo"] },
    { type: "OBS", score: 120, sprite: "😡", diag: "Agitación leve", txt: ["Si me dicen que me calme, voy a explotar."], vitals: ["FC 100 | Pupilas normales"] },
    { type: "OBS", score: 120, sprite: "⚡", diag: "Reacción estrés agudo", txt: ["Choqué hace una hora, sigo temblando."], vitals: ["FC 115 | TA 145/90"] }
];

/* 3. CASOS UCE (10) */
export const CASES_UCE = [
    { type: "UCE", score: 200, sprite: "👹", diag: "Psicosis aguda", txt: ["El demonio me ordenó venir a matarlos."], vitals: ["FC 120 | TA 150/95"] },
    { type: "UCE", score: 200, sprite: "💸", diag: "Manía (Gastos)", txt: ["¡Compro el hospital! ¿Cuánto cuesta?"], vitals: ["FC 115 | Pupilas dilatadas"] },
    { type: "UCE", score: 200, sprite: "🔪", diag: "Riesgo suicida alto", txt: ["Guardé las pastillas para tomarlas hoy."], vitals: ["FC 105 | Diaforesis +"] },
    { type: "UCE", score: 200, sprite: "🌑", diag: "Depresión psicótica", txt: ["Mi alma ya no existe, estoy muerto."], vitals: ["FC 90 | Sat 100%"] },
    { type: "UCE", score: 200, sprite: "💥", diag: "Agitación Metanfetamina", txt: ["¡No me toquen! ¡Soy invencible!"], vitals: ["FC 150 | TA 170/110 | Pup 6mm"] },
    { type: "UCE", score: 200, sprite: "🛰️", diag: "Psicosis paranoide", txt: ["Hay drones siguiéndome desde ayer."], vitals: ["FC 110 | TA 140/85"] },
    { type: "UCE", score: 200, sprite: "🥊", diag: "Riesgo heteroagresivo", txt: ["Si se acerca ese doctor, lo reviento."], vitals: ["FC 130 | Rigidez muscular"] },
    { type: "UCE", score: 200, sprite: "🩸", diag: "Intento suicida reciente", txt: ["Solo quería dejar de sentir."], vitals: ["FC 110 | TA 100/60 | Piel fría"] },
    { type: "UCE", score: 200, sprite: "📡", diag: "Delirios intensos", txt: ["Mi familia fue reemplazada por dobles."], vitals: ["FC 100 | Pupilas normales"] },
    { type: "UCE", score: 200, sprite: "💊", diag: "Abstinencia Benzos", txt: ["Tengo tres días sin mi clonazepam."], vitals: ["FC 125 | TA 155/95 | Temblor ++"] }
];

/* 4. TRAMPAS (6) */
export const CASES_TRAMPA = [
    { type: "TRAP", real: "OBS", score: 150, sprite: "🥴", diag: "Hipoglucemia", txt: ["Se me olvidó comer, visión borrosa."], vitals: ["Glu 42 mg/dL | TA 100/60"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🤒", diag: "Delirium Febril", txt: ["Me siento confundido y muy caliente."], vitals: ["Temp 39.1°C | FC 120"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "💀", diag: "Intox. Opioides", txt: ["(No responde, balbucea)"], vitals: ["FR 7 rpm | Pupilas puntiformes"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🧩", diag: "Encefalopatía HTA", txt: ["Todo está borroso, me duele la cabeza."], vitals: ["TA 210/120 | FC 105"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🫁", diag: "Hipoxia / Neumonía", txt: ["No sé dónde estoy, la tele me grita."], vitals: ["Temp 38.3°C | Sat 88%"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🚽", diag: "Globo Vesical", txt: ["¡Me quiero arrancar los pantalones!"], vitals: ["Abd distendido | FC 120"] }
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

export function generatePatient(levelId) {
    let pool = [...CASES_ALTA, ...CASES_OBS];
    if (levelId >= 2) pool = [...pool, ...CASES_UCE];
    if (levelId >= 3) pool = [...pool, ...CASES_TRAMPA];

    const base = random(pool);

    return {
        id: Date.now() + Math.random(),
        name: random(NAMES),
        age: randint(18, 75),
        type: base.type,
        real: base.real || null,
        diag: base.diag,
        score: base.score,
        sprite: base.sprite,
        complaint: random(base.txt),
        vitals: random(base.vitals)
    };
}
