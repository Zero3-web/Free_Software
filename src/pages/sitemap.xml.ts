import type { APIRoute } from 'astro';
import { products } from '../data/products';

const currentDate = new Date().toISOString().split('T')[0];
const baseUrl = 'https://opensoftware.com';

// Páginas estáticas
const staticPages = [
  { url: '', changefreq: 'daily', priority: '1.0', lastmod: currentDate },
  { url: '/sobre-nosotros', changefreq: 'monthly', priority: '0.8', lastmod: currentDate },
  { url: '/contacto', changefreq: 'monthly', priority: '0.8', lastmod: currentDate },
  { url: '/blog', changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
  { url: '/software', changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
  { url: '/software/productividad', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
  { url: '/herramientas', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
  { url: '/terminos', changefreq: 'yearly', priority: '0.5', lastmod: currentDate },
  { url: '/privacidad', changefreq: 'yearly', priority: '0.5', lastmod: currentDate },
];

// Páginas de blog
const blogPages = [
  { url: '/blog/alternativas-gratuitas-adobe-creative-suite', changefreq: 'monthly', priority: '0.8', lastmod: '2024-01-15' },
  { url: '/blog/herramientas-desarrollo-web-gratuitas', changefreq: 'monthly', priority: '0.8', lastmod: '2024-12-20' },
  { url: '/blog/mejores-alternativas-microsoft-office', changefreq: 'monthly', priority: '0.8', lastmod: '2024-12-15' },
  { url: '/blog/guia-migrar-autocad-freecad', changefreq: 'monthly', priority: '0.8', lastmod: '2024-01-10' },
  { url: '/blog/top-editores-video-gratuitos-profesionales', changefreq: 'monthly', priority: '0.8', lastmod: '2024-01-05' },
  { url: '/blog/configurar-entorno-desarrollo-completo-gratuito', changefreq: 'monthly', priority: '0.8', lastmod: '2024-01-01' },
];

// Páginas de productos
const productPages = products.map((product: any) => ({
  url: `/software/${product.id}`,
  changefreq: 'weekly',
  priority: '0.9',
  lastmod: product.releaseDate || currentDate
}));

const allPages = [...staticPages, ...blogPages, ...productPages];

export const GET: APIRoute = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
};
