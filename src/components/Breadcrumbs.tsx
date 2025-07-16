import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  class?: string;
}

export default function Breadcrumbs({ items, className = '', class: classAttr = '' }: BreadcrumbsProps) {
  const finalClassName = className || classAttr;
  
  return (
    <nav 
      className={`flex ${finalClassName}`} 
      aria-label="Breadcrumb"
      role="navigation"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* Home link with Schema.org microdata */}
        <li 
          className="inline-flex items-center"
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement"
        >
          <meta itemProp="position" content="1" />
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 rounded-md px-2 py-1"
            aria-label="Inicio"
            itemProp="item"
          >
            <span itemProp="name">
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </span>
          </a>
        </li>

        {/* Breadcrumb items with Schema.org microdata */}
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center"
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            <meta itemProp="position" content={(index + 2).toString()} />
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)] mx-1" />
            {item.current || !item.href ? (
              <span 
                className="text-sm font-medium text-[var(--text-primary)] cursor-default"
                aria-current="page"
                itemProp="name"
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 rounded-md px-2 py-1"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
