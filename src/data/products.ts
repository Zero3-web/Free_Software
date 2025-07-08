export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  category: string;
  version: string;
  company: string;
  rating: number;
  downloads: number;
  image: string;
  tags: string[];
  badges?: string[]; // Etiquetas destacadas como "Nuevo", "Top", "Actualizado"
  securityBadges?: Array<'verified' | 'virus-free' | 'secure' | 'trusted' | 'certified'>; // Indicadores de seguridad
  systemRequirements: {
    os: string[];
    processor: string;
    memory: string;
    storage: string;
  };
  features: string[];
  releaseDate: string;
  size: string;
}

export const products: Product[] = [
  {
    id: "adobe-photoshop",
    name: "Adobe Photoshop",
    description: "Editor de imágenes profesional líder en la industria para diseño gráfico y retoque fotográfico.",
    fullDescription: `Adobe Photoshop es la herramienta de edición de imágenes más potente y versátil del mundo. Utilizada por fotógrafos profesionales, diseñadores gráficos y artistas digitales, Photoshop ofrece capacidades ilimitadas para crear, editar y manipular imágenes con precisión excepcional.

Con más de 30 años de innovación continua, Photoshop ha establecido el estándar para la edición de imágenes digitales. Desde retoque fotográfico básico hasta composiciones complejas y arte digital avanzado, esta aplicación proporciona todas las herramientas necesarias para dar vida a tu visión creativa.

Las nuevas funciones impulsadas por inteligencia artificial facilitan tareas complejas como la selección de objetos, el reemplazo de cielos y la eliminación de fondos con solo unos clics. Los pinceles de alta calidad y las herramientas de pintura digital permiten crear obras de arte originales desde cero.

La integración perfecta con Creative Cloud garantiza que tus proyectos estén siempre sincronizados y accesibles desde cualquier dispositivo. Colabora en tiempo real con otros creadores y accede a miles de recursos gratuitos y premium.`,
    category: "Diseño Gráfico",
    version: "2024",
    company: "Adobe",
    rating: 4.8,
    downloads: 15600000,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop&auto=format",
    tags: ["Edición", "Fotografía", "Diseño", "Digital Art"],
    badges: ["Top", "Actualizado"],
    securityBadges: ["verified", "virus-free", "trusted"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i5 o AMD equivalente",
      memory: "8 GB RAM (16 GB recomendado)",
      storage: "4 GB de espacio disponible"
    },
    features: [
      "Edición de imágenes avanzada",
      "Herramientas de retoque profesional",
      "Capas y máscaras",
      "Filtros y efectos",
      "Integración con Creative Cloud",
      "IA integrada para automatización",
      "Soporte para formatos RAW",
      "Herramientas de tipografía avanzadas"
    ],
    releaseDate: "2024-10-15",
    size: "2.8 GB"
  },
  {
    id: "adobe-illustrator",
    name: "Adobe Illustrator",
    description: "Software de ilustración vectorial profesional para crear logotipos, iconos y gráficos escalables.",
    fullDescription: `Adobe Illustrator es la aplicación líder mundial para crear gráficos vectoriales precisos y escalables. Diseñadores de todo el mundo confían en Illustrator para crear logotipos icónicos, ilustraciones complejas, tipografías personalizadas y gráficos que mantienen su calidad en cualquier tamaño.

La precisión matemática de los gráficos vectoriales significa que tus diseños se verán perfectos tanto en una tarjeta de presentación como en una valla publicitaria. Las herramientas de dibujo avanzadas permiten crear curvas suaves y formas geométricas perfectas con facilidad.

Las nuevas funciones incluyen herramientas de IA que simplifican tareas complejas como la vectorización automática de imágenes y la generación de variaciones de color inteligentes. El panel de bibliotecas Creative Cloud te da acceso instantáneo a millones de recursos gráficos de alta calidad.

La integración perfecta con otras aplicaciones de Adobe facilita el flujo de trabajo creativo, permitiendo mover seamlessly entre Illustrator, Photoshop, InDesign y otras herramientas de Creative Cloud.`,
    category: "Diseño Gráfico",
    version: "2024",
    company: "Adobe",
    rating: 4.7,
    downloads: 12400000,
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=450&fit=crop&auto=format",
    tags: ["Vectorial", "Logos", "Ilustración", "Branding"],
    badges: ["Nuevo"],
    securityBadges: ["verified", "secure", "trusted"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i5 o AMD equivalente",
      memory: "8 GB RAM (16 GB recomendado)",
      storage: "3.5 GB de espacio disponible"
    },
    features: [
      "Gráficos vectoriales escalables",
      "Herramientas de dibujo precisas",
      "Tipografía avanzada",
      "Efectos y filtros vectoriales",
      "Integración Creative Cloud",
      "Exportación multi-formato",
      "Bibliotecas de recursos",
      "Colaboración en tiempo real"
    ],
    releaseDate: "2024-10-15",
    size: "2.4 GB"
  },
  {
    id: "autodesk-autocad",
    name: "AutoCAD",
    description: "Software CAD profesional para diseño 2D y 3D, arquitectura, ingeniería y construcción.",
    fullDescription: `AutoCAD es el software de diseño asistido por computadora (CAD) más utilizado en el mundo, estableciendo el estándar para el diseño técnico preciso desde 1982. Arquitectos, ingenieros, diseñadores y profesionales de la construcción confían en AutoCAD para crear planos técnicos, modelos 3D y documentación de proyectos con precisión milimétrica.

Las herramientas de dibujo y modelado de AutoCAD permiten crear geometrías complejas con facilidad, desde planos arquitectónicos detallados hasta diseños mecánicos sofisticados. La precisión matemática garantiza que cada línea, arco y dimensión sean exactamente como los especificas.

Las nuevas funciones incluyen herramientas de IA que automatizan tareas repetitivas como la generación de bloques y la optimización de diseños. El modelado 3D integrado permite visualizar proyectos desde múltiples perspectivas y generar renderizados fotorrealistas.

La colaboración en la nube facilita el trabajo en equipo, permitiendo que múltiples usuarios trabajen en el mismo proyecto simultáneamente. La compatibilidad con formatos estándar de la industria garantiza interoperabilidad con otros software CAD y BIM.`,
    category: "CAD/Ingeniería",
    version: "2024",
    company: "Autodesk",
    rating: 4.6,
    downloads: 8900000,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=450&fit=crop&auto=format",
    tags: ["CAD", "Arquitectura", "Ingeniería", "3D"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i7 o AMD equivalente",
      memory: "16 GB RAM (32 GB recomendado)",
      storage: "7 GB de espacio disponible"
    },
    features: [
      "Diseño 2D y 3D precisos",
      "Herramientas de dibujo técnico",
      "Modelado sólido 3D",
      "Bibliotecas de bloques",
      "Colaboración en la nube",
      "API para personalización",
      "Renderizado fotorrealista",
      "Documentación automática"
    ],
    releaseDate: "2024-09-20",
    size: "4.2 GB"
  },
  {
    id: "adobe-premiere-pro",
    name: "Adobe Premiere Pro",
    description: "Editor de video profesional para crear contenido cinematográfico de alta calidad.",
    fullDescription: `Adobe Premiere Pro es la herramienta de edición de video elegida por profesionales de Hollywood y creadores de contenido en todo el mundo. Desde cortometrajes independientes hasta blockbusters de gran presupuesto, Premiere Pro ofrece las herramientas necesarias para contar historias visuales impactantes.

El flujo de trabajo intuitivo y las herramientas avanzadas permiten editar videos en cualquier formato, desde 8K hasta realidad virtual. Las funciones de corrección de color integradas rivalizan con software especializado, mientras que las herramientas de audio proporcionan un control completo sobre la banda sonora.

La inteligencia artificial integrada acelera tareas como el recorte automático, la sincronización de audio y la detección de escenas. Los proxies automáticos permiten editar material de alta resolución en tiempo real, incluso en sistemas con recursos limitados.

La integración perfecta con After Effects, Audition y otras aplicaciones Creative Cloud crea un ecosistema completo para la producción de video profesional. Colabora con equipos distribuidos globalmente gracias a las funciones de revisión y aprovación en la nube.`,
    category: "Video/Multimedia",
    version: "2024",
    company: "Adobe",
    rating: 4.7,
    downloads: 11200000,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop&auto=format",
    tags: ["Video", "Edición", "Multimedia", "Cinematografía"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i7 o AMD equivalente",
      memory: "16 GB RAM (32 GB recomendado)",
      storage: "8 GB de espacio disponible"
    },
    features: [
      "Edición de video multicámara",
      "Corrección de color avanzada",
      "Efectos visuales integrados",
      "Audio multipista",
      "Exportación optimizada",
      "Colaboración en equipo",
      "Soporte 8K y VR",
      "IA para automatización"
    ],
    releaseDate: "2024-10-01",
    size: "3.8 GB"
  },
  {
    id: "autodesk-maya",
    name: "Autodesk Maya",
    description: "Software de animación 3D y efectos visuales profesional para cine, TV y videojuegos.",
    fullDescription: `Autodesk Maya es la herramienta de referencia para animación 3D, modelado y efectos visuales en la industria del entretenimiento. Estudios de animación de renombre mundial, productoras de efectos especiales y desarrolladores de videojuegos AAA confían en Maya para crear personajes, mundos y efectos que definen la cultura visual contemporánea.

Las herramientas de modelado poligonal y NURBS permiten crear geometrías orgánicas y técnicas con igual facilidad. El sistema de rigging avanzado facilita la creación de esqueletos complejos para personajes y objetos, mientras que las herramientas de animación ofrecen control total sobre movimiento y timing.

Los sistemas de partículas y dinámicas permiten simular fenómenos naturales como fuego, agua, humo y destrucción con realismo fotográfico. El motor de renderizado Arnold integrado produce imágenes de calidad cinematográfica directamente desde Maya.

Python scripting y MEL proporcionan infinitas posibilidades de personalización y automatización. Los pipelines de producción se benefician de la arquitectura modular de Maya y su compatibilidad con herramientas de terceros.`,
    category: "3D/Animación",
    version: "2024",
    company: "Autodesk",
    rating: 4.6,
    downloads: 6700000,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=450&fit=crop&auto=format",
    tags: ["3D", "Animación", "VFX", "Modelado"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+", "Linux"],
      processor: "Intel i7 o AMD equivalente",
      memory: "16 GB RAM (32 GB recomendado)",
      storage: "9 GB de espacio disponible"
    },
    features: [
      "Modelado 3D avanzado",
      "Animación de personajes",
      "Sistemas de partículas",
      "Renderizado fotorrealista",
      "Rigging y deformación",
      "Simulación de dinámicas",
      "Scripting Python/MEL",
      "Pipeline de producción"
    ],
    releaseDate: "2024-09-15",
    size: "5.1 GB"
  },
  {
    id: "adobe-after-effects",
    name: "Adobe After Effects",
    description: "Software de composición y efectos visuales para crear gráficos en movimiento y VFX.",
    fullDescription: `Adobe After Effects es la aplicación estándar de la industria para gráficos en movimiento y efectos visuales. Desde títulos cinematográficos hasta publicidad digital, desde explicadores animados hasta efectos especiales complejos, After Effects proporciona las herramientas para dar vida a ideas visuales extraordinarias.

El sistema de composición por capas permite combinar elementos 2D y 3D en escenas complejas con control total sobre timing, transformaciones y efectos. Miles de efectos incorporados, desde color correction hasta distorsión temporal, ofrecen posibilidades creativas ilimitadas.

La animación mediante keyframes y expresiones matemáticas permite crear movimientos precisos y orgánicos. El sistema de tracking integrado facilita la integración de elementos generados por computadora en footage real, mientras que las herramientas de estabilización corrigen problemas de cámara automáticamente.

La integración con Cinema 4D permite importar y renderizar escenas 3D complejas directamente en After Effects. Los scripts y plugins de terceros extienden las capacidades del software prácticamente sin límites.`,
    category: "Video/Multimedia",
    version: "2024",
    company: "Adobe",
    rating: 4.8,
    downloads: 9800000,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop&auto=format",
    tags: ["VFX", "Motion Graphics", "Composición", "Animación"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i7 o AMD equivalente",
      memory: "16 GB RAM (32 GB recomendado)",
      storage: "6 GB de espacio disponible"
    },
    features: [
      "Composición multicapa",
      "Efectos visuales avanzados",
      "Motion graphics",
      "Tracking y estabilización",
      "Integración 3D",
      "Expresiones matemáticas",
      "Color grading",
      "Render distribuido"
    ],
    releaseDate: "2024-10-01",
    size: "3.2 GB"
  },
  {
    id: "adobe-acrobat",
    name: "Adobe Acrobat",
    description: "Visualiza, edita y firma archivos PDF de forma profesional.",
    fullDescription: `Adobe Acrobat es el estándar mundial para trabajar con archivos PDF. Permite crear, editar, convertir, firmar y proteger documentos PDF con facilidad y seguridad. Ideal para profesionales, estudiantes y empresas que requieren gestionar documentos digitales de manera eficiente.`,
    category: "Productividad",
    version: "2024",
    company: "Adobe",
    rating: 4.7,
    downloads: 12000000,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&auto=format",
    tags: ["PDF", "Documentos", "Firma", "Conversión"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 o superior",
      memory: "4 GB RAM",
      storage: "1 GB de espacio disponible"
    },
    features: [
      "Visualización y edición de PDF",
      "Conversión a Word, Excel, PowerPoint",
      "Firma electrónica",
      "Protección con contraseña",
      "Relleno de formularios"
    ],
    releaseDate: "2024-05-10",
    size: "500 MB"
  },
  {
    id: "filmora",
    name: "Filmora",
    description: "Editor de video fácil y potente para creadores de contenido.",
    fullDescription: `Filmora es un editor de video intuitivo y accesible para todos los niveles. Ofrece herramientas creativas, efectos, transiciones y una interfaz amigable para crear videos profesionales en minutos. Ideal para YouTubers, educadores y empresas.`,
    category: "Edición de Video",
    version: "13.0",
    company: "Wondershare",
    rating: 4.6,
    downloads: 9000000,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=450&fit=crop&auto=format",
    tags: ["Video", "Edición", "Efectos", "Transiciones"],
    badges: ["Popular"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.14+"],
      processor: "Intel i5 o superior",
      memory: "8 GB RAM",
      storage: "2 GB de espacio disponible"
    },
    features: [
      "Edición de video con arrastrar y soltar",
      "Efectos y transiciones profesionales",
      "Exportación a múltiples formatos",
      "Biblioteca de música y sonidos",
      "Soporte para 4K"
    ],
    releaseDate: "2024-03-20",
    size: "1.2 GB"
  },
  {
    id: "microsoft-office",
    name: "Microsoft Office",
    description: "Suite ofimática líder: Word, Excel, PowerPoint y más.",
    fullDescription: `Microsoft Office es la suite de productividad más utilizada en el mundo. Incluye Word, Excel, PowerPoint, Outlook y otras herramientas esenciales para el trabajo, estudio y gestión de proyectos. Compatible con archivos en la nube y colaboración en tiempo real.`,
    category: "Productividad",
    version: "2024",
    company: "Microsoft",
    rating: 4.9,
    downloads: 25000000,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=450&fit=crop&auto=format",
    tags: ["Ofimática", "Word", "Excel", "PowerPoint"],
    badges: ["Top", "Esencial"],
    securityBadges: ["verified", "virus-free", "secure", "certified"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 o superior",
      memory: "4 GB RAM",
      storage: "4 GB de espacio disponible"
    },
    features: [
      "Procesador de textos Word",
      "Hojas de cálculo Excel",
      "Presentaciones PowerPoint",
      "Correo Outlook",
      "Colaboración en la nube"
    ],
    releaseDate: "2024-01-10",
    size: "3.5 GB"
  },
  {
    id: "winrar",
    name: "WinRAR",
    description: "Compresor y descompresor de archivos rápido y eficiente.",
    fullDescription: `WinRAR es la herramienta más popular para comprimir y descomprimir archivos en múltiples formatos (RAR, ZIP, 7Z, etc.). Ofrece cifrado, reparación de archivos dañados y una interfaz sencilla para usuarios de todos los niveles.`,
    category: "Utilidades",
    version: "6.23",
    company: "win.rar GmbH",
    rating: 4.5,
    downloads: 30000000,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop&auto=format",
    tags: ["Compresión", "Archivos", "ZIP", "RAR"],
    badges: ["Top", "Actualizado"],
    systemRequirements: {
      os: ["Windows 7/8/10/11"],
      processor: "Intel Pentium o superior",
      memory: "2 GB RAM",
      storage: "250 MB de espacio disponible"
    },
    features: [
      "Compresión y descompresión de archivos",
      "Soporte para múltiples formatos",
      "Cifrado de archivos",
      "Reparación de archivos dañados",
      "División de archivos grandes"
    ],
    releaseDate: "2024-02-01",
    size: "5 MB"
  },
  {
    id: "sketchup",
    name: "SketchUp",
    description: "Modelado 3D fácil para arquitectura, diseño y más.",
    fullDescription: `SketchUp es una herramienta de modelado 3D intuitiva y potente, ideal para arquitectos, diseñadores, ingenieros y creadores. Permite crear modelos detallados, renders y presentaciones de proyectos de forma rápida y sencilla.`,
    category: "Modelado 3D",
    version: "2024",
    company: "Trimble",
    rating: 4.7,
    downloads: 7000000,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=450&fit=crop&auto=format",
    tags: ["3D", "Arquitectura", "Diseño", "Render"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i5 o superior",
      memory: "8 GB RAM",
      storage: "1 GB de espacio disponible"
    },
    features: [
      "Modelado 3D intuitivo",
      "Biblioteca de objetos 3D",
      "Exportación a múltiples formatos",
      "Herramientas de renderizado",
      "Extensiones y plugins"
    ],
    releaseDate: "2024-04-15",
    size: "600 MB"
  }
];
