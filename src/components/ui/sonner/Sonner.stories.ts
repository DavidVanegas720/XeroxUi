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
          'vue-sonner define sus propios colores para `richColors`, desconectados de la paleta. ' +
          'Un toast normal (sin richColors) ya usa nuestros tokens via el Toaster de ui/; `XSonner` ' +
          'ademas conecta success/info/warning/error de richColors a los tokens `*-subtle`.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Basico: Story = {
  render: () => ({
    components: { Toaster, Button },
    setup: () => ({
      disparar: () => toast('Evento creado', { description: 'Lunes, 9am - Revision de sprint' }),
    }),
    template: `
      <div>
        <Toaster />
        <Button @click="disparar">Mostrar toast</Button>
      </div>
    `,
  }),
}

/**
 * Con richColors, el Toaster crudo del registro usa los verdes/rojos
 * genericos de vue-sonner. XSonner los reemplaza por nuestra paleta.
 */
export const ColoresEnriquecidos: Story = {
  name: 'Colores enriquecidos (XSonner)',
  render: () => ({
    components: { XSonner, Button },
    setup: () => ({
      success: () => toast.success('Cambios guardados'),
      error: () => toast.error('No se pudo conectar al servidor'),
      warning: () => toast.warning('Tu sesion expira en 5 minutos'),
      info: () => toast.info('Hay una version nueva disponible'),
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
