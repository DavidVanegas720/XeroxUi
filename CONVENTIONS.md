# Convenciones de xeroxUI

Guia para quien contribuye a la libreria.

## La regla que sostiene todo

**`src/components/ui/` es codigo de terceros. No se edita.**

Todo lo que baja `shadcn-vue add` cae ahi y se trata como una dependencia
vendorizada. La consecuencia practica es que
`npx shadcn-vue@latest add <componente> --overwrite` siempre es seguro: nunca
pisa trabajo propio, porque no hay trabajo propio ahi adentro.

Si algo de `ui/` no alcanza, hay tres salidas, en orden de preferencia:

### 1. Mover un token (cubre ~80% de los casos)

Cambiar como se ve un componente casi nunca requiere tocar el componente.
`Button` con `variant="default"` renderiza `bg-primary text-primary-foreground`;
cambiar `--primary` en `src/styles/tokens/theme.css` lo repinta entero, junto a
todo lo demas que use primary. Esa es la razon de ser de la capa semantica.

### 2. Corregir la variante desde afuera

Los componentes de `ui/` hacen `cn(variants({...}), props.class)`. Como
`props.class` se evalua al final, twMerge deja ganar lo que mandemos por ahi.
Eso permite corregir una variante sin tocar el archivo.

Caso real, en `src/components/xerox/variant-fixes.ts`: el registro hardcodea
`text-white` y `dark:bg-destructive/60` en la variante `destructive`, ignorando
`--destructive-foreground`. Con la paleta de xeroxUI eso rompe en dark:

| | ratio | veredicto |
|---|---|---|
| relleno translucido vs fondo | 2.82:1 | falla 1.4.11 (min 3:1) |
| `text-white` sobre magenta-400 opaco | 3.04:1 | falla 1.4.3 AA |
| con nuestro token, opaco | 5.65:1 | AA |

La correccion es una constante de clases que se pasa por `class`, mas un wrapper
fino que la aplica. Cero ediciones en `ui/`.

### 3. Wrapper en `src/components/xerox/`

Cuando hace falta cambiar la composicion, el markup o agregar comportamiento, se
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
- **Reenvia todos los slots**, no solo el default. Varios componentes de shadcn
  usan slots nombrados para iconos y acciones.

## Capas de tokens

```
Capa 1  src/styles/tokens/primitives.css   rampas OKLCH crudas   (GENERADO)
Capa 2  src/styles/tokens/theme.css        contrato shadcn       (se edita a mano)
Capa 3  variants de CVA en components/     por componente
```

La direccion de dependencia es estrictamente hacia abajo. Un componente **nunca**
referencia `--xr-blue-600` directo: usa `bg-primary`. Si un componente necesita
un color que no existe como token semantico, la respuesta es agregar el token,
no saltear la capa.

### Regenerar las primitivas

`src/styles/tokens/primitives.css` es un archivo generado. Se edita
`scripts/palette.mjs` y se corre:

```
npm run tokens && npm run contrast
```

Los 5 colores de marca son **anclas**: quedan clavados en su escalon exacto
(Imperial Blue en `blue-900`, Blue Bell en `sky-500`, Magenta Bloom en
`magenta-500`, Carbon Black en `stone-900`) y el resto de la rampa se interpola
alrededor en OKLCH. Cambiar un ancla regenera su rampa completa.

## Accesibilidad

`npm run contrast` verifica los 18 pares foreground/background del tema contra
WCAG 2.1, en light y en dark, leyendo los CSS reales. Falla con exit 1, asi que
va en CI. **Ningun cambio de color se mergea sin que pase.**

Umbrales usados:
- `4.5:1` texto normal (WCAG 1.4.3 AA)
- `3:1` limites de controles y foco (WCAG 1.4.11 Non-text Contrast)

Por eso `--input` (borde de un control, necesita 3:1) y `--border` (separador
decorativo, no lo necesita) son tokens distintos y **no deben unificarse**.

## Tipografia

- `--font-display` -> Yanone Kaffeesatz. Solo headings.
- `--font-sans` / `--font-mono` -> Kode Mono. Todo lo demas.

Ambas son variables (eje `wght`), un archivo por familia. No agregues
`@font-face` por peso: el rango en `font-weight: 200 700` ya los cubre.

## Checklist para un componente nuevo

