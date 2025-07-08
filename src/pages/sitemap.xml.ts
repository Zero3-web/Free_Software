import type { APIRoute } from 'astro';
import { products } from '../data/products';

const currentDate = new Date().toISOString().split('T')[0];
const baseUrl = 'https://softwaregratis.com';

// Páginas estáticas
const staticPages = [
  { url: '', changefreq: 'daily', priority: '1.0', lastmod: currentDate },
  { url: '/contacto', changefreq: 'monthly', priority: '0.8', lastmod: currentDate },
  { url: '/terminos', changefreq: 'yearly', priority: '0.5', lastmod: currentDate },
  { url: '/privacidad', changefreq: 'yearly', priority: '0.5', lastmod: currentDate },
];

// Páginas de productos
const productPages = products.map((product: any) => ({
  url: `/software/${product.id}`,
  changefreq: 'weekly',
  priority: '0.9',
  lastmod: product.releaseDate
}));

const allPages = [...staticPages, ...productPages];

export const GET: APIRoute = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
