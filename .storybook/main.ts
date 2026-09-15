import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  // Las stories viven junto al componente que documentan, no en un src/stories/ aparte.
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    // Corre axe-core sobre cada story. Complementa a `npm run contrast`:
    // aquel valida los tokens, este valida el DOM renderizado.
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/vue3-vite',
  // Logo + favicon de marca (assets/brand/) servidos en la raiz del server de
  // Storybook. Referenciados desde manager-head.html (favicon) y manager.ts
  // (logo en la toolbar).
  staticDirs: ['../assets/brand'],
  // El Vite interno de Storybook no hereda vite.config.ts (ese solo aplica al
  // build de la libreria) ni registra el plugin de Tailwind por su cuenta. Sin
  // esto, `@import 'tailwindcss'` en index.css se sirve crudo, sin compilar:
  // el HTML sale con las clases correctas pero ninguna regla que las resuelva.
  async viteFinal(viteConfig) {
    viteConfig.plugins ??= []
    viteConfig.plugins.push(tailwindcss())
    return viteConfig
  },
}

export default config
