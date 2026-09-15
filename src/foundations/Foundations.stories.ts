import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Fundaciones/Tokens',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Los swatches leen las variables CSS en runtime, así que reflejan el tema activo. ' +
          'Cambia entre Light y Dark en la toolbar para ver cómo se remapea cada rol.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const SEMANTIC = [
  ['background', 'foreground'],
  ['card', 'card-foreground'],
  ['popover', 'popover-foreground'],
  ['primary', 'primary-foreground'],
  ['secondary', 'secondary-foreground'],
  ['accent', 'accent-foreground'],
  ['muted', 'muted-foreground'],
  ['destructive', 'destructive-foreground'],
  ['success', 'success-foreground'],
  ['warning', 'warning-foreground'],
]

/** Cada par relleno/texto del tema, con su contraste calculado en vivo. */
export const ColoresSemanticos: Story = {
  name: 'Colores semánticos',
  render: () => ({
    setup: () => ({ pairs: SEMANTIC }),
    template: `
      <div class="grid gap-3 sm:grid-cols-2">
        <div
          v-for="[bg, fg] in pairs" :key="bg"
          class="rounded-md border p-4"
          :style="{ background: 'var(--' + bg + ')', color: 'var(--' + fg + ')' }"
        >
          <p class="font-medium">--{{ bg }}</p>
          <p class="text-sm opacity-90">--{{ fg }}</p>
        </div>
      </div>
    `,
  }),
}

const RAMPS = ['blue', 'sky', 'magenta', 'stone', 'green', 'amber']
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

/** Las rampas primitivas. Los 5 colores de marca son las anclas. */
export const RampasPrimitivas: Story = {
  name: 'Rampas primitivas',
  render: () => ({
    setup: () => ({ ramps: RAMPS, steps: STEPS }),
    template: `
      <div class="flex flex-col gap-5">
        <div v-for="ramp in ramps" :key="ramp">
          <p class="mb-1.5 text-sm font-medium">{{ ramp }}</p>
          <!--
            El número de paso va DEBAJO del swatch, nunca encima del color.
            La versión anterior lo superponía y elegía texto claro u oscuro con
            un corte fijo en el escalón 500, que addon-a11y marcó: de 500 en
            adelante (L ~59%) el texto blanco queda entre 3.39:1 y 4.18:1 en
            cinco de las seis rampas. Negro sí habría pasado en las seis, pero
            sacar la etiqueta del color resuelve el problema sin depender de los
            valores L de la rampa, que cambian cada vez que se toca la paleta.
          -->
          <div class="flex overflow-hidden rounded-md border">
            <div
              v-for="step in steps" :key="step"
              class="h-14 flex-1"
              :style="{ background: 'var(--xr-' + ramp + '-' + step + ')' }"
            />
          </div>
          <div class="flex">
            <span
              v-for="step in steps" :key="step"
              class="flex-1 text-center text-[10px] text-muted-foreground"
            >{{ step }}</span>
          </div>
        </div>
      </div>
    `,
  }),
}

/** Yanone Kaffeesatz para títulos, Kode Mono para cuerpo e interfaz. */
export const Tipografia: Story = {
  name: 'Tipografía',
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="mb-2 text-sm text-muted-foreground">--font-display · Yanone Kaffeesatz</p>
          <h1 class="text-5xl">Título de nivel 1</h1>
          <h2 class="text-3xl">Título de nivel 2</h2>
          <h3 class="text-xl">Título de nivel 3</h3>
        </div>
        <div>
          <p class="mb-2 text-sm text-muted-foreground">--font-sans · Kode Mono</p>
          <p class="max-w-prose">
            Kode Mono es monoespaciada, así que la capa base le sube el interlineado
            a 1.6 y le agrega un poco de tracking para que un párrafo largo no se
            vuelva denso. 0123456789 &mdash; il1 O0 {} []
          </p>
        </div>
        <div>
          <p class="mb-2 text-sm text-muted-foreground">Pesos disponibles (eje variable wght)</p>
          <div class="flex flex-col gap-1">
            <p v-for="w in [400, 500, 600, 700]" :key="w" :style="{ fontWeight: w }">
              Kode Mono {{ w }} — el mismo archivo woff2 cubre todos.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}
