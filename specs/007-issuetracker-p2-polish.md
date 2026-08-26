# 007 — issuetracker-app P2: toasts en CRUD, búsqueda, atajos, empty states

Estado global: **✅ EN PRODUCCIÓN.** Merge a main `7e3b829` → deploy prod `dpl_7JBTPn...` READY (alias `issue-tracker-app-blue.vercel.app`).
- Confirmado en vivo: búsqueda `?q=error`→2 resultados, empty state `?q=zzzznomatch` (mensaje + Clear filters + New Issue). Consola 0.
- **Toasts CRUD**: en código y desplegados; faltan confirmar con sesión Google real (no reproducible headless).

---

- Rama `feat/p2-polish`, commits `864d097` → `7e3b829`. `tsc` + `lint` ✅.
- Verificado en preview (Playwright, share link): búsqueda (`q` en URL, debounce, filtra "login"→1 resultado), atajo `/` (enfoca búsqueda), `?` (diálogo de ayuda), `c` (→ /issues/new, redirige a sign-in por auth gate), empty state (mensaje contextual + "Clear filters" limpia y restaura), light+dark, desktop+móvil, consola **0**.
- **Toasts CRUD**: verificados por código (Toaster global theme-aware + toasts éxito/error en form/delete/status/assignee). No verificables headless (requieren login Google OAuth) — quedan para confirmación con sesión real.
- Fix extra: `IssueStatusFilter` ahora preserva `q` al cambiar de estado (composición búsqueda+filtro).

Continuación de [006](006-issuetracker-redesign.md) (ya en prod). Alcance aprobado por el usuario: los P2 que quedaron fuera de la primera pasada. Mismo flujo: rama → preview Vercel → Playwright (light/dark, desktop/móvil, consola) → merge a main con OK. Sin tocar schema/env. Idioma UI: inglés. Sin firmas.

## Hallazgos relevantes (del código actual)
- `react-hot-toast` ya está en deps y se usa en `StatusSelect` y `AssigneeSelect`, pero **cada uno monta su propio `<Toaster>`** y solo hace `toast.error` (sin éxito). Además tienen `console.log("Patch issue ok.")` / `console.error` que filtran a prod.
- `DeleteIssueButton` usa `AlertDialog` para error y no da feedback de éxito.
- `IssueForm` (crear/editar) usa `Callout` inline para error, sin toast.
- `issues/page.tsx` arma `where = { status }`; falta `title contains` para búsqueda. MySQL es case-insensitive por collation (no requiere `mode`).

## FASE 1 — Toasts consistentes en CRUD
- **Un solo `<Toaster>` global**: nuevo client component `app/Toaster.tsx` montado una vez en `layout.tsx` (con posición y estilos acordes al tema). Quitar los dos `<Toaster>` locales.
- **Éxito**: crear → "Issue created", editar → "Issue updated", borrar → "Issue deleted", cambio de estado → "Status updated", asignación → "Assignee updated".
- **Error**: mantener mensajes claros (`toast.error`) y conservar el `Callout`/`AlertDialog` donde aporta (borrado).
- Limpiar `console.log`/`console.error` de `StatusSelect` y `AssigneeSelect`.
- Archivos: `app/Toaster.tsx` (nuevo), `layout.tsx`, `IssueForm`, `DeleteIssueButton`, `StatusSelect`, `AssigneeSelect`.

## FASE 2 — Búsqueda en /issues
- Input de búsqueda (debounced ~300ms) que sincroniza un `q` en la URL, **preservando** `status`/`orderBy`/`sortOrder` y **reseteando** `page` a 1.
- Backend: `issues/page.tsx` añade `title: { contains: q }` al `where` cuando `q` está presente. El count usa el mismo `where` (paginación correcta).
- Componente nuevo `app/issues/IssueSearch.tsx` (client, usa `useSearchParams`/`useRouter`). Integrarlo en `IssueActions` junto al filtro de estado y "New Issue".
- Archivos: `IssueSearch.tsx` (nuevo), `IssueActions.tsx`, `issues/page.tsx`, `IssueTable`/`IssueQuery` (tipar `q`).

## FASE 3 — Atajos de teclado (estilo dev-tool, descubribles)
- Hook/handler global `app/KeyboardShortcuts.tsx` (client, montado en layout):
  - `/` → enfocar la búsqueda (si existe en la página).
  - `c` → ir a `/issues/new` (crear).
  - `?` → abrir un diálogo de ayuda con la lista de atajos.
- Descubribilidad: hint `kbd` "/" dentro del input de búsqueda; el diálogo `?` documenta todos. Ignorar atajos cuando el foco está en input/textarea/contenteditable.
- Archivos: `KeyboardShortcuts.tsx` (nuevo), `layout.tsx`, `IssueSearch` (id/data target + kbd hint).

## FASE 4 — Empty states
- `/issues` sin resultados (filtro/búsqueda sin coincidencias o BD vacía) → empty state con icono, mensaje contextual ("No issues match your filters" vs "No issues yet") y CTAs: "Clear filters" (si hay filtros activos) y/o "New issue".
- Componente `app/issues/IssuesEmptyState.tsx`; renderizar en `issues/page.tsx` cuando `issues.length === 0` (en vez de la tabla vacía).
- (LatestIssues ya tiene un empty state básico de 006; se deja.)
- Archivos: `IssuesEmptyState.tsx` (nuevo), `issues/page.tsx`.

## FASE 5 — Verificación + pulido + merge
- `tsc --noEmit` + `next lint`. Preview Vercel (acceso vía share link del MCP Vercel; previews protegidas con Vercel Auth).
- Playwright: toasts visibles al crear/editar/borrar/cambiar estado (requiere login Google — si no puedo autenticar en Playwright, verifico búsqueda/empty/atajos sin sesión y los toasts de mutación por código + en local si hay sesión; documento lo verificado vs lo no verificable headless).
- `/impeccable polish` sobre las superficies tocadas. Merge a main con **OK del usuario** → confirmar en vivo.

## Riesgos / notas
- **Login para CRUD**: crear/editar/borrar/asignar requieren sesión Google. En Playwright headless no puedo loguearme con Google OAuth; verificaré esos toasts por revisión de código + (si es posible) sesión manual, y dejaré claro qué quedó verificado en vivo vs no.
- Búsqueda + filtros + sort + paginación deben componer sin perder params (probar combinaciones).
- Atajos no deben dispararse mientras se escribe en el editor markdown (SimpleMDE) ni en inputs.
- Sin dependencias nuevas (react-hot-toast ya está; atajos y debounce a mano).

Relacionado: [[issuetracker-redesign-2026]], [006](006-issuetracker-redesign.md).
