import { create } from "zustand";

export interface ReviewFeedbackItem {
  id: number;
  founderName: string;
  founderEmail: string;
  consultantName: string;
  rating: number;
  comment: string;
  date: string;
  sessionType: string;
  helpful: number;
  isHelpfulLiked?: boolean;
  isReported?: boolean;
}

interface ReviewFeedbackState {
  feedbacks: ReviewFeedbackItem[];
  filterRating: string;
  showReportModal: boolean;
  showSuccessModal: boolean;
  successMessage: string;
  selectedFeedbackId: number | null;

  setFilterRating: (rating: string) => void;
  markHelpful: (id: number) => void;
  openReportModal: (id: number) => void;
  closeModals: () => void;
  submitReport: () => Promise<void>;
  closeSuccessModal: () => void;
}

const initialFeedbacks: ReviewFeedbackItem[] = [
  { id: 1, founderName: "John Doe", founderEmail: "john.doe@example.com", consultantName: "Sarah Johnson", rating: 5, comment: "Excellent consultation! Sarah provided invaluable insights into our financial strategy. Highly recommended!", date: "Mar 5, 2026", sessionType: "Financial Strategy", helpful: 12 },
  { id: 2, founderName: "Jane Smith", founderEmail: "jane.smith@example.com", consultantName: "Michael Chen", rating: 4, comment: "Very helpful session. Michael's expertise in investment planning was evident. Would book again.", date: "Mar 4, 2026", sessionType: "Investment Planning", helpful: 8 },
  { id: 3, founderName: "Robert Williams", founderEmail: "robert.w@example.com", consultantName: "Emily Rodriguez", rating: 5, comment: "Outstanding! Emily's business consulting helped us pivot our strategy successfully.", date: "Mar 3, 2026", sessionType: "Business Consulting", helpful: 15 },
  { id: 4, founderName: "Lisa Anderson", founderEmail: "lisa.a@example.com", consultantName: "David Kim", rating: 3, comment: "Good session but could have been more tailored to our specific industry needs.", date: "Mar 2, 2026", sessionType: "Market Analysis", helpful: 4 },
  { id: 5, founderName: "Michael Brown", founderEmail: "m.brown@example.com", consultantName: "Sarah Johnson", rating: 5, comment: "Sarah is amazing! Her financial analysis was spot-on and helped us secure funding.", date: "Mar 1, 2026", sessionType: "Financial Analysis", helpful: 20 },
  { id: 6, founderName: "Emma Davis", founderEmail: "emma.d@example.com", consultantName: "Michael Chen", rating: 4, comment: "Very professional and knowledgeable. The investment recommendations were practical and actionable.", date: "Feb 28, 2026", sessionType: "Investment Planning", helpful: 9 },
];

export const useReviewFeedbackStore = create<ReviewFeedbackState>((set, get) => ({
  feedbacks: initialFeedbacks,
  filterRating: "all",
  showReportModal: false,
  showSuccessModal: false,
  successMessage: "",
  selectedFeedbackId: null,

  setFilterRating: (rating) => set({ filterRating: rating }),

  markHelpful: (id) => set((state) => {
    const updatedFeedbacks = state.feedbacks.map((f) => {
      if (f.id === id) {
        if (f.isHelpfulLiked) {
          return { ...f, helpful: f.helpful - 1, isHelpfulLiked: false };
        }
        return { ...f, helpful: f.helpful + 1, isHelpfulLiked: true };
      }
      return f;
    });
    return { feedbacks: updatedFeedbacks };
  }),

  openReportModal: (id) => set({ showReportModal: true, selectedFeedbackId: id }),

  closeModals: () => set({ showReportModal: false, selectedFeedbackId: null }),

  closeSuccessModal: () => set({ showSuccessModal: false, successMessage: "" }),

  submitReport: async () => {
    set({ showReportModal: false });
    // Simulate process
    await new Promise((resolve) => setTimeout(resolve, 800));
    set((state) => {
      const updatedFeedbacks = state.feedbacks.map((f) => 
        f.id === state.selectedFeedbackId ? { ...f, isReported: true } : f
      );
      return { 
        feedbacks: updatedFeedbacks, 
        selectedFeedbackId: null,
        showSuccessModal: true,
        successMessage: "Review has been reported and sent to moderation."
      };
    });
  },
}));
