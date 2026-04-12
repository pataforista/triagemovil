export const NAMES = [
    "Carmen", "Jorge", "Pedro", "Luisa", "Marco", "Valeria", "Sofía",
    "Roberto", "Teresa", "Kevin", "Ángel", "Daniela", "Mauricio", "Beatriz",
    "Anahí", "Héctor", "Cynthia", "Miguel", "Laura", "Rocío", "Iván",
    "Claudia", "Felipe", "Eduardo", "Brenda", "Jazmín", "Luis", "Karina",
    "Santiago", "Fernanda", "Diego", "Valentina", "Mateo", "Camila", "Sebastián",
    "Ximena", "Adrián", "Paola", "Raúl", "Elena", "Ricardo", "Gabriela", "Hugo",
    "Fabián", "Silvia", "Oscar", "Mónica", "Andrés", "Alicia", "Rubén", "Gloria",
    "Javier", "Estela", "Tomás", "Leticia", "Víctor", "Yolanda", "Manuel", "Rosa",
    "Félix", "Irene", "Mario", "Blanca", "Arturo", "Julia", "Rogelio", "Sonia",
    "Emilio", "Pilar", "Adolfo", "Isabel", "Esteban", "Clara", "Gonzalo", "Inés",
    "Alfonso", "Marta", "Federico", "Lucía", "Gerardo", "Elsa", "Benjamín", "Adela",
    "Gregorio", "Antonia", "Agustín", "Dolores", "Bruno", "Josefa", "César", "Francisca",
    "Lorenzo", "Victoria", "Rafael", "Manuela", "Bernardo", "Ramona", "Joaquín", "Pura"
];

