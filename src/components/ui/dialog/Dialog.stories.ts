import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '.'
import { Button } from '@/components/ui/button'
import { XButton } from '@/components/xerox/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal accesible: atrapa el foco, lo restaura al cerrar, se cierra con Escape y ' +
          'asocia título y descripción automáticamente vía `aria-labelledby` / ' +
          '`aria-describedby`. Una salvedad: no agrega `aria-modal="true"` por su cuenta — si tu ' +
          'caso de uso lo requiere, agrégalo directo en `DialogContent`. El overlay usa un ' +
          'scrim oscuro fijo (`bg-black/80`) que no cambia con el tema: es un recurso de ' +
          'oscurecimiento convencional, no un color de marca.',
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Basico: Story = {
  name: 'Básico',
  render: () => ({
    components: { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, Input, Label },
    template: `
      <Dialog>
        <DialogTrigger as-child><Button variant="outline">Editar perfil</Button></DialogTrigger>
        <DialogContent class="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>Los cambios se guardan al confirmar.</DialogDescription>
          </DialogHeader>
          <div class="flex flex-col gap-4 py-2">
            <div class="flex flex-col gap-2">
              <Label for="nombre">Nombre</Label>
              <Input id="nombre" value="David" />
            </div>
          </div>
          <DialogFooter class="gap-2">
            <DialogClose as-child><Button variant="outline">Cancelar</Button></DialogClose>
            <Button>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
}

/** Confirmación destructiva: usa XButton para no romper el contraste en dark. */
export const Destructivo: Story = {
  render: () => ({
    components: { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, XButton },
    template: `
      <Dialog>
        <DialogTrigger as-child><XButton variant="destructive">Eliminar cuenta</XButton></DialogTrigger>
        <DialogContent class="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Eliminar cuenta</DialogTitle>
            <DialogDescription>Esta acción es permanente y no se puede deshacer.</DialogDescription>
          </DialogHeader>
          <DialogFooter class="gap-2">
            <DialogClose as-child><Button variant="outline">Cancelar</Button></DialogClose>
            <XButton variant="destructive">Sí, eliminar</XButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
}
