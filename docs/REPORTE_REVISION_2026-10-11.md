# Reporte de revisión: `triagemovil`

| | |
| --- | --- |
| **Fecha** | 2026-10-11 |
| **Tipo** | Revisión de lectura. **No se modificó código ni configuración.** |
| **Origen** | Evaluación previa a una posible migración de dominio (ver `PLAN_MIGRACION_DOMINIO.md` en `coordinacionclasespsiquiatria`) |
| **No ejecutado** | `npm install`, lint, build (no hay `node_modules`) |

## Resumen

| ID | Severidad | Hallazgo |
| --- | --- | --- |
| T-1 | Alta si el destino vivo es GitHub Pages | Se construye con `base: '/'` pero se publica bajo `/triagemovil/` |
| T-2 | Media | Canonical, OG, sitemap y robots apuntan a GitHub Pages; otros repos enlazan a Cloudflare |
| T-3 | Media | `start_url` y `scope` del manifest están fijados a `/` e ignoran `BASE_PATH` |
| T-4 | Baja | El workflow usa `npm install` en vez de `npm ci` |
| T-5 | Baja | Nombre de proyecto de Cloudflare dudoso |

---

## T-1. Base de build incompatible con GitHub Pages

**Evidencia**

- `.github/workflows/deploy.yml` construye (`npm run build`) sin definir `BASE_PATH` y publica `./dist` en GitHub Pages.
- `vite.config.js` (línea 102): `base: process.env.BASE_PATH || '/'`. Sin la variable, el base es `/`.
- Un sitio de proyecto en GitHub Pages vive en `https://pataforista.github.io/triagemovil/`. Con base `/`, el HTML pide `/assets/…` y `/pwa-…png`, que no existen en esa ruta.
- Ni `public/` ni la raíz contienen `CNAME`, así que no hay dominio propio que lo evite.

**Impacto**

Si ese workflow es el despliegue vivo, la página cargaría sin sus recursos (pantalla en blanco).

**Insufficient data for el destino vivo.** `wrangler.toml` y `public/_headers` apuntan a Cloudflare Pages, y `coordinacionclasespsiquiatria/config.json` enlaza a `https://triagemoviljuego.pages.dev/`. Posiblemente producción es Cloudflare y el workflow de GitHub Pages es un resto.

**Sugerencia (no aplicada)**

Definir un solo destino. Si es Cloudflare, retirar `deploy.yml`. Si fuera GitHub Pages, construir con `BASE_PATH=/triagemovil/`.

---

## T-2. URLs canónicas hacia otro host

**Evidencia**

`index.html` (líneas 12, 18, 19), `public/sitemap.xml` y `public/robots.txt` usan `https://pataforista.github.io/triagemovil/`.

**Impacto**

Si el sitio vivo es `triagemoviljuego.pages.dev`, el canonical indica a Google que el original está en otro host. Riesgo de indexar la URL equivocada o de descartar la correcta.

---

## T-3. Manifest con rutas fijas

**Evidencia**

`vite.config.js`, líneas 32–33: `start_url: '/'` y `scope: '/'`. No derivan del `base`.

**Impacto**

Bajo una subruta (GitHub Pages o una migración a `/triage/`), la PWA instalada abriría la raíz del host, no la app.

---

## T-4. Instalación no reproducible

**Evidencia**

El workflow cachea `package-lock.json` (`cache-dependency-path`) pero instala con `npm install` (línea 35), que puede modificar versiones. Los demás repos usan `npm ci`.

---

## T-5. Nombre de proyecto

**Evidencia**

`wrangler.toml` define `name = "triagemovil"`. La URL enlazada desde otro repo es `triagemoviljuego.pages.dev`.

**Insufficient data for si es un alias, otro proyecto o un enlace roto.** Comprobar en el panel de Cloudflare.

---

## Fuera de alcance de esta revisión

- Exactitud clínica de los casos del juego (`src/data/`).
- Resultados de lint y build.
