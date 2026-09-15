import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    // Emite los .d.ts del entry publico. El CSS NO pasa por aca: se compila
    // aparte con el CLI de Tailwind (ver `npm run build:css`), para poder
    // publicar una hoja de estilos autocontenida que no obligue al consumidor
    // a tener Tailwind instalado.
    // Stories y fundaciones son documentacion: no se publican. Hay que
    // excluirlas en el plugin Y en tsconfig.build.json; con una sola no alcanza.
    dts({
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: false,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.stories.ts', 'src/foundations/**'],
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      // Todo lo que el consumidor ya tiene o instala por su cuenta queda fuera del bundle.
      external: [
        'vue',
        'reka-ui',
        '@lucide/vue',
        'vue-sonner',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        '@vueuse/core',
      ],
      output: { globals: { vue: 'Vue' }, exports: 'named' },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
})
