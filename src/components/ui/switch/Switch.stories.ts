import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Switch } from '.'
import { Label } from '@/components/ui/label'

const meta: Meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'State is distinguished by color as well as thumb position: off uses a neutral tone ' +
          'and on uses the primary color, with enough contrast against the background in both ' +
          'cases.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Switch },
    template: `<Switch />`,
  }),
}

export const WithLabel: Story = {
  name: 'With label',
  render: () => ({
    components: { Switch, Label },
    template: `
      <div class="flex items-center gap-2">
        <Switch id="notifications" :model-value="true" />
        <Label for="notifications">Email notifications</Label>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Switch, Label },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Switch id="off" />
          <Label for="off">Off</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="on" :model-value="true" />
          <Label for="on">On</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="disabled-off" disabled />
          <Label for="disabled-off" class="opacity-50">Disabled, off</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="disabled-on" disabled :model-value="true" />
          <Label for="disabled-on" class="opacity-50">Disabled, on</Label>
        </div>
      </div>
    `,
  }),
}
