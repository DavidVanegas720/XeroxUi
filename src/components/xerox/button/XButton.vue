<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Button, type ButtonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { buttonVariantFixes } from '../variant-fixes'

/**
 * Button de xeroxUI.
 *
 * Wrapper fino sobre el Button del registro: misma API, mismas variantes y
 * tamanos. Lo unico que agrega es la correccion de contraste de `destructive`.
 *
 * `inheritAttrs` queda en true (default) a proposito: reka-ui pasa aria-*,
 * data-state, id y handlers por attrs, y desactivarlo sin re-emitirlos
 * romperia el anuncio a lectores de pantalla.
 */
interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), { as: 'button' })

// El Button de ui/ hace cn(buttonVariants(...), props.class), asi que lo que
// mandemos por `class` se evalua despues y twMerge lo deja ganar.
const classes = computed(() =>
  cn(buttonVariantFixes[props.variant ?? 'default'], props.class),
)
</script>

<template>
  <Button
    :as="as"
    :as-child="asChild"
    :variant="variant"
    :size="size"
    :class="classes"
  >
    <slot />
  </Button>
</template>