1. Confirmar que existe en el registro: `npx shadcn-vue@latest add <nombre>`.
2. Instalarlo en `ui/`. No tocarlo.
3. Si hace falta personalizar, aplicar la escalera de arriba (token -> variants -> wrapper).
4. Exportarlo desde `src/index.ts`.
5. Escribir la story con sus variantes, tamanos y estados.
6. Correr `npm run contrast` y `npm run typecheck`.

## Stories

Viven junto al componente (`Button.vue` + `Button.stories.ts`), no en un
`src/stories/` aparte. Cada componente documenta como minimo:

1. `Playground` con controles.
2. `Variantes` — todas las variantes lado a lado.
3. `Tamanos` — si el componente tiene escala.
4. `Estados` — normal, disabled, foco, `aria-invalid`.

El toggle **Tema** de la toolbar aplica `.dark` al `<html>`, asi que cada story
se revisa en los dos modos. `addon-a11y` corre axe-core sobre cada una con
`test: 'error'`, o sea que una violacion rompe el build.

Los dos chequeos son complementarios y hacen falta los dos:
`npm run contrast` valida los **tokens**; `addon-a11y` valida el **DOM
renderizado**, que es donde aparecen cosas como el `text-white` hardcodeado.

### Tipado de stories

`satisfies Meta<typeof Componente>` restringe `argTypes` a las props declaradas.
Atributos nativos (`disabled`, `placeholder`, `aria-*`) no son props y rompen el
typecheck. Para esos casos se declara una interfaz de args explicita:

```ts
interface ButtonArgs {
  variant?: ButtonVariants['variant']
  disabled?: boolean   // attr nativo, no prop
}
const meta: Meta<ButtonArgs> = { ... }
```

## Dos trampas del tooling

**El MCP de shadcn apunta al registro de React por defecto.** El namespace
`@shadcn` devuelve `.tsx` con `radix-ui`. El registro de Vue esta declarado en
`components.json` bajo `registries` como `@shadcn-vue` y resuelve a
`https://www.shadcn-vue.com/r/styles/new-york/{name}.json`, que devuelve `.vue`
con `reka-ui`. Si un componente baja con `radix-ui` entre sus dependencias,
bajo del registro equivocado.

**`@source` suma a la deteccion automatica de Tailwind, no la reemplaza.** Por
eso el CSS que se publica se compila desde `src/styles/dist.css`, que usa
`@import 'tailwindcss' source(none)` y lista explicitamente que escanear. Sin
`source(none)`, las utilidades que solo usan las stories terminan en el paquete.

- `src/styles/index.css` -> desarrollo y Storybook (escanea todo).
- `src/styles/dist.css` -> lo que se publica (solo `components/` y `lib/`).

**El Vite interno de Storybook no hereda `vite.config.ts` ni registra el plugin
de Tailwind solo.** `@storybook/vue3-vite` arma su propia config de Vite; sin
`viteFinal` agregando `@tailwindcss/vite()` en `.storybook/main.ts`, Vite sirve
`@import 'tailwindcss'` crudo, sin compilar. El HTML sale con las clases
correctas (`bg-primary`, `rounded-full`, etc.) pero ninguna regla que las
resuelva -- todo se ve como texto plano sin estilo, sin ningun error en
consola. Verificado con Playwright: el `<style>` inyectado por HMR pesaba
literalmente lo mismo que el archivo fuente sin procesar.

## Contraste en contenido generado, no solo en el tema

`npm run contrast` valida los tokens del tema, pero un componente de
*documentacion* (una story, un ejemplo) puede violar WCAG con logica propia
aunque el tema este perfecto. Encontrado por `addon-a11y` (axe-core) en la
story de rampas primitivas: la etiqueta de cada swatch elegia texto claro u
oscuro con un corte fijo (`step >= 500`), pero en el escalon 500 de casi toda
rampa (L ~59%) **ni blanco ni negro puro llegan a 4.5:1** a tamano normal -- es
zona muerta de contraste por como esta definida la escala, no un error de
umbral facil de correr.

La solucion no fue ajustar el corte (seguiria fallando en el proximo cambio de
paleta) sino sacar la etiqueta de encima del color: el numero de paso va debajo
del swatch, sobre el fondo de la pagina, en `text-muted-foreground` -- un par
ya validado por `npm run contrast`. Mas robusto que perseguir el umbral exacto
cada vez que cambia un valor L de la rampa.