/* 1. CASOS ALTA (Dificultad Baja) */
export const CASES_ALTA = [
    { type: "ALTA", score: 80, sprite: "😰", diag: "Ansiedad Situacional", txt: ["Tengo examen mañana y siento que me falta el aire."], vitals: ["FC 90 | Sat 99% | Pulmones limpios"] },
    { type: "ALTA", score: 80, sprite: "😖", diag: "Cefalea tensional", txt: ["Me duele la cabeza como una banda apretada."], vitals: ["FC 78 | TA 120/80 | Neuro focal normal"] },
    { type: "ALTA", score: 80, sprite: "😴", diag: "Higiene de sueño deficiente", txt: ["No puedo dormir bien desde hace una semana."], vitals: ["FC 70 | Pupilas normales | Afebril"] },
    { type: "ALTA", score: 80, sprite: "😢", diag: "Duelo no complicado", txt: ["Falleció mi abuela y no dejo de llorar."], vitals: ["FC 76 | TA 118/76 | Orientado"] },
    { type: "ALTA", score: 80, sprite: "💼", diag: "Burnout laboral", txt: ["Odio mi trabajo, me siento agotado siempre."], vitals: ["FC 80 | TA 125/85 | Físicamente sano"] },
    { type: "ALTA", score: 80, sprite: "💔", diag: "Ruptura amorosa", txt: ["Mi pareja me dejó y siento un dolor en el pecho."], vitals: ["ECG Normal | FC 85 | Dolor no anginoso"] },
    { type: "ALTA", score: 80, sprite: "😨", diag: "Fobia específica (Agujas)", txt: ["Me mareé al ver que me iban a sacar sangre."], vitals: ["FC 60 (Recuperado) | TA 110/70"] },
    { type: "ALTA", score: 80, sprite: "🗣️", diag: "Disfonía funcional", txt: ["Me quedé sin voz después de gritar en el concierto."], vitals: ["Afebril | Orofaringe normal"] },
    { type: "ALTA", score: 80, sprite: "📄", diag: "Solicitud administrativa", txt: ["Solo vengo por un justificante médico para el trabajo."], vitals: ["FC 72 | TA 120/80 | Asintomático"] },
    { type: "ALTA", score: 80, sprite: "💊", diag: "Resurtido de receta", txt: ["Se me acabó mi sertralina, ¿me da otra receta?"], vitals: ["Estable | Paciente conocido"] },
    { type: "ALTA", score: 80, sprite: "🦵", diag: "Somatización leve", txt: ["Siento hormigueo en las manos cuando me enojo."], vitals: ["FC 88 | Hiperventilación leve | Carpopedal no"] },
    { type: "ALTA", score: 80, sprite: "😣", diag: "Hipocondría (T. Ansiedad)", txt: ["Leí en internet que mi lunar es cáncer terminal."], vitals: ["Lesión benigna | FC 90 por ansiedad"] },
    { type: "ALTA", score: 80, sprite: "🧼", diag: "Rasgos obsesivos leves", txt: ["Me lavo las manos 10 veces al día, ¿es normal?"], vitals: ["Piel integra | Sin datos de dermatitis"] },
    { type: "ALTA", score: 80, sprite: "😡", diag: "Irritabilidad inespecífica", txt: ["Estoy muy de malas, peleo con todos."], vitals: ["FC 85 | TA 130/85 | Sin agresividad física"] },
    { type: "ALTA", score: 80, sprite: "🍫", diag: "Atracón alimenticio", txt: ["Comí demasiado por ansiedad y me duele la panza."], vitals: ["Abd blando | Ruidos presentes | FC 80"] },
    { type: "ALTA", score: 80, sprite: "😵", diag: "Vértigo postural benigno", txt: ["Si me levanto rápido se me mueve el piso."], vitals: ["Dix-Hallpike + | Neuro focal normal"] },
    { type: "ALTA", score: 80, sprite: "🔑", diag: "Olvidos benignos", txt: ["Olvido dónde dejo las llaves, ¿tengo Alzheimer?"], vitals: ["Mini-mental 30/30 | FC 70"] },
    { type: "ALTA", score: 80, sprite: "🎮", diag: "Fatiga visual", txt: ["Veo borroso tras jugar 12 horas seguidas."], vitals: ["Agudeza visual normal | Ojos rojos leves"] },
    { type: "ALTA", score: 80, sprite: "📚", diag: "Trastorno adaptativo (académico)", txt: ["Suspenderé todo, no puedo concentrarme."], vitals: ["FC 82 | TA 118/76"] },
    { type: "ALTA", score: 80, sprite: "🏠", diag: "Trastorno adaptativo (mudanza)", txt: ["Me mudé hace un mes y no duermo bien."], vitals: ["FC 75 | Afebril"] },
    { type: "ALTA", score: 80, sprite: "🤱", diag: "Posparto leve", txt: ["Me siento abrumada con el bebé."], vitals: ["Epworth normal | Orientada"] },
    { type: "ALTA", score: 80, sprite: "🕷️", diag: "Fobia (arañas)", txt: ["Vi una araña y me dio taquicardia."], vitals: ["FC 95 en crisis | Ahora 70"] },
    { type: "ALTA", score: 80, sprite: "✈️", diag: "Fobia a volar", txt: ["Tengo un vuelo y siento que voy a morir."], vitals: ["FC 88 | Hiperventilación leve"] },
    { type: "ALTA", score: 80, sprite: "🌙", diag: "Terrores nocturnos", txt: ["Me despierto gritando y no recuerdo por qué."], vitals: ["FC 70 basal"] },
    { type: "ALTA", score: 80, sprite: "🏃", diag: "Piernas inquietas", txt: ["Me urge mover las piernas para dormir."], vitals: ["Ferritina baja | Neuro normal"] },
    { type: "ALTA", score: 80, sprite: "🌧️", diag: "Distimia", txt: ["Tristeza constante, pero sigo funcionando."], vitals: ["FC 70 | Sin riesgo suicida"] },
    { type: "ALTA", score: 80, sprite: "⚖️", diag: "Rasgos TOC", txt: ["Tengo que alinear todo simétricamente."], vitals: ["Funcionalidad conservada"] },
    { type: "ALTA", score: 80, sprite: "🫀", diag: "Palpitaciones (Ansiedad)", txt: ["Mi corazón late fuerte, pero el ECG es normal."], vitals: ["ECG Sinusal | FC 88"] },
    { type: "ALTA", score: 80, sprite: "🎓", diag: "Nido vacío", txt: ["Mi hijo se fue y no sé qué hacer."], vitals: ["FC 70 | Afecto reactivo"] },
    { type: "ALTA", score: 80, sprite: "📱", diag: "TAG - Hipocondría digital", txt: ["Googleo todos mis síntomas y siempre es cáncer."], vitals: ["FC 88 | TA 125/80"] },
    { type: "ALTA", score: 80, sprite: "🚦", diag: "TAG - Anticipación catastrófica", txt: ["Siempre pienso que va a pasar lo peor."], vitals: ["FC 85 | Sin hallazgos físicos"] },
    { type: "ALTA", score: 80, sprite: "🎯", diag: "TAG - Perfeccionismo", txt: ["Si no es perfecto, no sirve."], vitals: ["FC 80 | Ansiedad leve"] },
    { type: "ALTA", score: 80, sprite: "🛒", diag: "Pánico situacional", txt: ["En el súper me dan ganas de huir."], vitals: ["FC 92 | TA 130/85"] },
    { type: "ALTA", score: 80, sprite: "💍", diag: "Duelo por divorcio", txt: ["Me separé hace meses y no lo supero."], vitals: ["FC 76 | Sin ideación suicida"] },
    { type: "ALTA", score: 80, sprite: "🏥", diag: "Adaptativo (Enfermedad)", txt: ["Me diagnosticaron diabetes y no lo acepto."], vitals: ["FC 80 | Seguimiento endocrino"] },
    { type: "ALTA", score: 80, sprite: "💰", diag: "Adaptativo (Económico)", txt: ["Me quedé sin trabajo."], vitals: ["FC 78 | Red de apoyo"] },
    { type: "ALTA", score: 80, sprite: "🐕", diag: "Cinofobia (perros)", txt: ["Si veo un perro me paralizo."], vitals: ["FC 95 en exposición"] },
    { type: "ALTA", score: 80, sprite: "🌊", diag: "Talasofobia (mar)", txt: ["El mar profundo me da pánico."], vitals: ["FC 80 | TA 115/75"] },
    { type: "ALTA", score: 80, sprite: "🌃", diag: "Retraso de fase", txt: ["Me duermo a las 4 am."], vitals: ["FC 68 | TA 110/70"] },
    { type: "ALTA", score: 80, sprite: "🥗", diag: "Ortorexia (inicio)", txt: ["Solo como cosas 'puras'."], vitals: ["IMC 21 | FC 72"] },
    { type: "ALTA", score: 80, sprite: "👁️", diag: "Tic (parpadeo)", txt: ["Parpadeo fuerte desde niño."], vitals: ["FC 75 | Neuro normal"] },
    { type: "ALTA", score: 80, sprite: "🛣️", diag: "Amnesia disociativa (leve)", txt: ["No recuerdo lo que pasó ayer."], vitals: ["FC 70 | RM normal"] },
    { type: "ALTA", score: 80, sprite: "💬", diag: "Problema conyugal", txt: ["Solo discutimos, no hablamos."], vitals: ["FC 85 | Sin violencia"] },
    { type: "ALTA", score: 80, sprite: "🐾", diag: "Duelo mascota", txt: ["Mi perro murió y no paro de llorar."], vitals: ["FC 74 | Afecto reactivo"] },
    { type: "ALTA", score: 80, sprite: "📖", diag: "TDAH inatento", txt: ["Siempre perdido, olvido citas."], vitals: ["FC 72 | TA 110/70"] },
    { type: "ALTA", score: 80, sprite: "🤢", diag: "Náusea psicógena", txt: ["Siento náuseas al ir a clase."], vitals: ["FC 80 | Abdomen normal"] },
];

