// ======================== NOMBRES EXPANDIDOS ========================
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
    "Lorenzo", "Victoria", "Rafael", "Manuela", "Bernardo", "Ramona", "Joaquín", "Pura",
    "Emiliano", "Diana", "Omar", "Patricia", "Gilberto", "Verónica", "Salvador", "Rebeca"
];

// ======================== CASOS ALTA (70) ========================
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
    { type: "ALTA", score: 80, sprite: "🤱", diag: "Posparto leve", txt: ["Me siento abrumada con el bebé."], vitals: ["EPDS 8 | Orientada | Red de apoyo presente"] },
    { type: "ALTA", score: 80, sprite: "🕷️", diag: "Fobia (arañas)", txt: ["Vi una araña y me dio taquicardia."], vitals: ["FC 95 en crisis | Ahora 70"] },
    { type: "ALTA", score: 80, sprite: "✈️", diag: "Fobia a volar", txt: ["Tengo un vuelo y siento que voy a morir."], vitals: ["FC 88 | Hiperventilación leve"] },
    { type: "ALTA", score: 80, sprite: "🌙", diag: "Terrores nocturnos", txt: ["Me despierto gritando y no recuerdo nada del sueño."], vitals: ["FC 70 basal | Sin recuerdo del episodio"] },
    { type: "ALTA", score: 80, sprite: "🏃", diag: "Piernas inquietas", txt: ["Me urge mover las piernas para dormir."], vitals: ["Ferritina baja | Neuro normal | Escala IRLSSG aplicada"] },
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
    { type: "ALTA", score: 80, sprite: "🛣️", diag: "Amnesia disociativa (leve)", txt: ["No recuerdo lo que pasó ayer."], vitals: ["FC 70 | RM normal | Sin factores de riesgo vascular | Episodio único"] },
    { type: "ALTA", score: 80, sprite: "💬", diag: "Problema conyugal", txt: ["Solo discutimos, no hablamos."], vitals: ["FC 85 | Sin violencia"] },
    { type: "ALTA", score: 80, sprite: "🐾", diag: "Duelo mascota", txt: ["Mi perro murió y no paro de llorar."], vitals: ["FC 74 | Afecto reactivo"] },
    { type: "ALTA", score: 80, sprite: "📖", diag: "TDAH inatento", txt: ["Siempre perdido, olvido citas."], vitals: ["FC 72 | TA 110/70"] },
    { type: "ALTA", score: 80, sprite: "🤢", diag: "Náusea psicógena", txt: ["Siento náuseas al ir a clase."], vitals: ["FC 80 | Abdomen normal"] },
    // NUEVOS CASOS ALTA (hasta 70)
    { type: "ALTA", score: 80, sprite: "📵", diag: "Nomofobia", txt: ["Olvidé mi celular y siento pánico."], vitals: ["FC 95 | TA 135/85"] },
    { type: "ALTA", score: 80, sprite: "🎤", diag: "Glosofobia (hablar público)", txt: ["Tengo que dar una charla y me tiembla la voz."], vitals: ["FC 110 en crisis | Ahora 80"] },
    { type: "ALTA", score: 80, sprite: "😷", diag: "Hipocondría (COVID)", txt: ["Estornudé dos veces, seguro tengo COVID."], vitals: ["Sat 99% | Afebril | PCR negativa"] },
    { type: "ALTA", score: 80, sprite: "🧘", diag: "Estrés postvacacional", txt: ["Volver al trabajo me da ansiedad."], vitals: ["FC 78 | TA 120/75"] },
    { type: "ALTA", score: 80, sprite: "🎂", diag: "Crisis existencial (edad)", txt: ["Cumplí 40 y siento que no he logrado nada."], vitals: ["FC 72 | TA 118/76"] },
    { type: "ALTA", score: 80, sprite: "🐌", diag: "Procrastinación crónica", txt: ["Dejo todo para último momento y me estreso."], vitals: ["FC 80 | Sin datos orgánicos"] },
    { type: "ALTA", score: 80, sprite: "🔊", diag: "Sensibilidad al ruido", txt: ["Los ruidos fuertes me irritan mucho."], vitals: ["FC 85 | TA 130/85"] },
    { type: "ALTA", score: 80, sprite: "🍔", diag: "Comer emocional", txt: ["Como por ansiedad y luego me siento culpable."], vitals: ["FC 75 | IMC 26"] },
    { type: "ALTA", score: 80, sprite: "🔄", diag: "Rumiación obsesiva", txt: ["No puedo dejar de darle vueltas a un problema."], vitals: ["FC 82 | TA 120/80"] },
    { type: "ALTA", score: 80, sprite: "🤳", diag: "Dependencia a redes", txt: ["Si no reviso Instagram cada 5 minutos me da ansiedad."], vitals: ["FC 88"] },
    { type: "ALTA", score: 80, sprite: "🧸", diag: "Trastorno de apego (adulto)", txt: ["Me aferro demasiado a mi pareja, sufro si no responde."], vitals: ["FC 86"] },
    { type: "ALTA", score: 80, sprite: "⚡", diag: "Síndrome de la cabaña", txt: ["Después de la pandemia me da miedo salir."], vitals: ["FC 90 | TA 130/80"] },
    { type: "ALTA", score: 80, sprite: "🎨", diag: "Bloqueo creativo", txt: ["Soy artista y no puedo crear nada, me angustia."], vitals: ["FC 70"] },
    { type: "ALTA", score: 80, sprite: "📈", diag: "Ansiedad por rendimiento", txt: ["En mi trabajo me miden todo y me estresa."], vitals: ["FC 95"] },
    { type: "ALTA", score: 80, sprite: "💔", diag: "Desamor crónico", txt: ["Mi ex me dejó hace un año y aún sufro."], vitals: ["FC 72"] },
    { type: "ALTA", score: 80, sprite: "🧹", diag: "TOC de orden", txt: ["Todo debe estar en su lugar o me altero."], vitals: ["FC 80"] },
    { type: "ALTA", score: 80, sprite: "🚗", diag: "Amaxofobia (conducir)", txt: ["Me da pánico manejar en carretera."], vitals: ["FC 100 al pensar | Basal 75"] },
    { type: "ALTA", score: 80, sprite: "🩸", diag: "Hematofobia (sangre)", txt: ["Ver sangre me da náusea y me desmayo."], vitals: ["FC 55 (vasovagal)"] },
    { type: "ALTA", score: 80, sprite: "🐈", diag: "Ailurofobia (gatos)", txt: ["Si veo un gato callejero me da taquicardia."], vitals: ["FC 98"] },
    { type: "ALTA", score: 80, sprite: "🧪", diag: "Trastorno de despersonalización", txt: ["Siento que vivo en una película, nada es real."], vitals: ["FC 85 | Neuro normal"] },
    { type: "ALTA", score: 80, sprite: "🕒", diag: "Jet lag crónico", txt: ["Viajo seguido y no logro adaptar mi sueño."], vitals: ["FC 78"] },
    { type: "ALTA", score: 80, sprite: "🧵", diag: "Tricotilomanía", txt: ["Me arranco el cabello cuando estoy ansiosa."], vitals: ["Áreas de alopecia | FC 82"] },
    { type: "ALTA", score: 80, sprite: "✋", diag: "Masturbación compulsiva", txt: ["Me masturbo varias veces al día, no puedo parar."], vitals: ["FC 90 | Sin lesiones"] },
    { type: "ALTA", score: 80, sprite: "🛍️", diag: "Compras compulsivas", txt: ["Gasté mi quincena en ropa que no necesito."], vitals: ["FC 85"] },
    { type: "ALTA", score: 80, sprite: "🏠", diag: "Trastorno de acumulación", txt: ["Mi casa está llena de cosas, no puedo tirar nada."], vitals: ["FC 80"] },
    { type: "ALTA", score: 80, sprite: "🚬", diag: "Abstinencia nicotina (síntomas leves)", txt: ["No puedo concentrarme, 2 días sin fumar."], vitals: ["FC 95 | Irritabilidad"] },
    { type: "ALTA", score: 80, sprite: "💔", diag: "Cardiofobia", txt: ["Cada vez que siento una palpitación creo que es un infarto."], vitals: ["Holter normal | FC 95 por ansiedad"] },
    { type: "ALTA", score: 80, sprite: "🌙", diag: "Trastorno de pesadillas", txt: ["Todas las noches sueño que me persiguen, grito."], vitals: ["FC 90 | Resto normal"] },
    { type: "ALTA", score: 80, sprite: "🫂", diag: "Duelo complicado (6 meses)", txt: ["Mi hijo murió hace medio año y no salgo adelante."], vitals: ["FC 85 | Sin ideación suicida"] }
];

