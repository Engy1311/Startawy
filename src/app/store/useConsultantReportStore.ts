import { create } from "zustand";

interface ReportFormData {
  reportType: string;
  dateRange: string;
  includeFinancials: boolean;
  includeProgress: boolean;
  includeRecommendations: boolean;
  customNotes: string;
}

interface ConsultantReportState {
  reportForm: ReportFormData;
  generating: boolean;
  showSuccess: boolean;

  setReportField: (field: keyof ReportFormData, value: any) => void;
  setShowSuccess: (show: boolean) => void;
  generateReport: () => Promise<void>;
  resetForm: () => void;
}

const initialFormState: ReportFormData = {
  reportType: "comprehensive",
  dateRange: "last-month",
  includeFinancials: true,
  includeProgress: true,
  includeRecommendations: true,
  customNotes: "",
};

export const useConsultantReportStore = create<ConsultantReportState>((set, get) => ({
  reportForm: initialFormState,
  generating: false,
  showSuccess: false,

  setReportField: (field, value) =>
    set((state) => ({
      reportForm: { ...state.reportForm, [field]: value },
    })),

  setShowSuccess: (showSuccess) => set({ showSuccess }),

  generateReport: async () => {
    set({ generating: true });
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({ generating: false, showSuccess: true });
  },

  resetForm: () => set({ reportForm: initialFormState, showSuccess: false, generating: false }),
}));
