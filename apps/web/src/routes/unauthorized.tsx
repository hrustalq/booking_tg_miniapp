import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserLock, FaLink } from 'react-icons/fa';
import { useTheme } from '../hooks/use-theme';
import { Card, CardContent } from '../components/ui/card';

const UnauthorizedPage: React.FC = () => {
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
    <div className={`mobile-layout ${getThemeClasses()} h-full flex items-center justify-center`}>
      <div className="p-4 w-full max-w-md">
        <Card className="text-center">
          <CardContent className="p-6">
            <FaUserLock className="text-6xl text-blue-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Доступ ограничен</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Вы не авторизованы, потому что у вас не привязан клубный аккаунт.
            </p>
            <Link
              to="/link-account"
              className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-base font-semibold shadow-md hover:shadow-lg"
            >
              <FaLink className="mr-2" />
              Привязать аккаунт
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
