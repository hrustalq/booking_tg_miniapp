import React from 'react';
import { FaNewspaper } from 'react-icons/fa';
import { Card, CardContent } from '../components/ui/card';
import { SubscribeNews } from '@/components/subscribe-news';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
}

const newsItems: NewsItem[] = [
  { id: 1, title: 'Открытие нового кинозала', content: 'В нашем кинотеатре открылся новый зал с передовой звуковой системой Dolby Atmos.', date: '2023-04-20' },
  { id: 2, title: 'Фестиваль французского кино', content: 'С 1 по 7 мая пройдет фестиваль французского кино. Не пропустите лучшие фильмы!', date: '2023-04-18' },
  { id: 3, title: 'Ночь кино: марафон Marvel', content: 'В эту субботу приглашаем вас на ночной марафон фильмов вселенной Marvel.', date: '2023-04-15' },
];

const NewsCard: React.FC<{ newsItem: NewsItem }> = ({ newsItem }) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-2">{newsItem.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{newsItem.content}</p>
      <p className="text-xs text-gray-500">{newsItem.date}</p>
    </CardContent>
  </Card>
);

const NewsPage: React.FC = () => {

  return (
    <div>
      <div className="flex items-center px-2 justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <FaNewspaper className="mr-2" />
          Новости
        </h1>
        <SubscribeNews />
      </div>
      {newsItems.map(newsItem => (
        <NewsCard key={newsItem.id} newsItem={newsItem} />
      ))}
    </div>
  );
};

export default NewsPage;
