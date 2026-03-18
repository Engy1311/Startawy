import { create } from "zustand";

interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
  setAsDefault: boolean;
}

interface PaymentState {
  paymentType: "card" | "bank";
  formData: PaymentFormData;
  formErrors: Record<string, string>;
  isSaving: boolean;
  showSuccess: boolean;

  setPaymentType: (type: "card" | "bank") => void;
  setFormData: (data: Partial<PaymentFormData>) => void;
  setShowSuccess: (show: boolean) => void;
  validate: () => boolean;
  submitPayment: () => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: PaymentFormData = {
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  bankName: "",
  accountNumber: "",
  routingNumber: "",
  accountHolderName: "",
  setAsDefault: false,
};

export const usePaymentStore = create<PaymentState>((set, get) => ({
  paymentType: "card",
  formData: initialFormData,
  formErrors: {},
  isSaving: false,
  showSuccess: false,

  setPaymentType: (type) => set({ paymentType: type, formErrors: {} }),
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setShowSuccess: (show) => set({ showSuccess: show }),

  validate: () => {
    const { paymentType, formData } = get();
    const errors: Record<string, string> = {};

    if (paymentType === "card") {
      if (!formData.cardholderName.trim()) errors.cardholderName = "Cardholder name is required";
      if (!formData.cardNumber.trim()) errors.cardNumber = "Card number is required";
      if (!formData.expiryDate.trim()) errors.expiryDate = "Expiry date is required";
      if (!formData.cvv.trim()) errors.cvv = "CVV is required";
    } else {
      if (!formData.bankName.trim()) errors.bankName = "Bank name is required";
      if (!formData.accountHolderName.trim()) errors.accountHolderName = "Account holder name is required";
      if (!formData.accountNumber.trim()) errors.accountNumber = "Account number is required";
      if (!formData.routingNumber.trim()) errors.routingNumber = "Routing number is required";
    }

    set({ formErrors: errors });
    return Object.keys(errors).length === 0;
  },

  submitPayment: async () => {
    if (!get().validate()) return false;

    set({ isSaving: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    set({ isSaving: false, showSuccess: true });
    return true;
  },

  resetForm: () => set({ formData: initialFormData, formErrors: {}, paymentType: "card", showSuccess: false }),
}));
