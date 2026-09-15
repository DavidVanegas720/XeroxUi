import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '.'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Superficie contenedora. En light usa `--card` (Snow, igual que el fondo) y se separa ' +
          'por borde; en dark sube a `stone-800` para elevarse sobre Carbon Black.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Completa: Story = {
  render: () => ({
    components: { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Badge },
    template: `
      <Card class="w-[380px]">
        <CardHeader>
          <CardTitle>Despliegue a produccion</CardTitle>
          <CardDescription>Se aplicaran 3 migraciones pendientes.</CardDescription>
          <CardAction><Badge variant="secondary">v0.1.0</Badge></CardAction>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            El titulo usa Yanone Kaffeesatz y el cuerpo Kode Mono.
          </p>
        </CardContent>
        <CardFooter class="gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Desplegar</Button>
        </CardFooter>
      </Card>
    `,
  }),
}

export const SoloContenido: Story = {
  name: 'Solo contenido',
  render: () => ({
    components: { Card, CardContent },
    template: `
      <Card class="w-[380px]">
        <CardContent><p class="text-sm">Card minima, sin header ni footer.</p></CardContent>
      </Card>
    `,
  }),
}
