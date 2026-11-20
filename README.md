# Mi portfolio

Hola, soy Asier. Esta es mi web de portfolio: un sitio sencillo donde cuento quién soy, qué he hecho en mis prácticas, qué tecnologías conozco y en qué proyectos estoy metido. Busco mi primera oportunidad como desarrollador web junior.

Puedes verla aquí: https://atwosaint.github.io/asier-rodriguez-portfolio/

## Cómo está hecha

Es una web estática: solo HTML, CSS y JavaScript, sin frameworks y sin paso de compilación. No me hacía falta nada más, y así es fácil de abrir, tocar y desplegar.

Lo que tiene:

- Una cabecera con partículas y un menú flotante.
- Las secciones (perfil, experiencia, competencias, proyectos, formación y contacto) en tarjetas tipo bento.
- Scroll suave y un efecto parallax ligero.
- Las competencias agrupadas por categorías, sin barras de porcentaje: prefiero marcar lo que usé de verdad en mis prácticas que inventarme niveles.

## Qué hay en cada carpeta

```
index.html          La página, con todo el contenido
css/styles.css      Los estilos (colores y fuentes en variables al principio)
js/main.js          Partículas, scroll suave, parallax y animaciones al hacer scroll
js/lenis.min.js     Lenis 1.0.27 (MIT), la librería del scroll suave
fonts/              Las tipografías, con sus licencias
favicon.svg         El icono de la pestaña
scripts/check.mjs   Un script que comprueba que no haya enlaces rotos
vercel.json         Configuración por si la despliego en Vercel
```

## Probarla en tu ordenador

Con cualquier servidor de archivos estáticos vale. Por ejemplo:

```bash
python3 -m http.server 8000
# o, si tienes Node.js:
npm start
```

Luego abre http://localhost:8000 (o el puerto que te diga el comando).

Si quieres comprobar que los enlaces y las anclas funcionan:

```bash
npm run check
```

## Cómo se publica

Está en GitHub Pages: *Settings → Pages → Deploy from a branch → main / root*. Cada vez que hago `git push` a `main`, la web se actualiza sola en uno o dos minutos. Todas las rutas son relativas, así que funciona sin problema dentro de la subruta `/asier-rodriguez-portfolio/`.

También se puede desplegar en Vercel: importa el repositorio, deja el framework en *Other* y sin comando de build (ya está todo en `vercel.json`).

Este portfolio es independiente de [aTwoSaint](https://atwosaint-web.vercel.app/), mi proyecto digital personal: tiene su propio repositorio y su propio despliegue.

## Accesibilidad y rendimiento

Intento que se pueda usar bien con teclado, lector de pantalla y en el móvil:

- La web está en español y tiene un enlace para saltar directamente al contenido.
- El foco del teclado se ve siempre.
- Si tienes activada la opción de reducir movimiento, se desactivan el scroll suave, el parallax y las animaciones.
- Las partículas se paran cuando no se ven, para no gastar batería.
- No carga nada de terceros: las fuentes y los iconos van dentro del proyecto.

## Si quieres cambiar algo

El texto está todo en `index.html`. Los colores y las fuentes están en las variables de `:root`, al principio de `css/styles.css`.

## Tipografías

Bricolage Grotesque y Space Grotesk, las dos con licencia SIL Open Font License 1.1 (las copias están en `fonts/`).
