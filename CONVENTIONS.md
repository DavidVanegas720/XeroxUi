# xeroxUI conventions

Guide for anyone contributing to the library.

## The rule everything else rests on

**`src/components/ui/` is third-party code. It never gets edited.**

Everything `shadcn-vue add` pulls down lands there and is treated as a
vendored dependency. The practical consequence is that
`npx shadcn-vue@latest add <component> --overwrite` is always safe: it never
overwrites custom work, because there is no custom work in there.

If something in `ui/` isn't enough, there are three ways out, in order of
preference:

### 1. Move a token (covers ~80% of cases)

Changing how a component looks almost never requires touching the component.
`Button` with `variant="default"` renders `bg-primary text-primary-foreground`;
changing `--primary` in `src/styles/tokens/theme.css` repaints it entirely,
along with everything else that uses primary. That's the whole point of the
semantic layer.

### 2. Fix the variant from the outside

Components in `ui/` do `cn(variants({...}), props.class)`. Since `props.class`
is evaluated last, twMerge lets whatever we pass there win. That makes it
possible to fix a variant without touching the file.

Real case, in `src/components/xerox/variant-fixes.ts`: the registry hardcodes
`text-white` and `dark:bg-destructive/60` on the `destructive` variant,
ignoring `--destructive-foreground`. With the xeroxUI palette that breaks in
dark mode:

| | ratio | verdict |
|---|---|---|
| translucent fill vs background | 2.82:1 | fails 1.4.11 (min 3:1) |
| `text-white` over opaque magenta-400 | 3.04:1 | fails 1.4.3 AA |
| with our token, opaque | 5.65:1 | AA |

The fix is a class constant passed through `class`, plus a thin wrapper that
applies it. Zero edits in `ui/`.

Same pattern in `Alert`: the `destructive` variant fails in both modes, not
just dark, because the base pair (`--destructive` over `--card`) is already
at the edge before any opacity is applied.

| | light | dark |
|---|---|---|
| AlertTitle (`text-destructive`, no opacity) | 4.52:1 | 4.20:1 (fails) |
| AlertDescription (`text-destructive/90`) | 3.99:1 (fails) | 3.67:1 (fails) |
| XAlert (both, with `-subtle` token) | 9.07–11.12:1 | 7.81–9.48:1 |

### 3. Wrapper in `src/components/xerox/`

When the composition, the markup, or new behavior needs to change, a wrapper
gets created that imports the one in `ui/` and forwards props, slots and
attrs to it:

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <!-- v-bind="$attrs" + slots preserve the API and accessibility -->
  <Button v-bind="$attrs"><slot /></Button>
