import { create } from "zustand";

interface MeetingFormData {
  selectedDate: string;
  selectedTime: string;
  meetingType: "video" | "phone";
  agenda: string;
}

interface MeetingState {
  formData: MeetingFormData;
  showSuccess: boolean;
  
  setFormField: (field: keyof MeetingFormData, value: any) => void;
  setShowSuccess: (show: boolean) => void;
  submitMeeting: () => Promise<void>;
  resetForm: () => void;
}

export const useMeetingStore = create<MeetingState>((set, get) => ({
  formData: {
    selectedDate: "",
    selectedTime: "",
    meetingType: "video",
    agenda: "",
  },
  showSuccess: false,

  setFormField: (field, value) => 
    set((state) => ({
      formData: { ...state.formData, [field]: value }
    })),

  setShowSuccess: (showSuccess) => set({ showSuccess }),

  submitMeeting: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ showSuccess: true });
  },

  resetForm: () => set({
    formData: {
      selectedDate: "",
      selectedTime: "",
      meetingType: "video",
      agenda: "",
    }
  })
}));
