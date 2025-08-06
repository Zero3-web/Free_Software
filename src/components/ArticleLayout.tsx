import type { ReactNode } from 'react';

interface ArticleLayoutProps {
  children: ReactNode;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  category: string;
  tags?: string[];
  image?: string;
}

export default function ArticleLayout({
  children,
  title,
  excerpt,
  author,
  publishedDate,
  readingTime,
  category,
  tags = [],
  image
}: ArticleLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header */}
      <header className="mb-12">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Excerpt */}
        <p className="text-xl md:text-2xl text-gray-600">
          {excerpt}
        </p>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="font-medium">{author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{new Date(publishedDate).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{readingTime}</span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg
        prose-headings:text-gray-900
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h2:bg-gradient-to-r prose-h2:from-blue-600 prose-h2:to-purple-600
        prose-h2:bg-clip-text prose-h2:text-transparent
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
        prose-h3:text-gray-800
        prose-p:text-gray-700
        prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-blue-600
        prose-a:no-underline hover:prose-a:underline
        prose-a:font-medium prose-a:transition-all
        prose-strong:text-gray-900
        prose-strong:font-semibold
        prose-ul:my-6 prose-li:my-2
        prose-li:text-gray-700
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500
        prose-blockquote:bg-blue-50
        prose-blockquote:py-4 prose-blockquote:px-6
        prose-blockquote:rounded-r-lg prose-blockquote:my-8
        prose-code:bg-gray-100
        prose-code:px-2 prose-code:py-1 prose-code:rounded
        prose-code:text-sm prose-code:font-medium
        prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-pre:rounded-xl prose-pre:shadow-lg"
      >
        {children}
      </div>
    </article>
  );
}
