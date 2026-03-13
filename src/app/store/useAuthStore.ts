import { create } from "zustand";


const regex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// --- SIGN UP ---

interface SignUpFormData {
  fullName: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface SignUpState {
  formData: SignUpFormData;
  formErrors: Record<string, string>;
  isSubmit: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  
  // Actions
  setFormData: (data: Partial<SignUpFormData>) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  setIsSubmit: (isSubmit: boolean) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  resetForm: () => void;
  validate: (data?: SignUpFormData) => Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const SignupValues: SignUpFormData = {
  fullName: "",
  role: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

export const useSignUpStore = create<SignUpState>((set, get) => ({
  formData: SignupValues,
  formErrors: {},
  isSubmit: false,
  showPassword: false,
  showConfirmPassword: false,

  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setIsSubmit: (isSubmit) => set({ isSubmit }),
  setShowPassword: (show) => set({ showPassword: show }),
  setShowConfirmPassword: (show) => set({ showConfirmPassword: show }),
  
  resetForm: () => set({ 
    formData: SignupValues, 
    formErrors: {}, 
    isSubmit: false,
    showPassword: false,
    showConfirmPassword: false
  }),

  validate: (dataToValidate) => {
    const data = dataToValidate || get().formData;
    const errors: Record<string, string> = {};

    if (!data.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!data.role) {
      errors.role = "Role is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    }else if (!regex.test(data.email)){
      errors.email = "Invalid email format";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!data.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the Terms & Conditions";
    }

    return errors;
  },

  handleChange: (e) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    const fieldValue = type === "checkbox" ? checked : value;

    set((state) => {
      const updatedFormData = { ...state.formData, [name]: fieldValue };
      const updatedErrors = { ...state.formErrors };

      // Only validate & update the error for the field currently being changed.
      // This prevents errors from appearing on untouched fields while the user types.
      if (state.isSubmit || name === "email") {
        const allErrors = get().validate(updatedFormData);
        if (allErrors[name]) {
          updatedErrors[name] = allErrors[name];
        } else {
          delete updatedErrors[name];
        }
      }

      return {
        formData: updatedFormData,
        formErrors: updatedErrors,
      };
    });
  },
}));


// --- LOGIN ---

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean; 
}

interface LoginState {
  formData: LoginFormData;
  formErrors: Record<string, string>;
  isSubmit: boolean;
  showPassword: boolean;

  setFormData: (data: Partial<LoginFormData>) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  setIsSubmit: (isSubmit: boolean) => void;
  setShowPassword: (show: boolean) => void;
  resetForm: () => void;
  validate: (data?: LoginFormData) => Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const LoginValues: LoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

export const useLoginStore = create<LoginState>((set, get) => ({
  formData: LoginValues,
  formErrors: {},
  isSubmit: false,
  showPassword: false,

  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setIsSubmit: (isSubmit) => set({ isSubmit }),
  setShowPassword: (show) => set({ showPassword: show }),
  
  resetForm: () => set({ 
    formData: LoginValues, 
    formErrors: {}, 
    isSubmit: false,
    showPassword: false,
  }),

  validate: (dataToValidate) => {
    const data = dataToValidate || get().formData;
    const errors: Record<string, string> = {};

    if (!data.email) {
      errors.email = "Email is required";
    }else if (!regex.test(data.email)){
      errors.email = "Invalid email format";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    return errors;
  },

  handleChange: (e) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    const fieldValue = type === "checkbox" ? checked : value;

    set((state) => {
      const updatedFormData = { ...state.formData, [name]: fieldValue };
      const updatedErrors = { ...state.formErrors };

      // Only validate & update the error for the field currently being changed.
      // This prevents errors from appearing on untouched fields while the user types.
      if (state.isSubmit || name === "email") {
        const allErrors = get().validate(updatedFormData);
        if (allErrors[name]) {
          updatedErrors[name] = allErrors[name];
        } else {
          delete updatedErrors[name];
        }
      }

      return {
        formData: updatedFormData,
        formErrors: updatedErrors,
      };
    });
  },
}));







