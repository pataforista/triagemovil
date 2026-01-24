// --- BASE DE DATOS DE PACIENTES (EXPANDIDA) ---
const PATIENT_POOL = [
    {
        id: 1,
        name: "Sofía",
        age: 28,
        complaint: "Grita que es dueña del hospital. Agitada.",
        vitals: "FC 115 lpm | Verborrea | Inquietud motora severa | Sin necesidad de sueño.",
        diagnosis: "Manía Aguda",
        triaje: "UCE",
        sprite: "👑"
    },
    {
        id: 2,
        name: "Jorge",
        age: 22,
        complaint: "Pánico intenso, cree que va a morir.",
        vitals: "FC 110 lpm | PA 135/85 mmHg | Hiperventilación | EKG: Ritmo sinusal normal.",
        diagnosis: "Crisis de Pánico",
        triaje: "OBS",
        sprite: "😰"
    },
    {
        id: 3,
        name: "Carlos",
        age: 45,
        complaint: "Tristeza crónica, sin riesgo suicida. Solicita medicación.",
        vitals: "FC 72 lpm | PA 120/80 mmHg | Facies triste | Bradipsiquia leve.",
        diagnosis: "Depresión Moderada",
        triaje: "ALTA",
        sprite: "🌧️"
    },
    {
        id: 4,
        name: "Ana",
        age: 19,
        complaint: "Intento suicida con 20 pastillas desconocidas.",
        vitals: "Glasgow 12/15 (Somnolienta) | FC 60 lpm | Pupilas isocóricas | PA 100/60 mmHg.",
        diagnosis: "Intento Suicida / Intoxicación",
        triaje: "UCE",
        sprite: "💊"
    },
    {
        id: 5,
        name: "Luis",
        age: 55,
        complaint: "Temblores severos, ve insectos en la pared.",
        vitals: "FC 125 lpm | PA 160/95 mmHg | Diaforesis profusa | Temp 37.8°C.",
        diagnosis: "Delirium Tremens",
        triaje: "UCE",
        sprite: "🐜"
    },
    {
        id: 6,
        name: "Elena",
        age: 30,
        complaint: "Ansiedad por examen mañana. Tiembla un poco.",
        vitals: "FC 90 lpm | PA 125/80 mmHg | Leve temblor distal manos.",
        diagnosis: "Ansiedad Situacional",
        triaje: "ALTA",
        sprite: "📚"
    },
    {
        id: 7,
        name: "Pedro",
        age: 25,
        complaint: "Dice que el FBI lo persigue. Agresivo.",
        vitals: "Mirada fija y amenazante | FC 105 lpm | Tensión muscular generalizada.",
        diagnosis: "Psicosis Aguda",
        triaje: "UCE",
        sprite: "🕵️"
    },
    {
        id: 8,
        name: "Marta",
        age: 60,
        complaint: "No duerme bien hace 3 días. Irritable.",
        vitals: "Signos vitales normales | Ojeras marcadas | Fatiga visible.",
        diagnosis: "Insomnio",
        triaje: "ALTA",
        sprite: "🌙"
    },
    {
        id: 9,
        name: "Raúl",
        age: 20,
        complaint: "Fumó marihuana, tiene miedo. Paranoide leve.",
        vitals: "FC 100 lpm | Inyección conjuntival (ojos rojos) | Boca seca.",
        diagnosis: "Intoxicación Cannabis",
        triaje: "OBS",
        sprite: "🌿"
    },
    {
        id: 10,
        name: "Valery",
        age: 23,
        complaint: "Cortes superficiales en brazo tras pelea.",
        vitals: "Heridas no requieren sutura | FC 85 lpm | Llanto reactivo.",
        diagnosis: "Crisis TLP (Trastorno Límite)",
        triaje: "OBS",
        sprite: "❤️‍🩹"
    },
    {
        id: 11,
        name: "Don José",
        age: 72,
        complaint: "Desorientado, se arrancó la sonda.",
        vitals: "Temp 38.5°C (Fiebre) | PA 90/60 mmHg | Desorientación temporo-espacial.",
        diagnosis: "Delirium (Probable Sepsis)",
        triaje: "UCE",
        sprite: "👴"
    },
    {
        id: 12,
        name: "María",
        age: 35,
        complaint: "Rigidez muscular extrema y mutismo.",
        vitals: "Temp 39.5°C | Rigidez 'en tubo de plomo' | CPK elevada | Taquicardia.",
        diagnosis: "Síndrome Neuroléptico Maligno",
        triaje: "UCE",
        sprite: "🌡️"
    },
    {
        id: 13,
        name: "Beto",
        age: 18,
        complaint: "Agitación extrema post-cocaína. Dolor pecho.",
        vitals: "FC 140 lpm | PA 170/100 mmHg | Midriasis bilateral.",
        diagnosis: "Intox. Estimulantes / Riesgo IAM",
        triaje: "UCE",
        sprite: "⚡"
    },
    {
        id: 14,
        name: "Clara",
        age: 40,
        complaint: "Catatonia. No se mueve, postura fija.",
        vitals: "Signos vitales estables | Flexibilidad cérea | Negativismo.",
        diagnosis: "Esquizofrenia Catatónica",
        triaje: "UCE",
        sprite: "🗿"
    },
    {
        id: 15,
        name: "Sr. X",
        age: 50,
        complaint: "Encontrado en vía pública. Coma. Olor a alcohol.",
        vitals: "Glasgow 6/15 | Hipotermia (35.5°C) | Hiporreflexia | Olor etílico.",
        diagnosis: "Intoxicación Etílica Grave",
        triaje: "UCE",
        sprite: "🍷"
    },
    {
        id: 16,
        name: "Lucía",
        age: 22,
        complaint: "Crisis convulsiva tónico-clónica en sala.",
        vitals: "Estado post-ictal (confusa) | Mordedura lateral de lengua | FC 110 lpm.",
        diagnosis: "Epilepsia / Abstinencia",
        triaje: "UCE",
        sprite: "🧠"
    },
    {
        id: 17,
        name: "Diana",
        age: 27,
        complaint: "Ataque de 'pseudoconvulsiones' (ojos cerrados).",
        vitals: "Resistencia a apertura ocular | No hay cianosis | SatO2 99%.",
        diagnosis: "Trastorno Conversivo",
        triaje: "OBS",
        sprite: "🎭"
    },
    {
        id: 18,
        name: "Paco",
        age: 45,
        complaint: "Ansiedad y temblores leves. Dejó de beber ayer.",
        vitals: "Temblor distal fino | PA 140/90 mmHg | Ansioso pero orientado.",
        diagnosis: "Abstinencia Alcohólica Leve",
        triaje: "OBS",
        sprite: "🫳"
    },
    {
        id: 19,
        name: "Sara",
        age: 30,
        complaint: "Flashback de asalto. Llora, desconectada.",
        vitals: "Hiperventilación | Taquicardia leve | Mirada perdida.",
        diagnosis: "TEPT Disociativo",
        triaje: "OBS",
        sprite: "🌫️"
    },
    {
        id: 20,
        name: "Felipe",
        age: 35,
        complaint: "Dice tener dolor 'migratorio' insoportable. Grita.",
        vitals: "Exploración física normal | Conducta dramática de dolor.",
        diagnosis: "Trastorno Somatomorfo",
        triaje: "OBS",
        sprite: "🤕"
    },
    {
        id: 21,
        name: "Lola",
        age: 80,
        complaint: "Llora porque 'su esposo no ha llegado' (falleció).",
        vitals: "Desorientación en tiempo | Signos vitales estables | Angustia emocional.",
        diagnosis: "Demencia / Crisis Angustia",
        triaje: "OBS",
        sprite: "👵"
    },
    {
        id: 22,
        name: "Mario",
        age: 29,
        complaint: "Ideación suicida pasiva ('quisiera no despertar').",
        vitals: "Facies inexpresiva | Retardo psicomotor | Sin plan estructurado.",
        diagnosis: "Depresión Mayor",
        triaje: "OBS",
        sprite: "🌑"
    },
    {
        id: 23,
        name: "Kevin",
        age: 25,
        complaint: "Quiere incapacidad laboral por 'estrés'.",
        vitals: "Examen mental y físico completamente normal | Actitud demandante.",
        diagnosis: "Simulación",
        triaje: "ALTA",
        sprite: "🤥"
    },
    {
        id: 24,
        name: "Sra. G",
        age: 50,
        complaint: "Duelo por muerte de gato hace 1 semana.",
        vitals: "Llanto | SV normales | Discurso coherente centrado en pérdida.",
        diagnosis: "Duelo Normal",
        triaje: "ALTA",
        sprite: "🐈"
    },
    {
        id: 25,
        name: "Tania",
        age: 21,
        complaint: "Miedo a las inyecciones, se mareó al ver una.",
        vitals: "Palidez cutánea | FC 55 lpm (recuperándose de síncope vasovagal).",
        diagnosis: "Fobia Específica",
        triaje: "ALTA",
        sprite: "💉"
    },
    {
        id: 26,
        name: "Rafa",
        age: 33,
        complaint: "Olvida las llaves. Cree que tiene TDAH.",
        vitals: "Inquietud leve en silla | Discurso saltígrado | SV normales.",
        diagnosis: "Posible TDAH Adulto",
        triaje: "ALTA",
        sprite: "🔑"
    },
    {
        id: 27,
        name: "Hugo",
        age: 40,
        complaint: "Celos excesivos de su esposa. Sin agresión física.",
        vitals: "Suspicacia en entrevista | SV normales | Sin psicosis activa.",
        diagnosis: "Celotipia / T. Delirante",
        triaje: "ALTA",
        sprite: "🤨"
    },
    {
        id: 28,
        name: "Vicky",
        age: 19,
        complaint: "Comió mucho y se siente culpable.",
        vitals: "Signo de Russell en nudillos (callos) | IMC normal | Electrolitos pendientes.",
        diagnosis: "Bulimia Nerviosa",
        triaje: "ALTA",
        sprite: "🍔"
    },
    {
        id: 29,
        name: "Dani",
        age: 24,
        complaint: "Agitación, sudor frío, agresivo.",
        vitals: "Glucosa capilar 45 mg/dL | Piel fría y sudorosa | Taquicardia.",
        diagnosis: "Hipoglucemia Severa (Neuroglucopenia)",
        triaje: "UCE",
        sprite: "🍬"
    },
    {
        id: 30,
        name: "Gloria",
        age: 55,
        complaint: "Ansiedad extrema, palpitaciones, ojos saltones.",
        vitals: "FC 150 lpm (Fibrilación Auricular) | Temp 38°C | Exoftalmos.",
        diagnosis: "Tormenta Tiroidea",
        triaje: "UCE",
        sprite: "🦋"
    },
    {
        id: 31,
        name: "Sr. Fracturado",
        age: 44,
        complaint: "Agitación extrema 3 días post-cirugía; grita que hay serpientes en su habitación.",
        vitals: "FC 130 lpm | PA 160/100 mmHg | Temp 38.4°C | Sudoración profusa | Temblores en manos.",
        diagnosis: "Delirium Tremens (Abstinencia Alcohólica)",
        triaje: "UCE",
        sprite: "🐍"
    },
    {
        id: 32,
        name: "Sr. Músico",
        age: 78,
        complaint: "Alucinaciones visuales (ve una orquesta en la cocina) y rigidez severa tras tomar haloperidol.",
        vitals: "Temblor de reposo | Rigidez en rueda dentada | Ojos desviados hacia arriba (distonía) | Confusión fluctuante.",
        diagnosis: "Demencia con Cuerpos de Lewy (Sensibilidad a neurolépticos)",
        triaje: "OBS",
        sprite: "🎷"
    },
    {
        id: 33,
        name: "Paciente Rígido",
        age: 24,
        complaint: "Fiebre alta y rigidez muscular severa poco después de iniciar olanzapina.",
        vitals: "Temp >39°C | PA Labil (fluctuante) | Taquicardia | Diaforesis | Rigidez 'en tubo de plomo'.",
        diagnosis: "Síndrome Neuroléptico Maligno",
        triaje: "UCE",
        sprite: "🌡️"
    },
    {
        id: 34,
        name: "Abuelo Suspicaz",
        age: 79,
        complaint: "Paranoia aguda; cree que su esposa lo envenena tras aumentar dosis de prednisona para su pulmón.",
        vitals: "Sobrepeso | Cara de luna llena | Leve taquicardia | Sin antecedentes psiquiátricos previos.",
        diagnosis: "Psicosis Inducida por Corticoides",
        triaje: "ALTA",
        sprite: "💊"
    },
    {
        id: 35,
        name: "Adolescente en Crisis",
        age: 14,
        complaint: "Depresión y ansiedad severa; rechazo persistente de sus características sexuales secundarias.",
        vitals: "Examen físico normal | Estado mental: Ánimo bajo, ansiedad | Sin psicosis.",
        diagnosis: "Disforia de Género",
        triaje: "ALTA",
        sprite: "🏳️‍⚧️"
    },
    {
        id: 36,
        name: "Paciente Desconocido",
        age: 30,
        complaint: "Encontrado inconsciente por su pareja; historial de uso de heroína.",
        vitals: "FC 70 lpm | PA 108/58 mmHg | FR 10 rpm (bradipnea) | SatO2 75% | Pupilas puntiformes (miosis).",
        diagnosis: "Intoxicación por opioides",
        triaje: "UCE",
        sprite: "💉"
    },
    {
        id: 37,
        name: "Sra. Maestra",
        age: 36,
        complaint: "Dolor torácico intenso, sudoración y miedo inminente a morir. Quinta visita a urgencias en un mes.",
        vitals: "FC 100 lpm (taquicardia) | PA 130/84 mmHg | Taquipnea | ECG normal.",
        diagnosis: "Trastorno de Pánico",
        triaje: "ALTA",
        sprite: "😰"
    },
    {
        id: 38,
        name: "Estudiante de Leyes",
        age: 20,
        complaint: "Ingesta impulsiva de pastillas (posiblemente 28 comprimidos de dotiepina) tras una discusión.",
        vitals: "Temp 38°C | FC 110 lpm (irregular) | PA 98/64 mmHg | Pupilas dilatadas | Retención urinaria.",
        diagnosis: "Sobredosis de Antidepresivos Tricíclicos",
        triaje: "UCE",
        sprite: "💊"
    },
    {
        id: 39,
        name: "Sr. Gerente",
        age: 40,
        complaint: "Sensación constante de miedo, temblores, palpitaciones e insomnio durante 3 años.",
        vitals: "FC 110 lpm | PA 140/90 mmHg | Resto del examen físico sin hallazgos agudos.",
        diagnosis: "Trastorno de Ansiedad Generalizada (TAG)",
        triaje: "ALTA",
        sprite: "😟"
    },
    {
        id: 40,
        name: "Joven en Abstinencia",
        age: 19,
        complaint: "Náuseas, dolor corporal severo, fiebre y temblores. Dice tener 'gripe' pero tiene marcas de inyección.",
        vitals: "FC 94 lpm | PA 148/98 mmHg | Pupilas dilatadas | Sudoración profusa.",
        diagnosis: "Síndrome de Abstinencia a Opioides",
        triaje: "OBS",
        sprite: "🤒"
    },
    {
        id: 41,
        name: "Joven Perfeccionista",
        age: 16,
        complaint: "Desmayo en clase de gimnasia. Se niega a comer.",
        vitals: "IMC 14 | FC 45 lpm (Bradicardia) | Hipotensión 85/50 mmHg | Lanugo.",
        diagnosis: "Anorexia Nerviosa (Grave)",
        triaje: "UCE",
        sprite: "📉"
    },
    {
        id: 42,
        name: "Sr. Limpio",
        age: 32,
        complaint: "Manos sangrando por lavado excesivo (60 veces/día).",
        vitals: "Dermatitis severa en manos | Ansiedad visible si no se lava.",
        diagnosis: "Trastorno Obsesivo-Compulsivo (TOC)",
        triaje: "ALTA",
        sprite: "🧼"
    },
    {
        id: 43,
        name: "Sra. Bipolar",
        age: 45,
        complaint: "Diarrea, vómitos, camina 'como borracha' y tiembla mucho.",
        vitals: "Ataxia (marcha inestable) | Disartria | Temblor grosero | Nivel Litio > 2.0.",
        diagnosis: "Toxicidad por Litio",
        triaje: "UCE",
        sprite: "🔋"
    },
    {
        id: 44,
        name: "Madre Reciente",
        age: 26,
        complaint: "5 días post-parto. Dice que el bebé es 'el diablo' y quiere ahogarlo.",
        vitals: "Desorientada | Afecto labil | Riesgo inminente de infanticidio.",
        diagnosis: "Psicosis Postparto",
        triaje: "UCE",
        sprite: "🍼"
    },
    {
        id: 45,
        name: "Chico Solitario",
        age: 10,
        complaint: "Crisis de agitación porque le cambiaron su rutina. No habla.",
        vitals: "Aleteo de manos (stereotipias) | Evita contacto visual | Gritos agudos.",
        diagnosis: "Trastorno del Espectro Autista (Crisis)",
        triaje: "ALTA",
        sprite: "🧩"
    },
    {
        id: 46,
        name: "Sr. Olvidadizo",
        age: 55,
        complaint: "Salió a comprar y apareció en otra ciudad 2 días después sin recordar cómo.",
        vitals: "Perplejidad | Identidad preservada parcialmente | Sin tóxicos.",
        diagnosis: "Fuga Disociativa",
        triaje: "OBS",
        sprite: "🗺️"
    },
    {
        id: 47,
        name: "Mujer Espejo",
        age: 29,
        complaint: "Convencida de que su nariz es deforme. Pide cirugía urgente.",
        vitals: "Nariz anatómicamente normal | Angustia severa | Ideas de referencia.",
        diagnosis: "Trastorno Dismórfico Corporal",
        triaje: "ALTA",
        sprite: "🪞"
    },
    {
        id: 48,
        name: "El Coleccionista",
        age: 60,
        complaint: "Vecinos denuncian olor. Casa llena de basura hasta el techo.",
        vitals: "Ropa sucia | Descuidado | Sin conciencia de enfermedad.",
        diagnosis: "Trastorno por Acumulación (Diógenes)",
        triaje: "ALTA",
        sprite: "🗑️"
    },
    {
        id: 49,
        name: "Joven Tímido",
        age: 22,
        complaint: "Miedo atroz a hablar en público o comer frente a otros.",
        vitals: "Ruborización facial | Taquicardia situacional | Evitación social.",
        diagnosis: "Ansiedad Social",
        triaje: "ALTA",
        sprite: "😳"
    },
    {
        id: 50,
        name: "Sr. Jugador",
        age: 38,
        complaint: "Perdió los ahorros familiares en el casino. Ideación suicida reactiva.",
        vitals: "Ansioso | Culpa intensa | Sin plan suicida estructurado actual.",
        diagnosis: "Trastorno por Juego (Ludopatía)",
        triaje: "OBS",
        sprite: "🎰"
    },
    {
        id: 51,
        name: "Chica Tic",
        age: 13,
        complaint: "Movimientos bruscos de cabeza y grita obscenidades involuntariamente.",
        vitals: "Tics motores y vocales complejos | Angustia por rechazo social.",
        diagnosis: "Síndrome de Tourette",
        triaje: "ALTA",
        sprite: "🗣️"
    },
    {
        id: 52,
        name: "Sra. Hospital",
        age: 34,
        complaint: "Se inyectó insulina para simular hipoglucemia y ser ingresada.",
        vitals: "Hipoglucemia facticia (insulina alta, péptido C bajo) | Actitud complaciente.",
        diagnosis: "Trastorno Facticio (Munchausen)",
        triaje: "OBS",
        sprite: "🎭"
    },
    {
        id: 53,
        name: "Abuela Desinhibida",
        age: 68,
        complaint: "Comportamiento sexual inapropiado y robo de dulces en tiendas.",
        vitals: "Memoria conservada | Falla en función ejecutiva/social.",
        diagnosis: "Demencia Fronto-Temporal",
        triaje: "ALTA",
        sprite: "🧠"
    },
    {
        id: 54,
        name: "Sr. Insomne",
        age: 28,
        complaint: "Ataques de sueño incontrolable durante el día. Se cayó al reírse.",
        vitals: "Cataplejía (pérdida tono muscular) observada | Somnolencia.",
        diagnosis: "Narcolepsia",
        triaje: "ALTA",
        sprite: "💤"
    },
    {
        id: 55,
        name: "Estudiante Irritable",
        age: 24,
        complaint: "Depresión severa e irritabilidad una semana antes de su periodo.",
        vitals: "Síntomas cíclicos | Labilidad afectiva intensa.",
        diagnosis: "Trastorno Disfórico Premenstrual",
        triaje: "ALTA",
        sprite: "📅"
    },
    {
        id: 56,
        name: "El Rebelde",
        age: 15,
        complaint: "Traído por policía tras incendiar un contenedor y pelear.",
        vitals: "Sin remordimientos | Actitud desafiante | Frialdad emocional.",
        diagnosis: "Trastorno de Conducta",
        triaje: "ALTA",
        sprite: "🔥"
    },
    {
        id: 57,
        name: "Sra. Clepto",
        age: 40,
        complaint: "Detenida por robar cosméticos que no necesita. Siente alivio al hacerlo.",
        vitals: "Tensión antes del robo | Placer durante el acto | Culpa posterior.",
        diagnosis: "Kleptomanía",
        triaje: "ALTA",
        sprite: "👜"
    },
    {
        id: 58,
        name: "Paciente Confuso",
        age: 70,
        complaint: "Confusión súbita, invierte el día y la noche.",
        vitals: "Orina turbia (Infección Urinaria) | Desatención | Fluctuante.",
        diagnosis: "Delirium (Causa médica)",
        triaje: "UCE",
        sprite: "🦠"
    },
    {
        id: 59,
        name: "Joven Visionario",
        age: 19,
        complaint: "Dice que escucha dos voces comentando sus acciones.",
        vitals: "Afecto aplanado | Descuido higiene | Soliloquios.",
        diagnosis: "Esquizofrenia (Primer Brote)",
        triaje: "OBS",
        sprite: "👁️"
    },
    {
        id: 60,
        name: "Sr. Depre-Bipolar",
        age: 35,
        complaint: "Depresión profunda, no se levanta. Historial de 'periodos muy alegres'.",
        vitals: "Retardo psicomotor severo | Riesgo de viraje a manía con antidepresivos.",
        diagnosis: "Depresión Bipolar (Tipo II)",
        triaje: "OBS",
        sprite: "📉"
    }
];
