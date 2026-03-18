import { create } from 'zustand';

interface FollowUpFormData {
  client: string;
  planTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  frequency: string;
}

interface FollowUpStore {
  formData: FollowUpFormData;
  showNewPlanModal: boolean;
  showSuccessModal: boolean;
  saving: boolean;
  
  // Actions
  setFormField: (field: keyof FollowUpFormData, value: string) => void;
  setShowNewPlanModal: (show: boolean) => void;
  setShowSuccessModal: (show: boolean) => void;
  createPlan: () => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FollowUpFormData = {
  client: "",
  planTitle: "",
  description: "",
  startDate: "",
  endDate: "",
  frequency: "Monthly",
};

export const useFollowUpStore = create<FollowUpStore>((set, get) => ({
  formData: initialFormData,
  showNewPlanModal: false,
  showSuccessModal: false,
  saving: false,

  setFormField: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
  })),

  setShowNewPlanModal: (show) => set({ showNewPlanModal: show }),
  
  setShowSuccessModal: (show) => set({ showSuccessModal: show }),

  createPlan: async () => {
    set({ saving: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ 
      saving: false, 
      showNewPlanModal: false, 
      showSuccessModal: true,
      formData: initialFormData 
    });
  },

  resetForm: () => set({ formData: initialFormData }),
}));
