# Portfolio de Jaime Blanco González

Web personal de software, inteligencia artificial y finanzas. Repositorio público. Web publicada en https://jaimeeblancoo.github.io/ y versión inglesa en https://jaimeeblancoo.github.io/en/.

## Estructura

```text
index.html                  Versión española
en/index.html               Versión inglesa
src/
  css/
    styles.css              Diseño y reglas responsive e impresión
    motion.css              Transiciones y movimiento reducido
    theme.css               Paleta oscura compartida
  js/
    main.js                 Punto de entrada de JavaScript
    reveal.js               Apariciones al entrar en pantalla
    navigation.js           Progreso, sección activa y vuelta al inicio
    language.js             Selector de idioma
    motion.js               Adaptación a movimiento reducido
resources/
  fonts/                    Tipografía local y licencia
  images/
    jaime-blanco.png         Fotografía de perfil
    social-preview.png      Imagen al compartir en redes
  icons/
    favicon.svg             Icono de la pestaña
docs/
  architecture.md           Decisiones y mantenimiento
```

## Ver la web en local

Desde la raíz del repositorio, inicia un servidor HTTP estático. Por ejemplo, si tienes Python:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Abre http://127.0.0.1:8765/. Los módulos JavaScript requieren servir la página por HTTP; abrir el archivo con doble clic permite leer el contenido, pero puede bloquear las interacciones.

## Actualizar

- **Textos, fechas y enlaces:** `index.html` (español) y `en/index.html` (inglés). Actualiza ambas versiones al cambiar tu perfil.
- **Colores, tipografía y distribución:** `src/css/styles.css`.
- **Transiciones:** `src/css/motion.css` y `src/js/reveal.js`.
- **Navegación interactiva:** `src/js/navigation.js`.
- **Fotografía y vista previa social:** `resources/images/`.

Actualiza las referencias en el HTML al cambiar nombres de recursos. Mantén los enlaces locales relativos para poder servir la web tanto desde la raíz como desde una subcarpeta.

## GitHub Pages

GitHub Pages está configurado con la rama `main` y la carpeta `/ (root)`. Los cambios enviados a esa rama se publican en https://jaimeeblancoo.github.io/. El repositorio es público y utiliza GitHub Pages sin depender de GitHub Education.

No hay compilación ni dependencias que instalar. El contenido sigue disponible sin JavaScript; las animaciones respetan la preferencia de movimiento reducido. No se han añadido formularios ni analítica.

## Idiomas

Español en `/` e inglés en `/en/`. Ambas versiones contienen el perfil completo en HTML y comparten estilos, scripts y fotografía. El selector ES / EN funciona sin JavaScript; con JavaScript conserva la sección que estabas leyendo. No se fuerza un idioma según el navegador.

Cada versión tiene `lang`, canonical, enlaces `hreflang`, metadatos e imagen social propios. Los nombres de instituciones y los títulos originales de cursos se conservan cuando corresponde. Los identificadores de sección coinciden entre idiomas para facilitar el cambio de página.

## Animaciones automáticas

Las apariciones se ejecutan una vez al entrar cada bloque en pantalla. No hay botones ni preferencias guardadas. `src/js/motion.js` adapta automáticamente los efectos: desplazamiento suave y entrada por opacidad normalmente; solo una transición breve de opacidad cuando el navegador pide reducir el movimiento. No se añaden efectos continuos ni seguimiento del cursor.

Los títulos acompañan la lectura en escritorio y vuelven al flujo normal en móvil e impresión. Las tarjetas responden al cursor en equipos con ratón. Se conserva la navegación nativa, la gestión del foco y la visibilidad del contenido sin JavaScript.

## Tema

La paleta negra y verde lima está en `src/css/theme.css`, compartida entre español e inglés. Las reglas de impresión conservan un fondo claro. Las imágenes sociales también usan esta paleta.

## Dirección visual

Diseño propio inspirado en Ericode (https://www.framer.com/marketplace/templates/ericode/): negro, verde lima, títulos grandes y detalles monoespaciados. No se importa código, imágenes ni componentes de Framer. La tipografía Space Grotesk se sirve desde `resources/fonts/`, con su licencia SIL Open Font License incluida. No se consulta Google Fonts durante la visita.

La fotografía usa un tratamiento monocromo mediante CSS; se conserva el archivo original. El diagrama de SmartGrid-ES es una explicación visual del modelo académico, sin representar métricas ni resultados.
