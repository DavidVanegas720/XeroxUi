import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Switch } from '.'
import { Label } from '@/components/ui/label'

const meta: Meta = {
  title: 'Componentes/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'El estado se distingue por color además de por la posición del thumb: apagado usa ' +
          'un tono neutro y encendido el color primario, con contraste suficiente contra el ' +
          'fondo en los dos casos.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Switch },
    template: `<Switch />`,
  }),
}

export const ConLabel: Story = {
  name: 'Con label',
  render: () => ({
    components: { Switch, Label },
    template: `
      <div class="flex items-center gap-2">
        <Switch id="notificaciones" :model-value="true" />
        <Label for="notificaciones">Notificaciones por email</Label>
      </div>
    `,
  }),
}

export const Estados: Story = {
  render: () => ({
    components: { Switch, Label },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Switch id="off" />
          <Label for="off">Apagado</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="on" :model-value="true" />
          <Label for="on">Encendido</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="disabled-off" disabled />
          <Label for="disabled-off" class="opacity-50">Disabled, apagado</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="disabled-on" disabled :model-value="true" />
          <Label for="disabled-on" class="opacity-50">Disabled, encendido</Label>
        </div>
      </div>
    `,
  }),
}
