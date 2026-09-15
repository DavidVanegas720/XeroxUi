import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { toast } from 'vue-sonner'
import { Toaster } from '.'
import { Button } from '@/components/ui/button'
import { XSonner } from '@/components/xerox/sonner'

const meta: Meta = {
  title: 'Componentes/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Un toast normal ya usa los colores de xeroxUI. Si vas a usar `rich-colors` ' +
          '(success / info / warning / error con fondo de color), usa `XSonner` en vez de ' +
          '`Toaster`: mantiene esos colores dentro de la paleta en lugar de los genéricos de ' +
          'la librería de toasts.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Basico: Story = {
  name: 'Básico',
  render: () => ({
    components: { Toaster, Button },
    setup: () => ({
      disparar: () => toast('Evento creado', { description: 'Lunes, 9am — Revisión de sprint' }),
    }),
    template: `
      <div>
        <Toaster />
        <Button @click="disparar">Mostrar toast</Button>
      </div>
    `,
  }),
}

/** `Toaster` con `rich-colors` usa verdes/rojos genéricos; `XSonner` usa los de xeroxUI. */
export const ColoresEnriquecidos: Story = {
  name: 'Colores enriquecidos (XSonner)',
  render: () => ({
    components: { XSonner, Button },
    setup: () => ({
      success: () => toast.success('Cambios guardados'),
      error: () => toast.error('No se pudo conectar al servidor'),
      warning: () => toast.warning('Tu sesión expira en 5 minutos'),
      info: () => toast.info('Hay una versión nueva disponible'),
    }),
    template: `
      <div class="flex flex-col gap-3">
        <XSonner rich-colors />
        <div class="flex flex-wrap gap-2">
          <Button variant="outline" @click="success">Success</Button>
          <Button variant="outline" @click="error">Error</Button>
          <Button variant="outline" @click="warning">Warning</Button>
          <Button variant="outline" @click="info">Info</Button>
        </div>
      </div>
    `,
  }),
}
