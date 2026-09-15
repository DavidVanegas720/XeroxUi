import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Reka UI handles the full ARIA pattern: `role="tablist"`, arrow-key navigation, and ' +
          '`aria-selected` on the active trigger. In dark mode, inactive triggers drop to ' +
          '`text-muted-foreground` and the active one rises to `text-foreground` with its own ' +
          'background.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger },
    template: `
      <Tabs default-value="account" class="w-[360px]">
        <TabsList class="w-full">
          <TabsTrigger value="account" class="flex-1">Account</TabsTrigger>
          <TabsTrigger value="password" class="flex-1">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" class="text-sm text-muted-foreground">
          Changes to your account are saved automatically.
        </TabsContent>
        <TabsContent value="password" class="text-sm text-muted-foreground">
          Use a password with at least 12 characters.
        </TabsContent>
      </Tabs>
    `,
  }),
}

export const WithCard: Story = {
  name: 'With card',
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, CardHeader, CardTitle },
    template: `
      <Tabs default-value="summary" class="w-[380px]">
        <TabsList class="w-full">
          <TabsTrigger value="summary" class="flex-1">Summary</TabsTrigger>
          <TabsTrigger value="detail" class="flex-1">Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card><CardHeader><CardTitle>Summary</CardTitle></CardHeader><CardContent class="text-sm">3 pending tasks.</CardContent></Card>
        </TabsContent>
        <TabsContent value="detail">
          <Card><CardHeader><CardTitle>Detail</CardTitle></CardHeader><CardContent class="text-sm">No news this week.</CardContent></Card>
        </TabsContent>
      </Tabs>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger },
    template: `
      <Tabs default-value="one" class="w-[320px]">
        <TabsList class="w-full">
          <TabsTrigger value="one" class="flex-1">Available</TabsTrigger>
          <TabsTrigger value="two" class="flex-1" disabled>Locked</TabsTrigger>
        </TabsList>
        <TabsContent value="one" class="text-sm text-muted-foreground">Available content.</TabsContent>
        <TabsContent value="two" class="text-sm text-muted-foreground">Shouldn't be visible.</TabsContent>
      </Tabs>
    `,
  }),
}
