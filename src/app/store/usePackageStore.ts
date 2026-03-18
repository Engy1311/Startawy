import { create } from "zustand";

interface Package {
  id: number;
  name: string;
  price: string;
  period: string;
  features: string[];
  status: string;
  users: number;
  bgGradient: string;
}

interface PackageFormData {
  name: string;
  price: string;
  period: string;
  colorTheme: string;
  features: string;
}

interface PackageState {
  packages: Package[];
  formData: PackageFormData;
  formErrors: Record<string, string>;
  isSubmit: boolean;
  showEditModal: boolean;
  showAddModal: boolean;
  showSuccessModal: boolean;
  successMessage: string;
  selectedPackage: Package | null;
  saving: boolean;

  // Actions
  setFormField: (field: keyof PackageFormData, value: string) => void;
  validate: (data?: PackageFormData) => Record<string, string>;
  setShowEditModal: (show: boolean, pkg?: Package) => void;
  setShowAddModal: (show: boolean) => void;
  setShowSuccessModal: (show: boolean) => void;
  savePackage: (isEdit: boolean) => Promise<boolean>;
  deletePackage: (id: number) => void;
}

const initialPackages: Package[] = [
  {
    id: 1,
    name: "Free Trial",
    price: "$0",
    period: "/forever",
    users: 145,
    status: "Active",
    features: [
      "Limited access to reports",
      "Basic AI chatbot access",
      "Limited consultations",
    ],
    bgGradient: "from-gray-500 to-gray-600",
  },
  {
    id: 2,
    name: "Basic",
    price: "$99",
    period: "/month",
    users: 428,
    status: "Active",
    features: [
      "Full access to market reports",
      "Budget analysis tools",
      "AI advisory chatbot",
      "Request marketing research template",
      "Email support",
    ],
    bgGradient: "from-teal-500 to-teal-600",
  },
  {
    id: 3,
    name: "Premium",
    price: "$299",
    period: "/month",
    users: 319,
    status: "Active",
    features: [
      "All Basic features",
      "Private consultant sessions",
      "Financial performance dashboard",
      "One-year follow-up support",
      "Dedicated account manager",
      "24/7 priority support",
    ],
    bgGradient: "from-amber-500 to-amber-600",
  },
];

export const usePackageStore = create<PackageState>((set, get) => ({
  packages: initialPackages,
  formData: {
    name: "",
    price: "",
    period: "/month",
    colorTheme: "from-teal-500 to-teal-600",
    features: "",
  },
  formErrors: {},
  isSubmit: false,
  showEditModal: false,
  showAddModal: false,
  showSuccessModal: false,
  successMessage: "",
  selectedPackage: null,
  saving: false,

  validate: (dataToValidate) => {
    const data = dataToValidate || get().formData;
    const errors: Record<string, string> = {};

    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.price.trim()) errors.price = "Price is required";
    else if (isNaN(Number(data.price.replace('$', '')))) errors.price = "Price must be a valid number";
    if (!data.period.trim()) errors.period = "Period is required";
    if (!data.features.trim()) errors.features = "At least one feature is required";

    return errors;
  },

  setFormField: (field, value) => {
    set((state) => {
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
        formErrors: updatedErrors,
      };
    });
  },

  setShowEditModal: (showEditModal, pkg = null) => {
    if (showEditModal && pkg) {
      set({
        showEditModal,
        selectedPackage: pkg,
        formData: {
          name: pkg.name,
          price: pkg.price,
          period: pkg.period,
          colorTheme: pkg.bgGradient || "from-teal-500 to-teal-600",
          features: pkg.features.join("\n"),
        },
        formErrors: {},
        isSubmit: false,
      });
    } else {
      set({ showEditModal: false, selectedPackage: null });
    }
  },

  setShowAddModal: (showAddModal) => {
    if (showAddModal) {
      set({
        showAddModal,
        formData: {
          name: "",
          price: "",
          period: "/month",
          colorTheme: "from-teal-500 to-teal-600",
          features: "",
        },
        formErrors: {},
        isSubmit: false,
      });
    } else {
      set({ showAddModal: false });
    }
  },

  setShowSuccessModal: (showSuccessModal) => set({ showSuccessModal }),

  savePackage: async (isEdit: boolean) => {
    set({ isSubmit: true });
    const errors = get().validate();
    if (Object.keys(errors).length > 0) {
      set({ formErrors: errors });
      return false;
    }

    set({ saving: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const { formData, selectedPackage, packages } = get();
    const newPackageData = {
      name: formData.name,
      price: formData.price.startsWith("$") ? formData.price : "$" + formData.price,
      period: formData.period,
      bgGradient: formData.colorTheme,
      features: formData.features.split("\n").filter(f => f.trim() !== ""),
    };

    if (isEdit && selectedPackage) {
      const updatedPackages = packages.map(p => 
        p.id === selectedPackage.id ? { ...p, ...newPackageData } : p
      );
      set({ packages: updatedPackages });
    } else {
      const newPackage = {
        id: Math.max(0, ...packages.map(p => p.id)) + 1,
        ...newPackageData,
        status: "Active",
        users: 0,
      };
      set({ packages: [...packages, newPackage] });
    }

    set({
      saving: false,
      showEditModal: false,
      showAddModal: false,
      showSuccessModal: true,
      successMessage: isEdit ? "Package updated successfully" : "Package added successfully",
      formErrors: {},
      isSubmit: false,
    });
    return true;
  },

  deletePackage: (id: number) => {
    set((state) => ({
      packages: state.packages.filter((p) => p.id !== id),
      showSuccessModal: true,
      successMessage: "Package deleted successfully."
    }));
  },
}));
