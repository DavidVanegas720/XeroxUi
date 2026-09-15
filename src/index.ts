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
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
export { Checkbox } from './components/ui/checkbox'
export { Switch } from './components/ui/switch'
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
export { Alert, AlertDescription, AlertTitle, alertVariants, type AlertVariants } from './components/ui/alert'
export { Toaster } from './components/ui/sonner'

// --- Wrappers de xeroxUI ----------------------------------------------------
// Corrigen el contraste de la variante `destructive`, que el registro hardcodea
// como `text-white`. Preferir estos sobre Button/Badge crudos.
export { XButton } from './components/xerox/button'
export { XBadge } from './components/xerox/badge'
// Agrega las variantes success/warning/info, que el registro no trae.
export { XAlert } from './components/xerox/alert'
// Conecta los toasts "rich colors" de vue-sonner a nuestra paleta -- sin esto
// usan los verdes/rojos genericos de la libreria. Preferir sobre Sonner crudo.
export { XSonner } from './components/xerox/sonner'
export { DESTRUCTIVE_FIX, alertVariantFixes } from './components/xerox/variant-fixes'
