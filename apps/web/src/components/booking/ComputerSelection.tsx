import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import { PcStatus } from '@/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, Clock, Check, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useDebounce } from '@/hooks/useDebounce';
import { ComputerSkeleton } from './ComputerSkeleton';
import { useSearchParams } from 'react-router-dom';
import { usePcsQuery } from '@/queries/usePcsQueries';

export const ComputerSelection: React.FC = () => {
  const { selectedClubId, selectedZoneId, setSelectedComputerId, setIsLoading } = useBookingStore();
  const { data: pcs, isLoading: pcsLoading, error } = usePcsQuery(selectedZoneId, selectedClubId);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'available'>('available');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredComputers = useMemo(() => {
    return pcs?.filter(pc =>
      pc.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) &&
      (filter === 'all' || (filter === 'available' && pc.status === PcStatus.AVAILABLE))
    );
  }, [debouncedSearchQuery, filter, pcs]);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedComputerId = useMemo(() => {
    const computerId = searchParams.get('computerId');
    return computerId ? parseInt(computerId, 10) : null;
  }, [searchParams]);

  const handleComputerCardClick = useCallback((id: number) => {
    setSearchParams((prev) => {
      prev.set('computerId', id.toString());
      return prev;
    });
    setSelectedComputerId(id);
  }, [setSearchParams, setSelectedComputerId]);

  useEffect(() => {
    setIsLoading(pcsLoading)
  }, [pcsLoading, setIsLoading])

  if (pcsLoading) {
    return (
      <ScrollArea className="h-[calc(100vh-19rem)] rounded-b-md">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {[...Array(24)].map((_, index) => (
            <ComputerSkeleton key={index} />
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (error) {
    return <div>Ошибка загрузки компьютеров: {error.message}</div>;
  }

  const noAvailableComputers = filter === 'available' && filteredComputers?.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск компьютеров..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'available' ? 'default' : 'outline'}
            onClick={() => setFilter('available')}
          >
            Доступные
          </Button>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Все
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-19rem)]">
        {noAvailableComputers ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-30rem)] text-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-justify">Нет доступных компьютеров</h2>
            <p className="text-gray-600">К сожалению, в данный момент все компьютеры заняты. <br /> Пожалуйста, попробуйте позже.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 mb-16 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            <AnimatePresence>
              {filteredComputers?.map((pc) => (
                <motion.div
                  key={pc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden aspect-square ${
                      selectedComputerId === pc.id ? 'border-blue-500' : ''
                    }`}
                    onClick={() => handleComputerCardClick(pc.id)}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: selectedComputerId === pc.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0)',
                      }}
                      transition={{ duration: 0.2 }}
                      className='h-full'
                    >
                      <CardContent className="p-0 flex flex-col h-full relative">
                        <div className="flex p-2 pb-0 items-start flex-col justify-center">
                          <Monitor className="w-8 h-8 text-primary" />
                        </div>
                        <div className='px-3 pl-5 pb-0'>
                          <h3 className="text-3xl text-right font-semibold">{pc.name}</h3>
                        </div>
                        <div className="text-center mt-auto">
                          <Badge
                            className={`rounded-none w-full flex mt-0 py-0 items-center justify-center ${pc.status === PcStatus.AVAILABLE ? 'bg-green-500' : 'bg-red-500'} text-white text-xs`}
                          >
                            {pc.status === PcStatus.AVAILABLE ? 'Доступен' : 'Занят'}
                          </Badge>
                        </div>
                        {pc.status !== PcStatus.AVAILABLE && (
                          <div className="flex items-center absolute bottom-6 left-2 justify-center text-xs mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>Скоро</span>
                          </div>
                        )}
                        {selectedComputerId === pc.id && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-blue-500 p-1">
                              <Check className="w-3 h-3 text-white" />
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};