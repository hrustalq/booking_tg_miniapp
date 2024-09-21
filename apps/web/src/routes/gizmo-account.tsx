import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaUser, FaCreditCard, FaUsers, FaArrowLeft } from 'react-icons/fa';

const GizmoAccountPage: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { gizmoAccounts, billingProfiles, userGroups } = useAuth();

  if (!accountId) {
    return <div>Аккаунт не найден</div>;
  }

  const account = gizmoAccounts.find(acc => acc.id === +accountId);

  if (!account) {
    return <div>Аккаунт не найден</div>;
  }

  return (
    <div className="space-y-6">
      <Link to="/profile" className="flex items-center gap-2 text-blue-500 hover:underline mb-4">
        <FaArrowLeft /> Назад к профилю
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FaUser />
            Аккаунт: {account.username}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p><strong>Клуб:</strong> {account.branch?.name}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="billing">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="billing">Профили оплаты</TabsTrigger>
          <TabsTrigger value="groups">Группы пользователей</TabsTrigger>
        </TabsList>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <FaCreditCard />
                Профили оплаты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Баланс</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell>{profile.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="groups">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <FaUsers />
                Группы пользователей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название группы</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userGroups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell>{group.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GizmoAccountPage;