import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ClubSkeleton } from './ClubSkeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useBranchesQuery } from '@/queries/useBranchesQueries';
import { useBookingStore } from '@/store/bookingStore';

export const ClubSelection: React.FC = () => {
  const { data: branches, isLoading: branchesLoading, error } = useBranchesQuery();
  const { setSelectedClubId, setIsLoading } = useBookingStore();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [serchParams, setSearchParams] = useSearchParams();

  const selectedClubId = serchParams.get('clubId');

  useEffect(() => {
    setIsLoading(branchesLoading);
  }, [branchesLoading, setIsLoading]);

  const handleClubCardClick = useCallback((id: string) => {
    setSearchParams((prev) => {
      prev.set('clubId', id);
      return prev;
    });
    setSelectedClubId(id);
  }, [setSearchParams, setSelectedClubId]);

  const filteredBranches = useMemo(() => {
    return branches?.filter(branch =>
      branch.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [branches, debouncedSearchQuery]);

  const renderContent = () => {
    if (branchesLoading) {
      return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(6)].map((_, index) => (
            <ClubSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <div>Ошибка загрузки клубов: {error.message}</div>;
    }

    return (
      <div className='grid grid-cols-1 mb-16 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredBranches?.map((branch) => (
          <motion.div
            key={branch.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
                selectedClubId === branch.id ? 'shadow-md border-blue-500' : ''
              }`}
              onClick={() => handleClubCardClick(branch.id)}
            >
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: selectedClubId === branch.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0)',
                }}
                transition={{ duration: 0.2 }}
                className='h-full'
              >
                <CardHeader className='relative pb-2'>
                  <h3 className='text-xl font-semibold'>{branch.name}</h3>
                  <AnimatePresence>
                    {selectedClubId === branch.id && (
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
                    <MapPin className='w-5 h-5 text-primary mt-1 flex-shrink-0' />
                    <span className='text-sm'>{branch.address}</span>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <Clock className='w-5 h-5 text-primary mt-1 flex-shrink-0' />
                    <div className='text-sm'>
                      {branch.workingHours.map((hours, index) => (
                        <div key={index}>{hours}</div>
                      ))}
                    </div>
                  </div>
                  {branch.phoneNumber && (
                    <div className='flex items-center space-x-2'>
                      <Phone className='w-5 h-5 text-primary flex-shrink-0' />
                      <span className='text-sm'>{branch.phoneNumber}</span>
                    </div>
                  )}
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
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
        {renderContent()}
      </ScrollArea>
    </div>
  );
};