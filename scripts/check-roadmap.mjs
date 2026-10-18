#!/usr/bin/env node
// Verifica que docs/ROADMAP.md se actualice cuando cambia la app.
//
// Uso:
//   npm run check:roadmap            -> compara contra origin/main (o BASE_REF)
//   node scripts/check-roadmap.mjs --hook   -> modo hook "Stop" de Claude Code
//
// Falla (exit 1, o exit 2 en modo hook) si hay cambios en archivos de la app
// y docs/ROADMAP.md no aparece entre los cambios.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const ROADMAP = 'docs/ROADMAP.md';
// Archivos que describen el funcionamiento de la app. Cambiarlos exige tocar el roadmap.
const WATCHED = [/^src\//, /^public\//, /^tests\//, /^scripts\//, /^\.github\//, /^index\.html$/, /^package\.json$/, /^[^/]+\.config\.js$/, /^wrangler\.toml$/];

const hookMode = process.argv.includes('--hook');

if (hookMode) {
  // Evita bucles: si Claude ya está continuando por este mismo hook, no se bloquea otra vez.
  try {
    const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
    if (input.stop_hook_active) process.exit(0);
  } catch { /* sin stdin: se sigue normal */ }
}

const git = (...args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
};

const base = process.env.BASE_REF || ['origin/main', 'main'].find((ref) => git('rev-parse', '--verify', '--quiet', ref));
if (!base) {
  console.warn('check-roadmap: no encontré la rama base (origin/main). Omitido.');
  process.exit(0);
}
const mergeBase = git('merge-base', base, 'HEAD') || base;

const files = new Set(
  [
    git('diff', '--name-only', mergeBase), // commits de la rama + cambios sin commitear
    git('ls-files', '--others', '--exclude-standard'), // archivos nuevos sin seguimiento
  ]
    .filter(Boolean)
    .join('\n')
    .split('\n')
    .filter(Boolean),
);

const relevant = [...files].filter((f) => WATCHED.some((re) => re.test(f)));

if (relevant.length === 0 || files.has(ROADMAP)) {
  process.exit(0);
}

const msg = [
  `❌ ${ROADMAP} no se actualizó, pero cambiaron archivos de la app:`,
  ...relevant.slice(0, 15).map((f) => `   - ${f}`),
  relevant.length > 15 ? `   … y ${relevant.length - 15} más` : '',
  '',
  `Actualiza ${ROADMAP}: la sección afectada y una entrada nueva en "Bitácora de cambios".`,
]
  .filter((l) => l !== '')
  .join('\n');

console.error(msg);
process.exit(hookMode ? 2 : 1);
