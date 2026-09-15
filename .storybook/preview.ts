import type { Decorator, Preview } from '@storybook/vue3-vite'
// Pulls in Tailwind + tokens + fonts + base layer. Same CSS the published
// package ships, so what you see in Storybook is what gets installed.
import '../src/styles/index.css'

/**
 * Applies the `.dark` class to <html> based on the toolbar toggle, and paints
 * the iframe background with the real token, so the mode reads as complete
 * and not just inside the component.
 */
const withTheme: Decorator = (story, context) => {
  const theme = context.globals.theme ?? 'light'
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.body.style.background = 'var(--background)'
  document.body.style.color = 'var(--foreground)'
  return story()
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'xeroxUI theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // 'error' makes an axe violation fail the CI build.
    a11y: { test: 'error' },
    docs: { toc: true },
    // Introduction first, then Components, then Foundations. Everything else
    // falls back to alphabetical within each group.
    options: {
      storySort: {
        order: ['Introduction', 'Components', ['*'], 'Foundations', ['*']],
      },
    },
  },
}

export default preview
