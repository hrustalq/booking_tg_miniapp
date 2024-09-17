import React, { useState } from 'react';
import { FaBell, FaBellSlash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const SubscribeNews: React.FC<{ className?: string }> = ({ className }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleSubscription = async () => {
    try {
      // Здесь должен быть запрос к API для подписки/отписки
      // Например: await api.toggleNewsSubscription();
      
      setIsSubscribed(!isSubscribed);
      // Здесь можно добавить уведомление пользователю об успешной подписке/отписке
    } catch (error) {
      console.error('Ошибка при изменении подписки:', error);
      // Здесь можно добавить уведомление пользователю об ошибке
    }
  };

  return (
    <Button
      onClick={toggleSubscription}
      variant={isSubscribed ? "secondary" : "default"}
      className={cn("flex items-center", className)}
    >
      {isSubscribed ? (
        <>
          <FaBellSlash className="mr-2" /> Отписаться
        </>
      ) : (
        <>
          <FaBell className="mr-2" /> Подписаться
        </>
      )}
    </Button>
  );
};
