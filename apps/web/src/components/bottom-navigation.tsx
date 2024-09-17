import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Lock, Newspaper } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import NotificationBell from './notifications';

const BottomNavigation: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Главная', path: '/' },
    { icon: Lock, label: 'Бронирование', path: '/booking' },
    { icon: Newspaper, label: 'Новости', path: '/news' },
    { icon: NotificationBell, label: 'Уведомления', path: '/notifications' },
  ];

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700',
      theme === 'dark' ? 'text-white' : 'text-gray-700'
    )}>
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={label}
            to={path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full focus:outline-none",
              isActive && "text-blue-500"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className={cn("text-xs mt-1", isActive && "font-semibold")}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;