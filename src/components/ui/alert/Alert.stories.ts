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
          '`XAlert` agrega las variantes `success`, `warning` e `info` (`Alert` solo trae ' +
          '`default` y `destructive`). Además, usa siempre `XAlert` en vez de `Alert` para la ' +
          'variante `destructive`: en `Alert` el texto no llega al contraste mínimo en ninguno ' +
          'de los dos modos, no solo en dark.',
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
        <AlertTitle>Puedes agregar archivos a tu proyecto</AlertTitle>
        <AlertDescription>Arrástralos a esta zona o usa el botón de arriba.</AlertDescription>
      </Alert>
    `,
  }),
}

/** `default` usa `Alert` tal cual; todo lo demás, incluido `destructive`, usa `XAlert`. */
export const Variantes: Story = {
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, XAlert, TerminalIcon, OctagonAlertIcon, CircleCheckIcon, TriangleAlertIcon, InfoIcon },
    template: `
      <div class="flex w-[420px] flex-col gap-3">
        <Alert>
          <TerminalIcon />
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>Información neutral, sin urgencia.</AlertDescription>
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
          <AlertDescription>Tu plan vence en 3 días.</AlertDescription>
        </XAlert>
        <XAlert variant="info">
          <InfoIcon />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>La próxima actualización sale el lunes.</AlertDescription>
        </XAlert>
      </div>
    `,
  }),
}

/**
 * `Alert` con `variant="destructive"` falla el contraste mínimo en los dos
 * modos, no solo en dark. `XAlert` lo corrige sin cambiar nada más de la API.
 * Cambia el tema en la toolbar para comparar.
 */
export const CorreccionDeDestructive: Story = {
  name: 'Corrección de destructive',
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, XAlert, OctagonAlertIcon },
    template: `
      <div class="flex w-[420px] flex-col gap-3">
        <Alert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>Registro — descripción en 3.99:1 (light) y 3.67:1 (dark)</AlertTitle>
          <AlertDescription>No se pudo guardar el cambio.</AlertDescription>
        </Alert>
        <XAlert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>XAlert — descripción en 9.07:1 (light) y 7.81:1 (dark)</AlertTitle>
          <AlertDescription>No se pudo guardar el cambio.</AlertDescription>
        </XAlert>
      </div>
    `,
  }),
}

export const SinIcono: Story = {
  name: 'Sin ícono',
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle },
    template: `
      <Alert class="w-[420px]">
        <AlertTitle>Sin ícono</AlertTitle>
        <AlertDescription>El grid se ajusta solo cuando no hay svg adentro.</AlertDescription>
      </Alert>
    `,
  }),
}
