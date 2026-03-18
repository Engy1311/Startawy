import { create } from "zustand";

interface RecommendationFormData {
  clientName: string;
  category: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  description: string;
}

interface RecommendationState {
  formData: RecommendationFormData;
  showNewForm: boolean;
  isSubmitting: boolean;
  
  setFormField: (field: keyof RecommendationFormData, value: string) => void;
  setShowNewForm: (show: boolean) => void;
  submitRecommendation: () => Promise<void>;
  resetForm: () => void;
}

export const useRecommendationStore = create<RecommendationState>((set, get) => ({
  formData: {
    clientName: "",
    category: "Financial Strategy",
    title: "",
    priority: "Medium",
    description: "",
  },
  showNewForm: false,
  isSubmitting: false,

  setFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value }
    })),

  setShowNewForm: (showNewForm) => set({ showNewForm }),

  submitRecommendation: async () => {
    set({ isSubmitting: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    set({ isSubmitting: false, showNewForm: false });
    // Logic to add to a list could be here if we were managing the list in state
  },

  resetForm: () => set({
    formData: {
      clientName: "",
      category: "Financial Strategy",
      title: "",
      priority: "Medium",
      description: "",
    }
  })
}));
