import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Input } from '.'
import { Label } from '@/components/ui/label'

/** placeholder/disabled/type are native <input> attrs, not component props. */
interface InputArgs {
  placeholder?: string
  disabled?: boolean
  type?: string
}

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search'] },
  },
  args: { placeholder: 'you@email.com', type: 'email' },
  parameters: {
    docs: {
      description: {
        component:
          'The border is bolder than a Card or a divider, on purpose: an interactive control ' +
          'needs more contrast against the background than a decorative border does.',
      },
    },
  },
}

export default meta
type Story = StoryObj<InputArgs>

export const Playground: Story = {
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: `<Input v-bind="args" class="w-[280px]" />`,
  }),
}

/**
 * The label/input association is made with `for` + `id`. Without it, screen
 * readers won't announce the label when the field receives focus.
 */
export const WithLabel: Story = {
  name: 'With label',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input, Label },
    template: `
      <div class="flex w-[280px] flex-col gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="you@email.com" />
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input, Label },
    template: `
      <div class="flex w-[280px] flex-col gap-5">
        <div class="flex flex-col gap-2">
          <Label for="normal">Normal</Label>
          <Input id="normal" placeholder="Type something" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="disabled">Disabled</Label>
          <Input id="disabled" disabled placeholder="Not editable" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="invalid">Invalid</Label>
          <Input id="invalid" aria-invalid="true" aria-describedby="err" value="not-an-email" />
          <!-- aria-describedby ties the message to the field: the error is announced alongside the value -->
          <p id="err" class="text-sm text-destructive">Invalid email format.</p>
        </div>
      </div>
    `,
  }),
}
