# xeroxUI

Design system de componentes Vue 3 sobre [shadcn-vue](https://www.shadcn-vue.com),
con paleta y tipografia propias. Se distribuye como paquete npm compilado: el
consumidor **no necesita tener Tailwind instalado**.

## Instalacion

```bash
npm install xerox-ui
```

```ts
// main.ts
import 'xerox-ui/styles.css'
```

```vue
<script setup lang="ts">
import { XButton, Card, CardHeader, CardTitle } from 'xerox-ui'
</script>

<template>
  <Card>
    <CardHeader><CardTitle>Hola</CardTitle></CardHeader>
    <XButton variant="destructive">Eliminar</XButton>
  </Card>
</template>
```

Para usar solo los tokens (paleta + tipografia) en tu propio stack de estilos:

```ts
import 'xerox-ui/tokens.css'
```

## Dark mode

Togglea la clase `dark` en `<html>`. Todos los tokens se remapean solos.

```ts
document.documentElement.classList.toggle('dark')
```

## Paleta

| Color | Hex | Rol |
|---|---|---|
| Imperial Blue | `#0A2463` | `primary` (light) |
| Blue Bell | `#3E92CC` | `accent` / charts |
| Snow | `#FFFAFF` | `background` (light) |
| Magenta Bloom | `#D8315B` | `destructive` |
| Carbon Black | `#1E1B18` | `foreground` (light), `background` (dark) |

Los 5 son **anclas**: cada uno queda clavado en un escalon exacto de su rampa y
el resto se interpola en OKLCH. Verde y ambar son derivados para `success` y
`warning`, que la paleta no cubria.

## Tipografia

- **Yanone Kaffeesatz** (`--font-display`) — headings.
- **Kode Mono** (`--font-sans`, `--font-mono`) — cuerpo e interfaz.

Ambas variables (eje `wght`), un `woff2` por familia: 77 KB para todos los pesos.

## Scripts

| Comando | Que hace |
|---|---|
| `npm run build` | Build completo (JS + tipos + CSS + fuentes) |
| `npm run storybook` | Storybook en `:6006` |
| `npm run contrast` | Valida los pares del tema contra WCAG 2.1 AA |
| `npm run tokens` | Regenera las primitivas desde `scripts/palette.mjs` |
| `npm run fonts` | Reconvierte las fuentes de `Fonts/` a woff2 |
| `npm run typecheck` | `vue-tsc --noEmit` |

## Accesibilidad

Dos redes, y hacen falta las dos:

- `npm run contrast` — 36 pares foreground/background en light y dark, leyendo
  los CSS reales. Falla con exit 1.
- `addon-a11y` en Storybook — axe-core sobre el DOM renderizado de cada story,
  configurado con `test: 'error'`.

## Como extender

Ver [CONVENTIONS.md](./CONVENTIONS.md). La regla corta: **`src/components/ui/`
no se edita nunca**, asi `shadcn-vue add --overwrite` siempre es seguro.
