import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Badge } from '.'
import { XBadge } from '@/components/xerox/badge'

const VARIANTS = ['default', 'secondary', 'destructive', 'outline'] as const

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: VARIANTS } },
  args: { variant: 'default' },
  parameters: {
    docs: {
      description: {
        component:
          'Compact label for status or category. For the `destructive` variant use `XBadge` ' +
          'instead of `Badge`: it keeps the correct contrast in dark mode (same as ' +
          '`Button`/`XButton`).',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: `<Badge v-bind="args">Label</Badge>`,
  }),
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    setup: () => ({ variants: VARIANTS }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Badge v-for="v in variants" :key="v" :variant="v">{{ v }}</Badge>
      </div>
    `,
  }),
}

/** `Badge` with `variant="destructive"` fails contrast in dark mode; `XBadge` doesn't. */
export const ContrastFix: Story = {
  name: 'Contrast fix',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge, XBadge },
    template: `
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-start gap-2">
          <p class="text-sm text-muted-foreground">Badge</p>
          <Badge variant="destructive">Error</Badge>
        </div>
        <div class="flex flex-col items-start gap-2">
          <p class="text-sm text-muted-foreground">XBadge</p>
          <XBadge variant="destructive">Error</XBadge>
        </div>
      </div>
    `,
  }),
}

/** With `as="a"` a clickable badge stays a real, keyboard-navigable link. */
export const AsLink: Story = {
  name: 'As link',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `<Badge as="a" href="#" variant="secondary">Navigable link</Badge>`,
  }),
}
