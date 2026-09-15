# Convenciones de xeroxUI

Guía para quien contribuye a la librería.

## La regla que sostiene todo

**`src/components/ui/` es código de terceros. No se edita.**

Todo lo que baja `shadcn-vue add` cae ahí y se trata como una dependencia
vendorizada. La consecuencia práctica es que
`npx shadcn-vue@latest add <componente> --overwrite` siempre es seguro: nunca
pisa trabajo propio, porque no hay trabajo propio ahí adentro.

Si algo de `ui/` no alcanza, hay tres salidas, en orden de preferencia:

### 1. Mover un token (cubre ~80% de los casos)

Cambiar cómo se ve un componente casi nunca requiere tocar el componente.
`Button` con `variant="default"` renderiza `bg-primary text-primary-foreground`;
cambiar `--primary` en `src/styles/tokens/theme.css` lo repinta entero, junto a
todo lo demás que use primary. Esa es la razón de ser de la capa semántica.

### 2. Corregir la variante desde afuera

Los componentes de `ui/` hacen `cn(variants({...}), props.class)`. Como
`props.class` se evalúa al final, twMerge deja ganar lo que mandemos por ahí.
Eso permite corregir una variante sin tocar el archivo.

Caso real, en `src/components/xerox/variant-fixes.ts`: el registro hardcodea
`text-white` y `dark:bg-destructive/60` en la variante `destructive`, ignorando
`--destructive-foreground`. Con la paleta de xeroxUI eso rompe en dark:

| | ratio | veredicto |
|---|---|---|
| relleno translúcido vs fondo | 2.82:1 | falla 1.4.11 (mín. 3:1) |
| `text-white` sobre magenta-400 opaco | 3.04:1 | falla 1.4.3 AA |
| con nuestro token, opaco | 5.65:1 | AA |

La corrección es una constante de clases que se pasa por `class`, más un wrapper
fino que la aplica. Cero ediciones en `ui/`.

Mismo patrón en `Alert`: la variante `destructive` falla en los dos modos, no
solo en dark, porque el par base (`--destructive` sobre `--card`) ya está al
límite antes de aplicar ninguna opacidad.

| | light | dark |
|---|---|---|
| AlertTitle (`text-destructive`, sin opacidad) | 4.52:1 | 4.20:1 (falla) |
| AlertDescription (`text-destructive/90`) | 3.99:1 (falla) | 3.67:1 (falla) |
| XAlert (ambos, con token `-subtle`) | 9.07–11.12:1 | 7.81–9.48:1 |

### 3. Wrapper en `src/components/xerox/`

Cuando hace falta cambiar la composición, el markup o agregar comportamiento, se
crea un wrapper que importa el de `ui/` y le delega props, slots y attrs:

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <!-- v-bind="$attrs" + los slots preservan la API y la accesibilidad -->
  <Button v-bind="$attrs"><slot /></Button>
