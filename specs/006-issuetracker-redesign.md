# 006 — issuetracker-app: pasada de diseño a nivel flagship (impeccable)

Estado global: **✅ EN PRODUCCIÓN.** Merge a main `c747c72` → deploy prod `dpl_6otJpu...` READY, aliado a `issue-tracker-app-blue.vercel.app`.
- Verificado en vivo (sitio público): dashboard + /issues, light + dark, desktop (1280) + móvil (390). Consola **0 mensajes** en ambas páginas. Chart renderiza barras por estado en móvil.
- Detalle menor pendiente (P3, opcional): "In Progress" hace wrap a 2 líneas en la card de summary en móvil.
- Fuera de alcance (P2, futura pasada): toasts en CRUD, búsqueda, atajos de teclado, empty states completos, ayuda.

---

- Rama `redesign/impeccable-pass`, commits `5e3d030` → `f64d4c8` → `c747c72`.
- Preview Vercel verificada (alias `issue-tracker-app-git-redesign-impec-aee26a-...`, protegida con Vercel Auth; acceso vía share link).
- `tsc --noEmit` + `next lint` ✅. Verificación Playwright ✅:
  - Light + dark mode (toggle funcional, persiste, sin FOUC), desktop (1280) + móvil (390).
  - Consola: **0 mensajes** (antes filtraba `currentPath`).
  - Lista `/issues` carga sin el delay de 1s.
  - Contraste nav: inactivo **5.94:1**, activo **16.39:1** (antes ~2.3:1) — pasa WCAG AA.
  - Cards de summary llenan la columna (Grid 3×1fr); chart con color por estado; lista "Latest issues" correcta.
- Pendiente: **OK del usuario** → merge a main → auto-deploy prod → confirmar en vivo.

Objetivo: modernizar la UI del destacado `issuetracker-app` a nivel flagship (jerarquía, espaciado, tipografía, color, estados, a11y, responsive) **sin romper funcionalidad ni rediseño total**. Respetar Radix UI Themes y los patrones existentes. Verificar en vivo (Playwright desktop + móvil + consola) y redeploy.

Decisiones del usuario (critique → AskUserQuestion):
- **Dirección visual:** light + **dark mode** (toggle). Acento de marca configurado, radius/scaling afinados, tokens en `theme-config.css`.
- **Alcance:** **Top 3 P1 + higiene** (no P2/P3 en esta pasada).
- **Restricciones:** ninguna — libertad en UI mientras no se rompa funcionalidad.

Stack: Next.js 15 (App Router) + TS + Prisma + NextAuth (Google OAuth) + Radix UI Themes 3 + React Query + recharts.
Repo: github.com/reiorozco/issuetracker-app · clon: `~/Dev/issuetracker-app` · En vivo: https://issue-tracker-app-blue.vercel.app
Idioma del sitio: inglés (UI en inglés, comentarios/plan en español). Sin firmas automáticas.

## Restricciones duras (NO tocar sin avisar)
- **Schema Prisma / migraciones / `.env` / env vars de Vercel.** El build corre `prisma migrate deploy` contra MySQL en Aiven. Esta pasada es **solo UI**: cero cambios de modelo de datos, API, auth o variables.
- No cambiar contratos de datos de componentes (props que vienen del server). Solo presentación.
- Una fase a la vez; verificación en navegador antes de dar por bueno cualquier cambio visual.

## Estrategia de ramas / deploy
- Trabajar en rama `redesign/impeccable-pass` (no commitear a `main` directo).
- Push de la rama → **Vercel genera preview deployment** automático. Verifico en la preview URL (no en prod) con Playwright desktop+móvil+consola.
- Merge a `main` **solo con tu OK** → auto-deploy a producción → confirmo en vivo.
- Commits pequeños por fase. Mensajes sin firmas automáticas.

## Línea base del critique (2026-06-26)
Score **21/40** (Aceptable). Detector estático limpio. P1: (1) theme sin configurar / sin identidad, (2) jerarquía débil del dashboard + viewport desperdiciado + chart monocolor, (3) contraste nav links falla WCAG AA. Higiene: `delay(1000)` en la lista, `console.log` en producción, formato de fecha feo. Snapshot: `.impeccable/critique/2026-06-26T07-15-51Z__issue-tracker-app-blue-vercel-app.md`.

---

## FASE 0 — Setup y arranque seguro
- Crear rama `redesign/impeccable-pass`.
- Levantar dev local (`npm i` si hace falta, `npm run dev`). Confirmar que la app arranca y conecta a BD (lectura). **Si dev local necesita `.env` y no está → te aviso, no improviso credenciales.**
- (Opcional, recomendado por impeccable) generar `PRODUCT.md` mínimo para fijar registro "product" del proyecto. No bloquea; lo propongo aparte si lo quieres.

