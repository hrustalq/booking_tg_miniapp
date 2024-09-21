import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ZoneSkeleton } from './ZoneSkeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Users, Monitor, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GiPriceTag } from 'react-icons/gi';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useZonesQuery } from '@/queries/useZonesQueries';
import { useBookingStore } from '@/store/bookingStore';

export const ZoneSelection: React.FC = () => {
  const { selectedClubId, setSelectedZoneId, setIsLoading } = useBookingStore();
  const { data: zones, isLoading: zonesLoading, error } = useZonesQuery(selectedClubId);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredZones = useMemo(() => {
    return zones?.filter(zone =>
      zone.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      zone?.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [zones, debouncedSearchQuery]);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedZoneId = searchParams.get('zoneId');

  const handleZoneCardClick = useCallback((id: string) => {
    setSearchParams((prev) => {
      prev.set('zoneId', id);
      return prev;
    });
    setSelectedZoneId(id);
  }, [setSearchParams, setSelectedZoneId]);

  useEffect(() => {
    setIsLoading(zonesLoading)
  }, [setIsLoading, zonesLoading])

  if (zonesLoading) {
    return (
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(6)].map((_, index) => (
            <ZoneSkeleton key={index} />
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (error) {
    return <div>Ошибка загрузки зон: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Поиск зон..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <ScrollArea className="h-[calc(100vh-19rem)] rounded-b-md">
        <div className='grid grid-cols-1 mb-16 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredZones?.map((zone) => (
            <motion.div
              key={zone.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
                  selectedZoneId === zone.id ? 'shadow-md border-blue-500' : ''
                }`}
                onClick={() => handleZoneCardClick(zone.id)}
              >
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: selectedZoneId === zone.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0)',
                  }}
                  transition={{ duration: 0.2 }}
                  className='h-full'
                >
                  <CardHeader className='relative pb-2'>
                    <h3 className='text-xl font-semibold'>{zone.name}</h3>
                    <AnimatePresence>
                      {selectedZoneId === zone.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className='absolute top-2 right-3.5'
                        >
                          <Badge className='bg-blue-500 p-1 flex items-center justify-center text-primary-foreground'>
                            <Check className='w-4 h-4 text-white' />
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center space-x-2'>
                      <Users className='w-5 h-5 text-primary flex-shrink-0' />
                      <span className='text-sm'>Вместимость: {zone.pcAmount} мест</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <GiPriceTag className='w-5 h-5 text-primary flex-shrink-0' />
                      <span className='text-sm'>Цена: {zone.hourlyRate} руб / час</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Monitor className='w-5 h-5 text-primary flex-shrink-0' />
                      <span className='text-sm'>Тип компьютеров: {zone.description}</span>
                    </div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};