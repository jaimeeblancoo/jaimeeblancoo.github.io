# Portfolio de Jaime Blanco González

Web personal de software, inteligencia artificial y finanzas. Repositorio privado; publicación pendiente de activar GitHub Pages.

## Estructura

```text
index.html                  Contenido, navegación y metadatos
src/
  css/
    styles.css              Diseño y reglas responsive e impresión
    motion.css              Transiciones y movimiento reducido
  js/
    main.js                 Punto de entrada de JavaScript
    reveal.js               Apariciones al entrar en pantalla
    navigation.js           Progreso, sección activa y vuelta al inicio
resources/
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

- **Textos, fechas y enlaces:** `index.html`.
- **Colores, tipografía y distribución:** `src/css/styles.css`.
- **Transiciones:** `src/css/motion.css` y `src/js/reveal.js`.
- **Navegación interactiva:** `src/js/navigation.js`.
- **Fotografía y vista previa social:** `resources/images/`.

Actualiza las referencias en el HTML al cambiar nombres de recursos. Mantén los enlaces locales relativos para poder servir la web tanto desde la raíz como desde una subcarpeta.

## GitHub Pages

Cuando se apruebe GitHub Pro para estudiantes y se autorice la publicación, configura Pages con la rama `main` y la carpeta `/ (root)`. La dirección prevista es https://jaimeeblancoo.github.io/.

No hay compilación ni dependencias que instalar. El contenido sigue disponible sin JavaScript; las animaciones respetan la preferencia de movimiento reducido. No se han añadido formularios ni analítica.
