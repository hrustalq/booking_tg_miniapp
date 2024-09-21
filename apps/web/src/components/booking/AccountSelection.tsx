import React, { useState, useMemo, useEffect } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Check } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export const AccountSelection: React.FC = () => {
  const { selectedGizmoAccountId, setSelectedGizmoAccountId, selectedClubId, updateNextButtonDisabled, setIsLoading } = useBookingStore();
  const { gizmoAccounts, isLoadingGizmoAccounts } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredAccounts = useMemo(() => {
    return gizmoAccounts?.filter(account =>
      account.username.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) &&
      account.branchId === selectedClubId
    );
  }, [gizmoAccounts, debouncedSearchQuery, selectedClubId]);

  useEffect(() => {
    updateNextButtonDisabled();
  }, [setSelectedGizmoAccountId, updateNextButtonDisabled]);

  useEffect(() => {
    setIsLoading(isLoadingGizmoAccounts);
  }, [isLoadingGizmoAccounts, setIsLoading])

  if (isLoadingGizmoAccounts) {
    return (
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="h-20 flex items-center justify-center">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Поиск аккаунтов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <ScrollArea className="h-[calc(100vh-19rem)] rounded-b-md">
        <div className='grid grid-cols-1 mb-16 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <AnimatePresence>
            {filteredAccounts?.map((account) => (
              <motion.div
                key={account.internalId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
                    selectedGizmoAccountId === account.internalId ? 'shadow-md border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedGizmoAccountId(account.internalId)}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: selectedGizmoAccountId === account.internalId ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0)',
                    }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-6 h-6 text-primary" />
                        <span className="text-lg font-medium">{account.username}</span>
                      </div>
                      <AnimatePresence>
                        {selectedGizmoAccountId === account.internalId && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge className="bg-blue-500 p-1 flex items-center justify-center text-primary-foreground">
                              <Check className="w-4 h-4 text-white" />
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
};