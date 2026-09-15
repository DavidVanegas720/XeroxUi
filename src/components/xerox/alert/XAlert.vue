<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Alert } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { alertVariantFixes } from '../variant-fixes'

/**
 * Alert de xeroxUI: agrega `success` / `warning` / `info` a las dos
 * variantes del registro (`default`, `destructive`). Ver
 * ../variant-fixes.ts para como se logra sin editar ui/.
 */
type XAlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info'

const props = withDefaults(
  defineProps<{ variant?: XAlertVariant; class?: HTMLAttributes['class'] }>(),
  { variant: 'default' },
)

// Las variantes nuevas se resuelven como `default` + clases de correccion;
// `default`/`destructive` pasan sin tocar (el Alert de ui/ ya las sabe pintar.
const baseVariant = computed(() =>
  props.variant === 'destructive' ? 'destructive' : 'default',
)
const classes = computed(() => cn(alertVariantFixes[props.variant], props.class))
</script>

<template>
  <Alert :variant="baseVariant" :class="classes">
    <slot />
  </Alert>
</template>
