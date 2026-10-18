# Instrucciones para agentes (Claude Code y otros)

## Regla 1 — Roadmap obligatorio
1. **Antes de cambiar nada**, lee `docs/ROADMAP.md`. Es la fuente de verdad sobre arquitectura, reglas del
   juego, diseño y despliegue.
2. **Después de cualquier cambio** en código, datos, estilos, configuración o despliegue, actualiza
   `docs/ROADMAP.md` en el mismo commit:
   - la sección afectada (tablas, árbol de archivos, reglas, pendientes), y
   - una entrada nueva arriba en "Bitácora de cambios" (fecha · versión · resumen).
3. Si un pendiente de la sección 10 queda resuelto, márcalo y muévelo a la bitácora.

Esto se verifica automáticamente con `npm run check:roadmap` (CI y hook `Stop` en `.claude/settings.json`).
No desactives el hook ni el paso de CI para "pasar".

## Antes de hacer commit
```bash
npm run lint && npm test && npm run build && npm run check:roadmap
```

## Convenciones
- Lógica del juego: funciones puras en `src/game/`, con prueba en `tests/`. Los componentes no calculan puntos.
- Los números del juego viven en `RULES` (`src/game/rules.js`); la UI los lee de ahí, no los repite.
- La tarjeta del paciente nunca revela la respuesta (color, borde, icono).
- Textos de la interfaz en español (México).