/* 2. CASOS OBS (Dificultad Media) */
export const CASES_OBS = [
    { type: "OBS", score: 120, sprite: "😱", diag: "Crisis de Pánico", txt: ["¡Me estoy infartando! ¡Ayuda!"], vitals: ["FC 130 | EKG Sinusal | Troponinas (-)"] },
    { type: "OBS", score: 120, sprite: "💨", diag: "Hiperventilación Psicógena", txt: ["Siento que no me entra aire."], vitals: ["Sat 100% | PaCO2 bajo"] },
    { type: "OBS", score: 120, sprite: "🥴", diag: "Intoxicación Etílica", txt: ["Todo me da vueltas doc..."], vitals: ["Glasgow 14 | Ataxia | Olor etílico ++"] },
    { type: "OBS", score: 120, sprite: "🌿", diag: "Intoxicación Cannabis", txt: ["Siento que el tiempo se detuvo."], vitals: ["FC 115 | Conjuntivas hiperémicas"] },
    { type: "OBS", score: 120, sprite: "🍄", diag: "Mal viaje (Alucinógenos)", txt: ["Las paredes respiran y me juzgan."], vitals: ["FC 110 | Pupilas dilatadas"] },
    { type: "OBS", score: 120, sprite: "🫳", diag: "Abstinencia Alcohólica Leve", txt: ["Dejé de beber ayer y tiemblo."], vitals: ["FC 100 | Temblor distal"] },
    { type: "OBS", score: 120, sprite: "👁️", diag: "Psicosis Breve", txt: ["El vecino me espía."], vitals: ["FC 90 | Sin agresividad actual"] },
    { type: "OBS", score: 120, sprite: "🌑", diag: "Ideación Suicida", txt: ["A veces pienso que sería mejor no despertar."], vitals: ["FC 75 | Sin plan activo"] },
    { type: "OBS", score: 120, sprite: "🎢", diag: "Hipomanía", txt: ["¡Tengo mil ideas! ¡Voy a escribir 5 libros!"], vitals: ["FC 105 | Verborrea"] },
    { type: "OBS", score: 120, sprite: "🔪", diag: "Auto-lesiones", txt: ["Me corté el brazo para aliviar el dolor."], vitals: ["Heridas superficiales | FC 90"] },
    { type: "OBS", score: 120, sprite: "🎭", diag: "Crisis Disociativa", txt: ["No siento mi cuerpo."], vitals: ["FC 88 | Mirada perpleja"] },
    { type: "OBS", score: 120, sprite: "💥", diag: "TEPT Agudo", txt: ["Vi un accidente y lo revivo todo el tiempo."], vitals: ["FC 110 | Hipervigilancia"] },
    { type: "OBS", score: 120, sprite: "🍺", diag: "Abstinencia Moderada", txt: ["24h sin beber, tiemblo y veo cosas."], vitals: ["CIWA 15 | FC 115"] },
    { type: "OBS", score: 120, sprite: "🎧", diag: "Alucinaciones Audas", txt: ["Voces que me critican."], vitals: ["FC 88 | Sin comando imperativo"] },
    { type: "OBS", score: 120, sprite: "🍽️❌", diag: "Anorexia (Alarma)", txt: ["No como hace días, corazón raro."], vitals: ["FC 45 | IMC 15 | TA 90/60"] },
    { type: "OBS", score: 120, sprite: "🧽", diag: "TOC (Limpieza)", txt: ["Me lavo las manos hasta sangrar."], vitals: ["Piel irritada | FC 85"] },
    { type: "OBS", score: 120, sprite: "🆔", diag: "Fuga Disociativa", txt: ["Desperté en otra ciudad sin saber por qué."], vitals: ["FC 80 | Orientado en persona"] },
    { type: "OBS", score: 120, sprite: "🌪️", diag: "Depresión agitada", txt: ["Estoy triste pero no paro de moverme."], vitals: ["FC 105 | TA 130/85"] },
    { type: "OBS", score: 120, sprite: "🤱", diag: "Postparto (Moderado)", txt: ["Mi bebé tiene 2 meses, no siento amor."], vitals: ["EPDS 15 | Sin ideación de daño"] },
    { type: "OBS", score: 120, sprite: "🎨", diag: "Hipomanía creativa", txt: ["3 días sin dormir, pinté 20 cuadros."], vitals: ["FC 100 | Verborrea"] },
    { type: "OBS", score: 120, sprite: "💘", diag: "Hipomanía sexual", txt: ["5 desconocidos esta semana, nada me para."], vitals: ["FC 98 | Conductas de riesgo"] },
    { type: "OBS", score: 120, sprite: "🚬", diag: "Abstinencia nicotina", txt: ["No puedo concentrarme, 2 días sin fumar."], vitals: ["FC 95 | Irritabilidad"] },
    { type: "OBS", score: 120, sprite: "📺", diag: "Psicosis paranoide", txt: ["La tele me habla."], vitals: ["FC 88 | Sin agresividad"] },
    { type: "OBS", score: 120, sprite: "👤", diag: "Capgras (parcial)", txt: ["Mi esposa es un impostor."], vitals: ["FC 85 | TA 125/80"] },
    { type: "OBS", score: 120, sprite: "🔢", diag: "TOC (Cotejo)", txt: ["Cuento hasta 8, todo el día."], vitals: ["FC 85 | Ansiedad 9/10"] },
    { type: "OBS", score: 120, sprite: "🚶", diag: "Ataxia psicógena", txt: ["Camino raro pero no me caigo."], vitals: ["Neuro normal | Marcha inconsistente"] },
];

