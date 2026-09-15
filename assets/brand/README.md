# assets/brand/

Assets de marca de xeroxUI. No se publican en el paquete npm (`files` en
`package.json` solo incluye `dist`); se usan para Storybook (`staticDirs` en
`.storybook/main.ts`) y el README del repo.

| Archivo | Uso |
|---|---|
| `logo.jpg` | Lockup horizontal (ícono + wordmark). README y toolbar del manager de Storybook (`.storybook/manager.ts`). |
| `favicon.jpg` | Ícono cuadrado. Pestaña del manager de Storybook (`.storybook/manager-head.html`). |
| `brandsheet-source.jpg` | Lámina de marca original tal como se recibió (logo con reflejo + mockups de favicon en círculo, cuadrado y navegador). `logo.jpg` y `favicon.jpg` salieron de recortar esta imagen, no son archivos aislados originales. Se conserva por si hace falta recortar de nuevo con otro encuadre. |

Los dos recortes son JPEG con fondo blanco sólido. No sirve convertirlos a PNG
para "quitarles el fondo": los bordes están antialiaseados contra blanco y
comprimidos con pérdida, así que un recorte por color deja un halo visible sobre
cualquier fondo que no sea blanco. Si aparece una exportación vectorial (SVG) o
con canal alfa del logo, reemplazar estos archivos por esa versión.
