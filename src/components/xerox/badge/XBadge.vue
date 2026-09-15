<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Badge, type BadgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { badgeVariantFixes } from '../variant-fixes'

/**
 * Badge de xeroxUI. Mismo criterio que XButton: wrapper fino que solo corrige
 * el contraste de la variante `destructive`. Ver ../variant-fixes.ts.
 */
interface Props extends PrimitiveProps {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), { as: 'span' })

const classes = computed(() =>
  cn(badgeVariantFixes[props.variant ?? 'default'], props.class),
)
</script>

<template>
  <Badge :as="as" :as-child="asChild" :variant="variant" :class="classes">
    <slot />
  </Badge>
</template>
