import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence, Variant } from 'framer-motion';
import { FaLink } from 'react-icons/fa';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { branchesApi, PaginatedResponse, PaginationParams, gizmoUsersApi } from '@/api';
import { Branch } from '@/api/branches/types';
import { Autocomplete } from '@/components/ui/autocomplete';
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Clock, Wifi, CreditCard } from 'lucide-react';
import { GizmoUser } from '@/api/gizmo-users/types';
import { useDebounce } from '@/hooks/use-debounce';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const linkAccountSchema = z.object({
  login: z.string().min(3, 'Логин должен содержать не менее 3 символов'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
});

type LinkAccountFormData = z.infer<typeof linkAccountSchema>;

const LinkAccountPage: React.FC = () => {
  const auth = useAuth();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [selectedClub, setSelectedClub] = useState<Branch | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const searchTerm = useDebounce(searchInput, 300);
  const [selectedUser, setSelectedUser] = useState<GizmoUser | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const form = useForm<LinkAccountFormData>({
    resolver: zodResolver(linkAccountSchema),
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery<PaginatedResponse<Branch>, Error>({
    queryKey: ['branches'],
    queryFn: ({ pageParam }) => branchesApi.getBranches(pageParam as PaginationParams),
    initialPageParam: {
      page: 1,
      limit: 10,
    },
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const { data: users, isLoading: isUsersLoading } = useQuery<GizmoUser[]>({
    queryKey: ['gizmoUsers', searchTerm],
    queryFn: () => gizmoUsersApi.getGizmoUserSearch({ query: searchTerm, branchId: selectedClub!.id }),
    enabled: searchTerm?.length > 2,
  });

  const branches = data?.pages.flatMap(page => page.items) ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const pageVariants: Record<string, Variant> = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.28,
  };

  const handleButtonClick = async (newDirection: 'next' | 'prev') => {
    if (newDirection === 'next') {
      let isValid = false;
      if (step === 1) {
        isValid = !!selectedClub;
      } else if (step === 2) {
        isValid = await form.trigger('login', { shouldFocus: true });
      } else if (step === 3) {
        isValid = await form.trigger('password', { shouldFocus: true });
        if (isValid) {
          console.log(auth.user);
          if (!auth.user?.telegramData) {
            setLinkError('Не удалось получить данные из Telegram');
            return;
          }
          setIsLinking(true);
          try {
            await gizmoUsersApi.linkAccount({
              gizmoAccountInternalId: selectedUser!.id,
              branchId: selectedClub!.id,
              data: {
                ...auth.user.telegramData,
              },
              credentials: {
                username: form.getValues('login'),
                password: form.getValues('password'),
              },
            });
            setStep(4); // Move to success step
          } catch (error) {
            console.error('Error linking account:', error);
            setLinkError('Ошибка при привязке аккаунта');
            setStep(5); // Move to error step
          } finally {
            setIsLinking(false);
          }
          return; // Exit the function here to prevent further execution
        }
      }

      if (isValid) {
        setDirection('forward');
        setStep((prevStep) => Math.min(prevStep + 1, 3));
        if (step === 1) {
          form.clearErrors(['login', 'password']);
        } else if (step === 2) {
          form.clearErrors('password');
        }
      }
    } else {
      setDirection('backward');
      setStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };

  const onSubmit = (data: LinkAccountFormData) => {
    console.log("Отправка данных на сервер:", data);
    // Here you would typically send the data to your server
    // and then move to the success step
    setStep(4);
  };
    
  const stepComponents = [
    {
      key: 'step1',
      title: 'Выберите компьютерный клуб',
      content: (
        <div className="flex flex-col h-full">
          <Autocomplete
            options={branches}
            onSelect={(branch) => setSelectedClub(branch)}
            placeholder="Поиск по названию клуба"
            emptyMessage="Клубы не найдены"
            displayKey="name"
            className="mb-4"
          />
          <ScrollArea className="flex-grow">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <ClubSkeleton key={index} />
              ))
            ) : branches.length > 0 ? (
              branches.map((branch) => (
                <Card
                  key={branch.id}
                  className={`cursor-pointer transition-colors duration-300 mb-4 ${
                    selectedClub?.id === branch.id ? 'border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedClub(branch)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{branch.name}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <p>{branch.address}</p>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4 mr-2" />
                        <p>{branch.phoneNumber}</p>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <p>{branch.workingHours}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {branch.hasWifi && (
                          <div className="flex items-center text-green-500">
                            <Wifi className="w-4 h-4 mr-1" />
                            <span className="text-sm">Wi-Fi</span>
                          </div>
                        )}
                        {branch.acceptsCards && (
                          <div className="flex items-center text-blue-500">
                            <CreditCard className="w-4 h-4 mr-1" />
                            <span className="text-sm">Оплата картой</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <EmptyState
                icon={<MapPin className="w-16 h-16" />}
                message="Клубы не найдены"
              />
            )}
            {hasNextPage && (
              <Button onClick={handleLoadMore} disabled={isFetching}>
                {isFetching ? 'Загрузка...' : 'Загрузить еще'}
              </Button>
            )}
          </ScrollArea>
        </div>
      ),
    },
    {
      key: 'step2',
      title: 'Найдите свой аккаунт',
      content: (
        <Card>
          <CardContent className="p-6">
            <Autocomplete
              options={users || []}
              onSelect={(user) => {
                setSelectedUser(user);
                form.setValue('login', user.username);
              }}
              placeholder="Поиск по логину"
              emptyMessage="Пользователи не найдены"
              displayKey="username"
              className="mb-4"
              onInputChange={(value) => {
                setSearchInput(value);
                form.setValue('login', '');
              }}
              isLoading={isUsersLoading}
            />
            {selectedUser && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Выбранный пользователь:</h3>
                <p>{selectedUser.username}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ),
    },
    {
      key: 'step3',
      title: 'Введите пароль',
      content: (
        <Card>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete='current-password' placeholder="Введите пароль" {...field} />
                  </FormControl>
                  <FormDescription>
                    Введите пароль от вашего существующего аккаунта в нашей системе.
                  </FormDescription>
                  <FormDescription>
                    Если вы забыли пароль, воспользуйтесь функцией 
                    <a href="/reset-password" className="text-blue-500 hover:underline ml-1">
                      восстановления пароля
                    </a>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ),
    },
    {
      key: 'step4',
      title: 'Аккаунт успешно привязан',
      content: (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Поздравляем!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ваш аккаунт успешно привязан к выбранному компьютерному клубу.
            </p>
            <Button className="mt-6" onClick={() => {/* Navigate to home or dashboard */}}>
              Перейти в личный кабинет
            </Button>
          </CardContent>
        </Card>
      ),
    },
    {
      key: 'step5',
      title: 'Ошибка привязки аккаунта',
      content: (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Ошибка</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {linkError}
            </p>
            <Button onClick={() => setStep(3)} className="mb-2">
              Вернуться назад
            </Button>
            <div className="mt-4">
              <a href="/register" className="text-blue-500 hover:underline">
                Создать новый аккаунт
              </a>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-x-3 justify-start mb-6">
        <FaLink className="text-2xl" />
        <h1 className="text-3xl font-bold">Привязка акаунта</h1>
      </div>
      <div className="flex flex-col overflow-hidden flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              {stepComponents.map((stepComponent, index) => (
                index + 1 === step && (
                  <motion.div
                    key={stepComponent.key}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={pageTransition}
                    className="w-full flex flex-col flex-grow"
                  >
                    <h2 className="text-xl font-bold mb-4">{stepComponent.title}</h2>
                    <ScrollArea className="flex-grow">
                      {isLinking ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Loader2 className="w-8 h-8 animate-spin" />
                          <p className="mt-4">Привязка аккаунта...</p>
                        </div>
                      ) : (
                        stepComponent.content
                      )}
                    </ScrollArea>
                    {step < 4 && !isLinking && (
                      <div className="flex justify-end gap-x-3 mt-4">
                        <Button type="button" onClick={() => handleButtonClick('prev')} disabled={step === 1}>
                          Назад
                        </Button>
                        <Button 
                          type="button"
                          onClick={() => handleButtonClick('next')} 
                          disabled={step === 1 ? !selectedClub : false}
                        >
                          {step === 3 ? 'Привязать аккаунт' : 'Далее'}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </form>
        </Form>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        Нет аккаунта? <a href="/register" className="text-blue-500 hover:underline">Создать новый аккаунт</a>
      </div>
    </div>
  );
};

const ClubSkeleton: React.FC = () => (
  <Card>
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => (
  <div className="flex flex-col items-center justify-center h-full py-12 text-gray-500 dark:text-gray-400">
    {icon}
    <p className="text-lg font-medium">{message}</p>
  </div>
);

export default LinkAccountPage;
