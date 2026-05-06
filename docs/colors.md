# Colores — [Nombre del proyecto]

## Criterio de elección

[Explica en 2-3 frases por qué has elegido esta paleta. Qué transmite, en qué te has basado.]

> Ejemplo: "Paleta de tonos tierra y verde salvia. Transmite naturalidad y calma, coherente con la temática de bienestar del estudio de yoga."

---

## Paleta base

Define aquí todos los colores con su valor HEX y el nombre semántico que usará el CSS.

### Colores primarios

| Token CSS               | Nombre       | HEX       | Uso principal                              |
|-------------------------|--------------|-----------|--------------------------------------------|
| `--color-primary`       | Verde salvia | `#4A7C59` | Botones principales, enlaces activos, CTA  |
| `--color-primary-light` | Salvia claro | `#7FAF93` | Hover de botones, fondos de badges         |
| `--color-primary-dark`  | Salvia oscuro| `#2E5C3A` | Estados pressed, textos sobre fondo claro  |

### Colores secundarios

| Token CSS                 | Nombre       | HEX       | Uso principal                              |
|---------------------------|--------------|-----------|--------------------------------------------|
| `--color-secondary`       | Tierra       | `#C4905A` | Acentos, destacados, iconos decorativos    |
| `--color-secondary-light` | Tierra claro | `#E0B98A` | Fondos de secciones alternadas             |

### Neutros

| Token CSS              | Nombre          | HEX       | Uso principal                              |
|------------------------|-----------------|-----------|--------------------------------------------|
| `--color-bg`           | Blanco hueso    | `#F7F4EF` | Fondo general de la página                 |
| `--color-bg-secondary` | Gris muy claro  | `#EEEBE4` | Fondos de secciones, cards                 |
| `--color-surface`      | Blanco puro     | `#FFFFFF` | Tarjetas, modales, formularios             |
| `--color-border`       | Gris borde      | `#D6D1C8` | Bordes de inputs, separadores              |
| `--color-text`         | Casi negro      | `#1C1C1A` | Texto principal del cuerpo                 |
| `--color-text-muted`   | Gris medio      | `#6B6760` | Textos secundarios, placeholders, labels   |
| `--color-text-inverse` | Blanco          | `#FFFFFF` | Texto sobre fondos oscuros o de color      |

### Estados y feedback

| Token CSS              | HEX       | Uso                                         |
|------------------------|-----------|---------------------------------------------|
| `--color-success`      | `#3D8B5E` | Confirmaciones, mensajes de éxito           |
| `--color-error`        | `#C0392B` | Errores de validación, alertas              |
| `--color-warning`      | `#E67E22` | Advertencias, campos con atención requerida |
| `--color-info`         | `#2980B9` | Información contextual, tooltips            |

---

## Reglas de uso

- **Nunca** usar `--color-primary` como fondo de texto pequeño (contraste insuficiente).
- El texto `--color-text` sobre `--color-bg` tiene ratio de contraste > 7:1 ✓
- El texto `--color-text-inverse` solo se usa sobre `--color-primary` o colores oscuros.
- `--color-secondary` es un acento: no debe dominar ninguna pantalla.

---

## Cómo usar estos tokens en el código

Copilot generará este bloque en `tokens.css` a partir de este archivo:

```css
:root {
  --color-primary:         #4A7C59;
  --color-primary-light:   #7FAF93;
  --color-primary-dark:    #2E5C3A;
  --color-secondary:       #C4905A;
  --color-secondary-light: #E0B98A;
  --color-bg:              #F7F4EF;
  --color-bg-secondary:    #EEEBE4;
  --color-surface:         #FFFFFF;
  --color-border:          #D6D1C8;
  --color-text:            #1C1C1A;
  --color-text-muted:      #6B6760;
  --color-text-inverse:    #FFFFFF;
  --color-success:         #3D8B5E;
  --color-error:           #C0392B;
  --color-warning:         #E67E22;
  --color-info:            #2980B9;
}
```

---

## Prompt sugerido para Copilot

```
Lee el archivo colors.md y genera el bloque :root de tokens.css
con todas las custom properties de color definidas en las tablas.
```
