import type { Meta, StoryObj } from '@storybook/vue3-vite'
import * as icons from '@lucide/vue'

const meta: Meta = {
  title: 'Fundaciones/Iconos',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          '**xeroxUI usa [Lucide](https://lucide.dev) (`@lucide/vue`) como librería de íconos.** ' +
          'No es un paquete propio ni se reexporta desde `xerox-ui`: quien consume la librería ' +
          'instala `@lucide/vue` en su proyecto e importa cada ícono directo desde ahí, igual que ' +
          'hacen los componentes de `ui/` (`Checkbox`, `Select`, `Dialog`, `Sonner`). Reexportar ' +
          'los ~3700 íconos del catálogo inflaría el bundle de xeroxUI sin necesidad: el consumidor ' +
          'ya paga ese costo una sola vez, con tree-shaking, al importar solo lo que usa.\n\n' +
          '**Tamaño:** `size-4` (16px) es el default para íconos dentro de un control (botón, ' +
          'input, ítem de menú) — es la clase que ya aplican `ui/select`, `ui/dialog` y `ui/tabs` ' +
          'vía `[&_svg:not([class*=\'size-\'])]:size-4`. `size-3.5` aparece en contextos más ' +
          'chicos, como el ícono de `Checkbox`. Para un ícono standalone (no acompañando texto), ' +
          'usa el tamaño que pida el layout — no hay una regla fija.\n\n' +
          '**Color:** cada ícono de Lucide trae `stroke="currentColor"` por defecto, así que ' +
          'hereda el color del texto que lo rodea sin pasar ningún prop. Para cambiarlo alcanza ' +
          'con una clase `text-*` (`text-muted-foreground`, `text-destructive`, etc.) en el ' +
          'ícono o en un contenedor.',
      },
    },
  },
}
export default meta
type Story = StoryObj

/**
 * Selección curada para trabajo de interfaz, agrupada por uso. No es el
 * catálogo completo de Lucide (~3700 íconos) — es una muestra de los nombres
 * más comunes para navegación, acciones, estado y contenido. Cualquier otro
 * ícono de https://lucide.dev/icons se importa igual, con el mismo patrón.
 */
const GRUPOS: Record<string, string[]> = {
  Navegación: [
    'ChevronDown', 'ChevronUp', 'ChevronLeft', 'ChevronRight',
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'Menu', 'MoreHorizontal', 'MoreVertical', 'ExternalLink',
  ],
  Acciones: [
    'Plus', 'X', 'Check', 'Search', 'Pencil', 'Trash2',
    'Copy', 'Download', 'Upload', 'Settings', 'RefreshCw', 'LogOut',
  ],
  Estado: [
    'CircleCheck', 'CircleAlert', 'Info', 'TriangleAlert',
    'OctagonAlert', 'Loader2', 'Bell', 'Star', 'Heart',
  ],
  Contenido: [
    'User', 'Mail', 'Calendar', 'Clock', 'Eye', 'EyeOff',
    'Lock', 'File', 'Folder', 'Filter',
  ],
}

export const Catalogo: Story = {
  name: 'Catálogo',
  render: () => ({
    setup: () => ({ grupos: GRUPOS, icons }),
    template: `
      <div class="flex flex-col gap-8">
        <div v-for="(nombres, grupo) in grupos" :key="grupo">
          <p class="mb-3 text-sm font-medium">{{ grupo }}</p>
          <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            <div
              v-for="nombre in nombres" :key="nombre"
              class="flex flex-col items-center gap-2 rounded-md border p-3 text-center"
            >
              <component :is="icons[nombre]" class="size-5" />
              <span class="text-[11px] text-muted-foreground">{{ nombre }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

/** Mismo ícono (AlertTriangle), tres tamaños. size-4 es el default de un control. */
export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    setup: () => ({ icons }),
    template: `
      <div class="flex items-end gap-6">
        <div class="flex flex-col items-center gap-2">
          <component :is="icons.TriangleAlert" class="size-3.5" />
          <span class="text-xs text-muted-foreground">size-3.5</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <component :is="icons.TriangleAlert" class="size-4" />
          <span class="text-xs text-muted-foreground">size-4 (default)</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <component :is="icons.TriangleAlert" class="size-6" />
          <span class="text-xs text-muted-foreground">size-6</span>
        </div>
      </div>
    `,
  }),
}

/** El mismo ícono, sin ningún prop de color: hereda text-* del contenedor. */
export const HeredaColor: Story = {
  name: 'Hereda color',
  render: () => ({
    setup: () => ({ icons }),
    template: `
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-center gap-2 text-foreground">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-foreground</span>
        </div>
        <div class="flex flex-col items-center gap-2 text-success">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-success</span>
        </div>
        <div class="flex flex-col items-center gap-2 text-destructive">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-destructive</span>
        </div>
        <div class="flex flex-col items-center gap-2 text-muted-foreground">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-muted-foreground</span>
        </div>
      </div>
    `,
  }),
}
