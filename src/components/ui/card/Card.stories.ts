import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '.'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Container surface. In light mode it uses `--card` (Snow, same as the background) and ' +
          'separates with a border; in dark mode it rises to `stone-800` to lift off Carbon Black.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  render: () => ({
    components: { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Badge },
    template: `
      <Card class="w-[380px]">
        <CardHeader>
          <CardTitle>Production deployment</CardTitle>
          <CardDescription>3 pending migrations will be applied.</CardDescription>
          <CardAction><Badge variant="secondary">v0.1.0</Badge></CardAction>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            The title uses Yanone Kaffeesatz and the body uses Kode Mono.
          </p>
        </CardContent>
        <CardFooter class="gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    `,
  }),
}

export const ContentOnly: Story = {
  name: 'Content only',
  render: () => ({
    components: { Card, CardContent },
    template: `
      <Card class="w-[380px]">
        <CardContent><p class="text-sm">Minimal card, no header or footer.</p></CardContent>
      </Card>
    `,
  }),
}