// ======================== CASOS OBS (60) ========================
export const CASES_OBS = [
    { type: "OBS", score: 120, sprite: "😱", diag: "Crisis de Pánico", txt: ["¡Me estoy infartando! ¡Ayuda!"], vitals: ["FC 130 | EKG Sinusal | Troponinas (-)"] },
    { type: "OBS", score: 120, sprite: "💨", diag: "Hiperventilación Psicógena", txt: ["Siento que no me entra aire."], vitals: ["Sat 100% | PaCO2 bajo"] },
    { type: "OBS", score: 120, sprite: "🥴", diag: "Intoxicación Etílica", txt: ["Todo me da vueltas doc..."], vitals: ["Glasgow 14 | Ataxia | Olor etílico ++"] },
    { type: "OBS", score: 120, sprite: "🌿", diag: "Intoxicación Cannabis", txt: ["Siento que el tiempo se detuvo."], vitals: ["FC 115 | Conjuntivas hiperémicas"] },
    { type: "OBS", score: 120, sprite: "🍄", diag: "Mal viaje (Alucinógenos)", txt: ["Las paredes respiran y me juzgan."], vitals: ["FC 110 | Pupilas dilatadas"] },
    { type: "OBS", score: 120, sprite: "🫳", diag: "Abstinencia Alcohólica Leve", txt: ["Dejé de beber ayer y tiemblo."], vitals: ["FC 100 | Temblor distal"] },
    { type: "OBS", score: 120, sprite: "👁️", diag: "Psicosis Breve", txt: ["El vecino me espía."], vitals: ["FC 90 | Sin agresividad actual"] },
    { type: "OBS", score: 120, sprite: "🌑", diag: "Ideación Suicida Pasiva", txt: ["A veces pienso que sería mejor no despertar."], vitals: ["FC 75 | Sin plan activo"] },
    { type: "OBS", score: 120, sprite: "🎢", diag: "Hipomanía", txt: ["¡Tengo mil ideas! ¡Voy a escribir 5 libros! No he dormido en 3 días y me siento mejor que nunca."], vitals: ["FC 105 | Verborrea | Debut de episodio maníaco en Bipolar"] },
    { type: "OBS", score: 120, sprite: "🔪", diag: "Auto-lesiones superficiales", txt: ["Me corté el brazo para aliviar el dolor."], vitals: ["Heridas superficiales | FC 90"] },
    { type: "OBS", score: 120, sprite: "🎭", diag: "Crisis Disociativa", txt: ["No siento mi cuerpo."], vitals: ["FC 88 | Mirada perpleja"] },
    { type: "OBS", score: 120, sprite: "💥", diag: "TEPT Agudo", txt: ["Vi un accidente y lo revivo todo el tiempo."], vitals: ["FC 110 | Hipervigilancia"] },
    { type: "OBS", score: 120, sprite: "🍺", diag: "Abstinencia Moderada (CIWA 15)", txt: ["24h sin beber, tiemblo y veo cosas."], vitals: ["CIWA 15 | FC 115"] },
    { type: "OBS", score: 120, sprite: "🎧", diag: "Alucinaciones Auditivas No Imperativas", txt: ["Voces que me critican."], vitals: ["FC 88 | Sin comando imperativo"] },
    { type: "OBS", score: 120, sprite: "🧽", diag: "TOC (Limpieza severo)", txt: ["Me lavo las manos hasta sangrar."], vitals: ["Piel irritada | FC 85"] },
    { type: "OBS", score: 120, sprite: "🆔", diag: "Fuga Disociativa", txt: ["Desperté en otra ciudad sin saber por qué."], vitals: ["FC 80 | Orientado en persona"] },
    { type: "OBS", score: 120, sprite: "🌪️", diag: "Depresión agitada", txt: ["Estoy triste pero no paro de moverme."], vitals: ["FC 105 | TA 130/85"] },
    { type: "OBS", score: 120, sprite: "🤱", diag: "Depresión Postparto Moderada", txt: ["Mi bebé tiene 2 meses, no siento amor."], vitals: ["EPDS 15 | Sin ideación de daño"] },
    { type: "OBS", score: 120, sprite: "🎨", diag: "Hipomanía creativa", txt: ["3 días sin dormir, pinté 20 cuadros."], vitals: ["FC 100 | Verborrea | Conducta expansiva | Sin síntomas psicóticos"] },
    { type: "OBS", score: 120, sprite: "💘", diag: "Hipomanía sexual", txt: ["5 desconocidos esta semana, nada me para."], vitals: ["FC 98 | Conductas de riesgo"] },
    { type: "OBS", score: 120, sprite: "📺", diag: "Psicosis paranoide (estable)", txt: ["La tele me habla."], vitals: ["FC 88 | Sin agresividad"] },
    { type: "OBS", score: 120, sprite: "👤", diag: "Síndrome de Capgras", txt: ["Mi esposa es un impostor."], vitals: ["FC 85 | TA 125/80 | Sin antecedente neurológico conocido | Primera presentación"] },
    { type: "OBS", score: 120, sprite: "🔢", diag: "TOC de cotejo", txt: ["Cuento hasta 8, todo el día."], vitals: ["FC 85 | Ansiedad 9/10"] },
    { type: "OBS", score: 120, sprite: "🚶", diag: "Ataxia psicógena", txt: ["Camino raro pero no me caigo."], vitals: ["Neuro normal | Marcha inconsistente"] },
    // NUEVOS CASOS OBS
    { type: "OBS", score: 120, sprite: "🔥", diag: "Crisis de ira contenida", txt: ["Siento que voy a explotar en cualquier momento."], vitals: ["FC 120 | TA 150/90"] },
    { type: "OBS", score: 120, sprite: "💊", diag: "Intoxicación por benzodiazepinas", txt: ["Tomé varias pastillas para dormir y ahora no puedo mantenerme despierto."], vitals: ["Glasgow 13 | Pupilas normales | FR 12"] },
    { type: "OBS", score: 120, sprite: "🧠", diag: "Amnesia global transitoria", txt: ["¿Dónde estoy? ¿Dónde estoy? ¿Dónde estoy? No sé cómo llegué."], vitals: ["FC 80 | TA 125/80 | Neuro focal normal | Repetición de preguntas"] },
    { type: "OBS", score: 120, sprite: "🌊", diag: "Mareo psicógeno", txt: ["El piso se mueve, pero las pruebas son normales."], vitals: ["Prueba calórica normal | FC 88"] },
    { type: "OBS", score: 120, sprite: "😵", diag: "Desmayo funcional", txt: ["Me desmayo cada vez que veo una jeringa."], vitals: ["FC 65 | TA 105/65"] },
    { type: "OBS", score: 120, sprite: "🗣️", diag: "Síndrome de pseudobulbar", txt: ["Lloro o río sin control, me da vergüenza."], vitals: ["FC 80 | Neurológico estable"] }
];

