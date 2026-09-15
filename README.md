<img src="./assets/brand/logo.jpg" alt="xeroxUI" width="240" />

# xeroxUI

Vue 3 component design system built on [shadcn-vue](https://www.shadcn-vue.com), with its
own color palette and typography. Distributed as a compiled npm package: consumers **don't
need Tailwind installed**.

## Install

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
    <CardHeader><CardTitle>Hello</CardTitle></CardHeader>
    <XButton variant="destructive">Delete</XButton>
  </Card>
</template>
```

To use just the tokens (palette + typography) in your own styling stack:

```ts
import 'xerox-ui/tokens.css'
```

## Dark mode

Toggle the `dark` class on `<html>`. Every token remaps on its own.

```ts
document.documentElement.classList.toggle('dark')
```

## Palette

| Color | Hex | Role |
|---|---|---|
| Imperial Blue | `#0A2463` | `primary` (light) |
| Blue Bell | `#3E92CC` | `accent` / charts |
| Snow | `#FFFAFF` | `background` (light) |
| Magenta Bloom | `#D8315B` | `destructive` |
| Carbon Black | `#1E1B18` | `foreground` (light), `background` (dark) |

All 5 are **anchors**: each one is pinned at an exact point on its ramp and the rest is
interpolated in OKLCH. Green and amber are derived for `success` and `warning`, which the
palette didn't cover.

## Typography

- **Yanone Kaffeesatz** (`--font-display`) — headings.
- **Kode Mono** (`--font-sans`, `--font-mono`) — body and interface.

Both are variable fonts (`wght` axis), one `woff2` per family: 77 KB combined, with every
weight included.

## Scripts

| Command | What it does |
|---|---|
| `npm run build` | Full build (JS + types + CSS + fonts) |
| `npm run storybook` | Storybook on `:6006` |
| `npm run build-storybook` | Static Storybook for publishing |
| `npm run contrast` | Validates the theme's pairs against WCAG 2.1 AA |
| `npm run tokens` | Regenerates the primitives from `scripts/palette.mjs` |
| `npm run fonts` | Re-converts the fonts in `Fonts/` to woff2 |
| `npm run typecheck` | `vue-tsc --noEmit` |

## Accessibility

Two nets, and both are needed:

- `npm run contrast` — 22 foreground/background pairs, in light and dark (44 checks total),
  reading the real CSS. Fails with exit 1.
- `addon-a11y` in Storybook — axe-core against the rendered DOM of every story, configured
  with `test: 'error'`.

## How to extend

See [CONVENTIONS.md](./CONVENTIONS.md). The short rule: **`src/components/ui/` is never
hand-edited**, so `shadcn-vue add --overwrite` is always safe.
