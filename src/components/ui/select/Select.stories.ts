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
          'El placeholder que se ve en `SelectValue` no alcanza: `role="combobox"` en ARIA tiene ' +
          '`nameFrom: author` (no `contents`), asi que el texto visible no cuenta como nombre ' +
          'accesible aunque se vea perfecto. Detectado por axe-core (`button-name`, Critical) -- ' +
          'sin uno de los dos, el control es mudo para un lector de pantalla.',
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
        <SelectTrigger class="w-[220px]" aria-label="Elegi un framework">
          <SelectValue placeholder="Elegi un framework" />
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

/** Preferido sobre aria-label cuando hay un label visible en la UI. */
export const ConLabel: Story = {
  name: 'Con label',
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label },
    template: `
      <div class="flex w-[220px] flex-col gap-2">
        <Label for="pais">Pais</Label>
        <Select>
          <SelectTrigger id="pais" class="w-full">
            <SelectValue placeholder="Selecciona un pais" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">Argentina</SelectItem>
            <SelectItem value="co">Colombia</SelectItem>
            <SelectItem value="mx">Mexico</SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const Tamanos: Story = {
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue },
    template: `
      <div class="flex flex-col items-start gap-3">
        <Select>
          <SelectTrigger size="sm" class="w-[180px]" aria-label="Tamano sm">
            <SelectValue placeholder="Tamano sm" />
          </SelectTrigger>
          <SelectContent><SelectItem value="a">Opcion A</SelectItem></SelectContent>
        </Select>
        <Select>
          <SelectTrigger size="default" class="w-[180px]" aria-label="Tamano default">
            <SelectValue placeholder="Tamano default" />
          </SelectTrigger>
          <SelectContent><SelectItem value="a">Opcion A</SelectItem></SelectContent>
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
        <SelectContent><SelectItem value="a">Opcion A</SelectItem></SelectContent>
      </Select>
    `,
  }),
}