// ======================== CASOS UCE (45) ========================
export const CASES_UCE = [
    { type: "UCE", score: 200, sprite: "🤬", diag: "Agitación Violenta", txt: ["¡Los voy a matar a todos!"], vitals: ["FC 140 | Requiere sujeción"] },
    { type: "UCE", score: 200, sprite: "⚡", diag: "Intox. Cocaína/Met", txt: ["¡Soy Dios! ¡Nada me lastima!"], vitals: ["FC 160 | TA 180/110 | Midriasis"] },
    { type: "UCE", score: 200, sprite: "💊", diag: "Sobredosis", txt: ["Me tomé todo el frasco."], vitals: ["Somnolencia | FC inestable"] },
    { type: "UCE", score: 200, sprite: "🩸", diag: "Intento Suicida Violento", txt: ["(Herida profunda)"], vitals: ["Sangrado activo | Hipotensión"] },
    { type: "UCE", score: 200, sprite: "🪑", diag: "Plan Suicida Letal", txt: ["Tengo la pistola en mi mochila."], vitals: ["FC 100 | Frialdad afectiva"] },
    { type: "UCE", score: 200, sprite: "👺", diag: "Delirium Tremens", txt: ["¡Las arañas me comen!"], vitals: ["FC 140 | Temp 40°C | Temblor"] },
    { type: "UCE", score: 200, sprite: "🌡️", diag: "SNM (Síndrome Neuroléptico Maligno)", txt: ["(Rigidez extrema, no responde)"], vitals: ["Temp 40.5°C | CPK muy alta"] },
    { type: "UCE", score: 200, sprite: "🗿", diag: "Catatonia Maligna", txt: ["(Postura extraña, no come)"], vitals: ["Fiebre central | Deshidratación"] },
    { type: "UCE", score: 200, sprite: "🤱🔪", diag: "Psicosis Puerperal", txt: ["Mi bebé es el diablo, debo ahogarlo."], vitals: ["Post-parto día 3 | Desorganización"] },
    { type: "UCE", score: 200, sprite: "⚔️", diag: "Agitación Homicida", txt: ["¡Mataré a todos, tengo un arma!"], vitals: ["FC 160 | Requiere seguridad"] },
    { type: "UCE", score: 200, sprite: "💊💊💊", diag: "Sobredosis Tricíclicos", txt: ["Se tomó 50 pastillas."], vitals: ["QRS ancho | Arritmia | Convulsión"] },
    { type: "UCE", score: 200, sprite: "🪢", diag: "Ahorcamiento Frustrado", txt: ["(Marca en cuello, cianosis)"], vitals: ["Sat 85% | Hematoma cervical"] },
    { type: "UCE", score: 200, sprite: "🦴", diag: "Anorexia Extrema (Crítica)", txt: ["Peso 30 kg, no puedo pararme."], vitals: ["FC 35 | TA 60/40 | Potasio 1.8 | Riesgo de arritmia fatal | Refeeding precautorio"] },
    { type: "UCE", score: 200, sprite: "🧠💥", diag: "Encefalitis anti-NMDA", txt: ["(Conducta bizarra, convulsiones)"], vitals: ["FC 140 | Temp 38.8 | Mov. orofaciales"] },
    { type: "UCE", score: 200, sprite: "🚗", diag: "Fuga psicomotriz extrema", txt: ["(Corre hacia el tráfico gritando)"], vitals: ["FC 150 | Hipertermia | Riesgo atropello"] },
    { type: "UCE", score: 200, sprite: "🍄💀", diag: "Psicotoxicosis (Hongos)", txt: ["Habla con árboles, intenta volar."], vitals: ["FC 140 | Midriasis | Conducta de alto riesgo"] },
    { type: "UCE", score: 200, sprite: "🫀💥", diag: "Delirium Tremens Arritmia", txt: ["(Temp 40, pulso irregular)"], vitals: ["FA con RVR | FC 170 | Inestable"] },
    { type: "UCE", score: 200, sprite: "🔫💥", diag: "Suicidio frustrado (Arma)", txt: ["(Herida en sien, consciente)"], vitals: ["Glasgow 12 | Neurocirugía urgente"] },
    { type: "UCE", score: 200, sprite: "🪨🔥", diag: "Catatonía Maligna (Fiebre)", txt: ["(Rigidez, fiebre 39.5)"], vitals: ["FC 150 | CPK 8000 | TA 80/50"] },
    { type: "UCE", score: 200, sprite: "🤱🔪💀", diag: "Infanticidio Inminente", txt: ["La voz me dice que ahogue al bebé."], vitals: ["FC 120 | Post-parto | Riesgo letal"] },
    { type: "UCE", score: 200, sprite: "🫁💀", diag: "Broncoaspiración", txt: ["(Vómito, cianosis, no respira bien)"], vitals: ["Sat 65% | Glasgow 8"] },
    // NUEVOS UCE
    { type: "UCE", score: 200, sprite: "💉", diag: "Intoxicación por opioides (coma)", txt: ["(No responde, pinchazos de naloxona)"], vitals: ["FR 6 | Miosis puntiforme | Sat 70%"] },
    { type: "UCE", score: 200, sprite: "🧠💢", diag: "Status epiléptico", txt: ["(Convulsiona sin parar)"], vitals: ["Convulsiones tónico-clónicas | FC 160"] },
    { type: "UCE", score: 200, sprite: "💢", diag: "Psicosis aguda con autoagresión", txt: ["¡Me voy a sacar los ojos!"], vitals: ["FC 140 | Riesgo inminente"] },
    { type: "UCE", score: 200, sprite: "🩸🏃", diag: "Hemorragia digestiva masiva", txt: ["Vomito sangre, me siento desmayar."], vitals: ["TA 80/50 | FC 130 | Hematemesis"] },
    { type: "UCE", score: 200, sprite: "🫁🪫", diag: "Insuficiencia respiratoria (hipoxia)", txt: ["(Confuso, agitado, cianótico)"], vitals: ["Sat 75% | PaO2 50 | Taquipnea"] },
    { type: "UCE", score: 200, sprite: "🧂", diag: "Hiponatremia sintomática", txt: ["Convulsión, confusión, náusea."], vitals: ["Na 115 | Glasgow 10"] },
    { type: "UCE", score: 200, sprite: "🍺⚡", diag: "Delirium tremens (convulsión)", txt: ["(Temblor generalizado, alucinaciones severas)"], vitals: ["FC 150 | Temp 39 | CIWA 30"] },
    { type: "UCE", score: 200, sprite: "🤰💔", diag: "Psicosis puerperal con infanticidio", txt: ["Ya intenté ahogar a mi bebé una vez."], vitals: ["Post-parto día 5 | Riesgo alto"] },
    { type: "UCE", score: 200, sprite: "🌡️💀", diag: "Golpe de calor", txt: ["(Aturdido, confuso, piel caliente)"], vitals: ["Temp 41.5°C | FC 160 | TA 80/50"] }
];

