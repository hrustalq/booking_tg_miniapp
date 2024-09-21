import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NavigateFunction } from 'react-router-dom';

interface BookingState {
  step: number;

  selectedClubId: string | null;
  selectedZoneId: string | null;
  selectedComputerId: number | null;
  selectedGizmoAccountId: number | null;

  agreedToTerms: boolean;
  isNextButtonDisabled: boolean;
  direction: 'forward' | 'backward';
  isConfirmationModalOpen: boolean;
  bookingStatus: 'confirmation' | 'idle' | 'loading' | 'error' | 'success';
  isLoading: boolean;

  setStep: (step: number) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedClubId: (id: string | null) => void;
  setSelectedZoneId: (id: string | null) => void;
  setSelectedComputerId: (id: number | null) => void;
  setSelectedGizmoAccountId: (id: number | null) => void;

  setAgreedToTerms: (agreed: boolean) => void;

  setDirection: (direction: 'forward' | 'backward') => void;
  handleButtonClick: (newDirection: 'next' | 'prev', navigate: NavigateFunction) => void;
  updateNextButtonDisabled: () => void;
  resetBooking: () => void;
  setBookingStatus: (status: 'idle' | 'loading' | 'error' | 'success' | 'confirmation') => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      step: 1,
      selectedClubId: null,
      selectedZoneId: null,
      selectedComputerId: null,
      selectedGizmoAccountId: null,
      searchTerm: '',
      selectedTab: 'available',
      agreedToTerms: false,
      isNextButtonDisabled: true,
      direction: 'forward',
      isConfirmationModalOpen: false,
      bookingStatus: 'idle',
      isLoading: false,

      setStep: (step) => set({ step }),
      setSelectedClubId: (id) => {
        set({ selectedClubId: id, selectedZoneId: null, selectedComputerId: null, selectedGizmoAccountId: null });
        get().updateNextButtonDisabled();
      },
      setSelectedZoneId: (id) => {
        set({ selectedZoneId: id, selectedComputerId: null, selectedGizmoAccountId: null });
        get().updateNextButtonDisabled();
      },
      setSelectedComputerId: (id) => {
        set({ selectedComputerId: id, selectedGizmoAccountId: null });
        get().updateNextButtonDisabled();
      },
      setSelectedGizmoAccountId: (id) => {
        set({ selectedGizmoAccountId: id });
        get().updateNextButtonDisabled();
      },

      setAgreedToTerms: (agreed) => {
        set({ agreedToTerms: agreed });
        get().updateNextButtonDisabled();
      },
      setDirection: (direction) => set({ direction }),

      setIsLoading: (isLoading: boolean) => set({ isLoading }),

      handleButtonClick: (newDirection: 'next' | 'prev') => {
        const { step, setStep } = get();
        set({ direction: newDirection === 'next' ? 'forward' : 'backward' });
        if (newDirection === 'next') {
          if (step < 5) {
            setStep(step + 1);
            set({ isLoading: true }); // Set loading state when moving to next step
          }
        } else {
          if (step > 1) {
            setStep(step - 1);
          }
        }
      },

      updateNextButtonDisabled: () => {
        const { step, selectedClubId, selectedZoneId, selectedComputerId, selectedGizmoAccountId, agreedToTerms } = get();
        let disabled = true;

        switch (step) {
          case 1:
            disabled = !selectedClubId;
            break;
          case 2:
            disabled = !selectedZoneId;
            break;
          case 3:
            disabled = !selectedComputerId;
            break;
          case 4:
            disabled = !selectedGizmoAccountId;
            break;
          case 5:
            disabled = !agreedToTerms;
            break;
          default:
            disabled = true;
        }
        set({ isNextButtonDisabled: disabled });
      },

      resetBooking: () => set({
        step: 1,
        selectedClubId: null,
        selectedZoneId: null,
        selectedComputerId: null,
        selectedGizmoAccountId: null,
        agreedToTerms: false,
        isNextButtonDisabled: true,
        bookingStatus: 'idle',
      }),

      loadQueryParams: (params: URLSearchParams) => {
        const clubId = params.get('clubId');
        const zoneId = params.get('zoneId');
        const pcId = params.get('pcId');
        const accountId = params.get('accountId');

        if (clubId) get().setSelectedClubId(clubId);
        if (zoneId) get().setSelectedZoneId(zoneId);
        if (pcId) get().setSelectedComputerId(Number(pcId));
        if (accountId) get().setSelectedGizmoAccountId(Number(accountId));

        get().updateNextButtonDisabled();
      },
      setBookingStatus: (status) => set({ bookingStatus: status }),
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        selectedClubId: state.selectedClubId,
        selectedZoneId: state.selectedZoneId,
        selectedComputerId: state.selectedComputerId,
        selectedGizmoAccountId: state.selectedGizmoAccountId,
      }),
    }
  )
);