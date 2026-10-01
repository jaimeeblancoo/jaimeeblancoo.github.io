# Arquitectura del portfolio

## Elección

El sitio tiene una página por idioma con información profesional, enlaces externos e interacciones visuales. Se utiliza HTML estático, CSS separado y módulos JavaScript nativos. El navegador carga directamente estos archivos.

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

`index.html` contiene la versión española y `en/index.html` la inglesa. Cada archivo es la fuente de su contenido y deben actualizarse juntos. No hay una copia en JSON ni un HTML generado que mantener en paralelo. Los scripts temporales usados para el primer borrador no forman parte del repositorio ni del proceso de actualización.

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

## Versiones de idioma

Las dos páginas se sirven directamente, sin depender de JavaScript para traducir el perfil. Esto permite compartir enlaces por idioma y mantener el contenido disponible para lectores, motores de búsqueda y vistas previas sociales. Los recursos y módulos son compartidos; las rutas inglesas usan `../` para acceder a ellos.

`src/js/language.js` conserva la sección activa al cambiar de idioma. El selector tiene enlaces nativos y señala el idioma actual mediante `aria-current`. La etiqueta accesible del botón de vuelta al inicio depende del idioma del documento.

Para añadir un idioma, crea su HTML, traduce también metadatos y etiquetas accesibles, ajusta los recursos relativos y añade enlaces alternativos y el selector en todas las páginas. Si crece el número de páginas o idiomas, convendrá generar las páginas desde plantillas comunes para reducir la duplicación de estructura.

## Animaciones automáticas

Las apariciones se ejecutan una vez al entrar cada bloque en pantalla. No hay botones ni preferencias guardadas. `src/js/motion.js` adapta automáticamente los efectos: desplazamiento suave y entrada por opacidad normalmente; solo una transición breve de opacidad cuando el navegador pide reducir el movimiento. No se añaden efectos continuos ni seguimiento del cursor.

Los títulos acompañan la lectura en escritorio y vuelven al flujo normal en móvil e impresión. Las tarjetas responden al cursor en equipos con ratón. Se conserva la navegación nativa, la gestión del foco y la visibilidad del contenido sin JavaScript.

## Referencias visuales

Se revisaron https://brittanychiang.com/ y https://leerob.com/ como referencias de jerarquía del perfil y concisión. La presentación y los efectos de este sitio se implementan con su propio HTML, CSS y JavaScript, manteniendo el contenido del portfolio.

## Dirección visual

Diseño propio inspirado en Ericode (https://www.framer.com/marketplace/templates/ericode/): negro, verde lima, títulos grandes y detalles monoespaciados. No se importa código, imágenes ni componentes de Framer. La tipografía Space Grotesk se sirve desde `resources/fonts/`, con su licencia SIL Open Font License incluida. No se consulta Google Fonts durante la visita.

La fotografía usa un tratamiento monocromo mediante CSS; se conserva el archivo original. El diagrama de SmartGrid-ES es una explicación visual del modelo académico, sin representar métricas ni resultados.
