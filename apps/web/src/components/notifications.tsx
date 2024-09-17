import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const NotificationBell: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  // Имитация получения количества непрочитанных уведомлений
  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    const mockUnreadCount = 2;
    setUnreadCount(mockUnreadCount);
  }, []);

  return (
    <div className="relative">
      <Bell className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className={cn(
          "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center",
        )}>
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;