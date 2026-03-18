import { create } from "zustand";

interface BookingState {
  selectedDate: string;
  selectedTime: string;
  notes: string;
  isSubmitting: boolean;

  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setNotes: (notes: string) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedDate: "",
  selectedTime: "",
  notes: "",
  isSubmitting: false,

  setSelectedDate: (selectedDate) => set({ selectedDate, selectedTime: "" }), // Reset time when date changes
  setSelectedTime: (selectedTime) => set({ selectedTime }),
  setNotes: (notes) => set({ notes }),
  resetBooking: () => set({ selectedDate: "", selectedTime: "", notes: "", isSubmitting: false }),
}));
