import { create } from "zustand";

interface ReviewState {
  rating: number;
  hoveredRating: number;
  reviewText: string;
  selectedCategories: string[];
  showSuccess: boolean;
  isSubmitting: boolean;

  setRating: (rating: number) => void;
  setHoveredRating: (rating: number) => void;
  setReviewText: (text: string) => void;
  toggleCategory: (category: string) => void;
  setShowSuccess: (show: boolean) => void;
  submitReview: () => Promise<void>;
  resetReview: () => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  rating: 0,
  hoveredRating: 0,
  reviewText: "",
  selectedCategories: [],
  showSuccess: false,
  isSubmitting: false,

  setRating: (rating) => set({ rating }),
  setHoveredRating: (hoveredRating) => set({ hoveredRating }),
  setReviewText: (reviewText) => set({ reviewText }),
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),
  setShowSuccess: (showSuccess) => set({ showSuccess }),
  submitReview: async () => {
    set({ isSubmitting: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ isSubmitting: false, showSuccess: true });
  },
  resetReview: () =>
    set({
      rating: 0,
      hoveredRating: 0,
      reviewText: "",
      selectedCategories: [],
      showSuccess: false,
      isSubmitting: false,
    }),
}));
