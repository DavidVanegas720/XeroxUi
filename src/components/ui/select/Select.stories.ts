import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '.'
import { Label } from '@/components/ui/label'

const meta: Meta = {
  title: 'Componentes/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          '**Todo `SelectTrigger` necesita `aria-label` o un `<Label for>` asociado.** ' +
          'El placeholder que se ve en `SelectValue` no alcanza: por especificación ARIA, un ' +
          '`combobox` no toma su nombre accesible del texto visible. Sin uno de los dos, el ' +
          'control queda mudo para un lector de pantalla aunque se vea perfecto.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue },
    template: `
      <Select>
        <SelectTrigger class="w-[220px]" aria-label="Elige un framework">
          <SelectValue placeholder="Elige un framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frameworks</SelectLabel>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    `,
  }),
}

/** Preferido sobre `aria-label` cuando hay un label visible en la UI. */
export const ConLabel: Story = {
  name: 'Con label',
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label },
    template: `
      <div class="flex w-[220px] flex-col gap-2">
        <Label for="pais">País</Label>
        <Select>
          <SelectTrigger id="pais" class="w-full">
            <SelectValue placeholder="Selecciona un país" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">Argentina</SelectItem>
            <SelectItem value="co">Colombia</SelectItem>
            <SelectItem value="mx">México</SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue },
    template: `
      <div class="flex flex-col items-start gap-3">
        <Select>
          <SelectTrigger size="sm" class="w-[180px]" aria-label="Tamaño sm">
            <SelectValue placeholder="Tamaño sm" />
          </SelectTrigger>
          <SelectContent><SelectItem value="a">Opción A</SelectItem></SelectContent>
        </Select>
        <Select>
          <SelectTrigger size="default" class="w-[180px]" aria-label="Tamaño default">
            <SelectValue placeholder="Tamaño default" />
          </SelectTrigger>
          <SelectContent><SelectItem value="a">Opción A</SelectItem></SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const Deshabilitado: Story = {
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue },
    template: `
      <Select disabled>
        <SelectTrigger class="w-[220px]" aria-label="No disponible">
          <SelectValue placeholder="No disponible" />
        </SelectTrigger>
        <SelectContent><SelectItem value="a">Opción A</SelectItem></SelectContent>
      </Select>
    `,
  }),
}
