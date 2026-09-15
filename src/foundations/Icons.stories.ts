import type { Meta, StoryObj } from '@storybook/vue3-vite'
import * as icons from '@lucide/vue'

const meta: Meta = {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          '**xeroxUI uses [Lucide](https://lucide.dev) (`@lucide/vue`) as its icon library.** ' +
          'It is not bundled or re-exported from `xerox-ui`: consumers install `@lucide/vue` in ' +
          'their own project and import each icon directly from it, the same way the `ui/` ' +
          'components do internally (`Checkbox`, `Select`, `Dialog`, `Sonner`). Re-exporting the ' +
          'full catalog (~3700 icons) would bloat the published bundle for no reason: the ' +
          'consumer already pays that cost once, with tree-shaking, by importing only what ' +
          'they use.\n\n' +
          '**Size:** `size-4` (16px) is the default for icons inside a control (button, input, ' +
          'menu item) — it\'s the class already applied by `ui/select`, `ui/dialog` and ' +
          '`ui/tabs` via `[&_svg:not([class*=\'size-\'])]:size-4`. `size-3.5` shows up in ' +
          'tighter contexts, like the `Checkbox` icon. For a standalone icon (not next to text), ' +
          'use whatever size the layout calls for — there\'s no fixed rule.\n\n' +
          '**Color:** every Lucide icon ships with `stroke="currentColor"` by default, so it ' +
          'inherits the color of the surrounding text without any prop. To change it, a `text-*` ' +
          'class (`text-muted-foreground`, `text-destructive`, etc.) on the icon or a container ' +
          'is enough.',
      },
    },
  },
}
export default meta
type Story = StoryObj

/**
 * Curated selection for interface work, grouped by use. It is not the full
 * Lucide catalog (~3700 icons) — it's a sample of the most common names for
 * navigation, actions, status and content. Any other icon from
 * https://lucide.dev/icons imports the same way, with the same pattern.
 */
const GROUPS: Record<string, string[]> = {
  Navigation: [
    'ChevronDown', 'ChevronUp', 'ChevronLeft', 'ChevronRight',
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'Menu', 'MoreHorizontal', 'MoreVertical', 'ExternalLink',
  ],
  Actions: [
    'Plus', 'X', 'Check', 'Search', 'Pencil', 'Trash2',
    'Copy', 'Download', 'Upload', 'Settings', 'RefreshCw', 'LogOut',
  ],
  Status: [
    'CircleCheck', 'CircleAlert', 'Info', 'TriangleAlert',
    'OctagonAlert', 'Loader2', 'Bell', 'Star', 'Heart',
  ],
  Content: [
    'User', 'Mail', 'Calendar', 'Clock', 'Eye', 'EyeOff',
    'Lock', 'File', 'Folder', 'Filter',
  ],
}

export const Catalog: Story = {
  render: () => ({
    setup: () => ({ groups: GROUPS, icons }),
    template: `
      <div class="flex flex-col gap-8">
        <div v-for="(names, group) in groups" :key="group">
          <p class="mb-3 text-sm font-medium">{{ group }}</p>
          <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            <div
              v-for="name in names" :key="name"
              class="flex flex-col items-center gap-2 rounded-md border p-3 text-center"
            >
              <component :is="icons[name]" class="size-5" />
              <span class="text-[11px] text-muted-foreground">{{ name }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

/** Same icon (AlertTriangle), three sizes. size-4 is the default for a control. */
export const Sizes: Story = {
  render: () => ({
    setup: () => ({ icons }),
    template: `
      <div class="flex items-end gap-6">
        <div class="flex flex-col items-center gap-2">
          <component :is="icons.TriangleAlert" class="size-3.5" />
          <span class="text-xs text-muted-foreground">size-3.5</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <component :is="icons.TriangleAlert" class="size-4" />
          <span class="text-xs text-muted-foreground">size-4 (default)</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <component :is="icons.TriangleAlert" class="size-6" />
          <span class="text-xs text-muted-foreground">size-6</span>
        </div>
      </div>
    `,
  }),
}

/** Same icon, with no color prop at all: it inherits text-* from the container. */
export const InheritsColor: Story = {
  name: 'Inherits color',
  render: () => ({
    setup: () => ({ icons }),
    template: `
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-center gap-2 text-foreground">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-foreground</span>
        </div>
        <div class="flex flex-col items-center gap-2 text-success">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-success</span>
        </div>
        <div class="flex flex-col items-center gap-2 text-destructive">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-destructive</span>
        </div>
        <div class="flex flex-col items-center gap-2 text-muted-foreground">
          <component :is="icons.CircleCheck" class="size-5" />
          <span class="text-xs text-muted-foreground">text-muted-foreground</span>
        </div>
      </div>
    `,
  }),
}
