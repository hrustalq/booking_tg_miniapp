import React, { useEffect, useMemo } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingStore } from '@/store/bookingStore';
import { MapPin, Monitor, Gamepad2, Calendar, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useBranchesQuery } from '@/queries/useBranchesQueries';
import { usePcsQuery } from '@/queries/usePcsQueries';
import { useZonesQuery } from '@/queries/useZonesQueries';

export const BookingConfirmation: React.FC = () => {
  const { selectedClubId, selectedZoneId, selectedComputerId, selectedGizmoAccountId, setIsLoading } = useBookingStore();
  const { gizmoAccounts, isLoadingGizmoAccounts } = useAuth();

  const { data: pcs, isLoading: isLoadingPcs } = usePcsQuery(selectedZoneId, selectedClubId);
  const { data: zones, isLoading: isLoadingZones } = useZonesQuery(selectedClubId); 
  const { data: branches, isLoading: isLoadingBranches } = useBranchesQuery();

  const club = useMemo(() => {
    if (!selectedClubId) return null;
    return branches?.find((branch) => branch.id === selectedClubId);
  }, [branches, selectedClubId]);

  const zone = useMemo(() => {
    if (!selectedZoneId) return null;
    return zones?.find((zone) => zone.id === selectedZoneId);
  }, [zones, selectedZoneId]);

  const computer = useMemo(() => {
    if (!selectedComputerId) return null;
    return pcs?.find((pc) => pc.id === selectedComputerId);
  }, [pcs, selectedComputerId]);

  const gizmoAccount = useMemo(() => {
    if (!gizmoAccounts?.length) return;
    return gizmoAccounts.find((acc) => acc.internalId === selectedGizmoAccountId);
  }, [gizmoAccounts, selectedGizmoAccountId]);

  useEffect(() => {
    setIsLoading(isLoadingGizmoAccounts || isLoadingPcs || isLoadingZones || isLoadingBranches);
  }, [isLoadingGizmoAccounts, isLoadingPcs, isLoadingZones, isLoadingBranches, setIsLoading])

  return (
    <ScrollArea className="h-[calc(100vh-19rem)] rounded-md relative">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Детали бронирования</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <MapPin className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Клуб</p>
                <p className="font-medium">{club?.name || 'Не выбран'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Monitor className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Зона</p>
                <p className="font-medium">{zone?.name || 'Не выбрана'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Gamepad2 className="text-purple-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Компьютер</p>
                <p className="font-medium">{computer?.name || 'Не выбран'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="text-red-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Дата и время начала</p>
                <p className="font-medium">{new Date().toLocaleString('ru-RU')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <User className="text-orange-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Игровой аккаунт</p>
                <p className="font-medium">{gizmoAccount?.username || 'Не выбран'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};