## FASE 1 — Identidad de theme + tokens + dark mode  *(P1 #1)*
Objetivo: pasar de "Radix default" a un theme con intención y marca, con dark mode.
- **`app/layout.tsx`:** configurar `<Theme>` con props (`accentColor`, `grayColor`, `radius`, `scaling`, `panelBackground`). Acento candidato: `indigo`/`iris` (alineado a la marca, a confirmar al ver en vivo). Añadir `appearance` controlado.
- **Dark mode:** toggle en la NavBar (sol/luna) que alterna `appearance` light/dark, persistido en `localStorage` y respetando `prefers-color-scheme` en el primer render (sin flash). Implementación con un pequeño provider client + clase en `<html>`/`<Theme appearance>`. Sin dependencias nuevas (Radix ya soporta `appearance`).
- **`app/theme-config.css` / `globals.css`:** afinar tokens (radios, fondo de panel, color de superficie secundaria para nav/toolbar). Quitar variables muertas (`--background-start-rgb`, etc.) y el bloque `@media prefers-color-scheme` comentado.
- Verificar contraste de fondos/superficies en light y dark.

**Verificación F1:** Playwright en preview — dashboard + /issues en light y dark, desktop (1280) y móvil (390); consola sin errores; sin flash de tema al cargar.

## FASE 2 — Jerarquía del dashboard  *(P1 #2)*
Objetivo: que el dashboard comunique estado de un vistazo y llene el viewport.
- **`IssueSummary.tsx`:** métrica grande (number prominente, label secundaria), afordancia clara de que la card es un link (hover/border/elevación), color por estado alineado a los badges. Mantener el link a `/issues?status=...`.
- **`IssueChart.tsx`:** barras con **color por estado** (Open/In Progress/Closed) en vez de un solo acento, usando los mismos tokens que los badges para que el ojo conecte card↔chart. Título menos genérico. Respetar recharts (sin cambiar la librería). Considerar reducir/ajustar la animación de entrada para que no se vea "vacío" ~1.5s.
- **`LatestIssues.tsx`:** convertir el `Table` de una sola columna en una **lista** real (semántica correcta), con título como heading, fecha relativa y avatar/iniciales del assignee cuando exista.
- **`app/page.tsx`:** ajustar la grilla para mejor uso del espacio (rhythm vertical, que no quede ~50% vacío). Sin reinventar el layout: refinar dentro de la estructura `Grid` actual.

**Verificación F2:** Playwright — dashboard light+dark, desktop+móvil; chart renderiza con colores por estado; cards con hover; lista de "Latest Issues" correcta; sin overflow móvil.

## FASE 3 — Accesibilidad de contraste y foco  *(P1 #3)*
- **`globals.css` `.nav-link`:** subir de `zinc-400` (~2.3:1) a `zinc-600/700` en reposo y `zinc-900` activo (≥4.5:1). En dark, equivalentes con tokens Radix. Mismo fix al botón **Login**.
- Estados visibles de **focus** (teclado) en links de nav, cards-link del summary, filtro y paginación (Radix los trae; asegurar que no se pisan).
- Verificar contraste de badges y texto secundario en light y dark (≥4.5:1 body, ≥3:1 large).

**Verificación F3:** medición de contraste (evaluate en navegador) de nav links/Login en light y dark; recorrido por teclado (Tab) con foco visible.

## FASE 4 — Higiene de producción
- **`app/issues/page.tsx`:** quitar `delay(1000)` y su `console.log` (elimina 1s artificial por carga). Mantener `force-dynamic`.
- Quitar `console.log` de **`NavBar.tsx`** (`currentPath`) y de **`IssueForm.tsx`**.
- **Formato de fecha:** reemplazar `toDateString()` ("Sun Jan 01 2023") por algo limpio tipo `Jan 1, 2023` (helper con `Intl.DateTimeFormat`), aplicado en `IssueTable` y `IssueDetails`/`LatestIssues`.
- Limpieza de imports/variables muertas tocadas en el camino.

**Verificación F4:** consola limpia (0 logs propios) en preview; lista carga sin el retardo; fechas formateadas en desktop+móvil.

## FASE 5 — Pulido final + redeploy
- Pasar `/impeccable polish` sobre las superficies tocadas (revisión final de espaciado, estados, edge cases).
- Re-correr **critique** sobre la preview para medir la mejora de score (objetivo: ≥32/40).
- Con tu **OK**, merge a `main` → auto-deploy prod → **confirmar en vivo** (Playwright desktop+móvil+consola en la URL de producción).
- `npm run build` local antes del merge para descartar errores de tipo/build (sin tocar `prisma migrate`, que corre en Vercel).

---

## Entregables
- Rama `redesign/impeccable-pass` con commits por fase + preview Vercel.
- Theme configurado + dark mode + tokens; dashboard con jerarquía; a11y de contraste; higiene.
- Sin cambios de schema/API/env. Funcionalidad intacta (login, CRUD issues, filtro, sort, paginación).
- Score impeccable actualizado y verificación en vivo.

## Riesgos / notas
- **Dark mode + recharts:** asegurar que el chart usa tokens que cambian con el tema (ejes/grid legibles en dark).
- **Flash de tema (FOUC):** mitigar con script inline o `suppressHydrationWarning` + lectura de `prefers-color-scheme`.
- **`next/font` (Inter):** ya configurado; si se afina tipografía, mantener una sola familia (registro product).
- Si en dev local falta `.env` para conectar a BD → aviso antes de seguir; el preview de Vercel ya trae las env vars del proyecto.

Relacionado: memoria [[github-audit-2026]], [[marca-profesional-2026]], [[user-profile]]. Critique snapshot en `.impeccable/critique/`.
