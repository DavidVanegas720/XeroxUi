import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Une clases condicionales y resuelve conflictos de Tailwind (la ultima gana).
 * Es lo que permite que un consumidor pase `class="bg-red-500"` a un componente
 * y pise el `bg-primary` del variant sin pelear con la specificity.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
