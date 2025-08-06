# Software Gratis 🚀

Una tienda moderna de software gratuito construida con Astro, React y Tailwind CSS. Descarga las mejores herramientas profesionales sin costo alguno.

## ✨ Características

- **Diseño moderno y limpio**: Interfaz minimalista y profesional
- **Responsive**: Mobile-first, optimizado para todos los dispositivos
- **Modo oscuro/claro**: Toggle entre temas con preferencia del sistema
- **SEO optimizado**: Meta tags, Open Graph y Twitter Cards
- **Animaciones fluidas**: Transiciones suaves con Framer Motion
- **Catálogo de productos**: Tarjetas con calificaciones y favoritos
- **Páginas de detalle**: Información completa con pestañas organizadas
- **Rendimiento**: Construido con Astro para máxima velocidad

## 🛠️ Tecnologías

- **[Astro](https://astro.build/)** - Framework web moderno
- **[React](https://reactjs.org/)** - Componentes interactivos
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utility-first
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones fluidas
- **[Lucide React](https://lucide.dev/)** - Iconos modernos
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático

## 🚀 Inicio Rápido

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd software-gratis
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:4321
   ```

## 📁 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos
│   ├── images/          # Imágenes de productos
│   └── favicon.svg      # Favicon
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   └── HeroSection.tsx
│   ├── data/           # Datos de productos
│   │   └── products.ts
│   ├── layouts/        # Layouts de página
│   │   └── Layout.astro
│   ├── pages/          # Rutas y páginas
│   │   ├── index.astro
│   │   └── software/
│   │       └── [id].astro
│   └── styles/         # Estilos globales
│       └── global.css
└── package.json
```

## 🎨 Productos Incluidos

El sitio incluye ejemplos de software popular de:

- **Adobe**: Photoshop, Illustrator, Premiere Pro, After Effects
- **Autodesk**: AutoCAD, Maya
- Y más herramientas profesionales

## 🌐 Características SEO

- Meta tags optimizados
- Open Graph para redes sociales
- Twitter Cards
- URLs semánticas
- Estructura de datos optimizada
- Rendimiento excelente en Lighthouse

## 📱 Responsive Design

- **Mobile-first**: Diseñado primero para móviles
- **Breakpoints**: Adaptado para tablet y desktop
- **Touch-friendly**: Botones y elementos táctiles optimizados
- **Accesibilidad**: Cumple estándares WCAG

## 🎯 Funcionalidades

### Página Principal
- Hero section atractivo con estadísticas
- Grid de productos con filtros
- Tarjetas interactivas con favoritos
- Animaciones de entrada escalonadas

### Páginas de Producto
- Información detallada del software
- Pestañas organizadas (Descripción, Características, Requisitos)
- Requisitos del sistema
- Botón de descarga prominente
- Galería de imágenes

### Tema Oscuro/Claro
- Toggle manual en el header
- Respeta preferencias del sistema
- Transiciones suaves entre temas
- Persistencia en localStorage

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la build
npm run preview

# Verificación de tipos
npm run astro check
```

## 🔧 Personalización

### Agregar Nuevos Productos

1. Edita `src/data/products.ts`
2. Agrega un nuevo objeto `Product`
3. Incluye imagen, descripción y características
4. La página de detalle se genera automáticamente

### Modificar Estilos

1. Edita `src/styles/global.css` para estilos globales
2. Usa clases de Tailwind CSS en componentes
3. Personaliza colores en `tailwind.config.js` (si se crea)

### Configurar SEO

1. Edita meta tags en `src/layouts/Layout.astro`
2. Agrega Open Graph images en `public/`
3. Configura robots.txt y sitemap según necesidades

## 📊 Rendimiento

- **Astro**: Genera HTML estático para mejor rendimiento
- **Componentes Island**: Solo hidrata JavaScript necesario
- **Imágenes optimizadas**: Lazy loading automático
- **CSS crítico**: Inline para primera carga
- **Prefetch**: Enlaces importantes precargados

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-caracteristica`
3. Commit tus cambios: `git commit -m 'Agregar nueva caracteristica'`
4. Push a la rama: `git push origin feature/nueva-caracteristica`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Créditos

- Imágenes de ejemplo: [Unsplash](https://unsplash.com/)
- Iconos: [Lucide](https://lucide.dev/)
- Inspiración de diseño: Sitios modernos de software

---

**Desarrollado con ❤️ para la comunidad de software libre**
