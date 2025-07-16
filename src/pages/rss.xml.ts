import type { APIRoute } from 'astro';

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Best Free Alternatives to Adobe Creative Suite',
    description: 'Discover professional tools that can completely replace Adobe\'s suite at no cost. From GIMP to Blender, we show you the best options.',
    url: '/blog/alternativas-gratuitas-adobe-creative-suite',
    author: 'Opensoftware Team',
    pubDate: '2024-01-15T10:00:00Z',
    category: 'Design',
    content: `<![CDATA[
      <p>Adobe Creative Suite is the industry standard for creative professionals, but it comes with a hefty price tag. Fortunately, there are excellent free alternatives that can provide similar functionality.</p>
      <h2>Image Editing: GIMP vs Photoshop</h2>
      <p>GIMP (GNU Image Manipulation Program) is a powerful, feature-rich image editor that rivals Photoshop in many ways...</p>
      <h2>Vector Graphics: Inkscape vs Illustrator</h2>
      <p>Inkscape is a professional vector graphics editor that uses SVG as its native format...</p>
      <h2>Video Editing: DaVinci Resolve vs Premiere Pro</h2>
      <p>DaVinci Resolve offers professional-grade video editing capabilities completely free...</p>
    ]]>`
  },
  {
    id: 2,
    title: 'Free Web Development Tools: Build Professional Sites at No Cost',
    description: 'Discover the best free tools for web development, from code editors to frameworks, databases, and deployment platforms.',
    url: '/blog/free-web-development-tools',
    author: 'Ana García',
    pubDate: '2024-12-20T10:00:00Z',
    category: 'Web Development',
    content: `<![CDATA[
      <p>Web development has never been more accessible than it is today. With a vast ecosystem of free tools, frameworks, and platforms, anyone can build professional-quality websites.</p>
      <h2>Code Editors & IDEs</h2>
      <p>Visual Studio Code leads the pack as the most popular free code editor...</p>
      <h2>Frontend Frameworks</h2>
      <p>React, Vue.js, and Angular provide powerful frameworks for building modern user interfaces...</p>
      <h2>Backend Technologies</h2>
      <p>Node.js, Python, and PHP offer robust backend solutions for web applications...</p>
    ]]>`
  },
  {
    id: 3,
    title: 'Best Free Alternatives to Microsoft Office',
    description: 'Explore the best free office suites that can perfectly replace Microsoft Office for all your productivity needs.',
    url: '/blog/mejores-alternativas-microsoft-office',
    author: 'Carlos Mendoza',
    pubDate: '2024-12-15T10:00:00Z',
    category: 'Productivity',
    content: `<![CDATA[
      <p>Microsoft Office is the gold standard for office productivity, but there are excellent free alternatives that offer similar functionality.</p>
      <h2>LibreOffice: The Complete Suite</h2>
      <p>LibreOffice provides a full office suite with Writer, Calc, Impress, and more...</p>
      <h2>Google Workspace: Cloud-Based Productivity</h2>
      <p>Google's cloud-based office suite offers real-time collaboration and accessibility...</p>
      <h2>OnlyOffice: Enterprise Features</h2>
      <p>OnlyOffice provides advanced collaboration features and excellent compatibility...</p>
    ]]>`
  },
  {
    id: 4,
    title: 'Complete Guide: Migrating from AutoCAD to FreeCAD',
    description: 'Everything you need to know to transition from AutoCAD to FreeCAD without losing productivity.',
    url: '/blog/guia-migrar-autocad-freecad',
    author: 'Opensoftware Team',
    pubDate: '2024-01-10T10:00:00Z',
    category: 'CAD',
    content: `<![CDATA[
      <p>Migrating from AutoCAD to FreeCAD can seem daunting, but with the right approach, you can maintain your productivity while saving on licensing costs.</p>
      <h2>Understanding FreeCAD's Interface</h2>
      <p>FreeCAD uses a workbench-based approach that differs from AutoCAD's single interface...</p>
      <h2>File Format Compatibility</h2>
      <p>FreeCAD supports many common CAD file formats, including DWG and DXF...</p>
      <h2>Key Feature Mapping</h2>
      <p>Learn how to accomplish common AutoCAD tasks in FreeCAD...</p>
    ]]>`
  }
];

const baseUrl = 'https://opensoftware.com';
const siteTitle = 'Opensoftware Blog';
const siteDescription = 'Articles, guides and tutorials about free software, open source alternatives and digital productivity.';

export const GET: APIRoute = async () => {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:wfw="http://wellformedweb.org/CommentAPI/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
     xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
     xmlns:georss="http://www.georss.org/georss"
     xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${siteTitle}</title>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <link>${baseUrl}/blog</link>
    <description>${siteDescription}</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Astro RSS Generator</generator>
    <managingEditor>info@opensoftware.com (Opensoftware Team)</managingEditor>
    <webMaster>info@opensoftware.com (Opensoftware Team)</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} Opensoftware. All rights reserved.</copyright>
    <category>Technology</category>
    <category>Software</category>
    <category>Open Source</category>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>${siteTitle}</title>
      <link>${baseUrl}/blog</link>
      <width>144</width>
      <height>144</height>
      <description>${siteDescription}</description>
    </image>
${blogPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}${post.url}</link>
      <description><![CDATA[${post.description}]]></description>
      <content:encoded>${post.content}</content:encoded>
      <pubDate>${new Date(post.pubDate).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}${post.url}</guid>
      <dc:creator><![CDATA[${post.author}]]></dc:creator>
      <category><![CDATA[${post.category}]]></category>
      <comments>${baseUrl}${post.url}#comments</comments>
      <slash:comments>0</slash:comments>
    </item>`).join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'max-age=3600, s-maxage=3600'
    }
  });
};