</template>
```

Two details that get missed often and break accessibility:

- **Don't set `inheritAttrs: false`** without re-emitting `$attrs`. Reka UI
  passes `aria-*`, `data-state`, `id` and handlers through attrs; if they get
  dropped, the component stops announcing itself correctly to a screen reader.
- **Forward every slot**, not just the default one. Several shadcn components
  use named slots for icons and actions.

## Token layers

```
Layer 1  src/styles/tokens/primitives.css   raw OKLCH ramps        (GENERATED)
Layer 2  src/styles/tokens/theme.css        shadcn contract        (hand-edited)
Layer 3  variant-fixes.ts + wrappers        per component
```

The dependency direction is strictly downward. A component **never**
references `--xr-blue-600` directly: it uses `bg-primary`. If a component
needs a color that doesn't exist as a semantic token, the answer is to add
the token, not skip the layer.

### Regenerating the primitives

`src/styles/tokens/primitives.css` is a generated file. Edit
`scripts/palette.mjs` and run:

```
npm run tokens && npm run contrast
```

The 5 brand colors are **anchors**. Four are pinned at an exact step of their
ramp (Imperial Blue at `blue-900`, Blue Bell at `sky-500`, Magenta Bloom at
`magenta-500`, Carbon Black at `stone-900`), and the rest of the ramp is
interpolated around them in OKLCH. The fifth, Snow, doesn't live on a ramp:
it's its own token, `--xr-brand-snow`. Changing an anchor regenerates its
whole ramp.

## Accessibility

`npm run contrast` checks the theme's 22 foreground/background pairs against
WCAG 2.1, in light and dark — 44 checks total — reading the real CSS. Fails
with exit 1, so it runs in CI. **No color change merges without it passing.**

Thresholds used:
- `4.5:1` normal text (WCAG 1.4.3 AA)
- `3:1` control and focus boundaries (WCAG 1.4.11 Non-text Contrast)

That's why `--input` (a control's border, needs 3:1) and `--border` (a
decorative divider, doesn't need it) are separate tokens and **must not be
unified**.

`npm run contrast` validates tokens, not the opacity combinations each
component builds on top of them. The tightest case found by hand: `Switch`
off in dark mode uses `bg-input/80` (not the solid token) and lands at
3.14:1, just above the minimum. If that opacity ever gets tweaked, it needs
to be re-measured.

## Icons

Lucide (`@lucide/vue`) is the icon library. It's installed as a
`dependencies` entry (not `devDependencies`) because the `ui/` components
import it directly (`Checkbox`, `Select`, `Dialog`, `Sonner`), but **it is
not re-exported from `src/index.ts`**: whoever consumes xeroxUI installs
`@lucide/vue` on their own and imports each icon directly from it.
Re-exporting the full catalog (~3700 icons) would bloat the bundle for no
reason.

Usage convention, documented with live examples in `Foundations/Icons`:
- Size: `size-4` (16px) inside a control, `size-3.5` in tighter contexts
  (the `Checkbox` indicator). No fixed rule for a standalone icon.
- Color: every icon ships with `stroke="currentColor"`, so it inherits from
  the surrounding text. There's no need (and no benefit) to pass a color
  prop: a `text-*` class on the icon or the container is enough.

See `vite.config.ts` -> `external`: `@lucide/vue` doesn't get bundled into
`dist/`, same as `vue` or `reka-ui`.

## Typography

- `--font-display` -> Yanone Kaffeesatz. Headings only.
- `--font-sans` / `--font-mono` -> Kode Mono. Everything else.

Both are variable fonts (`wght` axis), one file per family. Don't add
`@font-face` per weight: the declared range already covers them. Note the
range isn't the same for both — Yanone exposes `200 700` and Kode Mono
`400 700`, matching what each file actually supports.

## Checklist for a new component

1. Confirm it exists in the registry: `npx shadcn-vue@latest add <name>`.
2. Install it in `ui/`. Don't touch it.
3. If it needs customizing, apply the ladder above (token -> variants -> wrapper).
4. Export it from `src/index.ts`.
5. Write the story with its variants, sizes and states.
6. Run `npm run contrast` and `npm run typecheck`.

## Stories

Live next to the component (`Button.vue` + `Button.stories.ts`), not in a
separate `src/stories/`. Every component documents at minimum:

1. `Playground` with controls.
2. `Variants` — every variant side by side.
3. `Sizes` — if the component has a size scale.
4. `States` — normal, disabled, focus, `aria-invalid`.

The **Theme** toggle in the toolbar applies `.dark` to `<html>`, so every
story gets checked in both modes. `addon-a11y` runs axe-core against each one
with `test: 'error'`, meaning a violation fails the build.

The two checks are complementary and both are needed:
`npm run contrast` validates **tokens**; `addon-a11y` validates the
**rendered DOM**, which is where things like the hardcoded `text-white` show
up.

### Typing stories

`satisfies Meta<typeof Component>` restricts `argTypes` to the declared
props. Native attributes (`disabled`, `placeholder`, `aria-*`) aren't props
and break the typecheck. For those cases an explicit args interface gets
declared:

```ts
interface ButtonArgs {
  variant?: ButtonVariants['variant']
  disabled?: boolean   // native attr, not a prop
}
const meta: Meta<ButtonArgs> = { ... }
```

## Three tooling traps

**The shadcn MCP defaults to the React registry.** The `@shadcn` namespace
returns `.tsx` with `radix-ui`. The Vue registry is declared in
`components.json` under `registries` as `@shadcn-vue` and resolves to
`https://www.shadcn-vue.com/r/styles/new-york/{name}.json`, which returns
`.vue` with `reka-ui`. If a component comes down with `radix-ui` among its
dependencies, it came from the wrong registry.

