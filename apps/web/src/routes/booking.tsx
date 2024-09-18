import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variant } from 'framer-motion';
import { FaSearch, FaDesktop } from 'react-icons/fa';
import { useTheme } from '../hooks/use-theme';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, MapPin, Monitor, Gamepad2, Phone, Clock, Wifi, CreditCard, DollarSign, Users, Cpu } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Mock data
const clubs = [
  { id: 1, name: 'Cyber Arena', address: 'ул. Пушкина, д. 10', phone: '+7 (999) 123-45-67', workingHours: '10:00 - 22:00', hasWifi: true, acceptsCards: true },
  { id: 2, name: 'Gamer', address: 'пр. Ленина, д. 15', phone: '+7 (999) 987-65-43', workingHours: '12:00 - 00:00', hasWifi: true, acceptsCards: false },
];

const zones = [
  { id: 1, name: 'Стандарт', pricePerHour: 100, pcCount: 20, devices: 'Intel Core i5, 16GB RAM, GTX 1660' },
  { id: 2, name: 'VIP', pricePerHour: 150, pcCount: 10, devices: 'Intel Core i7, 32GB RAM, RTX 3070' },
  { id: 3, name: 'Турнирная', pricePerHour: 200, pcCount: 5, devices: 'Intel Core i9, 64GB RAM, RTX 3080' },
];

const computers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  number: `PC${i + 1}`,
  isAvailable: Math.random() > 0.3,
}));

const BookingPage: React.FC = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [selectedClub, setSelectedClub] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [selectedComputer, setSelectedComputer] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState("available");
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [gameAccount, setGameAccount] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Оптимизация: вынесите функцию за пределы рендера
  const getThemeClasses = React.useMemo(() => {
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
  }, [theme]);

  // Оптимизация: используйте useMemo для фильтрации компьютеров
  const filteredComputers = React.useMemo(() => 
    computers.filter(computer =>
      computer.number.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
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
    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing
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

  const renderStep = () => {
    const commonClasses = "absolute top-0 left-0 w-full h-full flex flex-col";
    
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className={commonClasses}
          >
            <h2 className="text-xl font-bold mb-4">Выберите компьютерный клуб</h2>
            <div className="grid grid-cols-1 gap-3">
              {clubs.map(club => (
                <Card
                  key={club.id}
                  className={`cursor-pointer transition-colors duration-300 ${selectedClub === club.id ? 'border-blue-500' : ''}`}
                  onClick={() => setSelectedClub(club.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{club.name}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <p>{club.address}</p>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4 mr-2" />
                        <p>{club.phone}</p>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <p>{club.workingHours}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {club.hasWifi && (
                          <div className="flex items-center text-green-500">
                            <Wifi className="w-4 h-4 mr-1" />
                            <span className="text-sm">Wi-Fi</span>
                          </div>
                        )}
                        {club.acceptsCards && (
                          <div className="flex items-center text-blue-500">
                            <CreditCard className="w-4 h-4 mr-1" />
                            <span className="text-sm">Оплата картой</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className={commonClasses}
          >
            <h2 className="text-2xl font-bold mb-4">Выберите зону</h2>
            <div className="grid grid-cols-1 gap-4">
              {zones.map(zone => (
                <Card
                  key={zone.id}
                  className={`cursor-pointer transition-colors duration-300 ${selectedZone === zone.id ? 'border-blue-500' : ''}`}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">{zone.name}</h3>
                      <div className="flex items-center text-green-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{zone.pricePerHour} ₽/час</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Monitor className="w-4 h-4 mr-2" />
                        <span>{zone.pcCount} ПК</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>До {zone.pcCount} игроков</span>
                      </div>
                      <div className="col-span-2 flex items-center text-gray-600 dark:text-gray-400">
                        <Cpu className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{zone.devices}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className={commonClasses}
          >
            <h2 className="text-2xl font-bold mb-4">Выберите компьютер</h2>
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
              <TabsList className="mb-4">
                <TabsTrigger className='text-lg' value="available">Доступные</TabsTrigger>
                <TabsTrigger className='text-lg' value="all">Все</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[45dvh] rounded-md border">
                <TabsContent value="available" className="m-0 p-4">
                  <ComputerGrid
                    computers={filteredComputers.filter(c => c.isAvailable)}
                    selectedComputer={selectedComputer}
                    onSelectComputer={setSelectedComputer}
                  />
                </TabsContent>
                <TabsContent value="all" className="m-0 p-4">
                  <ComputerGrid
                    computers={filteredComputers}
                    selectedComputer={selectedComputer}
                    onSelectComputer={setSelectedComputer}
                  />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className={commonClasses}
          >
            <h2 className="text-2xl font-bold mb-6">Подтверждение бронирования</h2>
            <ScrollArea 
              ref={scrollAreaRef}
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
                          <p className="font-medium">{clubs.find(c => c.id === selectedClub)?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Monitor className="text-green-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Зона</p>
                          <p className="font-medium">{zones.find(z => z.id === selectedZone)?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Gamepad2 className="text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Компьютер</p>
                          <p className="font-medium">{computers.find(c => c.id === selectedComputer)?.number}</p>
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
                        className="flex-grow"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleConfirmBooking = () => {
    setIsConfirmationModalOpen(true);
  };

  return (
    <div className={`grow flex flex-col ${getThemeClasses} h-full`}>
      <div className="flex items-center gap-x-3 justify-start mb-6">
        <Calendar />
        <h1 className="text-3xl font-bold">Бронирование</h1>
      </div>
      <div className="relative flex-grow overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {renderStep()}
        </AnimatePresence>
      </div>
      <div className="flex sticky bottom-10 justify-end ml-auto w-5/6 gap-x-4 mt-4">
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
            disabled={(step === 1 && !selectedClub) || (step === 2 && !selectedZone) || (step === 3 && !selectedComputer)}
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
            Подтвердить бронирование
          </Button>
        )}
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
  computers: { id: number; number: string; isAvailable: boolean }[];
  selectedComputer: number | null;
  onSelectComputer: (id: number) => void;
}

const ComputerGrid: React.FC<ComputerGridProps> = React.memo(({ computers, selectedComputer, onSelectComputer }) => (
  <div className="grid grid-cols-3 gap-4">
    {computers.map((computer) => (
      <ComputerCard
        key={computer.id}
        computer={computer}
        onClick={() => onSelectComputer(computer.id)}
        isSelected={selectedComputer === computer.id}
      />
    ))}
  </div>
));

interface ComputerCardProps {
  computer: { id: number; number: string; isAvailable: boolean };
  onClick: () => void;
  isSelected: boolean;
}

const ComputerCard: React.FC<ComputerCardProps> = React.memo(({ computer, onClick, isSelected }) => (
  <div
    className={`relative rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
      computer.isAvailable
        ? isSelected
          ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500'
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
        : 'bg-red-100 dark:bg-red-900 cursor-not-allowed'
    }`}
    onClick={computer.isAvailable ? onClick : undefined}
  >
    <div className="p-4 pb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">{computer.number}</span>
        <FaDesktop className={`text-xl ${computer.isAvailable ? (isSelected ? 'text-blue-500' : 'text-green-500') : 'text-red-500'}`} />
      </div>
      <div className="text-sm font-medium">
        {computer.isAvailable ? (isSelected ? 'Выбрано' : 'Свободно') : 'Занято'}
      </div>
    </div>
    {!computer.isAvailable && (
      <div className="absolute bottom-0 inset-x-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
        <span className="text-red-700 dark:text-red-100 font-bold text-xs">Недоступен</span>
      </div>
    )}
  </div>
));

export default BookingPage;