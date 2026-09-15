import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { toast } from 'vue-sonner'
import { Toaster } from '.'
import { Button } from '@/components/ui/button'
import { XSonner } from '@/components/xerox/sonner'

const meta: Meta = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'A regular toast already uses xeroxUI colors. If you\'re going to use ' +
          '`rich-colors` (success / info / warning / error with a colored background), use ' +
          '`XSonner` instead of `Toaster`: it keeps those colors within the palette instead of ' +
          'the toast library\'s generic ones.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Basic: Story = {
  render: () => ({
    components: { Toaster, Button },
    setup: () => ({
      trigger: () => toast('Event created', { description: 'Monday, 9am — Sprint review' }),
    }),
    template: `
      <div>
        <Toaster />
        <Button @click="trigger">Show toast</Button>
      </div>
    `,
  }),
}

/** `Toaster` with `rich-colors` uses generic greens/reds; `XSonner` uses xeroxUI's. */
export const RichColors: Story = {
  name: 'Rich colors (XSonner)',
  render: () => ({
    components: { XSonner, Button },
    setup: () => ({
      success: () => toast.success('Changes saved'),
      error: () => toast.error('Could not connect to the server'),
      warning: () => toast.warning('Your session expires in 5 minutes'),
      info: () => toast.info('A new version is available'),
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
