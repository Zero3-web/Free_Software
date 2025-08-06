import { NotificationProvider } from '../contexts/NotificationContext';
import NewsletterSignup from './NewsletterSignup';

export default function NewsletterSignupWithNotifications(props: any) {
  return (
    <NotificationProvider>
      <NewsletterSignup {...props} />
    </NotificationProvider>
  );
}
