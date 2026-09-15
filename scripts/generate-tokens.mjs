/** Genera src/styles/tokens/primitives.css a partir de scripts/palette.mjs. */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BRAND, RAMPS, buildRamp } from './palette.mjs';
import { formatOklch, lchToHex, clampChroma } from './color.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const lines = [];
lines.push('/**');
lines.push(' * CAPA 1 - PRIMITIVAS');
lines.push(' *');
lines.push(' * Rampas crudas en OKLCH. NO se usan directamente en componentes:');
lines.push(' * los componentes consumen los tokens semanticos de theme.css.');
lines.push(' *');
lines.push(' * ARCHIVO GENERADO - no editar a mano.');
lines.push(' * Fuente: scripts/palette.mjs  |  Regenerar: npm run tokens');
lines.push(' */');
lines.push('');
lines.push(':root {');
lines.push('  /* --- Colores de marca (anclas) ------------------------------------- */');
for (const [name, hex] of Object.entries(BRAND)) {
  const kebab = name.replace(/([A-Z])/g, '-$1').toLowerCase();
  lines.push(`  --xr-brand-${kebab}: ${hex};`);
}

for (const name of Object.keys(RAMPS)) {
  const ramp = buildRamp(name);
  const anchorStep = RAMPS[name].anchor ? RAMPS[name].step : null;
  lines.push('');
  lines.push(
    `  /* --- ${name} ${'-'.repeat(Math.max(0, 58 - name.length))} */`
  );
  for (const [step, v] of Object.entries(ramp)) {
    const lch = clampChroma([v.L, v.C, v.H]);
    const hex = v.hex ?? lchToHex([v.L, v.C, v.H]);
    const tag = String(step) === String(anchorStep) ? `  /* ${hex}  <- ancla de marca */` : `  /* ${hex} */`;
    lines.push(`  --xr-${name}-${step}: ${formatOklch(lch)};${tag}`);
  }
}
lines.push('}');
lines.push('');

await writeFile(join(ROOT, 'src/styles/tokens/primitives.css'), lines.join('\n'));
console.log('src/styles/tokens/primitives.css generado');
