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
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible modal: traps focus, restores it on close, closes on Escape, and ties the ' +
          'title and description automatically via `aria-labelledby` / `aria-describedby`. One ' +
          'thing to keep in mind: it does not add `aria-modal="true"` on its own — if your use ' +
          'case needs it, add it directly on `DialogContent`. The overlay uses a fixed dark ' +
          'scrim (`bg-black/80`) that does not change with the theme: it\'s a conventional ' +
          'dimming layer, not a brand color.',
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, Input, Label },
    template: `
      <Dialog>
        <DialogTrigger as-child><Button variant="outline">Edit profile</Button></DialogTrigger>
        <DialogContent class="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Changes are saved on confirm.</DialogDescription>
          </DialogHeader>
          <div class="flex flex-col gap-4 py-2">
            <div class="flex flex-col gap-2">
              <Label for="name">Name</Label>
              <Input id="name" value="David" />
            </div>
          </div>
          <DialogFooter class="gap-2">
            <DialogClose as-child><Button variant="outline">Cancel</Button></DialogClose>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
}

/** Destructive confirmation: uses XButton to keep dark-mode contrast correct. */
export const Destructive: Story = {
  render: () => ({
    components: { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, XButton },
    template: `
      <Dialog>
        <DialogTrigger as-child><XButton variant="destructive">Delete account</XButton></DialogTrigger>
        <DialogContent class="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>This action is permanent and cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter class="gap-2">
            <DialogClose as-child><Button variant="outline">Cancel</Button></DialogClose>
            <XButton variant="destructive">Yes, delete</XButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
}
