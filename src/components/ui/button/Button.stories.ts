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
          'Botón base de la interfaz, tematizado con los colores de xeroxUI. Para la variante ' +
          '`destructive` usa `XButton` en vez de `Button`: mantiene el contraste correcto en ' +
          'modo oscuro (ver la story "Corrección de destructive").',
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
    template: `<Button v-bind="args">Botón</Button>`,
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
  name: 'Tamaños',
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
 * `Button` con `variant="destructive"` no cumple el contraste mínimo en modo
 * oscuro. `XButton` corrige el color de relleno sin cambiar nada más de la API.
 * Cambia el tema a Dark en la toolbar para ver la diferencia.
 */
export const CorreccionDeDestructive: Story = {
  name: 'Corrección de destructive',
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
