import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Checkbox } from '.'
import { Label } from '@/components/ui/label'

const meta: Meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'El estado `indeterminate` se anuncia correctamente a un lector de pantalla ' +
          '(`aria-checked="mixed"`), pero por defecto se ve igual que `checked`: mismo ícono ' +
          'de check. Si necesitas distinguirlos también a la vista, pasa tu propio ícono por ' +
          'el slot por defecto.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Checkbox },
    template: `<Checkbox />`,
  }),
}

export const ConLabel: Story = {
  name: 'Con label',
  render: () => ({
    components: { Checkbox, Label },
    template: `
      <div class="flex items-center gap-2">
        <Checkbox id="terminos" />
        <Label for="terminos">Acepto los términos y condiciones</Label>
      </div>
    `,
  }),
}

export const Estados: Story = {
  render: () => ({
    components: { Checkbox, Label },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Checkbox id="normal" />
          <Label for="normal">Normal</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="marcado" :model-value="true" />
          <Label for="marcado">Marcado</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="indeterminado" model-value="indeterminate" />
          <Label for="indeterminado">Indeterminado</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label for="disabled" class="opacity-50">Disabled</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="disabled-marcado" disabled :model-value="true" />
          <Label for="disabled-marcado" class="opacity-50">Disabled + marcado</Label>
        </div>
      </div>
    `,
  }),
}