// ======================== CASOS TRAMPA (40) ========================
export const CASES_TRAMPA = [
    { type: "TRAP", real: "UCE", score: 150, sprite: "🍬", diag: "Hipoglucemia severa", txt: ["Agresivo y sudoroso, no responde."], vitals: ["Glu 25 mg/dL | Piel fría | Glasgow 9"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🥵", diag: "Meningitis bacteriana", txt: ["Grita y tiene fiebre, no tolera la luz."], vitals: ["Rigidez nuca | Temp 39.5°C | Petequias"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🧠⚡", diag: "Epilepsia lóbulo temporal (crisis resuelta)", txt: ["Miedo súbito, olor a quemado, desconexión."], vitals: ["EEG patológico | Confusión postictal | Crisis cedida"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧠💥", diag: "EVC isquémico", txt: ["Dejó de hablar de repente, confuso."], vitals: ["Afasia | Hemiparesia | TA 180/100"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🩸🧠", diag: "Hemorragia subaracnoidea", txt: ["'El peor dolor de cabeza de mi vida'."], vitals: ["TA 210/110 | Rigidez nuca"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧪☠️", diag: "Intoxicación por monóxido", txt: ["Toda la familia confusa, cefalea."], vitals: ["Sat 98% (falsa) | Carboxihemoglobina 25% | CO-oximetría necesaria"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🎭", diag: "Pseudocrisis psicógena", txt: ["(Convulsiona con ojos cerrados, resiste apertura)"], vitals: ["Resistencia a apertura ocular | Sat 99%"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🤥", diag: "Simulación", txt: ["¡Denme opioides o demando!"], vitals: ["Normal | Se ríe con celular cuando cree que no lo ven"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "⚡", diag: "Costocondritis", txt: ["¡Dolor pecho! ¡Infarto!"], vitals: ["Palpación dolorosa en costillas | EKG Normal"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🎬", diag: "Síndrome de Munchausen", txt: ["He ido a 5 hospitales hoy, tengo dolor abdominal atípico."], vitals: ["Historia inconsistente | Vitals OK"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🚽", diag: "Globo vesical", txt: ["(Anciano gritando agitado, no orina)"], vitals: ["Masa suprapúbica palpable | FC 110"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🫀🔄", diag: "TVNS (Taquicardia ventricular no sostenida)", txt: ["Palpitaciones y mareo, se desvanece por segundos."], vitals: ["FC 190 | EKG: TVNS 6 latidos"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🦋", diag: "Tirotoxicosis", txt: ["Calor, taquicardia, psicosis leve."], vitals: ["TSH indetectable | FC 120 | Temblor distal"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "😴💭", diag: "Parálisis del sueño", txt: ["Veo sombras al despertar, no me puedo mover."], vitals: ["Neurológico normal | Al dormir"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "💪", diag: "Debilidad funcional", txt: ["No muevo la pierna, pero no tengo lesión."], vitals: ["Signo de Hoover positivo | RM normal"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧠💨", diag: "Encefalopatía de Wernicke", txt: ["Bebedor crónico, confuso, ataxia."], vitals: ["Nistagmo | Tiamina urgente | Glasgow 12"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🩸💉", diag: "Endocarditis con delirio", txt: ["Confuso, fiebre, soplo cardíaco nuevo."], vitals: ["Temp 39 | Hemocultivos (+) | FC 120"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🩺", diag: "TEP masivo", txt: ["Agitación extrema y falta de aire súbita."], vitals: ["Sat 70% | TA 80/50 | D-dímero alto"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧂", diag: "Hiponatremia severa", txt: ["Confuso, nauseas, vomito en proyectil."], vitals: ["Na 110 mEq/L | Glasgow 11"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🐢", diag: "Mixedema (hipotiroidismo severo)", txt: ["Cansado, frio, triste, habla lenta."], vitals: ["TSH 120 | Bradicardia 50 | Hipotermia 35°C"] },
    // NUEVAS TRAMPAS
    { type: "TRAP", real: "UCE", score: 150, sprite: "🫁💀", diag: "Neumonía con delirium", txt: ["(Confuso, fiebre, agitado)"], vitals: ["Temp 39.5 | Sat 88% | Tos productiva"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "💊🔋", diag: "Toxicidad por litio", txt: ["Temblor, ataxia, diarrea, confuso."], vitals: ["Litio sérico 2.5 | FC 100"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🧠🩸", diag: "Hematoma subdural", txt: ["Anciano, cayó hace 3 días, ahora somnoliento."], vitals: ["Glasgow 11 | Asimetría pupilar"] },
    { type: "TRAP", real: "ALTA", score: 150, sprite: "🫀💓", diag: "Taquicardia sinusal inapropiada", txt: ["Palpitaciones todo el día, ansiedad."], vitals: ["FC 110 en reposo | EKG sinusal"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "🩸🌡️", diag: "Sepsis de foco urinario", txt: ["Anciano confuso, fiebre, orina turbia."], vitals: ["Temp 38.8 | FC 115 | TA 100/60"] },
    { type: "TRAP", real: "UCE", score: 150, sprite: "🍄🌡️", diag: "Meningoencefalitis por criptococo", txt: ["Inmunosuprimido, cefalea, rigidez nuca."], vitals: ["Temp 38.5 | Glasgow 13"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "💉🎭", diag: "Trastorno facticio (autoinyección insulina)", txt: ["Hipoglucemias recurrentes sin causa."], vitals: ["Glu 55 mg/dL | Insulina alta | Péptido C bajo"] },
    { type: "TRAP", real: "OBS", score: 150, sprite: "👴💊", diag: "Parkinson inducido por neurolépticos", txt: ["Rigidez y bradicinesia tras haloperidol."], vitals: ["Temblor de reposo | FC 80 | Afebril | CPK normal | Exposición reciente a haloperidol"] },
    // CLINICAL REVISION: Anorexia Alarma moved from OBS to TRAP (real: UCE) because it represents UCE criteria
    { type: "TRAP", real: "UCE", score: 150, sprite: "🍽️❌", diag: "Anorexia (Alarma)", txt: ["No como hace días, corazón raro."], vitals: ["FC 45 | IMC 15 | TA 90/60 | Criterios de ingreso UCE"] }
];

// ======================== FUNCIÓN DE GENERACIÓN MEJORADA ========================
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Historial anti-repetición (diagnósticos y tipos)
let ADMISSION_HISTORY = [];     // Guarda objetos { diag, type }
const MAX_HISTORY = 50;

export function generatePatient(levelId) {
    // 1. Construir pool base según nivel
    let pool = [];
    if (levelId === 1) {
        pool = [...CASES_ALTA];
    } else {
        pool = [...CASES_ALTA, ...CASES_OBS];
        if (levelId >= 2) pool = [...pool, ...CASES_UCE];
        // Las trampas se incluyen con probabilidad progresiva (nivel 3: 5%, nivel 8: 30%)
        if (levelId >= 3) {
            let trapProb = 0.05 + (levelId - 3) * 0.05;
            trapProb = Math.min(trapProb, 0.35);
            if (Math.random() < trapProb) {
                // Si sale trampa, solo mostramos trampas (pero aseguramos variedad)
                pool = [...CASES_TRAMPA];
            } else {
                pool = [...pool, ...CASES_TRAMPA];
            }
        }
    }

    // 2. Filtrar por historial para evitar repetición reciente
    let filteredPool = pool.filter(p => !ADMISSION_HISTORY.some(h => h.diag === p.diag));
    // Si el filtrado deja menos de 5 opciones, usamos el pool original (pero con penalización)
    let finalPool = filteredPool.length >= 5 ? filteredPool : pool;

    // 3. Seleccionar caso base
    const base = random(finalPool);

    // 4. Actualizar historial
    ADMISSION_HISTORY.push({ diag: base.diag, type: base.type });
    if (ADMISSION_HISTORY.length > MAX_HISTORY) ADMISSION_HISTORY.shift();

    // 5. Retornar paciente con datos aleatorios de nombre, edad y texto
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
