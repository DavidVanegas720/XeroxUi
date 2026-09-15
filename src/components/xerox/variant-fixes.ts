/**
 * Correcciones de accesibilidad sobre las variantes del registro.
 *
 * El registro de shadcn asume un tema donde `destructive` es un rojo sobre el
 * que el blanco siempre contrasta, y hardcodea `text-white` en vez de usar
 * `--destructive-foreground`. Con la paleta de xeroxUI eso rompe en dark:
 *
 *   - `dark:bg-destructive/60` compone a #A04454 sobre Carbon Black,
 *     que da 2.82:1 contra el fondo -> falla WCAG 1.4.11 (limite de control).
 *   - Con el relleno opaco, `text-white` sobre magenta-400 da 3.04:1
 *     -> falla WCAG 1.4.3 AA.
 *
 * Volviendo el relleno opaco y usando nuestro token de foreground:
 *   - texto: 5.65:1 (AA)
 *   - relleno contra fondo: 5.65:1 (supera el 3:1 de 1.4.11)
 *
 * Estas clases se pasan via `class` al componente de ui/, asi que twMerge las
 * resuelve pisando a las del variant original. NO se edita ui/.
 */

/** Aplica a Button y Badge: ambos comparten la variante `destructive` rota. */
export const DESTRUCTIVE_FIX = 'text-destructive-foreground dark:bg-destructive'

export const buttonVariantFixes: Record<string, string> = {
  destructive: DESTRUCTIVE_FIX,
}

export const badgeVariantFixes: Record<string, string> = {
  destructive: DESTRUCTIVE_FIX,
}

/**
 * Fix de Alert `destructive`: el registro pone `text-destructive` en el
 * contenedor (AlertTitle lo hereda, no tiene color propio) y
 * `text-destructive/90` en AlertDescription. El par base `--destructive`
 * sobre `--card` YA esta roto en dark -- 4.20:1, por debajo de 4.5 sin
 * ninguna opacidad -- asi que tanto el titulo (herencia a full opacidad)
 * como la descripcion (encima con /90) fallan. Confirmado por axe: 3
 * elementos con Serious contrast, no 1 (dos AlertTitle + un AlertDescription
 * en la story de comparacion).
 *
 * Se reemplaza por `*-subtle-foreground` (magenta-800 light / magenta-300
 * dark, >= 6.24:1 sin opacidad) en dos frentes:
 *   - clase plana `text-destructive-subtle-foreground` en el contenedor,
 *     que title hereda (pisa el `text-destructive` de la variante via
 *     twMerge, mismo mecanismo que DESTRUCTIVE_FIX).
 *   - el combinador `*:data-[slot=alert-description]:...` para description,
 *     que si no se fuerza gana su propio `text-muted-foreground` (la
 *     herencia del punto anterior no le gana a una clase propia del hijo).
 */
const ALERT_DESTRUCTIVE_FIX =
  'text-destructive-subtle-foreground *:data-[slot=alert-description]:text-destructive-subtle-foreground'

/**
 * Variantes adicionales de Alert (success/warning/info): el registro solo
 * trae `default` y `destructive`. Reproducen el mismo truco que usa la
 * variante `destructive` original para pintar AlertDescription -- el
 * combinador `*:data-[slot=alert-description]:...` pisa el `text-muted-
 * foreground` fijo que trae AlertDescription.vue porque Tailwind emite las
 * variantes arbitrarias despues de las utilidades planas en la misma capa,
 * asi que ganan por orden en la hoja (misma especificidad). Fondo/texto/
 * borde salen de los tokens `*-subtle` (theme.css). A diferencia del /90 del
 * registro, ESTE /90 si esta verificado: el par base sin opacidad ya da
 * >= 9.48:1 en las 4 familias, asi que /90 deja margen de sobra (>= 7.98:1).
 */
export const alertVariantFixes: Record<string, string> = {
  destructive: ALERT_DESTRUCTIVE_FIX,
  success:
    'border-success-subtle-border/60 bg-success-subtle text-success-subtle-foreground *:data-[slot=alert-description]:text-success-subtle-foreground/90',
  warning:
    'border-warning-subtle-border/60 bg-warning-subtle text-warning-subtle-foreground *:data-[slot=alert-description]:text-warning-subtle-foreground/90',
  info: 'border-info-subtle-border/60 bg-info-subtle text-info-subtle-foreground *:data-[slot=alert-description]:text-info-subtle-foreground/90',
}
