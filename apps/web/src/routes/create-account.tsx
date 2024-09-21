import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Search } from 'lucide-react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBranchesQuery } from '@/queries/useBranchesQueries';
import { Branch } from '@/api';
import { ClubCard } from '@/components/ClubCard';
import { ClubSkeleton } from '@/components/booking/ClubSkeleton';
import { useDebounce } from '@/hooks/useDebounce';

const userSchema = z.object({
  userName: z.string().min(3, 'Имя пользователя должно содержать не менее 3 символов').max(50),
  password: z.string().min(8, 'Пароль должен содержать не менее 8 символов'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Имя должно содержать не менее 2 символов').max(50),
  lastName: z.string().min(2, 'Фамилия должна содержать не менее 2 символов').max(50),
  birthDate: z.date({
    required_error: "Дата рождения обязательна.",
  }),
  email: z.string().email('Неверный адрес электронной почты'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Неверный номер телефона'),
  sex: z.enum(['0', '1', '2']),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  mobilePhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Неверный номер мобильного телефона').optional(),
  postCode: z.string().optional(),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "Вы должны согласиться с условиями использования",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type UserFormData = z.infer<typeof userSchema>;

const CreateAccountPage: React.FC = () => {
  const [step, setStep] = useState<'select-club' | 'create-account'>('select-club');
  const [selectedClub, setSelectedClub] = useState<Branch | null>(null);
  const { data: branches, isLoading: branchesLoading } = useBranchesQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      sex: '0',
      agreeToTerms: false,
    },
  });
  const [year, setYear] = useState(2000);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const filteredBranches = useMemo(() => {
    return branches?.filter(branch =>
      branch.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [branches, debouncedSearchQuery]);

  const onSubmit = (data: UserFormData) => {
    console.log(data);
    console.log('Selected club:', selectedClub);
    // Здесь обычно отправляются данные на бэкенд
  };

  const renderClubSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Выберите клуб</h2>
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Поиск клубов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <ScrollArea className="h-[calc(100vh-19rem)] rounded-b-md">
        <div className='grid grid-cols-1 mb-16 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <AnimatePresence>
            {branchesLoading ? (
              [...Array(6)].map((_, index) => (
                <ClubSkeleton key={index} />
              ))
            ) : (
              filteredBranches?.map((branch) => (
                <ClubCard
                  key={branch.id}
                  branch={branch}
                  isSelected={selectedClub?.id === branch.id}
                  onClick={() => {
                    setSelectedClub(branch);
                    setStep('create-account');
                  }}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </motion.div>
  );

  const renderAccountCreation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row gap-x-3 items-center mb-6">
        <UserPlus className="" />
        <h1 className="text-3xl font-bold">Создание аккаунта</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Информация о пользователе</CardTitle>
          {selectedClub && (
            <p>Выбранный клуб: {selectedClub.name}</p>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger className='w-full' value="basic">Основная</TabsTrigger>
                  <TabsTrigger className='w-full' value="additional">Дополнительно</TabsTrigger>
                </TabsList>
                <TabsContent value="basic">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя пользователя</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='password'>Пароль</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                {...field}
                                name="password"
                                id="password"
                                autoComplete="new-password"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='confirmPassword'>Подтверждение пароля</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                {...field}
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="new-password"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="additional">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Фамилия</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Дата рождения</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-9",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd.MM.yyyy")
                                  ) : (
                                    <span>Выберите дату рождения</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                month={new Date(year, 0)}
                                onMonthChange={(newMonth) => setYear(newMonth.getFullYear())}
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Электронная почта</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} autoComplete="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пол</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите пол" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">Не указано</SelectItem>
                              <SelectItem value="1">Мужской</SelectItem>
                              <SelectItem value="2">Женский</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Страна</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Город</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Адрес</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobilePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Мобильный телефон</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Почтовый индекс</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <Separator />
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor='agreeToTerms'>
                        Я согласен с{" "}
                        <Dialog>
                          <DialogDescription hidden>
                            Условия использования
                          </DialogDescription>
                          <DialogTrigger asChild>
                            <span className="underline cursor-pointer">условиями предоставления услуг</span>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Условия предоставления услуг в сети компьютерных клубов Bananagun</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] mb-4">
                              <div>                                  
                                <h3 className="text-lg font-semibold mt-4 mb-2">1. Общие положения</h3>
                                <p className="mb-4">Настоящие условия регулируют использование услуг нашего компьютерного клуба. Регистрируясь, вы соглашаетесь соблюдать эти правила.</p>
                                
                                <h3 className="text-lg font-semibold mt-4 mb-2">2. Членство и доступ</h3>
                                <p className="mb-4">2.1. Членство в клубе доступно лицам старше 14 лет. Лица младше 18 лет должны иметь разрешение родителей или законных опекунов.</p>
                                <p className="mb-4">2.2. Вы обязуетесь предоставить точную и актуальную информацию при регистрации.</p>
                                
                                <h3 className="text-lg font-semibold mt-4 mb-2">3. Правила поведения</h3>
                                <p className="mb-4">3.1. Запрещается использовать оборудование клуба для незаконной деятельности.</p>
                                <p className="mb-4">3.2. Запрещается устанавливать или удалять программное обеспечение без разрешения администрации.</p>
                                <p className="mb-4">3.3. Соблюдайте тишину и уважайте других посети��елей клуба.</p>
                                
                                <h3 className="text-lg font-semibold mt-4 mb-2">4. Оплата и бронирование</h3>
                                <p className="mb-4">4.1. Оплата производится согласно текущим тарифам клуба.</p>
                                <p className="mb-4">4.2. Бронирование осуществляется через наш сайт или администратора клуба.</p>
                                
                                <h3 className="text-lg font-semibold mt-4 mb-2">5. Ответственность</h3>
                                <p className="mb-4">5.1. Клуб не несет ответственности за утерю или повреждение личных вещей посетителей.</p>
                                <p className="mb-4">5.2. Вы несете ответственность за любой ущерб, причиненный оборудованию клуба по вашей вине.</p>
                                
                                <h3 className="text-lg font-semibold mt-4 mb-2">6. Конфиденциальность</h3>
                                <p className="mb-4">6.1. Мы обязуемся защищать вашу личную информацию согласно нашей политике конфиденциальности.</p>
                                
                                <h3 className="text-lg font-semibold mt-4 mb-2">7. Изменения условий</h3>
                                <p className="mb-4">7.1. Мы оставляем за собой право изменять эти условия. О существенных изменениях вы будете уведомлены.</p>
                                
                                <p className="mt-6 font-semibold">Принимая эти условия, вы подтверждаете, что прочитали, поняли и согласны соблюдать все вышеуказанные правила и положения.</p>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Создать аккаунт</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className={`grow flex flex-col h-full`}>
      {step === 'select-club' ? renderClubSelection() : renderAccountCreation()}
    </div>
  );
};

export default CreateAccountPage;