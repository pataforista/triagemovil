# Triage Tycoon: Resident Life

Juego de triaje médico con estética neon y mecánicas rápidas pensado para móviles. Esta versión está construida con **React + Vite** y mantiene el gameplay del prototipo original en HTML único.

## Características principales
- **5 niveles** con dificultad creciente, metas de dinero y comidas de guardia.
- **Clasificación de pacientes** en ALTA, OBS y UCE con puntajes, penalizaciones y alertas.
- **Trampas clínicas** (casos que parecen psiquiátricos pero son médicos) con bonificaciones/penalizaciones.
- **Capacidad de camas** en OBS/UCE con penalización cuando están llenas.
- **Pantallas** de introducción, juego, reporte de guardia y final.

## Estructura del proyecto
- `src/components/`: pantallas y tarjetas del juego.
- `src/data/`: niveles, pacientes y utilidades de generación.
- `src/index.css`: estilos globales y utilidades visuales.

## Versión HTML monolítica (referencia)
El prototipo original sigue disponible como archivo único en el root del repo:
- `triage2 (1).html`

Si necesitas modificar datos o lógica, asegúrate de mantener **paridad** entre la versión Vite (`src/data/*`, `src/components/*`) y la versión HTML para no perder funcionalidades del commit previo.

## Desarrollo local
```bash
npm install
npm run dev
