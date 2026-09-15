import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button, type ButtonVariants } from '.'
import { XButton } from '@/components/xerox/button'

const VARIANTS = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const SIZES = ['xs', 'sm', 'default', 'lg'] as const

/** `disabled` y `aria-*` llegan como attrs nativos, no como props declaradas. */
interface ButtonArgs {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  disabled?: boolean
}

const meta: Meta<ButtonArgs> = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: [...SIZES, 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] },
    disabled: { control: 'boolean' },
  },
  args: { variant: 'default', size: 'default' },
  parameters: {
    docs: {
      description: {
        component:
          'Button del registro de shadcn-vue, tematizado con los tokens de xeroxUI. ' +
          'Para la variante `destructive` usar `XButton`: ver la story "Correccion De Destructive".',
      },
    },
  },
}

export default meta
type Story = StoryObj<ButtonArgs>

export const Playground: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Boton</Button>`,
  }),
}

export const Variantes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ variants: VARIANTS }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button>
      </div>
    `,
  }),
}

export const Tamanos: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ sizes: SIZES }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="s in sizes" :key="s" :size="s">{{ s }}</Button>
      </div>
    `,
  }),
}

export const Estados: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button class="ring-ring/50 ring-3 border-ring">Foco (simulado)</Button>
        <Button aria-invalid="true">aria-invalid</Button>
      </div>
    `,
  }),
}

/**
 * El registro hardcodea `text-white` y `dark:bg-destructive/60` en la variante
 * `destructive`. Con la paleta de xeroxUI eso falla WCAG en dark: el relleno
 * translucido queda en 2.82:1 contra el fondo (minimo 3:1 por 1.4.11).
 *
 * Cambia el tema a Dark en la toolbar para ver la diferencia.
 */
export const CorreccionDeDestructive: Story = {
  name: 'Correccion de destructive',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button, XButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-sm text-muted-foreground">Button del registro — falla en dark</p>
          <div><Button variant="destructive">Eliminar</Button></div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm text-muted-foreground">XButton — usa --destructive-foreground, 5.65:1</p>
          <div><XButton variant="destructive">Eliminar</XButton></div>
        </div>
      </div>
    `,
  }),
}
