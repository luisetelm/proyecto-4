# Mapa Interior

Test de personalidad web hecho con `HTML`, `CSS` y `JavaScript` vanilla.

## Qué incluye

- 5 secciones psicológicas
- 20 preguntas tipo Likert
- navegación por secciones
- validación para evitar avanzar con preguntas vacías
- guardado automático en `localStorage`
- perfil final con arquetipo, fortalezas y áreas de crecimiento
- pruebas automáticas del scoring y del servidor local

## Estructura

- `index.html`: interfaz principal
- `css/styles.css`: estilos y diseño responsive
- `js/questions.js`: banco de preguntas y metadatos de rasgos
- `js/scoring.js`: cálculo de resultados y perfil final
- `js/app.js`: interacción de la app en navegador
- `tests/scoring.test.js`: prueba automatizada del motor de perfil

## Cómo probarlo

Como `Node.js` está disponible, la forma más directa es arrancar el servidor incluido desde la raíz del proyecto.

### Arrancar la app

```powershell
npm start
```

Luego abre en el navegador:

```text
http://localhost:8080
```

### Alternativa con Python

Si prefieres un servidor estático distinto y tienes Python instalado:

```powershell
python -m http.server 8080
```

### Ejecutar las pruebas automáticas

Con Node.js:

```powershell
npm test
```

## Personalización rápida

Si quieres cambiar el contenido del test:

- modifica preguntas y textos en `js/questions.js`
- ajusta la lógica del resultado en `js/scoring.js`
- adapta el diseño en `css/styles.css`

## Nota

Este test está pensado como una experiencia orientativa y de autoconocimiento; no sustituye una evaluación psicológica profesional.

