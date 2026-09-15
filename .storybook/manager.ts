import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

// Rebrands the manager (Storybook's own UI, not the preview). The logo lives
// in assets/brand/, served via staticDirs in main.ts.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'xeroxUI',
    brandImage: 'logo.jpg',
    brandUrl: 'https://github.com/DavidVanegas720/XeroxUi',
  }),
})
