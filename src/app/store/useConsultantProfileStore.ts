import { create } from "zustand";

interface ConsultantProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  position: string;
  bio: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ConsultantProfileState {
  formData: ConsultantProfileFormData;
  passwordData: PasswordFormData;
  formErrors: Record<string, string>;
  passwordErrors: Record<string, string>;
  isSaving: boolean;
  showSuccess: boolean;
  successMessage: string;
  isProfileSubmit: boolean;
  showPasswordModal: boolean;
  showDeleteModal: boolean;

  setFormData: (data: Partial<ConsultantProfileFormData>) => void;
  setPasswordData: (data: Partial<PasswordFormData>) => void;
  setShowPasswordModal: (show: boolean) => void;
  setShowDeleteModal: (show: boolean) => void;
  setShowSuccess: (show: boolean) => void;
  setSuccessMessage: (msg: string) => void;
  
  validateProfile: (dataToValidate?: ConsultantProfileFormData) => Record<string, string>;
  validatePassword: () => boolean;
  submitProfile: () => Promise<boolean>;
  submitPassword: () => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  resetPasswordForm: () => void;
}

export const useConsultantProfileStore = create<ConsultantProfileState>((set, get) => ({
  formData: {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    company: "Financial Advisors Inc.",
    position: "Senior Financial Consultant",
    bio: "Experienced financial consultant with 10+ years in fintech industry.",
  },
  passwordData: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  formErrors: {},
  passwordErrors: {},
  isSaving: false,
  isProfileSubmit: false,
  showSuccess: false,
  successMessage: "",
  showPasswordModal: false,
  showDeleteModal: false,

  validateProfile: (dataToValidate?: ConsultantProfileFormData) => {
    const data = dataToValidate || get().formData;
    const errors: Record<string, string> = {};
    if (!data.fullName?.trim()) errors.fullName = "Full name is required";
    if (!data.email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email format";
    
    return errors;
  },

  setFormData: (data) => set((state) => {
    const updatedForm = { ...state.formData, ...data };
    const updatedErrors = { ...state.formErrors };

    if (state.isProfileSubmit) {
      const allErrors = get().validateProfile(updatedForm);
      Object.keys(data).forEach((key) => {
        if (allErrors[key]) updatedErrors[key] = allErrors[key];
        else delete updatedErrors[key];
      });
    }

    // Live validation
    const allErrors = get().validateProfile(updatedForm);
    Object.keys(data).forEach((field) => {
      if (allErrors[field]) {
        if (allErrors[field].toLowerCase().includes("required") && !updatedForm[field as keyof ConsultantProfileFormData] && !state.isProfileSubmit && !state.formErrors[field]) {
          delete updatedErrors[field];
        } else {
          updatedErrors[field] = allErrors[field];
        }
      } else {
        delete updatedErrors[field];
      }
    });

    return { formData: updatedForm, formErrors: updatedErrors };
  }),
  setPasswordData: (data) => set((state) => {
    const updatedPasswordData = { ...state.passwordData, ...data };
    const errors = { ...state.passwordErrors };

    if ("newPassword" in data || "confirmPassword" in data) {
      if (updatedPasswordData.newPassword && updatedPasswordData.newPassword.length < 6) {
        errors.newPassword = "Password must be at least 6 characters";
      } else {
        delete errors.newPassword;
      }
      
      if (updatedPasswordData.confirmPassword && updatedPasswordData.newPassword !== updatedPasswordData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      } else {
        delete errors.confirmPassword;
      }
    }

    return { passwordData: updatedPasswordData, passwordErrors: errors };
  }),
  setShowPasswordModal: (show) => set({ showPasswordModal: show }),
  setShowDeleteModal: (show) => set({ showDeleteModal: show }),
  setShowSuccess: (show) => set({ showSuccess: show }),
  setSuccessMessage: (msg) => set({ successMessage: msg }),



  validatePassword: () => {
    const { passwordData } = get();
    const errors: Record<string, string> = {};
    if (!passwordData.currentPassword) errors.currentPassword = "Current password is required";
    if (!passwordData.newPassword) errors.newPassword = "New password is required";
    else if (passwordData.newPassword.length < 6) errors.newPassword = "Password must be at least 6 characters";
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    set({ passwordErrors: errors });
    return Object.keys(errors).length === 0;
  },

  submitProfile: async () => {
    set({ isProfileSubmit: true });
    const errors = get().validateProfile();
    if (Object.keys(errors).length > 0) {
      set({ formErrors: errors });
      return false;
    }
    
    set({ isSaving: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    set({ 
      isSaving: false, 
      showSuccess: true, 
      successMessage: "Your changes have been saved",
      isProfileSubmit: false
    });
    return true;
  },

  submitPassword: async () => {
    if (!get().validatePassword()) return false;
    
    set({ isSaving: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    set({ 
      isSaving: false, 
      showPasswordModal: false, 
      showSuccess: true, 
      successMessage: "Password updated successfully",
      passwordData: { currentPassword: "", newPassword: "", confirmPassword: "" },
      passwordErrors: {}
    });
    return true;
  },

  deleteAccount: async () => {
    set({ isSaving: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ isSaving: false, showDeleteModal: false });
    return true;
  },

  resetPasswordForm: () => set({ 
    passwordData: { currentPassword: "", newPassword: "", confirmPassword: "" }, 
    passwordErrors: {} 
  }),
}));
