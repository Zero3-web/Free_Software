import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-600 animate-fade-in"
      aria-label="Breadcrumb"
    >
      {/* Home icon */}
      <a
        href="/"
        className="flex items-center hover:text-blue-600 transition-colors duration-200"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Inicio</span>
      </a>

      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-2"
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
