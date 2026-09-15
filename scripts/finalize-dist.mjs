/**
 * Paso final del build:
 *  1. copia las fuentes junto al CSS compilado,
 *  2. saca de dist/ los .d.ts de stories y fundaciones.
 *
 * El (2) deberia resolverlo el `exclude` de vite-plugin-dts, pero en la version
 * actual lo ignora y emite tipos para todo el tsconfig. Se limpia aca para que
 * el paquete publicado no arrastre documentacion.
 */
import { cp, mkdir, rm, readdir, rmdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');

await mkdir(join(DIST, 'fonts'), { recursive: true });
await cp(join(ROOT, 'src/styles/fonts'), join(DIST, 'fonts'), { recursive: true });
console.log('  dist/fonts/ copiado (woff2 + licencias OFL)');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const junk = (await walk(DIST)).filter(
  (f) => f.endsWith('.stories.d.ts') || f.includes('/foundations/'),
);
for (const f of junk) await rm(f);

// Barre los directorios que quedaron vacios tras la limpieza.
for (const dir of ['foundations']) {
  await rmdir(join(DIST, dir)).catch(() => {});
}
console.log(`  ${junk.length} archivo(s) de documentacion removidos de dist/`);
