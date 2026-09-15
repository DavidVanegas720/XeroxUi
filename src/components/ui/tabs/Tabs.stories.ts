import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const meta: Meta = {
  title: 'Componentes/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Reka UI se encarga del patrón ARIA completo: `role="tablist"`, navegación con flechas ' +
          'y `aria-selected` en el trigger activo. En dark los triggers inactivos bajan a ' +
          '`text-muted-foreground` y el activo sube a `text-foreground` con fondo propio.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger },
    template: `
      <Tabs default-value="cuenta" class="w-[360px]">
        <TabsList class="w-full">
          <TabsTrigger value="cuenta" class="flex-1">Cuenta</TabsTrigger>
          <TabsTrigger value="password" class="flex-1">Contraseña</TabsTrigger>
        </TabsList>
        <TabsContent value="cuenta" class="text-sm text-muted-foreground">
          Los cambios en tu cuenta se guardan automáticamente.
        </TabsContent>
        <TabsContent value="password" class="text-sm text-muted-foreground">
          Usa una contraseña de al menos 12 caracteres.
        </TabsContent>
      </Tabs>
    `,
  }),
}

export const ConCard: Story = {
  name: 'Con card',
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, CardHeader, CardTitle },
    template: `
      <Tabs default-value="resumen" class="w-[380px]">
        <TabsList class="w-full">
          <TabsTrigger value="resumen" class="flex-1">Resumen</TabsTrigger>
          <TabsTrigger value="detalle" class="flex-1">Detalle</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen">
          <Card><CardHeader><CardTitle>Resumen</CardTitle></CardHeader><CardContent class="text-sm">3 tareas pendientes.</CardContent></Card>
        </TabsContent>
        <TabsContent value="detalle">
          <Card><CardHeader><CardTitle>Detalle</CardTitle></CardHeader><CardContent class="text-sm">Sin novedades esta semana.</CardContent></Card>
        </TabsContent>
      </Tabs>
    `,
  }),
}

export const Deshabilitado: Story = {
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger },
    template: `
      <Tabs default-value="uno" class="w-[320px]">
        <TabsList class="w-full">
          <TabsTrigger value="uno" class="flex-1">Disponible</TabsTrigger>
          <TabsTrigger value="dos" class="flex-1" disabled>Bloqueado</TabsTrigger>
        </TabsList>
        <TabsContent value="uno" class="text-sm text-muted-foreground">Contenido disponible.</TabsContent>
        <TabsContent value="dos" class="text-sm text-muted-foreground">No debería verse.</TabsContent>
      </Tabs>
    `,
  }),
}