**`@source` adds to Tailwind's automatic detection, it doesn't replace it.**
That's why the CSS that gets published is compiled from `src/styles/dist.css`,
which uses `@import 'tailwindcss' source(none)` and explicitly lists what to
scan. Without `source(none)`, utilities used only by stories end up in the
package.

- `src/styles/index.css` -> development and Storybook (scans everything).
- `src/styles/dist.css` -> what gets published (only `components/` and `lib/`).

**Storybook's internal Vite doesn't inherit `vite.config.ts` nor register
the Tailwind plugin on its own.** `@storybook/vue3-vite` builds its own Vite
config; without `viteFinal` adding `@tailwindcss/vite()` in
`.storybook/main.ts`, Vite serves `@import 'tailwindcss'` raw, uncompiled.
The HTML comes out with the right classes (`bg-primary`, `rounded-full`,
etc.) but no rule to resolve them: everything renders as plain unstyled text,
with no error in the console. Verified with Playwright — the `<style>`
injected by HMR weighed literally the same as the unprocessed source file.

## Contrast in generated content, not just the theme

`npm run contrast` validates the theme's tokens, but a *documentation*
component (a story, an example) can violate WCAG with its own logic even
when the theme is perfect. Found by `addon-a11y` (axe-core) in the primitive
ramps story: each swatch's label sat on top of the color and picked light or
dark text with a fixed cutoff (`step >= 500`). From step 500 up (L ~59%),
white lands between 3.39:1 and 4.18:1 in five of the six ramps, so the
cutoff was picking exactly the color that failed.

Black would have passed in all six (4.51:1 to 6.19:1 at step 500), so it
could have been fixed by flipping the cutoff. That's not what happened: the
label was pulled off the color instead, and the step number now sits below
the swatch, on the page background, in `text-muted-foreground` — a pair
already validated by `npm run contrast`. That's more robust than chasing the
exact threshold, because it stops depending on the ramp's L values, which
change every time the palette is adjusted.

## Select always needs aria-label or an associated Label

`SelectTrigger` renders `role="combobox"` on a `<button>` whose only visible
text is the placeholder/value in `SelectValue`. By the ARIA spec, `combobox`
has `nameFrom: author` (not `contents`): visible text **does not count** as
an accessible name, even though it looks perfect and some tools let it slide.
axe-core flags it as `button-name`, Critical.

Every `SelectTrigger` needs one of the two:
- An associated `<Label for="same-id">` (preferred when there's room in the
  layout).
- `aria-label="..."` directly on the trigger (when there's no visible label).

There's no wrapper that fixes this on its own: `aria-label` depends on each
Select's content, it can't be derived generically. It's the responsibility of
whoever uses the component, documented here and in every Select story.

## "Subtle" surfaces for non-error states

`success` and `warning` (and now `destructive`) have a `-subtle` version in
`theme.css`: pale background + dark text + intermediate border, a
toast/banner pattern instead of a solid fill. Added when wiring up Sonner
(`vue-sonner` ships its own greens/reds in HSL for `richColors`, disconnected
from the palette) and to be able to give Alert the `success` / `warning` /
`info` variants the registry doesn't ship (it only has `default` /
`destructive`).

There's no solid `--info`: `--primary` is already solid blue, adding another
role would duplicate that function. `info` only exists in its `-subtle`
version.

Value pattern (the 4 pairs land between 9.48:1 and 11.12:1 depending on
family and mode, verified by `npm run contrast`):
- Light: `-100` background, `-800` text, `-300` border.
- Dark: `-950` background, `-300` text, `-700` border.

`XAlert` extends `alertVariants`, passing these classes through `class`
(same twMerge mechanism as `variant-fixes.ts`). `XSonner` wires them to the
CSS variables `vue-sonner` already reads (`--success-bg`, `--error-text`,
etc.), without touching `ui/sonner/Sonner.vue`.
