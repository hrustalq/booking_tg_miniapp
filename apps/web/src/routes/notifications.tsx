import React from 'react';
import { FaBell, FaCheck, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { useTheme } from '../hooks/use-theme';
import { Card, CardContent } from '../components/ui/card';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  date: string;
}

const notifications: Notification[] = [
  { id: 1, type: 'info', title: 'Новая акция', message: 'Скидка 20% на ночные сеансы в будние дни', date: '2023-04-15' },
  { id: 2, type: 'success', title: 'Бронирование подтверждено', message: 'Ваше бронирование на 18:00 сегодня подтверждено', date: '2023-04-14' },
  { id: 3, type: 'warning', title: 'Технические работы', message: 'Завтра с 10:00 до 12:00 будут проводиться технические работы', date: '2023-04-13' },
];

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
  switch (type) {
    case 'info':
      return <FaInfoCircle className="text-blue-500" />;
    case 'success':
      return <FaCheck className="text-green-500" />;
    case 'warning':
      return <FaExclamationTriangle className="text-yellow-500" />;
  }
};

const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="flex items-start">
        <div className="mr-4 text-2xl">
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{notification.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.date}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const NotificationsPage: React.FC = () => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'light':
        return 'bg-white text-gray-900';
      case 'system':
        return 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`mobile-layout ${getThemeClasses()}`}>
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <FaBell className="mr-2" />
          Уведомления
        </h1>
        {notifications.map(notification => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </main>
    </div>
  );
};

export default NotificationsPage;
