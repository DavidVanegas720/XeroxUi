import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Swatches read the CSS variables at runtime, so they reflect the active theme. ' +
          'Switch between Light and Dark in the toolbar to see how each role gets remapped.',
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

/** Every fill/text pair in the theme, with its contrast computed live. */
export const SemanticColors: Story = {
  name: 'Semantic colors',
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

/** The primitive ramps. The 5 brand colors are the anchors. */
export const PrimitiveRamps: Story = {
  name: 'Primitive ramps',
  render: () => ({
    setup: () => ({ ramps: RAMPS, steps: STEPS }),
    template: `
      <div class="flex flex-col gap-5">
        <div v-for="ramp in ramps" :key="ramp">
          <p class="mb-1.5 text-sm font-medium">{{ ramp }}</p>
          <!--
            The step number goes BELOW the swatch, never on top of the color.
            An earlier version overlaid it and picked light or dark text with a
            fixed cutoff at step 500, which addon-a11y flagged: from step 500
            up (L ~59%) white text lands between 3.39:1 and 4.18:1 in five of
            the six ramps. Black would have passed in all six, but pulling the
            label off the color fixes it without depending on the ramp's L
            values, which change every time the palette is touched.
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

/** Yanone Kaffeesatz for headings, Kode Mono for body and interface. */
export const Typography: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="mb-2 text-sm text-muted-foreground">--font-display · Yanone Kaffeesatz</p>
          <h1 class="text-5xl">Heading level 1</h1>
          <h2 class="text-3xl">Heading level 2</h2>
          <h3 class="text-xl">Heading level 3</h3>
        </div>
        <div>
          <p class="mb-2 text-sm text-muted-foreground">--font-sans · Kode Mono</p>
          <p class="max-w-prose">
            Kode Mono is monospaced, so the base layer bumps line-height to 1.6
            and adds a bit of tracking so a long paragraph doesn't feel dense.
            0123456789 &mdash; il1 O0 {} []
          </p>
        </div>
        <div>
          <p class="mb-2 text-sm text-muted-foreground">Available weights (variable wght axis)</p>
          <div class="flex flex-col gap-1">
            <p v-for="w in [400, 500, 600, 700]" :key="w" :style="{ fontWeight: w }">
              Kode Mono {{ w }} — the same woff2 file covers all of them.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}
