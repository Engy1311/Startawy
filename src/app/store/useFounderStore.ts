import { create } from "zustand";

export interface Founder {
  id: number;
  name: string;
  email: string;
  company: string;
  plan: string;
  status: string;
  joinedDate: string;
  sessions: number;
  revenue: string;
}

interface FounderState {
  founders: Founder[];
  selectedFounder: Founder | null;
  showViewModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  showSuccessModal: boolean;
  successMessage: string;
  formData: Partial<Founder>;
  formErrors: Record<string, string>;
  isSubmit: boolean;

  setFounders: (founders: Founder[]) => void;
  openViewModal: (founder: Founder) => void;
  openEditModal: (founder: Founder) => void;
  openDeleteModal: (founder: Founder) => void;
  closeModals: () => void;
  closeSuccessModal: () => void;
  setFormField: (field: keyof Founder, value: string) => void;
  
  validate: (data?: Partial<Founder>) => Record<string, string>;
  toggleStatus: (id: number) => void;
  deleteFounder: () => void;
  saveFounder: () => void;
}

const initialFounders: Founder[] = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@techstart.com", company: "TechStart Inc.", plan: "Premium", status: "Active", joinedDate: "Jan 15, 2026", sessions: 12, revenue: "$299" },
  { id: 2, name: "Omar Ali", email: "omar@healthtech.com", company: "HealthTech Solutions", plan: "Basic", status: "Active", joinedDate: "Dec 10, 2025", sessions: 8, revenue: "$99" },
  { id: 3, name: "Layla Ahmed", email: "layla@fashion.com", company: "Fashion Hub", plan: "Free Trial", status: "Active", joinedDate: "Feb 20, 2026", sessions: 2, revenue: "$0" },
  { id: 4, name: "Khaled Ibrahim", email: "khaled@fooddelivery.com", company: "Food Delivery Co.", plan: "Basic", status: "Inactive", joinedDate: "Nov 5, 2025", sessions: 5, revenue: "$99" },
  { id: 5, name: "Mona Salem", email: "mona@edutech.com", company: "EduTech Platform", plan: "Premium", status: "Active", joinedDate: "Jan 1, 2026", sessions: 15, revenue: "$299" },
];

export const useFounderStore = create<FounderState>((set, get) => ({
  founders: initialFounders,
  selectedFounder: null,
  showViewModal: false,
  showEditModal: false,
  showDeleteModal: false,
  showSuccessModal: false,
  successMessage: "",
  formData: {},
  formErrors: {},
  isSubmit: false,

  setFounders: (founders) => set({ founders }),

  openViewModal: (founder) => set({ selectedFounder: founder, showViewModal: true }),
  
  openEditModal: (founder) => set({ 
    selectedFounder: founder, 
    formData: { ...founder }, 
    showEditModal: true 
  }),
  
  openDeleteModal: (founder) => set({ selectedFounder: founder, showDeleteModal: true }),

  closeModals: () => set({ 
    showViewModal: false, 
    showEditModal: false, 
    showDeleteModal: false, 
    selectedFounder: null, 
    formData: {},
    formErrors: {},
    isSubmit: false
  }),

  closeSuccessModal: () => set({ showSuccessModal: false, successMessage: "" }),

  validate: (dataToValidate) => {
    const data = dataToValidate || get().formData;
    const errors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.name || !data.name.trim()) errors.name = "Name is required";
    if (!data.company || !data.company.trim()) errors.company = "Company is required";
    if (!data.email || !data.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(data.email)) errors.email = "Invalid email format";
    if (!data.plan) errors.plan = "Plan is required";
    if (!data.status) errors.status = "Status is required";

    return errors;
  },

  setFormField: (field, value) => set((state) => {
    const updatedForm = { ...state.formData, [field]: value };
    const updatedErrors = { ...state.formErrors };

    if (state.isSubmit) {
      const allErrors = get().validate(updatedForm);
      if (allErrors[field]) {
        updatedErrors[field] = allErrors[field];
      } else {
        delete updatedErrors[field];
      }
    }

    // Live validation before submit
    const allErrors = get().validate(updatedForm);
    if (allErrors[field]) {
      if (allErrors[field].toLowerCase().includes("required") && !value && !state.isSubmit && !state.formErrors[field]) {
        delete updatedErrors[field];
      } else {
        updatedErrors[field] = allErrors[field];
      }
    } else {
      delete updatedErrors[field];
    }

    return {
      formData: updatedForm,
      formErrors: updatedErrors
    };
  }),

  toggleStatus: (id) => set((state) => {
    const updatedFounders = state.founders.map(f => 
      f.id === id ? { ...f, status: f.status === "Active" ? "Inactive" : "Active" } : f
    );
    const founder = state.founders.find(f => f.id === id);
    const newStatus = founder?.status === "Active" ? "Inactive" : "Active";
    return { 
      founders: updatedFounders,
      showSuccessModal: true,
      successMessage: `Founder status marked as ${newStatus}.`
    };
  }),

  deleteFounder: () => set((state) => {
    if (!state.selectedFounder) return state;
    const updatedFounders = state.founders.filter(f => f.id !== state.selectedFounder!.id);
    return {
      founders: updatedFounders,
      showDeleteModal: false,
      selectedFounder: null,
      showSuccessModal: true,
      successMessage: "Founder deleted successfully."
    };
  }),

  saveFounder: () => set((state) => {
    state.isSubmit = true;
    const errors = get().validate();
    if (Object.keys(errors).length > 0) {
      return { formErrors: errors, isSubmit: true };
    }

    if (!state.selectedFounder) return state;
    const updatedFounders = state.founders.map(f =>
      f.id === state.selectedFounder!.id ? { ...f, ...state.formData } as Founder : f
    );
    return {
      founders: updatedFounders,
      showEditModal: false,
      selectedFounder: null,
      formData: {},
      formErrors: {},
      isSubmit: false,
      showSuccessModal: true,
      successMessage: "Founder updated successfully."
    };
  }),
}));
