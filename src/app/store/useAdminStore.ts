import { create } from "zustand";
import { useConsultantStore } from "./useConsultantStore";

interface ConsultantFormData {
  fullName: string;
  email: string;
  phone: string;
  specialty: string;
  major: string;
  yearsOfExperience: string;
  education: string;
  certifications: string;
  hourlyRate: string;
  bio: string;
  linkedIn: string;
  availability: string[];
}

interface AdminState {
  consultantForm: ConsultantFormData;
  formErrors: Record<string, string>;
  isSubmit: boolean;
  showSuccess: boolean;
  isSubmitting: boolean;

  setConsultantField: (field: keyof ConsultantFormData, value: any) => void;
  toggleAvailability: (day: string) => void;
  setShowSuccess: (show: boolean) => void;
  validate: (data?: ConsultantFormData) => Record<string, string>;
  submitConsultant: () => Promise<boolean>;
  resetForm: () => void;
}

const initialFormState: ConsultantFormData = {
  fullName: "",
  email: "",
  phone: "",
  specialty: "",
  major: "",
  yearsOfExperience: "",
  education: "",
  certifications: "",
  hourlyRate: "",
  bio: "",
  linkedIn: "",
  availability: [],
};

export const useAdminStore = create<AdminState>((set, get) => ({
  consultantForm: initialFormState,
  formErrors: {},
  isSubmit: false,
  showSuccess: false,
  isSubmitting: false,

  setConsultantField: (field, value) => 
    set((state) => {
      const updatedForm = { ...state.consultantForm, [field]: value };
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
        if (allErrors[field].toLowerCase().includes("required") && !updatedForm[field as keyof ConsultantFormData] && !state.isSubmit && !state.formErrors[field]) {
          delete updatedErrors[field];
        } else {
          updatedErrors[field] = allErrors[field];
        }
      } else {
        delete updatedErrors[field];
      }

      return {
        consultantForm: updatedForm,
        formErrors: updatedErrors,
      };
    }),

  toggleAvailability: (day) =>
    set((state) => {
      const updatedAvailability = state.consultantForm.availability.includes(day)
        ? state.consultantForm.availability.filter((d) => d !== day)
        : [...state.consultantForm.availability, day];
      
      const updatedForm = { ...state.consultantForm, availability: updatedAvailability };
      const updatedErrors = { ...state.formErrors };

      if (state.isSubmit || updatedAvailability.length > 0) {
        const allErrors = get().validate(updatedForm);
        if (allErrors.availability) {
          updatedErrors.availability = allErrors.availability;
        } else {
          delete updatedErrors.availability;
        }
      }

      return {
        consultantForm: updatedForm,
        formErrors: updatedErrors,
      };
    }),

  setShowSuccess: (showSuccess) => set({ showSuccess }),

  validate: (dataToValidate) => {
    const data = dataToValidate || get().consultantForm;
    const errors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.fullName.trim()) errors.fullName = "Full Name is required";
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(data.email)) errors.email = "Invalid email format";
    if (!data.phone.trim()) errors.phone = "Phone is required";
    if (!data.specialty.trim()) errors.specialty = "Specialty is required";
    if (!data.major.trim()) errors.major = "Major is required";
    if (!data.yearsOfExperience) errors.yearsOfExperience = "Experience is required";
    if (!data.education.trim()) errors.education = "Education is required";
    if (!data.hourlyRate) errors.hourlyRate = "Hourly Rate is required";
    if (!data.bio.trim()) errors.bio = "Bio is required";
    if (data.availability.length === 0) errors.availability = "At least one available day is required";

    return errors;
  },

  submitConsultant: async () => {
    set({ isSubmit: true });
    const errors = get().validate();
    
    if (Object.keys(errors).length > 0) {
      set({ formErrors: errors });
      return false;
    }

    set({ isSubmitting: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const { consultantForm } = get();
    useConsultantStore.getState().addConsultant({
      name: consultantForm.fullName,
      email: consultantForm.email,
      specialty: consultantForm.specialty,
      rating: 5.0, // Default for new consultant
      totalSessions: 0,
      totalEarnings: "$0",
      status: "active",
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      availability: consultantForm.availability.length ? "Available" : "Unavailable",
      clients: 0,
    });
    set({ isSubmitting: false, showSuccess: true });
    return true;
  },

  resetForm: () => set({ consultantForm: initialFormState, showSuccess: false, isSubmitting: false, isSubmit: false, formErrors: {} }),
}));
