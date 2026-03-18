import { create } from "zustand";

interface FeedbackState {
  rating: number;
  hoveredRating: number;
  comment: string;
  isSubmitting: boolean;
  showSuccess: boolean;

  setRating: (rating: number) => void;
  setHoveredRating: (rating: number) => void;
  setComment: (comment: string) => void;
  setShowSuccess: (show: boolean) => void;
  submitFeedback: () => Promise<boolean>;
  resetForm: () => void;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  rating: 0,
  hoveredRating: 0,
  comment: "",
  isSubmitting: false,
  showSuccess: false,

  setRating: (rating) => set({ rating }),
  setHoveredRating: (hoveredRating) => set({ hoveredRating }),
  setComment: (comment) => set({ comment }),
  setShowSuccess: (show) => set({ showSuccess: show }),

  submitFeedback: async () => {
    const { rating, comment } = get();
    if (rating === 0 || !comment.trim()) return false;

    set({ isSubmitting: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log({ rating, comment });
    set({ isSubmitting: false, showSuccess: true, rating: 0, comment: "" });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      set({ showSuccess: false });
    }, 3000);

    return true;
  },

  resetForm: () => set({ rating: 0, hoveredRating: 0, comment: "", showSuccess: false }),
}));
