import type { ReactNode } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
