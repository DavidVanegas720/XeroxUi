import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Checkbox } from '.'
import { Label } from '@/components/ui/label'

const meta: Meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'The `indeterminate` state is correctly announced to screen readers ' +
          '(`aria-checked="mixed"`), but by default it looks the same as `checked`: same check ' +
          'icon. If you need to tell them apart visually too, pass your own icon through the ' +
          'default slot.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Checkbox },
    template: `<Checkbox />`,
  }),
}

export const WithLabel: Story = {
  name: 'With label',
  render: () => ({
    components: { Checkbox, Label },
    template: `
      <div class="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label for="terms">I accept the terms and conditions</Label>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Checkbox, Label },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Checkbox id="normal" />
          <Label for="normal">Normal</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="checked" :model-value="true" />
          <Label for="checked">Checked</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="indeterminate" model-value="indeterminate" />
          <Label for="indeterminate">Indeterminate</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label for="disabled" class="opacity-50">Disabled</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="disabled-checked" disabled :model-value="true" />
          <Label for="disabled-checked" class="opacity-50">Disabled + checked</Label>
        </div>
      </div>
    `,
  }),
}
