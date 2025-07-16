#!/bin/bash

# Script de corrección masiva para traducir contenido al inglés
# Este script debe ejecutarse desde la raíz del proyecto

echo "🚀 Iniciando corrección masiva de traducciones..."

# Crear copias de seguridad
echo "📦 Creando copias de seguridad..."
cp -r src/pages/blog src/pages/blog_backup_$(date +%Y%m%d_%H%M%S)

# Corregir referencias de marca
echo "🏷️ Actualizando referencias de marca..."
find src/ -type f -name "*.astro" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/Software Gratis/Opensoftware/g'
find src/ -type f -name "*.astro" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/software-gratis\.com/opensoftware\.com/g'

# Traducciones comunes
echo "🌐 Aplicando traducciones básicas..."

# Navegación y UI
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Inicio</Home</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Sobre Nosotros</About Us</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Contacto</Contact</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Política de Privacidad</Privacy Policy</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Términos de Servicio</Terms of Service</g'

# Categorías de software
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Productividad</Productivity</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Diseño Gráfico</Graphic Design</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Edición de Video</Video Editing</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Desarrollo</Development</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Seguridad</Security</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Utilidades</Utilities</g'

# Textos comunes
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Descargar</Download</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Gratis</Free</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Explorar</Explore</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Ver más</View more</g'
find src/ -type f -name "*.astro" -o -name "*.tsx" | xargs sed -i 's/Leer más</Read more</g'

echo "✅ Correcciones masivas completadas."
echo "⚠️  IMPORTANTE: Revisa manualmente los archivos para correcciones específicas."
echo "📁 Se creó una copia de seguridad en src/pages/blog_backup_*"

# Lista de archivos que necesitan revisión manual
echo ""
echo "📋 Archivos que requieren revisión manual:"
echo "- src/pages/blog/*.astro (contenido de artículos)"
echo "- src/pages/*.astro (páginas principales)"
echo "- src/components/*.tsx (componentes React)"
echo "- src/data/products.ts (datos de productos)"
