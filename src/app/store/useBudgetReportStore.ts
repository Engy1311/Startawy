import { create } from "zustand";

interface BudgetReportFormData {
  businessName: string;
  industry: string;
  businessStage: string;
  location: string;
  productPrice: string;
  monthlySales: string;
  expectedRevenue: string;
  rent: string;
  salaries: string;
  softwareSubscriptions: string;
  utilities: string;
  otherFixedCosts: string;
  costPerProduct: string;
  rawMaterials: string;
  shippingCosts: string;
  packagingCosts: string;
  monthlyMarketingBudget: string;
  advertisingSpending: string;
  initialInvestment: string;
  availableMonthlyBudget: string;
  loans: string;
}

interface BudgetReportState {
  step: number;
  formData: BudgetReportFormData;
  reportGenerated: boolean;
  isGenerating: boolean;

  setStep: (step: number) => void;
  setFormData: (data: Partial<BudgetReportFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  generateReport: () => Promise<void>;
  resetForm: () => void;
}

const initialFormData: BudgetReportFormData = {
  businessName: "",
  industry: "",
  businessStage: "",
  location: "",
  productPrice: "",
  monthlySales: "",
  expectedRevenue: "",
  rent: "",
  salaries: "",
  softwareSubscriptions: "",
  utilities: "",
  otherFixedCosts: "",
  costPerProduct: "",
  rawMaterials: "",
  shippingCosts: "",
  packagingCosts: "",
  monthlyMarketingBudget: "",
  advertisingSpending: "",
  initialInvestment: "",
  availableMonthlyBudget: "",
  loans: "",
};

export const useBudgetReportStore = create<BudgetReportState>((set, get) => ({
  step: 1,
  formData: initialFormData,
  reportGenerated: false,
  isGenerating: false,

  setStep: (step) => set({ step }),
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  
  nextStep: () => {
    const { step } = get();
    if (step < 6) set({ step: step + 1 });
  },

  prevStep: () => {
    const { step } = get();
    if (step > 1) set({ step: step - 1 });
  },

  generateReport: async () => {
    set({ isGenerating: true });
    // Simulate complex AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    set({ reportGenerated: true, isGenerating: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  resetForm: () => set({ step: 1, formData: initialFormData, reportGenerated: false, isGenerating: false }),
}));
