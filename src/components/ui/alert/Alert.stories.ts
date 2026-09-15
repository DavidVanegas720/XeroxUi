import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { CircleCheckIcon, InfoIcon, OctagonAlertIcon, TerminalIcon, TriangleAlertIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '.'
import { XAlert } from '@/components/xerox/alert'

const meta: Meta = {
  title: 'Componentes/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          '`XAlert` agrega `success` / `warning` / `info` (el registro solo trae `default` y ' +
          '`destructive`), apoyadas en los tokens `*-subtle`. Ademas corrige un bug real del registro: ' +
          'la variante `destructive` pinta AlertDescription con `text-destructive/90`, que en dark cae ' +
          'a 3.98:1 (el par base ya estaba al limite antes del /90). Preferir XAlert sobre Alert siempre ' +
          'que la variante sea `destructive`, no solo para success/warning/info.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, TerminalIcon },
    template: `
      <Alert class="w-[420px]">
        <TerminalIcon />
        <AlertTitle>Podes agregar archivos a tu proyecto</AlertTitle>
        <AlertDescription>Arrastralos a esta zona o usa el boton de arriba.</AlertDescription>
      </Alert>
    `,
  }),
}

/**
 * `default` no tiene bugs conocidos -> Alert crudo. Todo lo demas, incluido
 * `destructive`, usa XAlert (ver la correccion documentada arriba).
 */
export const Variantes: Story = {
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, XAlert, TerminalIcon, OctagonAlertIcon, CircleCheckIcon, TriangleAlertIcon, InfoIcon },
    template: `
      <div class="flex w-[420px] flex-col gap-3">
        <Alert>
          <TerminalIcon />
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>Informacion neutral, sin urgencia.</AlertDescription>
        </Alert>
        <XAlert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>Destructive</AlertTitle>
          <AlertDescription>No se pudo guardar el cambio.</AlertDescription>
        </XAlert>
        <XAlert variant="success">
          <CircleCheckIcon />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Los cambios se guardaron correctamente.</AlertDescription>
        </XAlert>
        <XAlert variant="warning">
          <TriangleAlertIcon />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Tu plan vence en 3 dias.</AlertDescription>
        </XAlert>
        <XAlert variant="info">
          <InfoIcon />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>La proxima actualizacion sale el lunes.</AlertDescription>
        </XAlert>
      </div>
    `,
  }),
}

/**
 * Cambia a Dark en la toolbar: la descripcion del Alert crudo se ve mas
 * clara/lavada que el titulo (mismo color, 90% opacidad); XAlert la deja
 * pareja.
 */
export const CorreccionDeDestructive: Story = {
  name: 'Correccion de destructive',
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, XAlert, OctagonAlertIcon },
    template: `
      <div class="flex w-[420px] flex-col gap-3">
        <Alert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>Registro (AlertDescription a 3.98:1 en light)</AlertTitle>
          <AlertDescription>No se pudo guardar el cambio.</AlertDescription>
        </Alert>
        <XAlert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>XAlert (AlertDescription a 9.75:1+)</AlertTitle>
          <AlertDescription>No se pudo guardar el cambio.</AlertDescription>
        </XAlert>
      </div>
    `,
  }),
}

export const SinIcono: Story = {
  name: 'Sin icono',
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle },
    template: `
      <Alert class="w-[420px]">
        <AlertTitle>Sin icono</AlertTitle>
        <AlertDescription>El grid se ajusta solo cuando no hay svg dentro.</AlertDescription>
      </Alert>
    `,
  }),
}
