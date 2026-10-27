# Portfolio de Asier Rodríguez

Portfolio profesional de Asier Rodríguez, desarrollador web junior. Es una web estática hecha con HTML, CSS y JavaScript, sin framework ni paso de compilación.

## Qué incluye

- Presentación, perfil y experiencia de prácticas.
- Competencias agrupadas por categorías, sin barras de porcentaje.
- Proyectos, formación e idiomas.
- Enlaces de contacto (GitHub y LinkedIn).

## Estructura

```
index.html          Página única con todas las secciones
css/styles.css      Estilos (tokens de diseño en :root)
js/main.js          Partículas del hero y navegación activa (sin dependencias)
fonts/              Playfair Display y Space Grotesk (SIL OFL), alojadas en el proyecto
favicon.svg         Icono
scripts/check.mjs   Comprueba enlaces locales, anclas y recursos CSS
vercel.json         Configuración de despliegue y cabeceras
```

## Ejecutarlo en local

Necesitas cualquier servidor de archivos estáticos. Por ejemplo:

```bash
python3 -m http.server 8000
# o, con Node.js:
npm start
```

Abre http://localhost:8000 (o el puerto que indique el comando).

Para comprobar enlaces y anclas:

```bash
npm run check
```

## Despliegue en Vercel

1. En Vercel, crea un proyecto nuevo (**Add New… → Project**) e importa este repositorio.
2. Deja **Framework Preset** en *Other*, sin comando de build ni directorio de salida (ya está en `vercel.json`).
3. Despliega. Cada `git push` a `main` publica una nueva versión; las ramas generan despliegues de vista previa.

Este proyecto es independiente de [ATWOSAINT](https://atwosaint-web.vercel.app/): tiene su propio repositorio y su propio proyecto en Vercel.

## Accesibilidad y rendimiento

- Idioma del documento en español, enlace «Saltar al contenido» y foco de teclado visible.
- Las animaciones respetan `prefers-reduced-motion`; las partículas se detienen fuera de pantalla y con la pestaña oculta.
- Sin recursos externos: fuentes e iconos van incluidos, así que no hay peticiones a terceros.

## Cómo editar el contenido

Todo el texto está en `index.html`. Colores y tipografías están en las variables de `:root` de `css/styles.css`.

## Tipografías

Playfair Display y Space Grotesk, con licencia SIL Open Font License 1.1 (copias en `fonts/`).
