import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { CircleCheckIcon, InfoIcon, OctagonAlertIcon, TerminalIcon, TriangleAlertIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '.'
import { XAlert } from '@/components/xerox/alert'

const meta: Meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          '`XAlert` adds the `success`, `warning` and `info` variants (`Alert` only ships ' +
          '`default` and `destructive`). Also, always use `XAlert` instead of `Alert` for the ' +
          '`destructive` variant: in `Alert` the text does not reach the minimum contrast in ' +
          'either mode.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, TerminalIcon },
    template: `
      <Alert class="w-[420px]">
        <TerminalIcon />
        <AlertTitle>You can add files to your project</AlertTitle>
        <AlertDescription>Drag them into this area or use the button above.</AlertDescription>
      </Alert>
    `,
  }),
}

/** `default` uses `Alert` as-is; everything else, including `destructive`, uses `XAlert`. */
export const Variants: Story = {
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, XAlert, TerminalIcon, OctagonAlertIcon, CircleCheckIcon, TriangleAlertIcon, InfoIcon },
    template: `
      <div class="flex w-[420px] flex-col gap-3">
        <Alert>
          <TerminalIcon />
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>Neutral information, no urgency.</AlertDescription>
        </Alert>
        <XAlert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>Destructive</AlertTitle>
          <AlertDescription>The change could not be saved.</AlertDescription>
        </XAlert>
        <XAlert variant="success">
          <CircleCheckIcon />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your changes were saved successfully.</AlertDescription>
        </XAlert>
        <XAlert variant="warning">
          <TriangleAlertIcon />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Your plan expires in 3 days.</AlertDescription>
        </XAlert>
        <XAlert variant="info">
          <InfoIcon />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>The next update ships on Monday.</AlertDescription>
        </XAlert>
      </div>
    `,
  }),
}

/**
 * `Alert` with `variant="destructive"` fails the minimum contrast in both
 * modes, not just dark. `XAlert` fixes it without changing anything else in
 * the API. Switch the theme in the toolbar to compare.
 */
export const ContrastFix: Story = {
  name: 'Contrast fix',
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle, XAlert, OctagonAlertIcon },
    template: `
      <div class="flex w-[420px] flex-col gap-3">
        <Alert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>Alert — description at 3.99:1 (light) and 3.67:1 (dark)</AlertTitle>
          <AlertDescription>The change could not be saved.</AlertDescription>
        </Alert>
        <XAlert variant="destructive">
          <OctagonAlertIcon />
          <AlertTitle>XAlert — description at 9.07:1 (light) and 7.81:1 (dark)</AlertTitle>
          <AlertDescription>The change could not be saved.</AlertDescription>
        </XAlert>
      </div>
    `,
  }),
}

export const NoIcon: Story = {
  name: 'No icon',
  render: () => ({
    components: { Alert, AlertDescription, AlertTitle },
    template: `
      <Alert class="w-[420px]">
        <AlertTitle>No icon</AlertTitle>
        <AlertDescription>The grid adjusts on its own when there's no svg inside.</AlertDescription>
      </Alert>
    `,
  }),
}
