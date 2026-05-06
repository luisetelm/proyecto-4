# Espaciado y Layout — [Nombre del proyecto]

## Criterio del sistema de espaciado

El espaciado se basa en múltiplos de **4px**. Esto garantiza consistencia visual y facilita el trabajo con Copilot, ya que todos los valores son predecibles.

---

## Escala de espaciado

| Token CSS       | Valor  | Uso típico                                              |
|-----------------|--------|---------------------------------------------------------|
| `--space-1`     | 4px    | Separación mínima entre elementos muy próximos          |
| `--space-2`     | 8px    | Padding interno pequeño, gap entre icono y texto        |
| `--space-3`     | 12px   | Padding de badges, separación entre label e input       |
| `--space-4`     | 16px   | Padding interno de botones, gap entre elementos de lista|
| `--space-5`     | 20px   | Margen entre elementos de formulario                    |
| `--space-6`     | 24px   | Padding de cards, separación entre componentes          |
| `--space-8`     | 32px   | Margen entre secciones pequeñas                         |
| `--space-10`    | 40px   | Padding interno de secciones                            |
| `--space-12`    | 48px   | Margen entre bloques de contenido                       |
| `--space-16`    | 64px   | Separación entre secciones principales                  |
| `--space-20`    | 80px   | Padding vertical de secciones hero y de portada         |
| `--space-24`    | 96px   | Separación máxima entre secciones en escritorio         |

---

## Bordes redondeados (border-radius)

| Token CSS         | Valor  | Uso                                                  |
|-------------------|--------|------------------------------------------------------|
| `--radius-sm`     | 4px    | Inputs, badges, elementos pequeños                   |
| `--radius-md`     | 8px    | Botones, cards pequeñas                              |
| `--radius-lg`     | 16px   | Cards grandes, modales, contenedores destacados      |
| `--radius-xl`     | 24px   | Secciones con fondo, elementos hero                  |
| `--radius-full`   | 9999px | Pills, avatares circulares, toggles                  |

---

## Sombras

| Token CSS          | Valor CSS                                      | Uso                              |
|--------------------|------------------------------------------------|----------------------------------|
| `--shadow-sm`      | `0 1px 3px rgba(0,0,0,0.08)`                  | Cards en reposo                  |
| `--shadow-md`      | `0 4px 12px rgba(0,0,0,0.10)`                 | Cards con hover, dropdowns       |
| `--shadow-lg`      | `0 8px 24px rgba(0,0,0,0.12)`                 | Modales, elementos flotantes     |
| `--shadow-none`    | `none`                                         | Reset explícito                  |

---

## Grid y contenedor

El layout usa un contenedor centrado con ancho máximo. Las columnas se definen con CSS Grid.

| Token CSS               | Valor     | Descripción                                    |
|-------------------------|-----------|------------------------------------------------|
| `--container-max`       | 1200px    | Ancho máximo del contenido en escritorio       |
| `--container-padding`   | 24px      | Padding lateral del contenedor en móvil        |
| `--grid-cols`           | 12        | Número de columnas del grid principal          |
| `--grid-gap`            | 24px      | Separación entre columnas                      |

**CSS del contenedor base:**
```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}
```

---

## Breakpoints responsive

| Token / nombre  | Valor   | Descripción                                         |
|-----------------|---------|-----------------------------------------------------|
| `sm`            | 480px   | Móvil grande (iPhone Plus, Android grande)          |
| `md`            | 768px   | Tablet vertical                                     |
| `lg`            | 1024px  | Tablet horizontal / portátil pequeño                |
| `xl`            | 1280px  | Escritorio estándar                                 |
| `2xl`           | 1536px  | Pantallas grandes                                   |

**Regla general de uso:**
- El diseño se construye **mobile-first**: la base es móvil y se expande.
- Los cambios de layout principales ocurren en `md` (768px) y `lg` (1024px).

---

## Patrones de layout más usados

### Grid de cards (catálogo, servicios)
- Móvil: 1 columna
- Tablet (md): 2 columnas
- Escritorio (lg): 3 columnas

### Sección con imagen y texto
- Móvil: columna única, imagen arriba
- Escritorio (md): dos columnas 50/50 o 60/40

### Formulario
- Móvil: campo a campo, ancho completo
- Escritorio (md): campos en grid de 2 columnas donde tenga sentido

---

## Prompt sugerido para Copilot

```
Lee el archivo spacing.md y añade a tokens.css los custom properties
de espaciado, border-radius, sombras y las variables del contenedor.
Luego genera el CSS base del .container usando esos tokens.
```
