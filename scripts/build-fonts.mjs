/**
 * Convierte las fuentes variables .ttf a .woff2 en src/styles/fonts/.
 *
 * Busca cada familia en Fonts/ de forma recursiva, asi que da igual si el zip
 * se extrajo suelto, anidado, o si se agrega otra familia mas adelante.
 * Solo se usan las variables (eje wght): las estaticas son redundantes.
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import wawoff from 'wawoff2';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'Fonts');
const OUT = join(ROOT, 'src/styles/fonts');

const FAMILIES = [
  { match: /^YanoneKaffeesatz-VariableFont/, out: 'YanoneKaffeesatz-Variable.woff2', license: 'YanoneKaffeesatz-OFL.txt' },
  { match: /^KodeMono-VariableFont/,         out: 'KodeMono-Variable.woff2',         license: 'KodeMono-OFL.txt' },
];

/** Recorre un directorio en profundidad devolviendo rutas de archivo. */
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const all = await walk(SRC);
await mkdir(OUT, { recursive: true });
const kb = (n) => (n / 1024).toFixed(1) + ' KB';

for (const family of FAMILIES) {
  // Puede haber duplicados (el zip combinado repite Kode Mono); alcanza el primero.
  const ttf = all.find((f) => family.match.test(basename(f)));
  if (!ttf) throw new Error(`No se encontro la fuente variable para ${family.out} bajo Fonts/`);

  const input = await readFile(ttf);
  const woff2 = await wawoff.compress(input);
  await writeFile(join(OUT, family.out), Buffer.from(woff2));
  console.log(`  ${family.out.padEnd(34)} ${kb(input.length)} ttf -> ${kb(woff2.length)} woff2`);

  // La OFL exige distribuir la licencia junto a la fuente.
  const ofl = join(dirname(ttf), 'OFL.txt');
  await writeFile(join(OUT, family.license), await readFile(ofl));
}
console.log('  + licencias OFL copiadas');
