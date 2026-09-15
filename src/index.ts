/**
 * Entry publico de xeroxUI.
 *
 * Se exportan los componentes de ui/ tal como vienen del registro, y los
 * wrappers de xerox/ (prefijo X) donde hizo falta corregir algo. Ver
 * CONVENTIONS.md para cuando corresponde cada uno.
 */

// --- Utilidades ------------------------------------------------------------
export { cn } from './lib/utils'

// --- Componentes del registro ----------------------------------------------
export { Button, buttonVariants, type ButtonVariants } from './components/ui/button'
export { Badge, badgeVariants, type BadgeVariants } from './components/ui/badge'
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
export { Input } from './components/ui/input'
export { Label } from './components/ui/label'
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'

// --- Wrappers de xeroxUI ----------------------------------------------------
// Corrigen el contraste de la variante `destructive`, que el registro hardcodea
// como `text-white`. Preferir estos sobre Button/Badge crudos.
export { XButton } from './components/xerox/button'
export { XBadge } from './components/xerox/badge'
export { DESTRUCTIVE_FIX } from './components/xerox/variant-fixes'
