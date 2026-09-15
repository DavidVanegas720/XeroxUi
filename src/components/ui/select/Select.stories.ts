import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '.'
import { Label } from '@/components/ui/label'

const meta: Meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          '**Every `SelectTrigger` needs an `aria-label` or an associated `<Label for>`.** ' +
          'The placeholder shown in `SelectValue` is not enough: by the ARIA spec, a ' +
          '`combobox` does not take its accessible name from visible text. Without one of the ' +
          'two, the control is mute to a screen reader even though it looks perfect.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue },
    template: `
      <Select>
        <SelectTrigger class="w-[220px]" aria-label="Choose a framework">
          <SelectValue placeholder="Choose a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frameworks</SelectLabel>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    `,
  }),
}

/** Preferred over `aria-label` when there's a visible label in the UI. */
export const WithLabel: Story = {
  name: 'With label',
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label },
    template: `
      <div class="flex w-[220px] flex-col gap-2">
        <Label for="country">Country</Label>
        <Select>
          <SelectTrigger id="country" class="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">Argentina</SelectItem>
            <SelectItem value="co">Colombia</SelectItem>
            <SelectItem value="mx">Mexico</SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue },
    template: `
      <div class="flex flex-col items-start gap-3">
        <Select>
          <SelectTrigger size="sm" class="w-[180px]" aria-label="Size sm">
            <SelectValue placeholder="Size sm" />
          </SelectTrigger>
          <SelectContent><SelectItem value="a">Option A</SelectItem></SelectContent>
        </Select>
        <Select>
          <SelectTrigger size="default" class="w-[180px]" aria-label="Size default">
            <SelectValue placeholder="Size default" />
          </SelectTrigger>
          <SelectContent><SelectItem value="a">Option A</SelectItem></SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue },
    template: `
      <Select disabled>
        <SelectTrigger class="w-[220px]" aria-label="Not available">
          <SelectValue placeholder="Not available" />
        </SelectTrigger>
        <SelectContent><SelectItem value="a">Option A</SelectItem></SelectContent>
      </Select>
    `,
  }),
}
