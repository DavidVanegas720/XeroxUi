<script lang="ts" setup>
import type { ToasterProps } from 'vue-sonner'
import { Toaster as Sonner } from '@/components/ui/sonner'

/**
 * Toaster de xeroxUI.
 *
 * vue-sonner define sus propios `--success-bg`, `--warning-text`, etc. con
 * HSL fijo (ver node_modules/vue-sonner/lib/index.css), desconectado de
 * nuestra paleta. Solo se activan cuando el consumidor pasa `richColors`, asi
 * que sin este wrapper un toast normal se ve bien (usa `--normal-*`, que el
 * Sonner de ui/ ya mapea a nuestros tokens) pero uno con richColors sale con
 * los verdes/rojos genericos de la libreria en vez de nuestras rampas.
 *
 * La correccion son las variables `--success-bg` / `--success-text` / etc.
 * que vue-sonner SI lee, apuntando a los tokens `*-subtle` de theme.css
 * (paleta propia, mismo patron fondo-palido/texto-oscuro/borde-intermedio
 * verificado >= 7.85:1 en ambos modos).
 */
const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    v-bind="props"
    :style="{
      '--success-bg': 'var(--success-subtle)',
      '--success-border': 'var(--success-subtle-border)',
      '--success-text': 'var(--success-subtle-foreground)',
      '--info-bg': 'var(--info-subtle)',
      '--info-border': 'var(--info-subtle-border)',
      '--info-text': 'var(--info-subtle-foreground)',
      '--warning-bg': 'var(--warning-subtle)',
      '--warning-border': 'var(--warning-subtle-border)',
      '--warning-text': 'var(--warning-subtle-foreground)',
      '--error-bg': 'var(--destructive-subtle)',
      '--error-border': 'var(--destructive-subtle-border)',
      '--error-text': 'var(--destructive-subtle-foreground)',
    }"
  />
</template>
