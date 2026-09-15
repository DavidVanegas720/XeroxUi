import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Input } from '.'
import { Label } from '@/components/ui/label'

/** placeholder/disabled/type son attrs nativos del <input>, no props del componente. */
interface InputArgs {
  placeholder?: string
  disabled?: boolean
  type?: string
}

const meta: Meta<InputArgs> = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search'] },
  },
  args: { placeholder: 'tu@email.com', type: 'email' },
  parameters: {
    docs: {
      description: {
        component:
          'El borde es más marcado que el de una Card o un separador, a propósito: un control ' +
          'interactivo necesita más contraste contra el fondo que un borde decorativo.',
      },
    },
  },
}

export default meta
type Story = StoryObj<InputArgs>

export const Playground: Story = {
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: `<Input v-bind="args" class="w-[280px]" />`,
  }),
}

/**
 * La asociación label/input se hace con `for` + `id`. Sin eso el lector de
 * pantalla no anuncia la etiqueta al enfocar el campo.
 */
export const ConLabel: Story = {
  name: 'Con label',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input, Label },
    template: `
      <div class="flex w-[280px] flex-col gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="tu@email.com" />
      </div>
    `,
  }),
}

export const Estados: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input, Label },
    template: `
      <div class="flex w-[280px] flex-col gap-5">
        <div class="flex flex-col gap-2">
          <Label for="normal">Normal</Label>
          <Input id="normal" placeholder="Escribe algo" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="disabled">Disabled</Label>
          <Input id="disabled" disabled placeholder="No editable" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="invalido">Inválido</Label>
          <Input id="invalido" aria-invalid="true" aria-describedby="err" value="no-es-un-email" />
          <!-- aria-describedby ata el mensaje al campo: el error se anuncia junto al valor -->
          <p id="err" class="text-sm text-destructive">Formato de email inválido.</p>
        </div>
      </div>
    `,
  }),
}
