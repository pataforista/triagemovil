# Triage Tycoon · Roadmap y mapa del sistema

> **Regla de mantenimiento (obligatoria).** Este archivo es la fuente de verdad sobre cómo funciona la app.
> Cualquier cambio en código, datos, estilos, configuración o despliegue **debe** venir acompañado de:
> 1. la actualización de la sección afectada, y
> 2. una entrada nueva en [Bitácora de cambios](#11-bitácora-de-cambios).
>
> La regla se hace cumplir de tres formas (ver [§9](#9-calidad-y-cumplimiento-del-roadmap)):
> la CI falla si cambia la app sin que cambie este archivo, un hook de Claude Code impide cerrar una sesión
> en el mismo caso, y `CLAUDE.md` lo exige como primera instrucción.

Última actualización: **2026-10-18** · versión `2.1.0`

---

## 1. Qué es

Juego móvil (PWA) de triage en urgencias para residentes de primer año. El jugador recibe pacientes con
queja principal y signos vitales y decide su destino: **ALTA** (casa), **OBS** (observación) o **UCE**
(unidad de cuidados especiales / choque). Ocho guardias de dificultad creciente; si llega a la meta de
puntos, "cena".

Uso educativo y lúdico. Los umbrales y casos son didácticos; **no** son un protocolo clínico.

## 2. Comandos

| Comando | Qué hace |
| --- | --- |
| `npm ci` | Instala dependencias exactas del `package-lock.json` |
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción en `dist/` (usa `BASE_PATH` si existe) |
| `npm run preview` | Sirve `dist/` localmente |
| `npm run lint` | ESLint (incluye reglas de hooks de React) |
| `npm test` | Pruebas de la lógica pura (`node --test`, sin dependencias extra) |
| `npm run check:roadmap` | Falla si cambió la app y este archivo no |
| `npm run generate-icons` | Regenera los íconos PWA desde `public/logo.jpg` |

Node 20+ (`.node-version` = 20; la CI usa 22).

## 3. Arquitectura

Stack: **React 19 + Vite 7 + Tailwind 3 + vite-plugin-pwa**. Sin router, sin estado global, sin backend.

```
src/
├── main.jsx                 Punto de entrada (StrictMode)
├── App.jsx                  Máquina de fases + progreso en localStorage
├── index.css                Tokens de color, componentes CSS (.panel, .btn…), animaciones
├── game/
│   ├── rules.js             Reglas PURAS: puntuación, penalizaciones, camas  ← lógica del juego
│   └── vitals.js            Texto de signos vitales → tarjetas con estado normal/warning/danger
├── data/
│   ├── levels.js            Las 8 guardias (duración, ritmo, camas, meta, comida, premio)
│   └── patients.js          Casos clínicos + generador de pacientes por nivel
├── components/
│   ├── IntroScreen.jsx      Portada, continuar / reiniciar
│   ├── TutorialModal.jsx    Manual (lee los números de RULES, nunca los duplica)
│   ├── GameScreen.jsx       Bucle de juego: reloj, llegadas, decisiones, pausa
│   ├── PatientCard.jsx      Tarjeta de paciente + 3 botones de decisión
│   ├── Ward.jsx             Monitor de camas OBS / UCE
│   ├── Supervisor.jsx       Dr. Jaspers: reacción sarcástica a cada decisión
│   ├── ReportScreen.jsx     Resultado de la guardia, sello, repetir / siguiente
│   └── EndScreen.jsx        Fin de la residencia
└── utils/
    ├── audio.js             Sonidos sintetizados (Web Audio, sin archivos)
    └── haptics.js           Vibración (navigator.vibrate)
tests/rules.test.js          Pruebas de rules.js, vitals.js y el generador
scripts/check-roadmap.mjs    Verificador de este documento (CI + hook)
```

**Principio de diseño:** la lógica que decide puntos vive en `src/game/` como funciones puras y probadas.
Los componentes solo orquestan estado y pintan. Si una regla cambia, se cambia en `rules.js` y la UI
(incluido el manual) la refleja sola.

## 4. Flujo de la app

```
INTRO ──Iniciar──▶ GAME ──tiempo = 0──▶ REPORT ──Siguiente──▶ GAME (nivel+1) … ──▶ END
                     ▲                    │
                     └────Repetir─────────┘  (solo si reprobó)
```

- `App.jsx` guarda en `localStorage`: `triage_phase`, `triage_level_index`, `triage_last_score`.
  Todo acceso va en `try/catch` (modo privado no rompe el juego). Valores inválidos vuelven a `INTRO` / nivel 0.
- Reprobar **no** bloquea el avance: el jugador puede seguir o repetir la guardia.
- `GameScreen` se monta con `key={level.id}`; cambiar de nivel o repetir reinicia todo su estado.

### Bucle de juego (`GameScreen.jsx`)

- Un `setInterval` de 1 s descuenta el reloj y el tiempo de cada cama ocupada.
- Otro `setInterval` (cada `level.spawnRate` ms) agrega pacientes; máximo 10 en espera.
- El primer paciente aparece al instante.
- Pausa manual o **automática** al ocultarse la app (`visibilitychange`). En pausa se detienen reloj,
  llegadas, sonido ambiente y botones.
- Al llegar a 0 s se llama `onFinish(score)` una sola vez (guardado por `useRef`).

## 5. Reglas del juego

Todas en `src/game/rules.js` → objeto `RULES`.

| Regla | Valor |
| --- | --- |
| Acierto | `score` del caso: ALTA 80 · OBS 120 · UCE 200 · trampa 150 |
| Bono de rapidez | +10 si decide en < 3 s desde que llegó el paciente |
| Error | −10 |
| Error crítico (sub-triage) | −20 si el destino correcto era **UCE** y se eligió **ALTA** |
| OBS llena | −5 y se rompe la racha |
| UCE llena | −10 y se rompe la racha |
| Racha | desde 3 aciertos seguidos (cambia mensaje y reacción) |
| Piedad | 3 errores seguidos → +15 s |
| Estancia en cama | OBS 6 s, UCE 12 s |

- **Destino correcto** = `patient.real ?? patient.type`. Los casos trampa tienen `type: "TRAP"` y su
  destino verdadero en `real`.
- Elegir OBS/UCE ocupa una cama **aunque la decisión sea incorrecta** (el residente lo ingresó igual).
- Tras cada decisión el aviso muestra el diagnóstico real cuando hubo error (función educativa).

## 6. Pacientes y dificultad

`generatePatient(levelId)` elige **primero la categoría** con pesos por nivel y **después** un caso al azar
dentro de ella, evitando repetir los últimos 40 diagnósticos. Así, tener 75 casos ALTA y 30 UCE no sesga la
mezcla.

| Guardia | Duración | Llegada cada | Camas OBS | Camas UCE | Meta | ALTA / OBS / UCE / Trampa (%) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 75 s | 4.2 s | 3 | 0 | $350 | 60 / 40 / 0 / 0 |
| 2 | 95 s | 3.8 s | 3 | 2 | $650 | 40 / 30 / 30 / 0 |
| 3 | 115 s | 3.4 s | 3 | 2 | $1000 | 38 / 28 / 28 / 5 |
| 4 | 130 s | 3 s | 4 | 3 | $1500 | 36 / 27 / 27 / 10 |
| 5 | 145 s | 2.5 s | 4 | 4 | $2000 | 34 / 26 / 26 / 15 |
| 6 | 160 s | 2 s | 5 | 5 | $2800 | 32 / 24 / 24 / 20 |
| 7 | 180 s | 1.8 s | 5 | 6 | $4200 | 30 / 22 / 22 / 25 |
| 8 | 220 s | 1.5 s | 6 | 8 | $6000 | 28 / 21 / 21 / 30 |

Fórmula: guardia 1 fija; desde la 2, trampa = `min(5 % × (nivel − 2), 30 %)` y el resto se reparte 40/30/30.

Inventario actual de casos: ALTA 75 · OBS 30 · UCE 30 · Trampa 29 (ALTA 7, OBS 9, UCE 13).

### Agregar un caso
En `src/data/patients.js`, dentro del arreglo de su categoría:
```js
{ type: "OBS", score: 100, sprite: "🤢", diag: "Nombre único", txt: ["Queja 1", "Queja 2"], vitals: ["FC 110 | TA 100/60"] }
```
- `diag` debe ser único (lo usa el filtro anti-repetición).
- Signos vitales separados por `|`. `vitals.js` reconoce FC, Sat/SpO₂, TA, Temp, FR, Glu, Glasgow; lo demás
  se muestra como "Hallazgo".
- Trampa: `type: "TRAP"` y `real: "ALTA" | "OBS" | "UCE"`.
- `npm test` valida que todo caso tenga un destino válido.

### Agregar o ajustar una guardia
Editar `src/data/levels.js`. Si `uce: 0`, `categoryWeights` debe dar 0 % de UCE (la prueba lo verifica).
Actualizar la tabla de arriba.

## 7. Diseño visual

Dirección: **monitor clínico nocturno**. Fondo azul muy oscuro, superficies translúcidas, un solo acento
(azul cielo) y los tres colores de triage reservados para su significado.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#050b18` | Fondo, `theme_color` de la PWA |
| `--accent` / sky-400 | `#38bdf8` | Botón principal, foco, marca |
| `alta` | `#2dd4bf` | ALTA, aciertos |
| `obs` | `#fbbf24` | OBS, valores en alerta |
| `uce` | `#fb7185` | UCE, valores peligrosos, errores |

Los colores de triage están en `:root` (`index.css`) **y** en `tailwind.config.js` (`text-alta`, `bg-obs/10`…).
Si cambias uno, cambia ambos.

Componentes CSS (`@layer components` en `index.css`): `.panel`, `.btn` + `.btn-primary | -ghost | -alta |
-obs | -uce`, `.eyebrow`, `.mono`, `.toast`. Animaciones: `anim-rise`, `anim-shake`, `anim-stamp`, `anim-beat`.

Reglas de diseño que no se negocian:
- **La tarjeta del paciente es neutra.** Ningún color, borde o icono puede delatar la respuesta.
- Texto mínimo 11 px; botones táctiles ≥ 44–48 px.
- Sin canvas ni animaciones infinitas de fondo (batería). `prefers-reduced-motion` anula animaciones.
- No se bloquea el zoom del usuario (`touch-action: manipulation` evita solo el doble toque).
- Fuentes: Outfit (texto) y JetBrains Mono (números), cargadas con `<link>` + `preconnect` en `index.html`.

## 8. PWA y despliegue

- `vite.config.js` → `vite-plugin-pwa` con `registerType: 'autoUpdate'`. Precachea JS, CSS, HTML e íconos
  (~300 KB). `logo.jpg` se excluye: solo sirve para previsualizaciones en redes.
- `start_url` y `scope` son `'.'` para funcionar en la raíz y bajo subruta.
- `public/_headers`: reglas de caché para Cloudflare Pages (SW y manifest sin caché; `/assets/*` inmutable).

| Destino | Cómo se publica | Base |
| --- | --- | --- |
| GitHub Pages | `.github/workflows/deploy.yml` en cada push a `main` | `BASE_PATH=/triagemovil/` |
| Cloudflare Pages | Integración de Cloudflare con el repo (`wrangler.toml`, salida `dist`) | `/` (sin `BASE_PATH`) |

**Pendiente de confirmar:** cuál de los dos es el sitio oficial. `index.html` (canonical, Open Graph),
`sitemap.xml` y `robots.txt` apuntan a GitHub Pages; otro repo enlaza a `triagemoviljuego.pages.dev`, y
`wrangler.toml` usa el nombre `triagemovil`. Insufficient data para decidirlo desde el código; revisar el
panel de Cloudflare y unificar las URLs.

## 9. Calidad y cumplimiento del roadmap

| Mecanismo | Dónde | Qué hace |
| --- | --- | --- |
| CI | `.github/workflows/ci.yml` | En cada PR y push (excepto `main`): lint, test, build y `check:roadmap` |
| Hook de Claude Code | `.claude/settings.json` → `Stop` | Al terminar una sesión, si hay cambios de la app sin tocar este archivo, Claude no puede cerrar y recibe la instrucción de actualizarlo |
| Instrucción | `CLAUDE.md` | Primera regla: leer este archivo antes de trabajar y actualizarlo después |
| Plantilla de PR | `.github/pull_request_template.md` | Casilla explícita de roadmap actualizado |

`check-roadmap.mjs` vigila `src/`, `public/`, `tests/`, `scripts/`, `.github/`, `index.html`,
`package.json`, `*.config.js` y `wrangler.toml`, comparando contra `origin/main` (o `BASE_REF`).

Limitación conocida: compara la rama entera contra `main`. Si el roadmap ya se tocó en esa rama, cambios
posteriores de la misma rama no vuelven a disparar el aviso. Por eso la instrucción de `CLAUDE.md` y la
plantilla de PR siguen siendo necesarias.

## 10. Pendientes y próximos pasos

Prioridad alta
- [ ] Confirmar el destino oficial de despliegue y unificar canonical / OG / sitemap (§8).
- [ ] Revisión clínica de los 164 casos por un médico (exactitud de destinos y signos vitales).

Prioridad media
- [ ] Botón de silencio (sonido) persistente.
- [ ] Récord por guardia en `localStorage` y pantalla de estadísticas (aciertos por categoría, trampas).
- [ ] Revisión final de la guardia: lista de diagnósticos vistos con su destino correcto.
- [ ] Balancear metas con datos reales de partidas (hoy son estimaciones).

Prioridad baja
- [ ] Autohospedar fuentes (eliminar dependencia de Google Fonts y mejorar offline en primera visita).
- [ ] Pruebas de componentes (p. ej. Vitest + Testing Library) para el bucle de `GameScreen`.
- [ ] Modo práctica sin reloj.

## 11. Bitácora de cambios

Formato: fecha · versión · resumen. La entrada más reciente va arriba.

### 2026-10-18 · 2.1.0 · Optimización, rediseño y roadmap
**Bugs corregidos**
- El reloj leía `level.time` (inexistente; el campo es `duration`): mostraba `NaN` y la guardia nunca terminaba.
- Los casos trampa se comparaban contra `type: "TRAP"`, así que **siempre** contaban como error. Ahora se usa `real`.
- El color del borde de la tarjeta delataba la respuesta correcta.
- `ID-NaN` en las tarjetas (`Math.floor` sobre un UUID).
- La guardia 1 solo generaba casos ALTA pese a tener 3 camas OBS; ahora mezcla ALTA (60 %) y OBS (40 %).
- `crypto.randomUUID` fallaba fuera de HTTPS (pruebas en red local); ahora IDs incrementales.
- Penalización de "error crítico" mal definida: ahora es sub-triage UCE → ALTA.

**Optimización**
- Eliminados: `references/` (prototipo HTML y borrador), `src/App.css`, `src/assets/`, `public/vite.svg`,
  componentes decorativos `ui/` (canvas animado, orbe, borde eléctrico), utilidades sin uso y el reporte
  de revisión anterior (sus hallazgos están en §8).
- `logo.png` (JPEG de 387 KB con extensión equivocada) → `logo.jpg` de 15 KB, fuera del precache.
- Precache PWA 724 KB → 303 KB; CSS 43.6 KB → 18 KB.
- Fuentes con `<link>` + `preconnect` en lugar de `@import` en CSS.
- Lógica extraída a `src/game/` con 7 pruebas.

**Diseño**
- Nuevo sistema visual (§7): paleta única, componentes CSS, texto ≥ 11 px, botones de 48 px.
- Layout en columna (cabecera / lista / camas) en lugar de pie absoluto.
- Barra de progreso hacia la meta, reloj grande, aviso con diagnóstico real al fallar.
- Pausa automática al salir de la app; botón "Repetir esta guardia" al reprobar.
- Manual alimentado por `RULES`.

**Despliegue**
- `deploy.yml`: `npm ci` y `BASE_PATH=/triagemovil/` (antes se publicaba con base `/` y la página quedaba en blanco).
- Manifest con `start_url`/`scope` relativos.
- Nuevos: `ci.yml`, `check-roadmap.mjs`, hook de Claude Code, plantilla de PR, `CLAUDE.md`.

### Historial anterior (resumen de commits hasta 2026-10-11)
- Revisión clínica: reclasificación de disposiciones, hipoglucemia facticia, signos vitales.
- Limpieza de ESLint; mejoras de compatibilidad móvil y animaciones.
- Tema "Vibrant Modern", vibración háptica, soporte de base dinámica para Cloudflare.
- Migración del prototipo HTML monolítico a React + Vite.