/* 3. CASOS UCE (Dificultad Alta) */
export const CASES_UCE = [
    { type: "UCE", score: 200, sprite: "🤬", diag: "Agitación Violenta", txt: ["¡Los voy a matar a todos!"], vitals: ["FC 140 | Requiere sujeción"] },
    { type: "UCE", score: 200, sprite: "⚡", diag: "Intox. Cocaína/Met", txt: ["¡Soy Dios! ¡Nada me lastima!"], vitals: ["FC 160 | TA 180/110 | Midriasis"] },
    { type: "UCE", score: 200, sprite: "💊", diag: "Sobredosis", txt: ["Me tomé todo el frasco."], vitals: ["Somnolencia | FC inestable"] },
    { type: "UCE", score: 200, sprite: "🩸", diag: "Intento Suicida Violento", txt: ["(Herida profunda)"], vitals: ["Sangrado activo | Hipotensión"] },
    { type: "UCE", score: 200, sprite: "🪑", diag: "Plan Suicida Letal", txt: ["Tengo la pistola en mi mochila."], vitals: ["FC 100 | Frialdad afectiva"] },
    { type: "UCE", score: 200, sprite: "👺", diag: "Delirium Tremens", txt: ["¡Las arañas me comen!"], vitals: ["FC 140 | Temp 40°C | Temblor"] },
    { type: "UCE", score: 200, sprite: "🌡️", diag: "SNM", txt: ["(Rigidez extrema, no responde)"], vitals: ["Temp 40.5°C | CPK muy alta"] },
    { type: "UCE", score: 200, sprite: "🗿", diag: "Catatonia Maligna", txt: ["(Postura extraña, no come)"], vitals: ["Fiebre central | Deshidratación"] },
    { type: "UCE", score: 200, sprite: "🤱🔪", diag: "Psicosis Puerperal", txt: ["Mi bebé es el diablo, debo ahogarlo."], vitals: ["Post-parto día 3 | Desorganización"] },
    { type: "UCE", score: 200, sprite: "⚔️", diag: "Agitación Homicida", txt: ["¡Mataré a todos, tengo un arma!"], vitals: ["FC 160 | Requiere seguridad"] },
    { type: "UCE", score: 200, sprite: "💊💊💊", diag: "Sobredosis Tricíclicos", txt: ["Se tomó 50 pastillas."], vitals: ["QRS ancho | Arritmia | Convulsión"] },
    { type: "UCE", score: 200, sprite: "🪢", diag: "Ahorcamiento Frustrado", txt: ["(Marca en cuello, cianosis)"], vitals: ["Sat 85% | Hematoma cervical"] },
    { type: "UCE", score: 200, sprite: "🦴", diag: "Anorexia Extrema", txt: ["Peso 30 kg, no puedo pararme."], vitals: ["FC 35 | TA 60/40 | Potasio 1.8"] },
    { type: "UCE", score: 200, sprite: "🧠💥", diag: "Encefalitis anti-NMDA", txt: ["(Conducta bizarra, convulsiones)"], vitals: ["FC 140 | Temp 38.8 | Mov. orofaciales"] },
    { type: "UCE", score: 200, sprite: "🚗", diag: "Fuga psicomotriz extrema", txt: ["(Corre hacia el tráfico gritando)"], vitals: ["FC 150 | Hipertermia | Riesgo atropello"] },
    { type: "UCE", score: 200, sprite: "🍄💀", diag: "Psicotoxicosis (Hongos)", txt: ["Habla con árboles, intenta volar."], vitals: ["FC 140 | Midriasis | Conducta de alto riesgo"] },
    { type: "UCE", score: 200, sprite: "🫀💥", diag: "Delirium Tremens Arritmia", txt: ["(Temp 40, pulso irregular)"], vitals: ["FA con RVR | FC 170 | Inestable"] },
    { type: "UCE", score: 200, sprite: "🔫💥", diag: "Suicidio frustrado (Arma)", txt: ["(Herida en sien, consciente)"], vitals: ["Glasgow 12 | Neurocirugía urgente"] },
    { type: "UCE", score: 200, sprite: "🪨🔥", diag: "Catatonía Maligna (Fiebre)", txt: ["(Rigidez, fiebre 39.5)"], vitals: ["FC 150 | CPK 8000 | TA 80/50"] },
    { type: "UCE", score: 200, sprite: "🤱🔪💀", diag: "Infanticidio Inminente", txt: ["La voz me dice que ahogue al bebé."], vitals: ["FC 120 | Post-parto | Riesgo letal"] },
    { type: "UCE", score: 200, sprite: "🦴", diag: "Anorexia (Crítica)", txt: ["Peso 28 kg, no puedo pararme."], vitals: ["FC 38 | TA 60/40 | Potasio 1.8"] },
    { type: "UCE", score: 200, sprite: "🫁💀", diag: "Broncoaspiración", txt: ["(Vómito, cianosis, no respira bien)"], vitals: ["Sat 65% | Glasgow 8"] },
];

