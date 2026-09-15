import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  // Stories live next to the component they document, not in a separate src/stories/.
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    // Runs axe-core on every story. Complements `npm run contrast`: that one
    // validates tokens, this one validates the rendered DOM.
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/vue3-vite',
  // Brand logo + favicon (assets/brand/), served at the root of Storybook's
  // server. Referenced from manager-head.html (favicon) and manager.ts (logo
  // in the toolbar).
  staticDirs: ['../assets/brand'],
  // Storybook's internal Vite instance doesn't inherit vite.config.ts (that one
  // only applies to the library build) nor register the Tailwind plugin on its
  // own. Without this, `@import 'tailwindcss'` in index.css gets served raw,
  // uncompiled: the HTML comes out with the right classes but no rule to
  // resolve them.
  async viteFinal(viteConfig) {
    viteConfig.plugins ??= []
    viteConfig.plugins.push(tailwindcss())
    return viteConfig
  },
}

export default config
