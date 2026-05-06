# Componentes — [Nombre del proyecto]

## Cómo usar este archivo

Cada componente está descrito en texto para que Copilot pueda generarlo en HTML y CSS usando los tokens definidos en `colors.md`, `typography.md` y `spacing.md`. Cuanto más precisa sea la descripción, mejor será el código generado.

---

## Botones

### Botón primario
- **Fondo:** `--color-primary`
- **Texto:** `--color-text-inverse`, `--text-sm`, `--font-semibold`
- **Padding:** `--space-3` vertical, `--space-6` horizontal
- **Border-radius:** `--radius-md`
- **Hover:** fondo `--color-primary-dark`, transición suave de 200ms
- **Sin borde ni sombra**
- **Uso:** acción principal de cada pantalla (enviar formulario, reservar, ver más)

### Botón secundario
- **Fondo:** transparente
- **Borde:** 1.5px sólido `--color-primary`
- **Texto:** `--color-primary`, `--text-sm`, `--font-semibold`
- **Padding:** igual que el botón primario
- **Border-radius:** `--radius-md`
- **Hover:** fondo `--color-primary` al 8% de opacidad
- **Uso:** acción secundaria, alternativa al botón primario

### Botón ghost / texto
- **Sin fondo ni borde**
- **Texto:** `--color-primary`, `--text-sm`, `--font-medium`
- **Underline en hover**
- **Uso:** navegación secundaria, cancelar, volver

### Estado deshabilitado (todos los botones)
- **Opacidad:** 40%
- **Cursor:** not-allowed
- **No hay hover**

---

## Inputs y formularios

### Campo de texto (input / textarea)
- **Fondo:** `--color-surface`
- **Borde:** 1px sólido `--color-border`, `--radius-sm`
- **Texto:** `--color-text`, `--text-base`, `--font-normal`
- **Padding:** `--space-3` vertical, `--space-4` horizontal
- **Focus:** borde 2px `--color-primary`, sin sombra exterior, outline none
- **Placeholder:** `--color-text-muted`
- **Error:** borde `--color-error`, mensaje de error en `--text-xs` `--color-error` debajo del campo

### Label
- **Texto:** `--color-text`, `--text-sm`, `--font-medium`
- **Margen inferior:** `--space-2` respecto al input
- **Los labels van siempre encima del campo, nunca dentro como placeholder**

### Área de texto (textarea)
- Mismos estilos que el input
- **Altura mínima:** 120px
- **Resize:** solo vertical

---

## Cards

### Card estándar
- **Fondo:** `--color-surface`
- **Borde:** 1px sólido `--color-border`
- **Border-radius:** `--radius-lg`
- **Padding:** `--space-6`
- **Sombra en reposo:** `--shadow-sm`
- **Sombra en hover:** `--shadow-md`, transición 200ms
- **Estructura interna:** imagen (opcional, ocupa todo el ancho superior) → título `--text-lg` `--font-semibold` → descripción `--text-sm` `--color-text-muted` → acción (botón o enlace)

### Card de servicio / característica
- Sin imagen
- Icono en la parte superior: 40×40px, color `--color-primary`
- Título `--text-lg` `--font-semibold`
- Descripción `--text-base` `--color-text-muted`
- Sin hover especial, solo visual estática

---

## Navegación

### Header / barra de navegación
- **Posición:** fija en la parte superior (`position: sticky`)
- **Fondo:** `--color-surface` con ligera sombra `--shadow-sm`
- **Altura:** 64px
- **Layout:** logo a la izquierda, enlaces centrados o a la derecha, botón CTA al final
- **Enlace activo:** `--color-primary`, `--font-medium`
- **Enlace en hover:** `--color-primary`
- **En móvil:** menú hamburguesa que despliega un menú vertical

### Enlace de navegación
- **Texto:** `--text-sm`, `--font-medium`, `--color-text`
- **Hover:** `--color-primary`
- **Activo:** `--color-primary`, subrayado o punto indicador

---

## Footer

- **Fondo:** tono oscuro o `--color-bg-secondary`
- **Padding vertical:** `--space-16`
- **Layout:** columnas en escritorio (logo + descripción / navegación / contacto), columna única en móvil
- **Texto:** `--text-sm`, `--color-text-muted`
- **Enlace:** `--color-text-muted`, hover `--color-text`
- **Debe incluir siempre:** enlace a Aviso Legal, Política de Privacidad y Política de Cookies

---

## Banner de cookies

- **Posición:** fija en la parte inferior de la pantalla
- **Fondo:** `--color-text` (oscuro), texto `--color-text-inverse`
- **Padding:** `--space-4` vertical, `--space-6` horizontal
- **Texto:** `--text-sm`
- **Botones:** "Aceptar" (botón primario pequeño) y "Rechazar" (botón ghost en blanco)
- **Comportamiento:** visible en la primera visita. Desaparece al aceptar o rechazar. La preferencia se guarda en localStorage. No vuelve a aparecer si ya se tomó una decisión.

---

## Mensajes de feedback

### Mensaje de éxito (tras enviar formulario)
- **Fondo:** verde muy claro (10% opacidad de `--color-success`)
- **Borde izquierdo:** 4px sólido `--color-success`
- **Icono:** check circle
- **Texto:** `--text-sm`, `--color-success`
- **Padding:** `--space-4`
- **Border-radius:** `--radius-sm`

### Mensaje de error
- Mismo patrón con `--color-error`

---

## Badges / etiquetas

- **Padding:** `--space-1` vertical, `--space-3` horizontal
- **Border-radius:** `--radius-full`
- **Texto:** `--text-xs`, `--font-medium`
- **Variantes de color:** según categoría o estado (usar el color semántico correspondiente al 15% de opacidad como fondo, color al 100% como texto)

---

## Prompt sugerido para Copilot

```
Lee el archivo components.md y genera el CSS completo de cada
componente usando los tokens de colors.md, typography.md y spacing.md.
Genera primero los botones, luego los inputs, luego las cards.
Revisa que todos los valores usen custom properties CSS, nunca
valores fijos en el código.
```
