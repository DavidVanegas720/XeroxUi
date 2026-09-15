/**
 * Definicion canonica de la paleta xeroxUI.
 * Los 5 colores de marca son ANCLAS: quedan clavados en su escalon exacto y el
 * resto de la rampa se interpola en OKLCH alrededor de ellos (mismo tono,
 * croma modulado por luminosidad). Cambiar un ancla regenera su rampa entera.
 */
import { hexToLch } from './color.mjs';

export const BRAND = {
  imperialBlue: '#0A2463',
  blueBell:     '#3E92CC',
  snow:         '#FFFAFF',
  magentaBloom: '#D8315B',
  carbonBlack:  '#1E1B18',
};

// Luminosidad objetivo (L de OKLCH, en %) por escalon. Progresion perceptualmente pareja.
const L_SCALE = { 50: 97.5, 100: 94, 200: 88, 300: 79, 400: 69, 500: 59, 600: 49, 700: 40, 800: 32, 900: 25, 950: 17 };

/** Croma relativo: los extremos claros/oscuros bajan saturacion para no verse sucios. */
const chromaFactor = (L) => (L > 90 ? 0.34 : L > 80 ? 0.55 : L > 70 ? 0.78 : L > 60 ? 0.92 : L > 35 ? 1 : 0.94);

export const RAMPS = {
  // Azul de marca. Imperial Blue es oscuro (L=28.8%), asi que ancla en 900.
  blue:    { anchor: BRAND.imperialBlue, step: 900, hue: null, chroma: null },
  // Azul claro de apoyo. Blue Bell L=63.4% -> ancla en 500.
  sky:     { anchor: BRAND.blueBell,     step: 500 },
  // Acento / destructive. Magenta Bloom L=58.6% -> ancla en 500.
  magenta: { anchor: BRAND.magentaBloom, step: 500 },
  // Neutro calido, derivado de Carbon Black (H=67.4deg). Ancla en 950.
  stone:   { anchor: BRAND.carbonBlack,  step: 900 },
  // Semanticos derivados: no vienen de la paleta, se construyen con croma
  // comparable al de la marca para que se sientan de la misma familia.
  green:   { hue: 149, chroma: 0.145 },
  amber:   { hue: 75,  chroma: 0.165 },
};

export function buildRamp(name) {
  const spec = RAMPS[name];
  const [, anchorC, anchorH] = spec.anchor ? hexToLch(spec.anchor) : [0, spec.chroma, spec.hue];
  const hue = spec.hue ?? anchorH;
  const baseChroma = spec.chroma ?? anchorC;
  const out = {};
  for (const [step, L] of Object.entries(L_SCALE)) {
    out[step] = { L: L / 100, C: baseChroma * chromaFactor(L), H: hue, anchor: false };
  }
  if (spec.anchor) {
    const [aL, aC, aH] = hexToLch(spec.anchor);
    out[spec.step] = { L: aL, C: aC, H: aH, anchor: true, hex: spec.anchor };
  }
  return out;
}
