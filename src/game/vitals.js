// Convierte el texto de signos vitales ("FC 120 | TA 80/50 | Sat 88%") en tarjetas
// con estado normal / warning / danger. Los umbrales son didácticos, no protocolos clínicos.

const num = (s) => {
  const m = s.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
};

const grade = (v, danger, warning) => (danger(v) ? 'danger' : warning(v) ? 'warning' : 'normal');

const PARSERS = [
  {
    test: (l) => /\bfc\b/.test(l) || /bradicardia|pulso|fa con rvr/.test(l),
    label: 'FC', icon: '🫀',
    read: (raw) => {
      const v = num(raw);
      if (v === null) return { value: raw, status: 'normal' };
      return { value: `${v} lpm`, status: grade(v, (x) => x > 100 || x < 50, (x) => x > 90 || x < 60) };
    },
  },
  {
    test: (l) => /sat|paco2|cianosis/.test(l),
    label: 'SpO₂', icon: '🫧',
    read: (raw) => {
      const v = num(raw);
      if (v === null) return { value: raw, status: 'normal' };
      return { value: `${v}%`, status: grade(v, (x) => x < 90, (x) => x < 95) };
    },
  },
  {
    test: (l) => /\bta\b/.test(l) || /hipotensión|tensión/.test(l),
    label: 'TA', icon: '🩸',
    read: (raw) => {
      const m = raw.match(/(\d+)\/(\d+)/);
      if (m) {
        const sys = +m[1];
        return { value: `${m[1]}/${m[2]}`, status: grade(sys, (x) => x > 150 || x < 90, (x) => x > 135 || x < 100) };
      }
      return /hipotensión/i.test(raw) ? { value: 'Hipotensión', status: 'danger' } : { value: raw, status: 'normal' };
    },
  },
  {
    test: (l) => /temp|fiebre|afebril|hipotermia/.test(l),
    label: 'Temp', icon: '🌡️',
    read: (raw) => {
      const v = num(raw);
      if (v === null) return { value: /afebril/i.test(raw) ? 'Afebril' : raw, status: 'normal' };
      return { value: `${v} °C`, status: grade(v, (x) => x >= 38.5 || x < 35, (x) => x >= 37.5 || x < 36) };
    },
  },
  {
    test: (l) => /\bfr\b/.test(l) || /taquipnea|respiratoria/.test(l),
    label: 'FR', icon: '🫁',
    read: (raw) => {
      const v = num(raw);
      if (v === null) return { value: raw, status: 'warning' };
      return { value: `${v} rpm`, status: grade(v, (x) => x < 8 || x > 30, (x) => x < 12 || x > 24) };
    },
  },
  {
    test: (l) => /glu/.test(l),
    label: 'Glucosa', icon: '🍬',
    read: (raw) => {
      const v = num(raw);
      if (v === null) return { value: raw, status: 'normal' };
      return { value: `${v} mg/dL`, status: grade(v, (x) => x < 60 || x > 250, (x) => x < 75 || x > 140) };
    },
  },
  {
    test: (l) => /glasgow/.test(l),
    label: 'Glasgow', icon: '🧠',
    read: (raw) => {
      const v = num(raw);
      if (v === null) return { value: raw, status: 'normal' };
      return { value: `${v}/15`, status: grade(v, (x) => x <= 12, (x) => x <= 14) };
    },
  },
];

export function parseVitals(text) {
  if (!text) return [];
  return text.split('|').map((part) => {
    const raw = part.trim();
    const lower = raw.toLowerCase();
    const parser = PARSERS.find((p) => p.test(lower));
    if (!parser) return { label: 'Hallazgo', icon: '📋', value: raw, status: 'normal' };
    return { label: parser.label, icon: parser.icon, ...parser.read(raw) };
  });
}
