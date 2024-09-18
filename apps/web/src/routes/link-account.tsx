import React, { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { useTheme } from '../hooks/use-theme';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import WebApp from '@twa-dev/sdk';

const LinkAccountPage: React.FC = () => {
  const { theme } = useTheme();
  const [gameClubUsername, setGameClubUsername] = useState('');
  const [isLinked, setIsLinked] = useState(false);

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

  const handleLinkAccount = () => {
    // Здесь должна быть логика для связывания аккаунтов
    // Используйте Telegram Mini App API для получения данных пользователя
    const telegramUser = WebApp.initDataUnsafe.user;
    console.log(telegramUser);
    // Отправьте запрос на ваш сервер для связывания аккаунтов
    // После успешного связывания:
    setIsLinked(true);
  };

  return (
    <div className={`mobile-layout ${getThemeClasses()}`}>
      <div className="flex items-center px-2 justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <FaLink className="mr-2" />
          Привязка аккаунта
        </h1>
      </div>
      <Card className="mb-4">
        <CardContent className="p-4">
          {!isLinked ? (
            <>
              <p className="mb-4">Введите ваше имя пользователя в игровом клубе для привязки к аккаунту Telegram:</p>
              <Input
                type="text"
                placeholder="Имя пользователя в игровом клубе"
                value={gameClubUsername}
                onChange={(e) => setGameClubUsername(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleLinkAccount} disabled={!gameClubUsername}>
                Привязать аккаунт
              </Button>
            </>
          ) : (
            <p className="text-green-500">Аккаунт успешно привязан!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkAccountPage;
