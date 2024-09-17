import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { FaDesktop, FaKeyboard, FaMouse, FaHeadphones, FaChair, FaPhone, FaMapMarkerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { MdMonitor } from 'react-icons/md';
import { GiProcessor } from 'react-icons/gi';
import { useTheme } from '../hooks/use-theme';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const PriceCard: React.FC<{ title: string; price: string; description: string }> = ({ title, price, description }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold mb-2">{price}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const HardwareInfo: React.FC<{ specs: { icon: React.ReactNode; name: string; description: string }[] }> = ({ specs }) => (
  <Card>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </CardContent>
  </Card>
);

const RootPage: React.FC = () => {
  const { theme } = useTheme();

  const club1Prices = [
    { title: "Стандарт", price: "от 100 ₽/час", description: "Будни: 100 ₽/час, Выходные: 120 ₽/час" },
    { title: "VIP", price: "от 150 ₽/час", description: "Будни: 150 ₽/час, Выходные: 180 ₽/час" },
    { title: "Турнирная", price: "от 200 ₽/час", description: "Будни: 200 ₽/час, Выходные: 250 ₽/час" },
    { title: "Ночной пакет", price: "500 ₽", description: "С 22:00 до 06:00, безлимитное время" },
  ];

  const club2Prices = [
    { title: "Стандарт", price: "от 90 ₽/час", description: "Будни: 90 ₽/час, Выходные: 110 ₽/час" },
    { title: "Премиум", price: "от 130 ���/чс", description: "Будни: 130 ₽/час, Выходные: 160 ₽/час" },
    { title: "Дневной пакет", price: "400 ₽", description: "С 10:00 до 18:00, безлимитное время" },
  ];

  const club1Specs = [
    { icon: <FaDesktop />, name: "Процессор", description: "Intel Core i9-11900K" },
    { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 3080" },
    { icon: <MdMonitor />, name: "Монитор", description: "27\" 240Hz ASUS ROG Swift" },
    { icon: <FaKeyboard />, name: "Клавиатура", description: "Razer Huntsman Elite" },
    { icon: <FaMouse />, name: "Мышь", description: "Logitech G Pro X Superlight" },
    { icon: <FaHeadphones />, name: "Наушники", description: "HyperX Cloud II" },
    { icon: <FaChair />, name: "Кресло", description: "DXRacer Formula Series" },
  ];

  const club2Specs = [
    { icon: <FaDesktop />, name: "Процессор", description: "AMD Ryzen 7 5800X" },
    { icon: <GiProcessor />, name: "Видеокарта", description: "NVIDIA GeForce RTX 3070" },
    { icon: <MdMonitor />, name: "Монитор", description: "24\" 165Hz BenQ ZOWIE" },
    { icon: <FaKeyboard />, name: "Клавиатура", description: "SteelSeries Apex Pro" },
    { icon: <FaMouse />, name: "Мышь", description: "Zowie EC2" },
    { icon: <FaHeadphones />, name: "Наушники", description: "SteelSeries Arctis Pro" },
    { icon: <FaChair />, name: "Кресло", description: "Secretlab TITAN Evo 2022" },
  ];

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
    <div className={`mobile-layout ${getThemeClasses()}`}>
      <main className="">
        <h1 className="text-3xl font-bold mb-4 text-center">Сеть компьютерных клубов Bananagun</h1>
        <p className="text-center mb-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Современное оборудование • Комфортная атмосфера • Гибкие тарифы
        </p>
        
        <div className="text-center mb-8">
          <Link to="/booking" className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-base font-semibold shadow-md hover:shadow-lg">
            <FaCalendarAlt className="mr-2" />
            Забронировать
          </Link>
        </div>
        
        <Tabs defaultValue="club1">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="club1" className="px-6 py-3 text-lg">Кибер Арена</TabsTrigger>
            <TabsTrigger value="club2" className="px-6 py-3 text-lg">Геймер</TabsTrigger>
          </TabsList>
          <TabsContent value="club1">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-center">Компьютерный клуб "Кибер Арена"</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-[auto,1fr] gap-4 mb-6">
                    <FaMapMarkerAlt className="text-2xl text-blue-500" />
                    <a href="https://2gis.ru/search/ул.%20Пушкина%2C%20д.%2010" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                      ул. Пушкина, д. 10
                    </a>
                    <FaPhone className="text-2xl text-blue-500" />
                    <a href="tel:+71234567890" className="text-blue-500 hover:underline">
                      +7 (123) 456-78-90
                    </a>
                    <FaUsers className="text-2xl text-blue-500" />
                    <span>50 мест</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Зоны:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <li className="text-sm">Стандарт (30 мест)</li>
                      <li className="text-sm">VIP (15 мест)</li>
                      <li className="text-sm">Турнирная (5 мест)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-6 text-center">Цены и акции</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club1Prices.map((price, index) => (
                  <PriceCard key={index} {...price} />
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-6 text-center">Оборудование</h3>
              <Tabs defaultValue="standard">
                <TabsList className="mb-6 flex justify-center">
                  <TabsTrigger value="standard" className="px-6 py-3 text-lg">Стандарт</TabsTrigger>
                  <TabsTrigger value="vip" className="px-6 py-3 text-lg">VIP</TabsTrigger>
                </TabsList>
                <TabsContent value="standard">
                  <HardwareInfo specs={club1Specs} />
                </TabsContent>
                <TabsContent value="vip">
                  <HardwareInfo specs={club1Specs.map(spec => ({ ...spec, description: `VIP ${spec.description}` }))} />
                </TabsContent>
              </Tabs>
            </section>
          </TabsContent>
          <TabsContent value="club2">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-center">Компьютерный клуб "Геймер"</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-[auto,1fr] gap-4 mb-6">
                    <FaMapMarkerAlt className="text-2xl text-blue-500" />
                    <a href="https://2gis.ru/search/пр.%20Ленина%2C%20д.%2015" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                      пр. Ленина, д. 15
                    </a>
                    <FaPhone className="text-2xl text-blue-500" />
                    <a href="tel:+79876543210" className="text-blue-500 hover:underline">
                      +7 (987) 654-32-10
                    </a>
                    <FaUsers className="text-2xl text-blue-500" />
                    <span>30 мест</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Зоны:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <li className="text-sm">Стандарт (20 мест)</li>
                      <li className="text-sm">Премиум (10 мест)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-6 text-center">Цены и акции</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {club2Prices.map((price, index) => (
                  <PriceCard key={index} {...price} />
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-6 text-center">Оборудование</h3>
              <Tabs defaultValue="standard">
                <TabsList className="mb-6 flex justify-center">
                  <TabsTrigger value="standard" className="px-6 py-3 text-lg">Стандарт</TabsTrigger>
                  <TabsTrigger value="premium" className="px-6 py-3 text-lg">Премиум</TabsTrigger>
                </TabsList>
                <TabsContent value="standard">
                  <HardwareInfo specs={club2Specs} />
                </TabsContent>
                <TabsContent value="premium">
                  <HardwareInfo specs={club2Specs.map(spec => ({ ...spec, description: `Премиум ${spec.description}` }))} />
                </TabsContent>
              </Tabs>
            </section>
          </TabsContent>
        </Tabs>
        
        <div className="text-center my-6">
          <Link to="/booking" className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-base font-semibold shadow-md hover:shadow-lg">
            <FaCalendarAlt className="mr-2" />
            Забронировать
          </Link>
        </div>
      </main>
    </div>
  );
};

export default RootPage;
