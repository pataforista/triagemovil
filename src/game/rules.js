// Reglas de puntuación y camas. Funciones puras: no tocan React ni el DOM.
// Cualquier cambio aquí debe reflejarse en docs/ROADMAP.md (sección "Reglas del juego").

export const DECISIONS = ['ALTA', 'OBS', 'UCE'];

export const RULES = {
  speedBonusMs: 3000,     // triage en menos de 3 s
  speedBonus: 10,
  wrongPenalty: 10,       // decisión incorrecta
  undertriagePenalty: 20, // mandar a ALTA a un paciente de UCE
  fullObsPenalty: 5,
  fullUcePenalty: 10,
  pityErrors: 3,          // errores seguidos que regalan tiempo
  pitySeconds: 15,
  comboThreshold: 3,
  bedSeconds: { OBS: 6, UCE: 12 },
};

/** Destino clínicamente correcto. Las trampas guardan su destino real en `real`. */
export const correctDestination = (patient) => patient.real ?? patient.type;

/**
 * Evalúa una decisión de triage.
 * @returns {{ correct: boolean, points: number, expected: string, fast: boolean, undertriage: boolean }}
 */
export function evaluateDecision(patient, decision, now = Date.now()) {
  const expected = correctDestination(patient);
  const fast = now - patient.spawnTime < RULES.speedBonusMs;

  if (decision === expected) {
    return { correct: true, points: patient.score + (fast ? RULES.speedBonus : 0), expected, fast, undertriage: false };
  }

  const undertriage = expected === 'UCE' && decision === 'ALTA';
  return {
    correct: false,
    points: -(undertriage ? RULES.undertriagePenalty : RULES.wrongPenalty),
    expected,
    fast,
    undertriage,
  };
}

/** Coloca al paciente en la primera cama libre. Devuelve las camas nuevas o null si no hay lugar. */
export function admitToBed(beds, patient, area) {
  const idx = beds.indexOf(null);
  if (idx === -1) return null;
  const seconds = RULES.bedSeconds[area];
  const next = [...beds];
  next[idx] = { id: patient.id, initial: patient.name.charAt(0), timeLeft: seconds, maxTime: seconds };
  return next;
}

/** Avanza un segundo el reloj de las camas y libera las que llegan a cero. */
export const tickBeds = (beds) =>
  beds.map((b) => (b && b.timeLeft > 1 ? { ...b, timeLeft: b.timeLeft - 1 } : null));