/* 4. CASOS TRAMPA (Dificultad Experto) */
export const CASES_TRAMPA = [
    { type: "TRAP", real: "UCE", score: 150, sprite: "🍬", diag: "Hipoglucemia", txt: ["Agresivo y sudoroso."], vitals: ["Glu 35 mg/dL (!)| Piel fría"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🥵", diag: "Meningitis", txt: ["Grita y tiene fiebre."], vitals: ["Rigidez nuca | Temp 39.5°C"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧠⚡", diag: "Epilepsia Temporal", txt: ["Miedo súbito, olor a quemado."], vitals: ["EEG patológico | Confusión post"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧠💥", diag: "EVC (Ictus)", txt: ["Dejó de hablar de repente."], vitals: ["Asimetría facial | Hemiparesia"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🩸🧠", diag: "HSA (Hemorragia)", txt: ["El peor dolor de cabeza de mi vida."], vitals: ["TA 180/110 | Rigidez nuca"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧪☠️", diag: "Intox. Monóxido", txt: ["Toda la familia confusa."], vitals: ["Sat 98% (falsa) | Carboxi alta"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🎭", diag: "Pseudocrisis", txt: ["(Convulsiona con ojos cerrados)"], vitals: ["Resistencia apertura | Sat 99%"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🤥", diag: "Simulación", txt: ["¡Denme opioides o demando!"], vitals: ["Normal | Se ríe con celular"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "⚡", diag: "Costocondritis", txt: ["¡Dolor pecho! ¡Infarto!"], vitals: ["Palpación (+) | EKG Normal"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🎬", diag: "Munchausen", txt: ["He ido a 5 hospitales hoy."], vitals: ["Historia inconsistente | Vitals OK"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🚽", diag: "Globo Vesical", txt: ["(Anciano gritando agitado)"], vitals: ["Masa suprapúbica | No orina"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🫀🔄", diag: "TVNS (Arritmia)", txt: ["Palpitaciones y mareo."], vitals: ["FC 190 | EKG: TVNS"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🦋", diag: "Tirotoxicosis", txt: ["Calor, taquicardia, psicosis."], vitals: ["TSH indetectable | FC 120"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "😴💭", diag: "Parálisis Sueño", txt: ["Veo sombras al despertar."], vitals: ["Neurológico normal | Al dormir"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "💪", diag: "Debilidad Funcional", txt: ["No muevo la pierna."], vitals: ["Hoover sign (+) | RM normal"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧠💨", diag: "Wernicke (Ataxia)", txt: ["Bebedor crónico, confuso."], vitals: ["Nistagmo | Tiamina urgente"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🩸💉", diag: "Endocarditis (Delirio)", txt: ["Confuso, fiebre, soplo."], vitals: ["Temp 39 | Hemocultivos (+)"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🩺", diag: "TEP Masivo", txt: ["Agitación extrema y falta de aire."], vitals: ["Sat 70% | TA 80/50"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧂", diag: "Hiponatremia Severa", txt: ["Confuso, nauseas, vomito."], vitals: ["Na 110 mEq/L | Glasgow 12"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🐢", diag: "Mixedema (Tiroides)", txt: ["Cansado, frio, triste."], vitals: ["TSH 120 | Bradicardia 50"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "😴", diag: "Narcolepsia", txt: ["Veo sombras al despertar."], vitals: ["Neuro normal | REM precoz"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🧘", diag: "Trance Cultural", txt: ["(Se queda en trance en ritual)"], vitals: ["Vitals normales | Contexto cultural"] },
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// MOTOR DE ANTI-REPETICIÓN (Guarda los últimos 30 diagnósticos vistos)
let ADMISSION_HISTORY = [];

export function generatePatient(levelId) {
    let pool = [];

    // 1. Definir pool base según nivel
    if (levelId === 1) {
        pool = [...CASES_ALTA];
    } else {
        pool = [...CASES_ALTA, ...CASES_OBS];
        if (levelId >= 2) pool = [...pool, ...CASES_UCE];
        if (levelId >= 3) {
            const trapChance = levelId >= 6 ? 0.35 : 0.15;
            if (Math.random() < trapChance) pool = [...CASES_TRAMPA];
            else pool = [...pool, ...CASES_TRAMPA];
        }
    }

    // 2. Filtrar repetidos recientes (Anti-repetitivo)
    // Intentamos filtrar si el pool es lo suficientemente grande
    let filteredPool = pool.filter(p => !ADMISSION_HISTORY.includes(p.diag));
    
    // Si filtrar deja el pool muy vacío (menos de 5 opciones), usamos el pool original
    let finalPool = filteredPool.length > 5 ? filteredPool : pool;

    const base = random(finalPool);

    // 3. Actualizar historial (limitado a 30)
    ADMISSION_HISTORY.push(base.diag);
    if (ADMISSION_HISTORY.length > 30) ADMISSION_HISTORY.shift();

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