</template>
```

Dos detalles que se olvidan seguido y rompen accesibilidad:

- **No pongas `inheritAttrs: false`** sin re-emitir `$attrs`. Reka UI pasa
  `aria-*`, `data-state`, `id` y handlers por attrs; si se pierden, el
  componente deja de anunciarse bien al lector de pantalla.
- **Reenvía todos los slots**, no solo el default. Varios componentes de shadcn
  usan slots nombrados para íconos y acciones.

## Capas de tokens

```
Capa 1  src/styles/tokens/primitives.css   rampas OKLCH crudas   (GENERADO)
Capa 2  src/styles/tokens/theme.css        contrato shadcn       (se edita a mano)
Capa 3  variant-fixes.ts + wrappers        por componente
```

La dirección de dependencia es estrictamente hacia abajo. Un componente **nunca**
referencia `--xr-blue-600` directo: usa `bg-primary`. Si un componente necesita
un color que no existe como token semántico, la respuesta es agregar el token,
no saltear la capa.

### Regenerar las primitivas

`src/styles/tokens/primitives.css` es un archivo generado. Se edita
`scripts/palette.mjs` y se corre:

```
npm run tokens && npm run contrast
```

Los 5 colores de marca son **anclas**. Cuatro quedan clavados en un escalón
exacto de su rampa (Imperial Blue en `blue-900`, Blue Bell en `sky-500`,
Magenta Bloom en `magenta-500`, Carbon Black en `stone-900`) y el resto de la
rampa se interpola alrededor en OKLCH. El quinto, Snow, no vive en una rampa:
es un token propio, `--xr-brand-snow`. Cambiar un ancla regenera su rampa
completa.

## Accesibilidad

`npm run contrast` verifica los 22 pares foreground/background del tema contra
WCAG 2.1, en light y en dark — 44 comprobaciones en total — leyendo los CSS
reales. Falla con exit 1, así que va en CI. **Ningún cambio de color se mergea
sin que pase.**

Umbrales usados:
- `4.5:1` texto normal (WCAG 1.4.3 AA)
- `3:1` límites de controles y foco (WCAG 1.4.11 Non-text Contrast)

Por eso `--input` (borde de un control, necesita 3:1) y `--border` (separador
decorativo, no lo necesita) son tokens distintos y **no deben unificarse**.

`npm run contrast` valida tokens, no las combinaciones de opacidad que arma
cada componente. El caso más ajustado detectado a mano: `Switch` apagado en
dark usa `bg-input/80` (no el token sólido) y queda en 3.14:1, apenas por
encima del mínimo. Si en algún momento se retoca esa opacidad, hay que
volver a medir.

## Íconos

Lucide (`@lucide/vue`) es la librería de íconos. Está instalada como
`dependencies` (no `devDependencies`) porque los componentes de `ui/` la
importan directo (`Checkbox`, `Select`, `Dialog`, `Sonner`), pero **no se
reexporta desde `src/index.ts`**: quien consume xeroxUI instala `@lucide/vue`
por su cuenta e importa cada ícono directo desde ahí. Reexportar el catálogo
completo (~3700 íconos) inflaría el bundle sin necesidad.

Convención de uso, documentada con ejemplos vivos en `Fundaciones/Iconos`:
- Tamaño: `size-4` (16px) dentro de un control, `size-3.5` en contextos más
  chicos (el indicador de `Checkbox`). Sin regla fija para un ícono standalone.
- Color: cada ícono trae `stroke="currentColor"`, así que hereda del texto
  que lo rodea. No hace falta (ni conviene) pasar un prop de color: alcanza
  con una clase `text-*` en el ícono o en el contenedor.

Ver `vite.config.ts` -> `external`: `@lucide/vue` no se bundlea en `dist/`,
igual que `vue` o `reka-ui`.

## Tipografía

- `--font-display` -> Yanone Kaffeesatz. Solo headings.
- `--font-sans` / `--font-mono` -> Kode Mono. Todo lo demás.

Ambas son variables (eje `wght`), un archivo por familia. No agregues
`@font-face` por peso: el rango declarado ya los cubre. Ojo que el rango no es
el mismo en las dos — Yanone expone `200 700` y Kode Mono `400 700`, que es lo
que soporta cada archivo.

## Checklist para un componente nuevo

1. Confirmar que existe en el registro: `npx shadcn-vue@latest add <nombre>`.
2. Instalarlo en `ui/`. No tocarlo.
3. Si hace falta personalizar, aplicar la escalera de arriba (token -> variants -> wrapper).
4. Exportarlo desde `src/index.ts`.
5. Escribir la story con sus variantes, tamaños y estados.
6. Correr `npm run contrast` y `npm run typecheck`.

## Stories

Viven junto al componente (`Button.vue` + `Button.stories.ts`), no en un
`src/stories/` aparte. Cada componente documenta como mínimo:

1. `Playground` con controles.
2. `Variantes` — todas las variantes lado a lado.
3. `Tamaños` — si el componente tiene escala.
4. `Estados` — normal, disabled, foco, `aria-invalid`.

El toggle **Tema** de la toolbar aplica `.dark` al `<html>`, así que cada story
se revisa en los dos modos. `addon-a11y` corre axe-core sobre cada una con
`test: 'error'`, o sea que una violación rompe el build.

Los dos chequeos son complementarios y hacen falta los dos:
`npm run contrast` valida los **tokens**; `addon-a11y` valida el **DOM
renderizado**, que es donde aparecen cosas como el `text-white` hardcodeado.

### Tipado de stories

`satisfies Meta<typeof Componente>` restringe `argTypes` a las props declaradas.
Atributos nativos (`disabled`, `placeholder`, `aria-*`) no son props y rompen el
typecheck. Para esos casos se declara una interfaz de args explícita:

```ts
interface ButtonArgs {
  variant?: ButtonVariants['variant']
  disabled?: boolean   // attr nativo, no prop
}
const meta: Meta<ButtonArgs> = { ... }
```

## Tres trampas del tooling

**El MCP de shadcn apunta al registro de React por defecto.** El namespace
`@shadcn` devuelve `.tsx` con `radix-ui`. El registro de Vue está declarado en
`components.json` bajo `registries` como `@shadcn-vue` y resuelve a
`https://www.shadcn-vue.com/r/styles/new-york/{name}.json`, que devuelve `.vue`
con `reka-ui`. Si un componente baja con `radix-ui` entre sus dependencias,
bajó del registro equivocado.

