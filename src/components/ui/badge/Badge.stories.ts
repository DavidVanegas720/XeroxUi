import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Badge } from '.'
import { XBadge } from '@/components/xerox/badge'

const VARIANTS = ['default', 'secondary', 'destructive', 'outline'] as const

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: VARIANTS } },
  args: { variant: 'default' },
  parameters: {
    docs: {
      description: {
        component:
          'Etiqueta compacta para estado o categoría. Para la variante `destructive` usa ' +
          '`XBadge` en vez de `Badge`: mantiene el contraste correcto en modo oscuro (igual ' +
          'que `Button`/`XButton`).',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: `<Badge v-bind="args">Etiqueta</Badge>`,
  }),
}

export const Variantes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    setup: () => ({ variants: VARIANTS }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Badge v-for="v in variants" :key="v" :variant="v">{{ v }}</Badge>
      </div>
    `,
  }),
}

/** `Badge` con `variant="destructive"` no cumple contraste en modo oscuro; `XBadge` sí. */
export const CorreccionDeDestructive: Story = {
  name: 'Corrección de destructive',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge, XBadge },
    template: `
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-start gap-2">
          <p class="text-sm text-muted-foreground">Registro</p>
          <Badge variant="destructive">Error</Badge>
        </div>
        <div class="flex flex-col items-start gap-2">
          <p class="text-sm text-muted-foreground">XBadge</p>
          <XBadge variant="destructive">Error</XBadge>
        </div>
      </div>
    `,
  }),
}

/** Con `as="a"` el badge clicable sigue siendo un enlace real, navegable por teclado. */
export const ComoEnlace: Story = {
  name: 'Como enlace',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `<Badge as="a" href="#" variant="secondary">Enlace navegable</Badge>`,
  }),
}
