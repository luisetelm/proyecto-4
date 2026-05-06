# Tipografía — [Nombre del proyecto]

## Criterio de elección

[Explica por qué has elegido estas fuentes. Qué transmiten, cómo se complementan.]

> Ejemplo: "DM Serif Display para títulos: elegante y con personalidad sin ser recargada. Inter para el cuerpo: máxima legibilidad en pantalla, neutral y moderna. La combinación serif + sans-serif da carácter sin perder funcionalidad."

---

## Fuentes utilizadas

| Rol         | Familia          | Fuente         | Pesos utilizados      |
|-------------|------------------|----------------|-----------------------|
| Títulos     | DM Serif Display | Google Fonts   | 400 (regular)         |
| Cuerpo      | Inter            | Google Fonts   | 400, 500, 600, 700    |
| Código/mono | JetBrains Mono   | Google Fonts   | 400 (solo si se usa)  |

**Importación en HTML:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Escala tipográfica

El sistema usa una escala basada en múltiplos de 4px. El tamaño base del cuerpo es 16px (1rem).

| Token CSS           | Tamaño     | rem     | Uso                                              |
|---------------------|------------|---------|--------------------------------------------------|
| `--text-xs`         | 12px       | 0.75rem | Labels, captions, textos legales, badges         |
| `--text-sm`         | 14px       | 0.875rem| Texto de apoyo, descripción secundaria           |
| `--text-base`       | 16px       | 1rem    | Texto del cuerpo, párrafos, inputs               |
| `--text-md`         | 18px       | 1.125rem| Subtítulos de sección, intro de párrafo          |
| `--text-lg`         | 20px       | 1.25rem | Títulos de card, nombres de producto             |
| `--text-xl`         | 24px       | 1.5rem  | Títulos de sección H3                            |
| `--text-2xl`        | 32px       | 2rem    | Títulos principales H2                           |
| `--text-3xl`        | 40px       | 2.5rem  | Títulos de página H1                             |
| `--text-hero`       | 56px       | 3.5rem  | Titular hero en pantalla principal               |

---

## Pesos tipográficos

| Token CSS            | Valor | Uso                                               |
|----------------------|-------|---------------------------------------------------|
| `--font-normal`      | 400   | Texto corriente, párrafos                         |
| `--font-medium`      | 500   | Labels, texto de navegación                       |
| `--font-semibold`    | 600   | Subtítulos, botones, nombres                      |
| `--font-bold`        | 700   | Títulos que necesitan énfasis, textos de alerta   |

---

## Interlineado (line-height)

| Token CSS              | Valor | Uso                                             |
|------------------------|-------|-------------------------------------------------|
| `--leading-tight`      | 1.2   | Títulos grandes (H1, H2, hero)                  |
| `--leading-snug`       | 1.4   | Títulos medianos (H3, H4)                       |
| `--leading-normal`     | 1.6   | Texto del cuerpo, párrafos                      |
| `--leading-relaxed`    | 1.8   | Textos largos, páginas legales, blog             |

---

## Familias en tokens

| Token CSS            | Valor                                      |
|----------------------|--------------------------------------------|
| `--font-display`     | 'DM Serif Display', Georgia, serif         |
| `--font-body`        | 'Inter', system-ui, sans-serif             |
| `--font-mono`        | 'JetBrains Mono', monospace                |

---

## Jerarquía visual — resumen de uso

| Elemento HTML | Fuente            | Tamaño       | Peso     | Interlineado      |
|---------------|-------------------|--------------|----------|-------------------|
| `<h1>`        | `--font-display`  | `--text-3xl` | 400      | `--leading-tight` |
| `<h2>`        | `--font-display`  | `--text-2xl` | 400      | `--leading-tight` |
| `<h3>`        | `--font-body`     | `--text-xl`  | 600      | `--leading-snug`  |
| `<h4>`        | `--font-body`     | `--text-lg`  | 600      | `--leading-snug`  |
| `<p>`         | `--font-body`     | `--text-base`| 400      | `--leading-normal`|
| `<label>`     | `--font-body`     | `--text-sm`  | 500      | `--leading-normal`|
| `<caption>`   | `--font-body`     | `--text-xs`  | 400      | `--leading-normal`|
| Botón         | `--font-body`     | `--text-sm`  | 600      | —                 |
| Navegación    | `--font-body`     | `--text-sm`  | 500      | —                 |

---

## Reglas de uso

- **Nunca** usar más de 2 familias tipográficas en el mismo proyecto.
- El tamaño mínimo de texto visible es `--text-xs` (12px). Por debajo no se usa.
- Los títulos H1 y H2 usan la fuente display. H3 en adelante usan la fuente de cuerpo.
- Los botones usan siempre `font-semibold` para comunicar acción.

---

## Prompt sugerido para Copilot

```
Lee el archivo typography.md y genera los tokens tipográficos
en tokens.css: font-family, tamaños de texto, pesos e interlineado
como custom properties CSS, siguiendo exactamente los nombres
de token definidos en las tablas.
```
