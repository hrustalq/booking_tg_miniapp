import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { FaDesktop, FaKeyboard, FaMouse, FaHeadphones, FaChair, FaPhone, FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaClock, FaGamepad, FaMoneyBillWave } from 'react-icons/fa';
import { MdMonitor } from 'react-icons/md';
import { GiProcessor } from 'react-icons/gi';
import { FaMemory } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';

// Статические данные
const clubs = [
  {
    name: "Bananagun на Гамидова",
    address: "г. Махачкала, ул. Гамидова, 55б. 3 этаж",
    phone: "+7‒938‒782-66-69",
    capacity: "40 мест",
    workingHours: "Круглосуточно",
    zones: [
      {
        name: "Purple",
        description: "Общий зал для всех геймеров",
        pricing: [
          { duration: "1 час", price: "120 ₽" },
          { duration: "3 часа", price: "300 ₽" },
          { duration: "3 + 1", price: "360 ₽" },
          { duration: "5 часов", price: "450 ₽" },
          { duration: "Вся ночь", price: "600 ₽" },
        ],
        hardware: [
          { icon: <FaMouse />, name: "Мышь", description: "Logitech G102" },
          { icon: <FaKeyboard />, name: "Клавиатура", description: "Red Square Keyrox TKL" },
          { icon: <FaHeadphones />, name: "Наушники", description: "HyperX Cloud Alpha S" },
          { icon: <FaChair />, name: "Коврик", description: "Bananagun (кастом)" },
          { icon: <MdMonitor />, name: "Монитор", description: "165 Гц 2K 27\"" },
          { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 3060 Ti" },
          { icon: <FaDesktop />, name: "Процессор", description: "Intel Core i5-12400F" },
          { icon: <FaMemory />, name: "Оперативная память", description: "16 GB DDR4 4200MHz" },
        ],
      },
      {
        name: "Banana",
        description: "Средний зал с улучшенным комфо��том",
        pricing: [
          { duration: "1 час", price: "120 ₽" },
          { duration: "3 часа", price: "300 ₽" },
          { duration: "3 + 1", price: "360 ₽" },
          { duration: "5 часов", price: "450 ₽" },
          { duration: "Вся ночь", price: "600 ₽" },
        ],
        hardware: [
          { icon: <FaMouse />, name: "Мышь", description: "VGN F1 Pro Max" },
          { icon: <FaKeyboard />, name: "Клавиатура", description: "Red Square Keyrox TKL" },
          { icon: <FaHeadphones />, name: "Наушники", description: "HyperX Cloud Alpha S" },
          { icon: <FaChair />, name: "Коврик", description: "Bananagun (кастом)" },
          { icon: <MdMonitor />, name: "Монитор", description: "240 Гц 2K 27\"" },
          { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 3070" },
          { icon: <FaDesktop />, name: "Процессор", description: "Intel Core i5-12400F" },
          { icon: <FaMemory />, name: "Оперативная память", description: "16 GB DDR4 4200MHz" },
        ],
      },
      {
        name: "Aqua/Jungle",
        description: "VIP-зоны для максимального погружения",
        pricing: [
          { duration: "1 час", price: "200 ₽" },
          { duration: "3 часа", price: "550 ₽" },
          { duration: "3 + 1", price: "700 ₽" },
          { duration: "5 часов", price: "850 ₽" },
          { duration: "Вся ночь", price: "800 ₽" },
          { duration: "Утро (8:00 - 13:00)", price: "300 ₽" },
        ],
        hardware: [
          { icon: <FaMouse />, name: "Мышь", description: "VGN F1 Pro Max" },
          { icon: <FaKeyboard />, name: "Клавиатура", description: "Dark Project KD 83A" },
          { icon: <FaHeadphones />, name: "Наушники", description: "HyperX Cloud 3" },
          { icon: <FaChair />, name: "Коврик", description: "Bananagun (кастом)" },
          { icon: <MdMonitor />, name: "Монитор", description: "240 Гц 2K 27\"" },
          { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 4070 Super" },
          { icon: <FaDesktop />, name: "Процессор", description: "AMD Ryzen 7 5700X3D" },
          { icon: <FaMemory />, name: "Оперативная память", description: "32 GB DDR5 5700MHz" },
        ],
      },
    ],
  },
  {
    name: "Bananagun в ТЦ Вега",
    address: "ул. Ленина, 82. Торговый центр Вега",
    phone: "+7‒938‒782-66-69",
    capacity: "40 мест",
    workingHours: "Круглосуточно",
    zones: [
      {
        name: "Purple",
        description: "Общий зал для всех геймеров",
        pricing: [
          { duration: "1 час", price: "120 ₽" },
          { duration: "3 часа", price: "300 ₽" },
          { duration: "3 + 1", price: "360 ₽" },
          { duration: "5 часов", price: "450 ₽" },
          { duration: "Вся ночь", price: "600 ₽" },
        ],
        hardware: [
          { icon: <FaMouse />, name: "Мышь", description: "MCHOSE G3" },
          { icon: <FaKeyboard />, name: "Клавиатура", description: "Dark Project KD1 Арена" },
          { icon: <FaHeadphones />, name: "Наушники", description: "Dark Project HS1 Арена" },
          { icon: <FaChair />, name: "Коврик", description: "Bananagun" },
          { icon: <MdMonitor />, name: "Монитор", description: "180Hz 2K 27\"" },
          { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 4060 Ti" },
          { icon: <FaDesktop />, name: "Процессор", description: "Intel Core i5-12600KF" },
          { icon: <FaMemory />, name: "Оперативная память", description: "32 GB DDR5 6400MHz" },
        ],
      },
      {
        name: "Banana",
        description: "Средний зал с улучшенным комфортом",
        pricing: [
          { duration: "1 час", price: "120 ₽" },
          { duration: "3 часа", price: "300 ₽" },
          { duration: "3 + 1", price: "360 ₽" },
          { duration: "5 часов", price: "450 ₽" },
          { duration: "Вся ночь", price: "600 ₽" },
        ],
        hardware: [
          { icon: <FaMouse />, name: "Мышь", description: "VXE R1 Pro Max" },
          { icon: <FaKeyboard />, name: "Клавиатура", description: "Dark Project KD1 Арена" },
          { icon: <FaHeadphones />, name: "Наушники", description: "Dark Project HS1 Арена" },
          { icon: <FaChair />, name: "Коврик", description: "Bananagun" },
          { icon: <MdMonitor />, name: "Монитор", description: "360Hz FullHD 24\"" },
          { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 4070 Super" },
          { icon: <FaDesktop />, name: "Процессор", description: "Intel Core i5-13600KF" },
          { icon: <FaMemory />, name: "Оперативная память", description: "32 GB DDR5 6400MHz" },
        ],
      },
      {
        name: "Aqua/Jungle",
        description: "VIP-оны для максимального погружения",
        pricing: [
          { duration: "1 час", price: "200 ₽" },
          { duration: "3 часа", price: "550 ₽" },
          { duration: "3 + 1", price: "700 ₽" },
          { duration: "5 часов", price: "850 ₽" },
          { duration: "Вся ночь", price: "800 ₽" },
          { duration: "Утро (8:00 - 13:00)", price: "300 ₽" },
        ],
        hardware: [
          { icon: <FaMouse />, name: "Мышь", description: "VXE R1 Pro Max" },
          { icon: <FaKeyboard />, name: "Клавиатура", description: "Dark Project Zeno" },
          { icon: <FaHeadphones />, name: "Наушники", description: "Dark Project HS1 Арена" },
          { icon: <FaChair />, name: "Коврик", description: "Bananagun" },
          { icon: <MdMonitor />, name: "Монитор", description: "380Hz 2K 27\"" },
          { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 4070 Super" },
          { icon: <FaDesktop />, name: "Процессор", description: "Intel Core i5-13600KF" },
          { icon: <FaMemory />, name: "Оперативная память", description: "32 GB DDR5 6400MHz" },
        ],
      },
    ],
  },
];

const ClubCard: React.FC<{ 
  name: string; 
  address: string; 
  phone: string; 
  capacity: string; 
  workingHours: string;
  zones: {
    name: string;
    description: string;
    pricing: { duration: string; price: string }[];
    hardware: { icon: React.ReactNode; name: string; description: string }[];
  }[];
}> = ({ name, address, phone, capacity, workingHours, zones }) => (
  <>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-[auto,1fr] gap-4">
          <FaMapMarkerAlt className="size-7 my-auto text-blue-500" />
          <a href={`https://2gis.ru/search/${encodeURIComponent(address)}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {address}
          </a>
          <FaPhone className="size-6 my-auto text-blue-500" />
          <a href={`tel:${phone.replace(/\D/g,'')}`} className="text-blue-500 hover:underline">
            {phone}
          </a>
          <FaUsers className="size-6 my-auto text-blue-500" />
          <span>{capacity}</span>
          <FaClock className="size-6 my-auto text-blue-500" />
          <span>{workingHours}</span>
        </CardContent>
      </Card>
    </motion.div>
    
    <Separator className="my-6" />
    
    <section className="my-6">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-2xl font-semibold mb-4 text-center flex items-center justify-center"
      >
        <FaGamepad className="mr-2" />
        Игровые зоны
      </motion.h3>
      {zones.map((zone) => (
        <ZoneInfo 
          key={zone.name}
          name={zone.name}
          description={zone.description}
          pricing={zone.pricing}
          hardware={zone.hardware}
        />
      ))}
    </section>
  </>
);

const ZoneInfo: React.FC<{ 
  name: string; 
  description: string; 
  pricing: { duration: string; price: string }[];
  hardware: { icon: React.ReactNode; name: string; description: string }[];
}> = ({ name, description, pricing, hardware }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pricing">
            <TabsList>
              <TabsTrigger value="pricing">
                <FaMoneyBillWave className="mr-2" />
                Тарифы
              </TabsTrigger>
              <TabsTrigger value="hardware">
                <FaDesktop className="mr-2" />
                Оборудование
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pricing">
              <PricingInfo prices={pricing} />
            </TabsContent>
            <TabsContent value="hardware">
              <HardwareInfo specs={hardware} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PricingInfo: React.FC<{ prices: { duration: string; price: string }[] }> = ({ prices }) => (
  <Card>
    <CardHeader>
      <CardTitle>Тарифы</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {prices.map((price, index) => (
          <li key={index} className="flex border-b pb-2 last-of-type:pb-0 last-of-type:border-b-0 justify-between">
            <span>{price.duration}</span>
            <span className="font-semibold">{price.price}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const HardwareInfo: React.FC<{ specs: { icon: React.ReactNode; name: string; description: string }[] }> = ({ specs }) => (
  <Card>
    <CardContent className="p-6">
      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="text-3xl text-blue-500">{spec.icon}</div>
              <div>
                <h4 className="font-semibold">{spec.name}</h4>
                <p className="text-sm text-gray-600">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

const RootPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col max-w-6xl"
    >
      <motion.h1 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl font-bold mb-4 text-center flex items-center justify-center"
      >
        Сеть компьютерных клубов Bananagun
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8 text-lg text-gray-600 dark:text-gray-300"
      >
        Современное оборудование • Комфортная атмосфера • Гибкие тарифы
      </motion.p>
      
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        className="text-center mb-8"
      >
        <Button asChild size="lg">
          <Link to="/booking">
            <FaCalendarAlt className="mr-2" />
            Забронировать
          </Link>
        </Button>
      </motion.div>
      
      <Tabs defaultValue={clubs[0].name}>
        <TabsList className="flex justify-center">
          {clubs.map((club, index) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <TabsTrigger value={club.name}>
                {club.name}
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>
        {clubs.map((club) => (
          <TabsContent key={club.name} value={club.name}>
            <ClubCard {...club} />
          </TabsContent>
        ))}
      </Tabs>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="text-center mt-12"
      >
        <Button asChild size="lg">
          <Link to="/booking">
            <FaClock className="mr-2" />
            Забронировать время
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default RootPage;
