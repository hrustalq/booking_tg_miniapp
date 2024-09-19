import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Variant } from 'framer-motion';
import { FaSearch, FaDesktop } from 'react-icons/fa';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, MapPin, Monitor, Gamepad2, Phone, Clock, Wifi, CreditCard, DollarSign, Users, Cpu } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useInfiniteQuery } from '@tanstack/react-query';
import { branchesApi, PaginatedResponse, PaginationParams } from '@/api';
import { Branch } from '@/api/branches/types';
import { Autocomplete } from '@/components/ui/autocomplete';
import { Skeleton } from "@/components/ui/skeleton";
import { pcsApi } from '@/api';
import { Pc, PcStatus } from '@/api/pcs/types';
import { zonesApi } from '@/api';
import { Zone } from '@/api/zones/types';

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedClub, setSelectedClub] = useState<Branch | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedComputer, setSelectedComputer] = useState<Pc | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState("available");
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [gameAccount, setGameAccount] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

  const branches = data?.pages.flatMap(page => page.items) ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const {
    data: pcsData,
    fetchNextPage: fetchNextPcsPage,
    hasNextPage: hasNextPcsPage,
    isFetching: isPcsFetching,
    isLoading: isPcsLoading,
  } = useInfiniteQuery<PaginatedResponse<Pc>, Error>({
    queryKey: ['pcs', selectedZone, selectedClub?.id],
    queryFn: ({ pageParam }) => pcsApi.getPcs({ 
      zoneId: selectedZone!.id, 
      branchId: selectedClub!.id, 
      ...pageParam as PaginationParams 
    }),
    initialPageParam: {
      page: 1,
      limit: 10,
    },
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: !!selectedZone && !!selectedClub,
  });

  const pcs = useMemo(() => {
    return pcsData?.pages.flatMap(page => page.items) ?? [];
  }, [pcsData]);

  const handleLoadMorePcs = useCallback(() => {
    if (hasNextPcsPage && !isPcsFetching) {
      fetchNextPcsPage();
    }
  }, [hasNextPcsPage, isPcsFetching, fetchNextPcsPage]);

  // Фильтрация компьютеров по поисковому запросу
  const filteredPcs = useMemo(() => 
    pcs.filter(pc =>
      pc.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [pcs, searchTerm]
  );

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

  const handleButtonClick = useCallback((newDirection: 'next' | 'prev') => {
    setDirection(newDirection === 'next' ? 'forward' : 'backward');
    if (newDirection === 'next') {
      setStep((prevStep) => Math.min(prevStep + 1, 4));
    } else {
      setStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  }, []);

  const {
    data: zonesData,
    fetchNextPage: fetchNextZonesPage,
    hasNextPage: hasNextZonesPage,
    isFetching: isZonesFetching,
    isLoading: isZonesLoading,
  } = useInfiniteQuery<PaginatedResponse<Zone>, Error>({
    queryKey: ['zones', selectedClub?.id],
    queryFn: ({ pageParam }) => zonesApi.getZones({ 
      branchId: selectedClub!.id, 
      ...pageParam as PaginationParams 
    }),
    initialPageParam: {
      page: 1,
      limit: 10,
    },
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: !!selectedClub,
  });

  const zones = zonesData?.pages.flatMap(page => page.items) ?? [];

  const handleLoadMoreZones = useCallback(() => {
    if (hasNextZonesPage && !isZonesFetching) {
      fetchNextZonesPage();
    }
  }, [hasNextZonesPage, isZonesFetching, fetchNextZonesPage]);

  const isNextButtonDisabled = useMemo(() => {
    switch (step) {
      case 1:
        return !selectedClub || branches.length === 0;
      case 2:
        return !selectedZone || zones.length === 0;
      case 3:
        return !selectedComputer || filteredPcs.length === 0;
      default:
        return false;
    }
  }, [step, selectedClub, selectedZone, selectedComputer, branches.length, zones.length, filteredPcs.length]);

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
      title: 'Выберите зону',
      content: (
        <ScrollArea className="flex-grow">
          <div className="grid grid-cols-1 gap-4">
            {isZonesLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <ZoneSkeleton key={index} />
              ))
            ) : zones.length > 0 ? (
              zones.map(zone => (
                <Card
                  key={zone.id}
                  className={`cursor-pointer transition-colors duration-300 ${selectedZone?.id === zone.id ? 'border-blue-500' : ''}`}
                  onClick={() => setSelectedZone(zone)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">{zone.name}</h3>
                      <div className="flex items-center text-green-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{zone.hourlyRate} ₽/час</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Monitor className="w-4 h-4 mr-2" />
                        <span>{zone.pcAmount} ПК</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>До {zone.pcAmount} игроков</span>
                      </div>
                      {zone.pcSpecs && (
                        <div className="col-span-2 flex items-center text-gray-600 dark:text-gray-400">
                          <Cpu className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{zone.pcSpecs}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <EmptyState
                icon={<Monitor className="w-16 h-16" />}
                message="Зоны не найдены"
              />
            )}
            {hasNextZonesPage && (
              <Button onClick={handleLoadMoreZones} disabled={isZonesFetching}>
                {isZonesFetching ? 'Загрузка...' : 'Загрузить еще'}
              </Button>
            )}
          </div>
        </ScrollArea>
      ),
    },
    {
      key: 'step3',
      title: 'Выберите компьютер',
      content: (
        <>
          <div className="mb-4 flex flex-col gap-y-2">
            <Input
              type="text"
              placeholder="Поиск по номеру компьютера"
              value={searchTerm}
              icon={FaSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <div className="flex space-x-4 justify-center text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Доступно</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Выбрано</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Занято</span>
              </div>
            </div>
          </div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-grow flex flex-col">
            <TabsList className="my-4 bg-transparent">
              <TabsTrigger className='text-base' value="available">Доступные</TabsTrigger>
              <TabsTrigger className='text-base' value="all">Все</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[45dvh] rounded-md border">
              <TabsContent value="available" className="m-0 p-4">
                <ComputerGrid
                  computers={filteredPcs.filter(c => c.status === PcStatus.AVAILABLE)}
                  selectedComputer={selectedComputer}
                  onSelectComputer={setSelectedComputer}
                  isLoading={isPcsLoading}
                />
              </TabsContent>
              <TabsContent value="all" className="m-0 p-4">
                <ComputerGrid
                  computers={filteredPcs}
                  selectedComputer={selectedComputer}
                  onSelectComputer={setSelectedComputer}
                  isLoading={isPcsLoading}
                />
              </TabsContent>
            </ScrollArea>
          </Tabs>
          {hasNextPcsPage && (
            <Button onClick={handleLoadMorePcs} disabled={isPcsFetching} className="mt-4">
              {isPcsFetching ? 'Загрузка...' : 'Загрузить еще'}
            </Button>
          )}
        </>
      ),
    },
    {
      key: 'step4',
      title: 'Подтверждение бронирования',
      content: (
        <ScrollArea 
          className="h-[60dvh] rounded-md relative"
        >
          <div className="space-y-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Детали бронирования</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Клуб</p>
                      <p className="font-medium">{selectedClub?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Monitor className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Зона</p>
                      <p className="font-medium">{selectedZone?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Gamepad2 className="text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Компьютер</p>
                      <p className="font-medium">{selectedComputer?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Дата и время начала</p>
                      <p className="font-medium">{new Date().toLocaleString('ru-RU')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Игровой аккаунт</h3>
                <div className="flex items-center space-x-3">
                  <User className="text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Введите ваш игровой аккаунт"
                    value={gameAccount}
                    onChange={(e) => setGameAccount(e.target.value)}
                    wrapperClassName='grow w-full'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      ),
    },
  ];

  const handleConfirmBooking = () => {
    setIsConfirmationModalOpen(true);
  };

  return (
    <div className={`flex flex-col h-full`}>
      <div className="flex items-center gap-x-3 justify-start mb-6">
        <Calendar />
        <h1 className="text-3xl font-bold">Бронирование</h1>
      </div>
      <div className="flex flex-col overflow-hidden">
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
                className="w-full flex flex-col"
              >
                <h2 className="text-xl font-bold mb-4">{stepComponent.title}</h2>
                {stepComponent.content}
              </motion.div>
            )
          ))}
        </AnimatePresence>
        <div className="flex fixed bottom-16 pb-2 right-4 justify-end ml-auto w-5/6 gap-x-4">
        <Button 
          onClick={() => handleButtonClick('prev')}
          disabled={step === 1}
          className='grow shrink-0'
        >
          Назад
        </Button>
        {step < 4 ? (
          <Button 
            onClick={() => handleButtonClick('next')} 
            disabled={isNextButtonDisabled}
            className='grow shrink-0'
          >
            Далее
          </Button>
        ) : (
          <Button 
            onClick={handleConfirmBooking}
            disabled={!gameAccount}
            className='grow shrink-0'
          >
            Подтвердить
          </Button>
        )}
      </div>
      </div>

      <Dialog modal open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
        <DialogContent className="mx-auto sm:mx-0 w-[95%]">
          <DialogHeader>
            <DialogTitle>Важная информация</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              После начала бронирования, начнется сеанс на компьютере, который вы выбрали.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              За это время будет списана плата за аренду компьютера.
            </p>
            <Accordion type="single" collapsible className="mb-4">
              <AccordionItem value="terms">
                <AccordionTrigger className='text-sm pb-2'>Условия бронирования</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Бронирование действительно в течение 15 минут после подтверждения.</li>
                    <li>Оплата начинается с момента активации компьютера.</li>
                    <li>Отмена бронирования возможна не позднее чем за 30 минут до начала сеанса.</li>
                    <li>При опоздании более чем на 15 минут бронь может быть отменена.</li>
                    <li>Администрация клуба оставляет за собой право отказать в обслуживании.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Я согласен с условиями бронирования
              </label>
            </div>
          </div>
          <DialogFooter >
            <div className='flex flex-row items-center justify-center gap-x-4'>
              <Button className='grow shrink-0' onClick={() => setIsConfirmationModalOpen(false)}>Отмена</Button>
              <Button
                className='grow shrink-0' 
                onClick={() => {
                  console.log('Подтверждение бронирования', { selectedClub, selectedZone, selectedComputer, gameAccount, agreedToTerms });
                  setIsConfirmationModalOpen(false);
                }}
                disabled={!agreedToTerms}
              >
                Подтвердить
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ComputerGridProps {
  computers: Pc[];
  selectedComputer: Pc | null;
  onSelectComputer: (pc: Pc) => void;
  isLoading: boolean;
}

const ComputerGrid: React.FC<ComputerGridProps> = React.memo(({ computers, selectedComputer, onSelectComputer, isLoading }) => (
  <div className="grid grid-cols-3 gap-4 mb-4">
    {isLoading ? (
      Array.from({ length: 6 }).map((_, index) => (
        <ComputerSkeleton key={index} />
      ))
    ) : computers.length > 0 ? (
      computers.map((computer) => (
        <ComputerCard
          key={computer.id}
          computer={computer}
          onClick={() => onSelectComputer(computer)}
          isSelected={selectedComputer?.id === computer.id}
        />
      ))
    ) : (
      <div className="col-span-3">
        <EmptyState icon={<FaDesktop className="w-16 h-16" />} message="Компьютеры не найдены" />
      </div>
    )}
  </div>
));

interface ComputerCardProps {
  computer: Pc;
  onClick: () => void;
  isSelected: boolean;
}

const ComputerCard: React.FC<ComputerCardProps> = React.memo(({ computer, onClick, isSelected }) => (
  <div
    className={`relative rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
      computer.status === PcStatus.AVAILABLE
        ? isSelected
          ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500'
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
        : 'bg-red-100 dark:bg-red-900 cursor-not-allowed'
    }`}
    onClick={computer.status === PcStatus.AVAILABLE ? onClick : undefined}
  >
    <div className="p-4 pb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">{computer.name}</span>
        <FaDesktop className={`text-xl ${computer.status === PcStatus.AVAILABLE ? (isSelected ? 'text-blue-500' : 'text-green-500') : 'text-red-500'}`} />
      </div>
      <div className="text-sm font-medium">
        {computer.status === PcStatus.AVAILABLE ? (isSelected ? 'Выбрано' : 'Свободно') : 'Занято'}
      </div>
    </div>
    {computer.status !== PcStatus.AVAILABLE && (
      <div className="absolute bottom-0 inset-x-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
        <span className="text-red-700 dark:text-red-100 font-bold text-xs">Недоступен</span>
      </div>
    )}
  </div>
));

const ComputerSkeleton: React.FC = () => (
  <div className="rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700 animate-pulse">
    <div className="p-4 pb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);

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

const ZoneSkeleton: React.FC = () => (
  <Card className="animate-pulse">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full col-span-2" />
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

export default BookingPage;