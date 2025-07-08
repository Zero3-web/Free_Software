import { NotificationProvider } from '../contexts/NotificationContext';
import type { ReactNode } from 'react';

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
}
