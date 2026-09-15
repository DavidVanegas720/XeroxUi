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
          'Modal sobre Reka UI. Trae focus trap, restauracion del foco al cerrar, cierre con Escape ' +
          'y `aria-modal`. El overlay usa `bg-black/80` del registro: es un scrim convencional y no ' +
          'se tematiza, porque oscurecer no depende de la paleta.',
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Basico: Story = {
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

/** Confirmacion destructiva: usa XButton para no romper contraste en dark. */
export const Destructivo: Story = {
  render: () => ({
    components: { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, XButton },
    template: `
      <Dialog>
        <DialogTrigger as-child><XButton variant="destructive">Eliminar cuenta</XButton></DialogTrigger>
        <DialogContent class="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Eliminar cuenta</DialogTitle>
            <DialogDescription>Esta accion es permanente y no se puede deshacer.</DialogDescription>
          </DialogHeader>
          <DialogFooter class="gap-2">
            <DialogClose as-child><Button variant="outline">Cancelar</Button></DialogClose>
            <XButton variant="destructive">Si, eliminar</XButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
}
