import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button, type ButtonVariants } from '.'
import { XButton } from '@/components/xerox/button'

const VARIANTS = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const SIZES = ['xs', 'sm', 'default', 'lg'] as const

/** `disabled` and `aria-*` arrive as native attrs, not declared props. */
interface ButtonArgs {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  disabled?: boolean
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: [...SIZES, 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] },
    disabled: { control: 'boolean' },
  },
  args: { variant: 'default', size: 'default' },
  parameters: {
    docs: {
      description: {
        component:
          'Base button, themed with xeroxUI colors. For the `destructive` variant use ' +
          '`XButton` instead of `Button`: it keeps the correct contrast in dark mode (see the ' +
          '"Contrast fix" story).',
      },
    },
  },
}

export default meta
type Story = StoryObj<ButtonArgs>

export const Playground: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Button</Button>`,
  }),
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ variants: VARIANTS }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ sizes: SIZES }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="s in sizes" :key="s" :size="s">{{ s }}</Button>
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button class="ring-ring/50 ring-3 border-ring">Focus (simulated)</Button>
        <Button aria-invalid="true">aria-invalid</Button>
      </div>
    `,
  }),
}

/**
 * `Button` with `variant="destructive"` fails the minimum contrast in dark
 * mode. `XButton` fixes the fill color without changing anything else in
 * the API. Switch the theme to Dark in the toolbar to see the difference.
 */
export const ContrastFix: Story = {
  name: 'Contrast fix',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button, XButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-sm text-muted-foreground">Button — fails in dark mode</p>
          <div><Button variant="destructive">Delete</Button></div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm text-muted-foreground">XButton — uses --destructive-foreground, 5.65:1</p>
          <div><XButton variant="destructive">Delete</XButton></div>
        </div>
      </div>
    `,
  }),
}
