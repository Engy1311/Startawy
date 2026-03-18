import { create } from "zustand";

interface MessagingState {
  subject: string;
  message: string;
  priority: "normal" | "high" | "urgent";
  showSuccess: boolean;
  isSubmitting: boolean;

  setSubject: (subject: string) => void;
  setMessage: (message: string) => void;
  setPriority: (priority: "normal" | "high" | "urgent") => void;
  setShowSuccess: (show: boolean) => void;
  submitMessage: () => Promise<void>;
  resetMessage: () => void;
}

export const useMessagingStore = create<MessagingState>((set, get) => ({
  subject: "",
  message: "",
  priority: "normal",
  showSuccess: false,
  isSubmitting: false,

  setSubject: (subject) => set({ subject }),
  setMessage: (message) => set({ message }),
  setPriority: (priority) => set({ priority }),
  setShowSuccess: (showSuccess) => set({ showSuccess }),
  submitMessage: async () => {
    set({ isSubmitting: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    set({ isSubmitting: false, showSuccess: true });
  },
  resetMessage: () =>
    set({
      subject: "",
      message: "",
      priority: "normal",
      showSuccess: false,
      isSubmitting: false,
    }),
}));
