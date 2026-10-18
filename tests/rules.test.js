// Pruebas de la lógica pura del juego. Ejecutar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { RULES, admitToBed, correctDestination, evaluateDecision, tickBeds } from '../src/game/rules.js';
import { categoryWeights, generatePatient, CASES_TRAMPA } from '../src/data/patients.js';
import { parseVitals } from '../src/game/vitals.js';
import { LEVELS } from '../src/data/levels.js';

const patient = (over = {}) => ({ id: 1, name: 'Ana', type: 'OBS', real: null, score: 100, spawnTime: 0, ...over });

test('acierto suma puntos y bono de rapidez', () => {
  assert.equal(evaluateDecision(patient(), 'OBS', 1000).points, 100 + RULES.speedBonus);
  assert.equal(evaluateDecision(patient(), 'OBS', 10_000).points, 100);
});

test('las trampas se evalúan contra su destino real', () => {
  const trap = patient({ type: 'TRAP', real: 'UCE', score: 150 });
  assert.equal(correctDestination(trap), 'UCE');
  assert.equal(evaluateDecision(trap, 'UCE', 10_000).correct, true);
  assert.equal(evaluateDecision(trap, 'OBS', 10_000).correct, false);
});

test('mandar a casa a un paciente de UCE es error crítico', () => {
  const r = evaluateDecision(patient({ type: 'UCE' }), 'ALTA', 10_000);
  assert.equal(r.undertriage, true);
  assert.equal(r.points, -RULES.undertriagePenalty);
  assert.equal(evaluateDecision(patient({ type: 'UCE' }), 'OBS', 10_000).points, -RULES.wrongPenalty);
});

test('camas: ingreso, cama llena y alta automática', () => {
  const beds = admitToBed([null], patient(), 'OBS');
  assert.equal(beds[0].timeLeft, RULES.bedSeconds.OBS);
  assert.equal(admitToBed(beds, patient(), 'OBS'), null);
  let b = beds;
  for (let i = 0; i < RULES.bedSeconds.OBS; i++) b = tickBeds(b);
  assert.deepEqual(b, [null]);
});

test('pesos de categoría suman 1 y respetan la progresión', () => {
  for (const l of LEVELS) {
    const w = categoryWeights(l.id);
    assert.ok(Math.abs(Object.values(w).reduce((a, b) => a + b, 0) - 1) < 1e-9);
    if (l.uce === 0) assert.equal(w.UCE, 0, `nivel ${l.id} sin camas UCE no debe generar UCE`);
  }
  assert.equal(categoryWeights(2).TRAP, 0);
  assert.ok(categoryWeights(3).TRAP > 0);
});

test('los pacientes generados son válidos', () => {
  for (const l of LEVELS) {
    for (let i = 0; i < 200; i++) {
      const p = generatePatient(l.id);
      assert.ok(['ALTA', 'OBS', 'UCE'].includes(correctDestination(p)), `${p.diag} sin destino válido`);
      assert.ok(p.score > 0 && p.name && p.complaint && p.vitals);
    }
  }
  for (const t of CASES_TRAMPA) assert.ok(['ALTA', 'OBS', 'UCE'].includes(t.real), `${t.diag} sin real`);
});

test('signos vitales: rangos de alarma', () => {
  const v = parseVitals('FC 130 | Sat 88% | TA 120/80 | Glasgow 14 | Pulmones limpios');
  assert.deepEqual(v.map((x) => x.status), ['danger', 'danger', 'normal', 'warning', 'normal']);
  assert.equal(v[4].label, 'Hallazgo');
});
