/**
 * Verifica que cada par foreground/background del tema cumpla WCAG 2.1.
 * Lee los CSS reales, asi que si alguien toca un token el check lo detecta.
 *
 * Sale con codigo 1 si algun par falla -> apto para CI.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { contrast } from './color.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

/** --xr-*: toma el hex del comentario adyacente, o el valor si ya es hex. */
function parsePrimitives(css) {
  const map = {};
  for (const m of css.matchAll(/(--xr-[\w-]+):\s*([^;]+);(?:\s*\/\*\s*(#[0-9A-Fa-f]{6}))?/g)) {
    const [, name, value, hexComment] = m;
    const hex = hexComment ?? (value.trim().startsWith('#') ? value.trim() : null);
    if (hex) map[name] = hex.toUpperCase();
  }
  return map;
}

/** Extrae un bloque `selector { ... }` y devuelve sus custom properties. */
function parseBlock(css, selector) {
  const start = css.indexOf(selector + ' {');
  if (start === -1) throw new Error(`No se encontro el bloque ${selector}`);
  let depth = 0, i = css.indexOf('{', start), end = i;
  for (; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) { end = i; break; }
  }
  const body = css.slice(start, end);
  const map = {};
  for (const m of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) map[m[1]] = m[2].trim();
  return map;
}

const primitives = parsePrimitives(read('src/styles/tokens/primitives.css'));
const themeCss = read('src/styles/tokens/theme.css');
const light = parseBlock(themeCss, ':root');
const dark = { ...light, ...parseBlock(themeCss, '.dark') };

/** Resuelve var(--x) recursivamente hasta llegar a un hex. */
function resolve(scope, token, seen = new Set()) {
  if (!token.startsWith('--')) token = '--' + token;
  if (primitives[token]) return primitives[token];
  const raw = scope[token];
  if (!raw) throw new Error(`Token no definido: ${token}`);
  if (raw.startsWith('#')) return raw.toUpperCase();
  const ref = raw.match(/var\((--[\w-]+)\)/)?.[1];
  if (!ref || seen.has(ref)) throw new Error(`No se pudo resolver ${token} (-> ${raw})`);
  seen.add(ref);
  return resolve(scope, ref, seen);
}

/**
 * min 4.5 = texto normal (WCAG 1.4.3 AA)
 * min 3.0 = texto grande y limites de controles (1.4.11 Non-text Contrast)
 */
const PAIRS = [
  ['foreground / background', 'foreground', 'background', 4.5],
  ['card-foreground / card', 'card-foreground', 'card', 4.5],
  ['popover-foreground / popover', 'popover-foreground', 'popover', 4.5],
  ['primary-foreground / primary', 'primary-foreground', 'primary', 4.5],
  ['secondary-foreground / secondary', 'secondary-foreground', 'secondary', 4.5],
  ['accent-foreground / accent', 'accent-foreground', 'accent', 4.5],
  ['muted-foreground / background', 'muted-foreground', 'background', 4.5],
  ['muted-foreground / muted', 'muted-foreground', 'muted', 4.5],
  ['destructive-foreground / destructive', 'destructive-foreground', 'destructive', 4.5],
  ['success-foreground / success', 'success-foreground', 'success', 4.5],
  ['warning-foreground / warning', 'warning-foreground', 'warning', 4.5],
  ['sidebar-foreground / sidebar', 'sidebar-foreground', 'sidebar', 4.5],
  ['sidebar-primary-fg / sidebar-primary', 'sidebar-primary-foreground', 'sidebar-primary', 4.5],
  ['sidebar-accent-fg / sidebar-accent', 'sidebar-accent-foreground', 'sidebar-accent', 4.5],
  // Superficies "suaves" (toasts, banners). Ver theme.css.
  ['success-subtle-fg / success-subtle', 'success-subtle-foreground', 'success-subtle', 4.5],
  ['warning-subtle-fg / warning-subtle', 'warning-subtle-foreground', 'warning-subtle', 4.5],
  ['destructive-subtle-fg / destructive-subtle', 'destructive-subtle-foreground', 'destructive-subtle', 4.5],
  ['info-subtle-fg / info-subtle', 'info-subtle-foreground', 'info-subtle', 4.5],
  // Limites de controles y foco: 3:1 contra el fondo adyacente.
  ['input (borde de control) / background', 'input', 'background', 3],
  ['ring (foco) / background', 'ring', 'background', 3],
  ['destructive (fill) / background', 'destructive', 'background', 3],
  ['primary (fill) / background', 'primary', 'background', 3],
];

let failed = 0;
for (const [mode, scope] of [['LIGHT', light], ['DARK', dark]]) {
  console.log(`\n  ${mode}`);
  console.log('  ' + '-'.repeat(64));
  for (const [label, fgToken, bgToken, min] of PAIRS) {
    const fg = resolve(scope, fgToken);
    const bg = resolve(scope, bgToken);
    const ratio = contrast(fg, bg);
    const ok = ratio >= min;
    if (!ok) failed++;
    const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA-large' : '--';
    console.log(
      `  ${ok ? ' OK ' : 'FALL'}  ${label.padEnd(38)} ${ratio.toFixed(2).padStart(6)}:1  ${grade.padEnd(8)} (min ${min})`
    );
  }
}

console.log('');
if (failed) {
  console.error(`  ${failed} par(es) por debajo del minimo WCAG AA.\n`);
  process.exit(1);
}
console.log(`  Todos los pares cumplen WCAG 2.1 AA.\n`);
