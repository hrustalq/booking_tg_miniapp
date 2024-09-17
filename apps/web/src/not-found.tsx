import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from './hooks/use-theme';
import { Card, CardContent } from './components/ui/card';

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate])

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
    <div className={`flex relative flex-col items-center justify-center h-full ${getThemeClasses()}`}>
      <Card>
        <CardContent>
          <h1 className="text-4xl text-center font-bold mt-5 mb-2">404</h1>
          <h2 className="text-2xl text-center font-semibold mb-4">Страница не найдена</h2>
          <p className="text-base mb-8 text-center max-w-md">Извините, запрашиваемая страница не существует. Возможно, она была перемещена или удалена.</p>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              onClick={() => goBack()}
              className="inline-flex sm:grow items-center justify-center bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors text-base font-semibold shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <FaArrowLeft className="mr-2" />
              Назад
            </button>
            <Link
              to="/"
              className="inline-flex sm:grow items-center justify-center bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors text-base font-semibold shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <FaHome className="mr-2" />
              На главную
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
