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
  requirements?: {
    minimum?: {
      os?: string;
      cpu?: string;
      ram?: string;
    };
    recommended?: {
      os?: string;
      cpu?: string;
      ram?: string;
    };
  };
  features: string[];
  releaseDate: string;
  size: string;
  platforms?: string[];
  priceType?: 'free' | 'open-source' | 'freemium' | 'trial';
  downloadUrl?: string;
}

export const products: Product[] = [
  {
    id: "adobe-photoshop",
    name: "Adobe Photoshop",
    description: `Adobe Photoshop es el estándar mundial para la edición de imágenes digitales. Permite realizar desde simples retoques hasta composiciones complejas y arte digital avanzado. Sus herramientas de selección, pinceles personalizables y filtros inteligentes facilitan el trabajo creativo. Photoshop es ideal para fotógrafos, diseñadores gráficos, ilustradores y artistas digitales. La integración con Adobe Creative Cloud permite sincronizar proyectos y recursos en la nube. Incluye funciones de inteligencia artificial para automatizar tareas como la selección de objetos y la eliminación de fondos. Compatible con una amplia variedad de formatos de archivo, incluyendo RAW. Ofrece soporte para capas, máscaras, efectos y tipografía avanzada. Es la opción preferida por profesionales y entusiastas que buscan resultados de alta calidad. Photoshop sigue innovando con cada versión, manteniéndose a la vanguardia del diseño visual.`,
    fullDescription: `Adobe Photoshop es la herramienta de edición de imágenes más potente y versátil del mundo. Utilizada por fotógrafos profesionales, diseñadores gráficos y artistas digitales, Photoshop ofrece capacidades ilimitadas para crear, editar y manipular imágenes con precisión excepcional.

Con más de 30 años de innovación continua, Photoshop ha establecido el estándar para la edición de imágenes digitales. Desde retoque fotográfico básico hasta composiciones complejas y arte digital avanzado, esta aplicación proporciona todas las herramientas necesarias para dar vida a tu visión creativa.

Las nuevas funciones impulsadas por inteligencia artificial facilitan tareas complejas como la selección de objetos, el reemplazo de cielos y la eliminación de fondos con solo unos clics. Los pinceles de alta calidad y las herramientas de pintura digital permiten crear obras de arte originales desde cero.

La integración perfecta con Creative Cloud garantiza que tus proyectos estén siempre sincronizados y accesibles desde cualquier dispositivo. Colabora en tiempo real con otros creadores y accede a miles de recursos gratuitos y premium.`,
    category: "Diseño Gráfico",
    version: "2024",
    company: "Adobe",
    rating: 4.8,
    downloads: 15600000,
    image: "/images/Photoshop.jpg",
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
    size: "2.8 GB",
    platforms: ["Windows", "macOS"],
    priceType: "trial",
    downloadUrl: "https://adobe.com/products/photoshop",
    requirements: {
      minimum: {
        os: "Windows 10",
        cpu: "Intel i5",
        ram: "8 GB"
      },
      recommended: {
        os: "Windows 11",
        cpu: "Intel i7",
        ram: "16 GB"
      }
    }
  },
  {
    id: "adobe-illustrator",
    name: "Adobe Illustrator",
    description: `Adobe Illustrator es la aplicación líder para crear gráficos vectoriales precisos y escalables. Permite diseñar logotipos, iconos, ilustraciones y gráficos para impresión o web. Sus herramientas de dibujo avanzadas y pinceles personalizables ofrecen control total sobre cada trazo. Illustrator es esencial para branding, diseño editorial y creación de infografías. La integración con Creative Cloud facilita el acceso a bibliotecas de recursos y colaboración en equipo. Incluye funciones de inteligencia artificial para vectorizar imágenes y generar paletas de color inteligentes. Exporta fácilmente a múltiples formatos y resoluciones. Su precisión matemática garantiza resultados perfectos en cualquier tamaño. Es la herramienta preferida por diseñadores gráficos y creativos de todo el mundo. Illustrator evoluciona constantemente para adaptarse a las tendencias del diseño moderno.`,
    fullDescription: `Adobe Illustrator es la aplicación líder mundial para crear gráficos vectoriales precisos y escalables. Diseñadores de todo el mundo confían en Illustrator para crear logotipos icónicos, ilustraciones complejas, tipografías personalizadas y gráficos que mantienen su calidad en cualquier tamaño.

La precisión matemática de los gráficos vectoriales significa que tus diseños se verán perfectos tanto en una tarjeta de presentación como en una valla publicitaria. Las herramientas de dibujo avanzadas permiten crear curvas suaves y formas geométricas perfectas con facilidad.

Las nuevas funciones incluyen herramientas de IA que simplifican tareas complejas como la vectorización automática de imágenes y la generación de variaciones de color inteligentes. El panel de bibliotecas Creative Cloud te da acceso instantáneo a millones de recursos gráficos de alta calidad.

La integración perfecta con otras aplicaciones de Adobe facilita el flujo de trabajo creativo, permitiendo mover seamlessly entre Illustrator, Photoshop, InDesign y otras herramientas de Creative Cloud.`,
    category: "Diseño Gráfico",
    version: "2024",
    company: "Adobe",
    rating: 4.7,
    downloads: 12400000,
    image: "/images/AdobeIllustrator.jpg",
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
    id: "adobe-premiere-pro",
    name: "Adobe Premiere Pro",
    description: `Adobe Premiere Pro es el editor de video profesional más utilizado en la industria audiovisual. Permite editar videos en cualquier formato, desde clips para redes sociales hasta largometrajes. Sus herramientas de edición multicámara, corrección de color y efectos visuales integrados ofrecen resultados cinematográficos. Premiere Pro facilita la edición colaborativa y la integración con After Effects y Audition. Incluye funciones de inteligencia artificial para recorte automático, sincronización de audio y detección de escenas. Los proxies automáticos permiten trabajar con material de alta resolución en equipos modestos. Su interfaz intuitiva acelera el flujo de trabajo creativo. Exporta videos optimizados para cualquier plataforma o dispositivo. Es la elección de cineastas, youtubers y creadores de contenido profesional. Premiere Pro se actualiza constantemente para ofrecer las últimas innovaciones en edición de video.`,
    fullDescription: `Adobe Premiere Pro es la herramienta de edición de video elegida por profesionales de Hollywood y creadores de contenido en todo el mundo. Desde cortometrajes independientes hasta blockbusters de gran presupuesto, Premiere Pro ofrece las herramientas necesarias para contar historias visuales impactantes.

El flujo de trabajo intuitivo y las herramientas avanzadas permiten editar videos en cualquier formato, desde 8K hasta realidad virtual. Las funciones de corrección de color integradas rivalizan con software especializado, mientras que las herramientas de audio proporcionan un control completo sobre la banda sonora.

La inteligencia artificial integrada acelera tareas como el recorte automático, la sincronización de audio y la detección de escenas. Los proxies automáticos permiten editar material de alta resolución en tiempo real, incluso en sistemas con recursos limitados.

La integración perfecta con After Effects, Audition y otras aplicaciones Creative Cloud crea un ecosistema completo para la producción de video profesional. Colabora con equipos distribuidos globalmente gracias a las funciones de revisión y aprovación en la nube.`,
    category: "Video/Multimedia",
    version: "2024",
    company: "Adobe",
    rating: 4.7,
    downloads: 11200000,
    image: "/images/Adobe Premiere.jpg",
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
    id: "adobe-after-effects",
    name: "Adobe After Effects",
    description: `Adobe After Effects es el software estándar para crear gráficos en movimiento y efectos visuales. Permite animar textos, logotipos y elementos 3D con precisión profesional. Su sistema de composición por capas facilita la integración de múltiples elementos visuales. After Effects incluye miles de efectos y transiciones para enriquecer cualquier proyecto. Es ideal para títulos de películas, publicidad, videos musicales y contenido digital. La animación mediante keyframes y expresiones matemáticas permite movimientos complejos y orgánicos. El tracking integrado facilita la inserción de gráficos en video real. Compatible con plugins y scripts para ampliar sus capacidades. Se integra perfectamente con Premiere Pro y Cinema 4D. After Effects es la herramienta preferida por motion designers y estudios de postproducción en todo el mundo.`,
    fullDescription: `Adobe After Effects es la aplicación estándar de la industria para gráficos en movimiento y efectos visuales. Desde títulos cinematográficos hasta publicidad digital, desde explicadores animados hasta efectos especiales complejos, After Effects proporciona las herramientas para dar vida a ideas visuales extraordinarias.

El sistema de composición por capas permite combinar elementos 2D y 3D en escenas complejas con control total sobre timing, transformaciones y efectos. Miles de efectos incorporados, desde color correction hasta distorsión temporal, ofrecen posibilidades creativas ilimitadas.

La animación mediante keyframes y expresiones matemáticas permite crear movimientos precisos y orgánicos. El sistema de tracking integrado facilita la integración de elementos generados por computadora en footage real, mientras que las herramientas de estabilización corrigen problemas de cámara automáticamente.

La integración con Cinema 4D permite importar y renderizar escenas 3D complejas directamente en After Effects. Los scripts y plugins de terceros extienden las capacidades del software prácticamente sin límites.`,
    category: "Video/Multimedia",
    version: "2024",
    company: "Adobe",
    rating: 4.8,
    downloads: 9800000,
    image: "/images/AfterEffects.jpg",
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
    description: `Adobe Acrobat es la solución definitiva para trabajar con archivos PDF. Permite crear, editar, convertir y firmar documentos digitales de forma segura. Sus herramientas avanzadas facilitan la colaboración y revisión de archivos en equipo. Acrobat ofrece protección con contraseña y cifrado para documentos confidenciales. Convierte PDFs a Word, Excel o PowerPoint sin perder formato. Incluye funciones para rellenar formularios y recopilar firmas electrónicas. Es ideal para empresas, estudiantes y profesionales que gestionan grandes volúmenes de documentos. La integración con la nube permite acceder a tus archivos desde cualquier dispositivo. Acrobat garantiza compatibilidad total con estándares internacionales. Es la opción preferida para la gestión documental eficiente y segura.`,
    fullDescription: `Adobe Acrobat es el estándar mundial para trabajar con archivos PDF. Permite crear, editar, convertir, firmar y proteger documentos PDF con facilidad y seguridad. Ideal para profesionales, estudiantes y empresas que requieren gestionar documentos digitales de manera eficiente.`,
    category: "Productividad",
    version: "2024",
    company: "Adobe",
    rating: 4.7,
    downloads: 12000000,
    image: "/images/Adobe Acrobat.jpg",
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
    id: "winrar",
    name: "WinRAR",
    description: `WinRAR es el compresor de archivos más reconocido y utilizado a nivel mundial. Permite comprimir y descomprimir archivos en formatos como RAR, ZIP, 7Z y muchos más. Ofrece cifrado AES de 256 bits para proteger información sensible. Su función de reparación recupera archivos dañados o incompletos. WinRAR permite dividir archivos grandes en partes más pequeñas para facilitar su envío. La interfaz es intuitiva y apta para usuarios de todos los niveles. Soporta la creación de archivos autoextraíbles y protegidos por contraseña. Es compatible con la mayoría de sistemas operativos. Ideal para gestionar grandes volúmenes de datos y ahorrar espacio en disco. WinRAR es una herramienta esencial para cualquier usuario de PC o profesional de IT.`,
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
    description: `SketchUp es una herramienta de modelado 3D fácil de usar y muy versátil. Permite crear modelos detallados para arquitectura, diseño de interiores, ingeniería y paisajismo. Su interfaz intuitiva facilita el aprendizaje para principiantes y la productividad para expertos. Incluye una amplia biblioteca de objetos 3D y materiales listos para usar. SketchUp permite realizar renders y presentaciones visuales de alta calidad. Es compatible con extensiones y plugins para ampliar sus funciones. Exporta modelos a múltiples formatos para impresión 3D o visualización en realidad virtual. Ideal para estudiantes, profesionales y creativos que buscan resultados rápidos y precisos. La comunidad global de usuarios comparte recursos y tutoriales constantemente. SketchUp es la opción preferida para proyectos de diseño y visualización 3D.`,
    fullDescription: `SketchUp es una herramienta de modelado 3D intuitiva y potente, ideal para arquitectos, diseñadores, ingenieros y creadores. Permite crear modelos detallados, renders y presentaciones de proyectos de forma rápida y sencilla.`,
    category: "Modelado 3D",
    version: "2024",
    company: "Trimble",
    rating: 4.7,
    downloads: 7000000,
    image: "/images/Sketchup.jpg",
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
  },
  {
    id: "adobe-substance-3d",
    name: "Adobe Substance 3D",
    description: `Adobe Substance 3D es una suite avanzada para texturizado, modelado y renderizado 3D. Permite crear materiales hiperrealistas para videojuegos, cine y diseño industrial. Sus herramientas de pintura y escultura digital ofrecen control total sobre cada detalle. Substance 3D facilita la creación de texturas PBR y mapas de materiales complejos. Es compatible con los principales motores de renderizado y plataformas 3D. Incluye una biblioteca de materiales listos para usar y recursos descargables. La integración con otras aplicaciones de Adobe agiliza el flujo de trabajo creativo. Ideal para artistas, diseñadores y estudios de animación que buscan realismo y eficiencia. Substance 3D se actualiza constantemente con nuevas funciones y mejoras. Es la elección de profesionales que buscan resultados de alto nivel en proyectos 3D.`,
    fullDescription: "Adobe Substance 3D is a powerful suite for 3D texturing, modeling, and rendering, used by artists and designers for realistic materials and assets.",
    category: "3D/Design",
    version: "2024",
    company: "Adobe",
    rating: 4.6,
    downloads: 5000000,
    image: "/images/adobe-substance-3d.jpg",
    tags: ["3D", "Texturing", "Design"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i5 or superior",
      memory: "8 GB RAM",
      storage: "2 GB available"
    },
    features: ["3D texturing", "Material authoring", "Rendering"],
    releaseDate: "2024-06-01",
    size: "2 GB"
  },
  {
    id: "adobe-animate",
    name: "Adobe Animate",
    description: `Adobe Animate es la solución ideal para crear animaciones vectoriales interactivas. Permite diseñar contenido animado para web, videojuegos, apps y videos educativos. Sus herramientas de dibujo y línea de tiempo facilitan la creación de movimientos fluidos. Animate soporta la exportación a HTML5, SVG, GIF y otros formatos modernos. Es compatible con scripts y componentes interactivos para experiencias dinámicas. La integración con Creative Cloud permite compartir recursos y colaborar en equipo. Incluye plantillas y bibliotecas de personajes para acelerar el proceso creativo. Animate es utilizado por estudios de animación, desarrolladores y educadores en todo el mundo. Su interfaz intuitiva lo hace accesible para principiantes y expertos. Es la herramienta preferida para dar vida a ideas creativas en cualquier plataforma.`,
    fullDescription: "Adobe Animate is used to design vector animations for games, apps, and the web, supporting interactive content and rich media.",
    category: "Animation",
    version: "2024",
    company: "Adobe",
    rating: 4.5,
    downloads: 4000000,
    image: "/images/AdobeAnimate.jpg",
    tags: ["Animation", "Vector", "Web"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 or superior",
      memory: "4 GB RAM",
      storage: "2 GB available"
    },
    features: ["Vector animation", "Interactive content"],
    releaseDate: "2024-05-01",
    size: "1.5 GB"
  },
  {
    id: "adobe-incopy",
    name: "Adobe InCopy",
    description: `Adobe InCopy es el software profesional para redacción y edición colaborativa. Permite a escritores y editores trabajar simultáneamente en documentos complejos. Su integración con InDesign agiliza la producción de revistas, periódicos y libros. InCopy ofrece control de cambios, seguimiento de revisiones y gestión de versiones. Es ideal para equipos editoriales que requieren precisión y eficiencia. Incluye herramientas de formato avanzado y estilos tipográficos. Facilita la asignación de tareas y la organización de flujos de trabajo. Compatible con la nube para acceso remoto y colaboración en tiempo real. InCopy es utilizado por editoriales, agencias y medios de comunicación líderes. Es la opción preferida para proyectos editoriales profesionales y colaborativos.`,
    fullDescription: "Adobe InCopy integrates with InDesign for collaborative editorial workflows, allowing writers and editors to work together efficiently.",
    category: "Productivity",
    version: "2024",
    company: "Adobe",
    rating: 4.4,
    downloads: 2000000,
    image: "/images/AdobeInCopy.jpg",
    tags: ["Writing", "Editing", "Collaboration"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 or superior",
      memory: "4 GB RAM",
      storage: "1 GB available"
    },
    features: ["Editorial collaboration", "Track changes"],
    releaseDate: "2024-04-01",
    size: "1 GB"
  },
  {
    id: "adobe-xd",
    name: "Adobe XD",
    description: `Adobe XD es la herramienta definitiva para diseño de interfaces y prototipos interactivos. Permite crear wireframes, mockups y flujos de usuario para apps y sitios web. Sus herramientas de diseño vectorial y componentes reutilizables agilizan el proceso creativo. XD facilita la colaboración en tiempo real con otros diseñadores y desarrolladores. Incluye funciones de animación y transiciones para simular experiencias reales. Exporta prototipos interactivos para pruebas de usuario y presentaciones. La integración con Creative Cloud permite compartir recursos y bibliotecas. Es ideal para equipos de diseño UX/UI que buscan eficiencia y consistencia. Adobe XD se adapta a proyectos de cualquier escala y complejidad. Es la opción preferida para diseñadores digitales modernos.`,
    fullDescription: "Adobe XD enables designers to create user interfaces, wireframes, and interactive prototypes for digital products.",
    category: "Design",
    version: "2024",
    company: "Adobe",
    rating: 4.6,
    downloads: 3500000,
    image: "/images/AdobeXD.jpg",
    tags: ["UI", "UX", "Prototyping"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 or superior",
      memory: "4 GB RAM",
      storage: "2 GB available"
    },
    features: ["UI design", "Prototyping", "Collaboration"],
    releaseDate: "2024-03-01",
    size: "1.2 GB"
  },
  {
    id: "adobe-media-encoder",
    name: "Adobe Media Encoder",
    description: `Adobe Media Encoder es la herramienta esencial para codificar y convertir archivos multimedia. Permite procesar videos y audios en una amplia variedad de formatos y resoluciones. Automatiza flujos de trabajo para exportar contenido optimizado a cualquier plataforma. Media Encoder soporta la conversión por lotes y la integración con Premiere Pro y After Effects. Incluye ajustes preestablecidos para YouTube, Vimeo, redes sociales y dispositivos móviles. Su interfaz intuitiva facilita la configuración de parámetros avanzados. Es ideal para creadores de contenido, editores de video y equipos de postproducción. Garantiza la máxima calidad y compatibilidad en cada exportación. Media Encoder se actualiza regularmente con nuevos códecs y mejoras. Es la solución preferida para flujos de trabajo multimedia profesionales.`,
    fullDescription: "Adobe Media Encoder automates the process of encoding and converting video and audio files for various platforms and devices.",
    category: "Video/Media",
    version: "2024",
    company: "Adobe",
    rating: 4.5,
    downloads: 3000000,
    image: "/images/Adobe_Media_Encoder_Icon.jpg",
    tags: ["Video", "Encoding", "Conversion"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 or superior",
      memory: "4 GB RAM",
      storage: "2 GB available"
    },
    features: ["Batch encoding", "Format conversion"],
    releaseDate: "2024-02-01",
    size: "1 GB"
  },
  {
    id: "affinity-photo",
    name: "Affinity Photo",
    description: `Affinity Photo es un editor fotográfico profesional reconocido por su potencia y velocidad. Permite retocar, componer y procesar imágenes RAW con resultados de alta calidad. Sus herramientas avanzadas incluyen capas, máscaras, filtros y pinceles personalizables. Affinity Photo es ideal para fotógrafos, diseñadores y artistas digitales. Soporta edición no destructiva y efectos en tiempo real. Incluye funciones de apilado de enfoque, panorámicas y HDR. Exporta imágenes en múltiples formatos y resoluciones. Su interfaz es intuitiva y personalizable para adaptarse a cualquier flujo de trabajo. Affinity Photo es una alternativa sólida a Photoshop, sin suscripción. Es la elección de creativos que buscan control total sobre sus imágenes.`,
    fullDescription: "Affinity Photo offers advanced photo editing, retouching, and compositing tools for creative professionals.",
    category: "Photography",
    version: "2024",
    company: "Serif",
    rating: 4.7,
    downloads: 2500000,
    image: "/images/Affinity_Photo.jpg",
    tags: ["Photo", "Editing", "Retouching"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 or superior",
      memory: "4 GB RAM",
      storage: "1 GB available"
    },
    features: ["Photo editing", "RAW processing"],
    releaseDate: "2024-01-01",
    size: "1 GB"
  },
  {
    id: "adobe-indesign",
    name: "Adobe InDesign",
    description: `Adobe InDesign es el software líder para diseño y maquetación de publicaciones impresas y digitales. Permite crear libros, revistas, folletos y catálogos con precisión tipográfica. Sus herramientas avanzadas de composición y estilos facilitan la organización de grandes volúmenes de contenido. InDesign soporta la exportación a PDF interactivo, EPUB y otros formatos digitales. Es ideal para diseñadores editoriales, agencias y editoriales profesionales. La integración con Creative Cloud permite compartir recursos y colaborar en equipo. Incluye funciones para automatizar tareas repetitivas y gestionar bibliotecas de estilos. InDesign garantiza resultados consistentes y de alta calidad en cada proyecto. Es la opción preferida para publicaciones que requieren impacto visual y legibilidad. InDesign evoluciona constantemente para responder a las necesidades del diseño editorial moderno.`,
    fullDescription: "Adobe InDesign is the industry standard for designing and publishing books, magazines, and digital documents.",
    category: "Design",
    version: "2024",
    company: "Adobe",
    rating: 4.8,
    downloads: 4000000,
    image: "/images/Indesign.jpg",
    tags: ["Layout", "Publishing", "Print"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 or superior",
      memory: "4 GB RAM",
      storage: "2 GB available"
    },
    features: ["Page layout", "Digital publishing"],
    releaseDate: "2024-06-01",
    size: "1.5 GB"
  },
  {
    id: "adobe-lightroom",
    name: "Adobe Lightroom",
    description: `Adobe Lightroom es la solución integral para organizar, editar y compartir fotografías digitales. Permite gestionar grandes catálogos de imágenes con facilidad y rapidez. Sus herramientas de revelado y edición no destructiva mejoran la calidad de cada foto. Lightroom incluye ajustes preestablecidos, filtros y controles avanzados de color y exposición. La sincronización en la nube permite acceder a tus fotos desde cualquier dispositivo. Es ideal para fotógrafos profesionales y aficionados que buscan eficiencia y consistencia. Incluye funciones de búsqueda inteligente y organización por palabras clave. Exporta imágenes optimizadas para web, impresión o redes sociales. Lightroom facilita la colaboración y el flujo de trabajo en equipo. Es la herramienta preferida para quienes desean sacar el máximo partido a su fotografía digital.`,
    fullDescription: "Adobe Lightroom helps photographers organize, edit, and share photos with powerful tools and cloud integration.",
    category: "Photography",
    version: "2024",
    company: "Adobe",
    rating: 4.7,
    downloads: 3500000,
    image: "/images/Lightroom.jpg",
    tags: ["Photo", "Editing", "Organization"],
    systemRequirements: {
      os: ["Windows 10/11", "macOS 10.15+"],
      processor: "Intel i3 or superior",
      memory: "4 GB RAM",
      storage: "1 GB available"
    },
    features: ["Photo organization", "Editing", "Cloud sync"],
    releaseDate: "2024-05-01",
    size: "1 GB"
  }
];
