import { create } from "zustand";
import axios from "axios";

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
  isLoading: boolean;
  apiError: string | null;
  showPassword: boolean;
  showConfirmPassword: boolean;

  setFormData: (data: Partial<SignUpFormData>) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  setIsSubmit: (isSubmit: boolean) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  resetForm: () => void;
  validate: (data?: SignUpFormData) => Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitSignUp: () => Promise<boolean>;
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
  isLoading: false,
  apiError: null,
  showPassword: false,
  showConfirmPassword: false,

  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setIsSubmit: (isSubmit) => set({ isSubmit }),
  setShowPassword: (show) => set({ showPassword: show }),
  setShowConfirmPassword: (show) => set({ showConfirmPassword: show }),

  resetForm: () =>
    set({
      formData: SignupValues,
      formErrors: {},
      isSubmit: false,
      isLoading: false,
      apiError: null,
      showPassword: false,
      showConfirmPassword: false,
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
    } else if (!regex.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // FIX #1: Separate empty check from mismatch check
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.password !== data.confirmPassword) {
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

      // FIX #2: After submit, re-validate the changed field.
      // For password/confirmPassword, always cross-validate both together
      // so that fixing one immediately clears the error on the other.
      if (state.isSubmit) {
        const allErrors = get().validate(updatedFormData);

        const fieldsToCheck =
          name === "password" || name === "confirmPassword"
            ? [name, "password", "confirmPassword"] // cross-check both password fields
            : [name];

        fieldsToCheck.forEach((field) => {
          if (allErrors[field]) {
            updatedErrors[field] = allErrors[field];
          } else {
            delete updatedErrors[field];
          }
        });
      }

      // Live validation even before submit
      if (["email", "password", "confirmPassword"].includes(name)) {
        const allErrors = get().validate(updatedFormData);
        const fieldsToUpdate = name === "email" ? ["email"] : ["password", "confirmPassword"];
        
        fieldsToUpdate.forEach(field => {
          if (allErrors[field]) {
            // Don't show empty "required" errors before the user submits, unless they typed and deleted
            if (allErrors[field].toLowerCase().includes("required") && !updatedFormData[field as keyof SignUpFormData] && !state.isSubmit && !state.formErrors[field]) {
              delete updatedErrors[field];
            } else {
              updatedErrors[field] = allErrors[field];
            }
          } else {
            delete updatedErrors[field];
          }
        });
      }

      return {
        formData: updatedFormData,
        formErrors: updatedErrors,
        apiError: null,
      };
    });
  },

  submitSignUp: async () => {
    const { formData, validate, setFormErrors, setIsSubmit } = get();
    setIsSubmit(true);
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    set({ isLoading: true, apiError: null });

    // --- MOCK API CALL ---
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      /*
      const response = await axios.post("https://startawy8.tryasp.net/api/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });

      // Store token if returned on register
      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      */

      // Mock success for now
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      console.error("Register error:", error);

      let errorMessage = "An error occurred during registration.";
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === "string") {
          errorMessage = data;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.errors && typeof data.errors === "object") {
          const firstErrorKey = Object.keys(data.errors)[0];
          if (firstErrorKey && Array.isArray(data.errors[firstErrorKey])) {
            errorMessage = data.errors[firstErrorKey][0];
          } else if (Array.isArray(data.errors) && data.errors.length > 0) {
            errorMessage = data.errors[0];
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      set({
        isLoading: false,
        apiError: errorMessage,
      });
      return false;
    }
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
  isLoading: boolean;
  apiError: string | null;
  showPassword: boolean;

  setFormData: (data: Partial<LoginFormData>) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  setIsSubmit: (isSubmit: boolean) => void;
  setShowPassword: (show: boolean) => void;
  resetForm: () => void;
  validate: (data?: LoginFormData) => Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitLogin: () => Promise<boolean>;
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
  isLoading: false,
  apiError: null,
  showPassword: false,

  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setIsSubmit: (isSubmit) => set({ isSubmit }),
  setShowPassword: (show) => set({ showPassword: show }),

  resetForm: () =>
    set({
      formData: LoginValues,
      formErrors: {},
      isSubmit: false,
      isLoading: false,
      apiError: null,
      showPassword: false,
    }),

  validate: (dataToValidate) => {
    const data = dataToValidate || get().formData;
    const errors: Record<string, string> = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!regex.test(data.email)) {
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

      // Same fix applied to login: validate on change only after first submit attempt
      if (state.isSubmit) {
        const allErrors = get().validate(updatedFormData);
        if (allErrors[name]) {
          updatedErrors[name] = allErrors[name];
        } else {
          delete updatedErrors[name];
        }
      }

      // Live validation even before submit
      if (name === "email" || name === "password") {
        const allErrors = get().validate(updatedFormData);
        if (allErrors[name]) {
          if (allErrors[name].toLowerCase().includes("required") && !updatedFormData[name as keyof LoginFormData] && !state.isSubmit && !state.formErrors[name]) {
            delete updatedErrors[name];
          } else {
            updatedErrors[name] = allErrors[name];
          }
        } else {
          delete updatedErrors[name];
        }
      }

      return {
        formData: updatedFormData,
        formErrors: updatedErrors,
        apiError: null,
      };
    });
  },

  submitLogin: async () => {
    const { formData, validate, setFormErrors, setIsSubmit } = get();
    setIsSubmit(true);
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    set({ isLoading: true, apiError: null });

    // --- MOCK API CALL ---
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      /*
      const response = await axios.post("https://startawy8.tryasp.net/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      */

      // Mock success for now
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      console.error("Login error:", error);

      let errorMessage = "Invalid email or password.";
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === "string") {
          errorMessage = data;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.errors && typeof data.errors === "object") {
          const firstErrorKey = Object.keys(data.errors)[0];
          if (firstErrorKey && Array.isArray(data.errors[firstErrorKey])) {
            errorMessage = data.errors[firstErrorKey][0];
          } else if (Array.isArray(data.errors) && data.errors.length > 0) {
            errorMessage = data.errors[0];
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      set({
        isLoading: false,
        apiError: errorMessage,
      });
      return false;
    }
  },
}));