import { motion } from 'framer-motion';
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
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-6"
      aria-label="Breadcrumb"
    >
      {/* Home icon */}
      <motion.a
        href="/"
        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Inicio</span>
      </motion.a>

      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <motion.a
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">
              {item.label}
            </span>
          )}
        </motion.div>
      ))}
    </motion.nav>
  );
}
