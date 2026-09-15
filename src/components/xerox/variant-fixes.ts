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
