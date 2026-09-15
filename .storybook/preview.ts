import type { Decorator, Preview } from '@storybook/vue3-vite'
// Trae Tailwind + tokens + fuentes + capa base. Es el mismo CSS que consume
// el paquete publicado, asi que lo que se ve en Storybook es lo que se instala.
import '../src/styles/index.css'

/**
 * Aplica la clase `.dark` al <html> segun el toggle de la toolbar y pinta el
 * fondo del iframe con el token real, para que el modo se vea completo y no
 * solo dentro del componente.
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
      description: 'Tema de xeroxUI',
      toolbar: {
        title: 'Tema',
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
    // 'error' hace que una violacion de axe rompa el build en CI.
    a11y: { test: 'error' },
    docs: { toc: true },
  },
}

export default preview
