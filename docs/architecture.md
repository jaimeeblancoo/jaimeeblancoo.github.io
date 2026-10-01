# Arquitectura del portfolio

## Elección

El sitio tiene una página con información profesional, enlaces externos e interacciones visuales. Se utiliza HTML estático, CSS separado y módulos JavaScript nativos. El navegador carga directamente estos archivos.

Un framework y una compilación añadirían herramientas que esta página no necesita. Si se incorpora un blog con muchas páginas, contenido compartido o versiones en varios idiomas, convendrá evaluar un generador estático. Las funciones de usuario o datos privados requerirían servicios separados.

## Responsabilidades

| Ubicación | Responsabilidad |
| --- | --- |
| `index.html` | Contenido semántico, enlaces, accesibilidad básica y metadatos sociales. |
| `src/css/styles.css` | Base visual, componentes, diseño responsive e impresión. |
| `src/css/motion.css` | Transiciones, controles de navegación y movimiento reducido. |
| `src/js/main.js` | Inicializar los módulos de interacción. |
| `src/js/reveal.js` | Aparición de bloques y ciclo de vida de las animaciones. |
| `src/js/navigation.js` | Navegación activa, progreso y vuelta al inicio. |
| `resources/images/` | Fotografías e imágenes. |
| `resources/icons/` | Iconos. |
| `docs/` | Documentación de mantenimiento. |

## Flujo de carga

1. El navegador recibe el HTML, que contiene toda la información profesional.
2. Carga los estilos y las imágenes por rutas relativas.
3. Carga `main.js`, que importa los módulos de apariciones y navegación.
4. JavaScript añade los efectos y controles. Si no se ejecuta, el contenido y los enlaces siguen disponibles.

`index.html` es la única fuente del contenido. No hay una copia en JSON ni un HTML generado que mantener en paralelo. Los scripts temporales usados para el primer borrador no forman parte del repositorio ni del proceso de actualización.

## Publicación

Se conserva `index.html` en la raíz para servir el repositorio directamente con GitHub Pages. `src` contiene código ejecutable en el navegador, sin compilación. No se necesitan `dist`, `node_modules`, un archivo de paquetes ni un workflow de despliegue.

El repositorio permanece privado y Pages no se activa como parte de la reorganización. La publicación requiere un plan que admita Pages en repositorios privados y la autorización para exponer el contenido del sitio.

## Comprobación de cambios

- Servir por HTTP y comprobar la carga de estilos, módulos e imágenes.
- Revisar escritorio y móvil, sin desbordamiento horizontal.
- Comprobar enlaces de sección y que la cabecera no tape sus títulos.
- Verificar apariciones, progreso y vuelta al inicio.
- Comprobar que el contenido sea visible sin JavaScript y con movimiento reducido.

La imagen social y la fotografía de perfil son archivos distintos: actualizar una no modifica automáticamente la otra.
