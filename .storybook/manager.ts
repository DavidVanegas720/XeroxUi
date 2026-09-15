import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

// Rebranding del manager (la UI de Storybook, no el preview). El logo vive en
// assets/brand/, servido por staticDirs en main.ts.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'xeroxUI',
    brandImage: 'logo.jpg',
    brandUrl: 'https://github.com/DavidVanegas720/XeroxUi',
  }),
})