**`@source` suma a la detección automática de Tailwind, no la reemplaza.** Por
eso el CSS que se publica se compila desde `src/styles/dist.css`, que usa
`@import 'tailwindcss' source(none)` y lista explícitamente qué escanear. Sin
`source(none)`, las utilidades que solo usan las stories terminan en el paquete.

- `src/styles/index.css` -> desarrollo y Storybook (escanea todo).
- `src/styles/dist.css` -> lo que se publica (solo `components/` y `lib/`).

**El Vite interno de Storybook no hereda `vite.config.ts` ni registra el plugin
de Tailwind solo.** `@storybook/vue3-vite` arma su propia config de Vite; sin
`viteFinal` agregando `@tailwindcss/vite()` en `.storybook/main.ts`, Vite sirve
`@import 'tailwindcss'` crudo, sin compilar. El HTML sale con las clases
correctas (`bg-primary`, `rounded-full`, etc.) pero ninguna regla que las
resuelva: todo se ve como texto plano sin estilo, sin ningún error en consola.
Verificado con Playwright — el `<style>` inyectado por HMR pesaba literalmente
lo mismo que el archivo fuente sin procesar.

## Contraste en contenido generado, no solo en el tema

`npm run contrast` valida los tokens del tema, pero un componente de
*documentación* (una story, un ejemplo) puede violar WCAG con lógica propia
aunque el tema esté perfecto. Encontrado por `addon-a11y` (axe-core) en la story
de rampas primitivas: la etiqueta de cada swatch iba encima del color y elegía
texto claro u oscuro con un corte fijo (`step >= 500`). A partir del escalón 500
(L ~59%) el blanco queda entre 3.39:1 y 4.18:1 en cinco de las seis rampas, así
que el corte estaba eligiendo justo el color que no pasaba.

Negro sí habría pasado en las seis (4.51:1 a 6.19:1 en el escalón 500), o sea
que se podía arreglar invirtiendo el corte. No se hizo: la etiqueta se sacó de
encima del color y el número de paso va debajo del swatch, sobre el fondo de la
página, en `text-muted-foreground` — un par ya validado por `npm run contrast`.
Es más robusto que perseguir el umbral exacto, porque deja de depender de los
valores L de la rampa, que cambian con cada ajuste de paleta.

## Select siempre necesita aria-label o un Label asociado

`SelectTrigger` renderiza `role="combobox"` en un `<button>` cuyo único texto
visible es el placeholder/valor de `SelectValue`. Por ARIA, `combobox` tiene
`nameFrom: author` (no `contents`): el texto visible **no cuenta** como nombre
accesible por spec, aunque se vea perfecto y algunas herramientas lo toleren.
axe-core lo marca `button-name`, Critical.

Todo `SelectTrigger` necesita uno de los dos:
- Un `<Label for="mismo-id">` asociado (preferido cuando hay lugar en el layout).
- `aria-label="..."` directo en el trigger (cuando no hay label visible).

No hay wrapper que lo resuelva solo: `aria-label` depende del contenido de cada
Select, no se puede derivar de forma genérica. Es responsabilidad de quien usa
el componente, documentada acá y en cada story de Select.

## Superficies "suaves" para estados que no son error

`success` y `warning` (y ahora `destructive`) tienen versión `-subtle` en
`theme.css`: fondo pálido + texto oscuro + borde intermedio, patrón de
toast/banner en vez de relleno sólido. Agregado al conectar Sonner
(`vue-sonner` trae sus propios verdes/rojos en HSL para `richColors`,
desconectados de la paleta) y para poder darle a Alert variantes `success` /
`warning` / `info` que el registro no trae (solo tiene `default` /
`destructive`).

No hay `--info` sólido: `--primary` ya es azul sólido, agregar otro rol
duplicaría esa función. `info` solo existe en su versión `-subtle`.

Patrón de valores (los 4 pares dan entre 9.48:1 y 11.12:1 según familia y modo,
verificado por `npm run contrast`):
- Light: fondo `-100`, texto `-800`, borde `-300`.
- Dark: fondo `-950`, texto `-300`, borde `-700`.

`XAlert` extiende `alertVariants` pasando estas clases por `class` (mismo
mecanismo de twMerge que `variant-fixes.ts`). `XSonner` las conecta a las
variables CSS que `vue-sonner` ya lee (`--success-bg`, `--error-text`, etc.),
sin tocar `ui/sonner/Sonner.vue`.
