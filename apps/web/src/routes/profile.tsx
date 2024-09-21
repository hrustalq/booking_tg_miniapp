import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaUser, FaCreditCard, FaUsers } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  const { telegramUser, gizmoAccounts, userGroups } = useAuth();

  if (!telegramUser) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className='p-6'>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={telegramUser.photo_url} alt={telegramUser.first_name} />
              <AvatarFallback>{telegramUser?.first_name[0]}{telegramUser?.last_name?.[0] ?? ''}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{telegramUser.first_name} {telegramUser.last_name}</h2>
              <p className="text-gray-500">@{telegramUser.username}</p>
              <Badge variant="secondary" className="mt-2">{telegramUser.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-19rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gizmoAccounts.map((account) => (
            <Card key={account.id}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{account.username}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>Логин: {account.username}</span>
                  </li>
                  <li className="flex items-center">
                    <FaCreditCard className="mr-2" />
                    <span>Баланс: {account.balance} ₽</span>
                  </li>
                  <li className="flex items-center">
                    <FaUsers className="mr-2" />
                    <span>Группа: {userGroups?.[0]?.name || 'Не указана'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProfilePage;