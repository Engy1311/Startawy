import { create } from "zustand";

interface Consultant {
  id: number;
  name: string;
  email: string;
  specialty: string;
  rating: number;
  totalSessions: number;
  totalEarnings: string;
  status: "active" | "inactive";
  joinDate: string;
  availability: string;
  clients: number;
}

interface ConsultantState {
  consultants: Consultant[];
  showDeleteModal: boolean;
  selectedConsultant: Consultant | null;
  showSuccessModal: boolean;
  successMessage: string;
  
  // Actions
  setShowDeleteModal: (show: boolean, consultant?: Consultant) => void;
  setShowSuccessModal: (show: boolean) => void;
  deleteConsultant: (id: number) => void;
  toggleStatus: (id: number) => void;

  showEditModal: boolean;
  setShowEditModal: (show: boolean, consultant?: Consultant | null) => void;
  updateConsultant: (id: number, data: Partial<Consultant>) => void;
  addConsultant: (data: Omit<Consultant, 'id'>) => void;
}

const initialConsultants: Consultant[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    specialty: "Financial Strategy",
    rating: 4.9,
    totalSessions: 156,
    totalEarnings: "$42,380",
    status: "active",
    joinDate: "Jan 2025",
    availability: "Available",
    clients: 48,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    specialty: "Investment Planning",
    rating: 4.8,
    totalSessions: 134,
    totalEarnings: "$38,920",
    status: "active",
    joinDate: "Feb 2025",
    availability: "Available",
    clients: 42,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    specialty: "Business Consulting",
    rating: 4.7,
    totalSessions: 98,
    totalEarnings: "$29,400",
    status: "inactive",
    joinDate: "Mar 2025",
    availability: "On Leave",
    clients: 35,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@example.com",
    specialty: "Market Analysis",
    rating: 4.9,
    totalSessions: 189,
    totalEarnings: "$56,700",
    status: "active",
    joinDate: "Dec 2024",
    availability: "Available",
    clients: 62,
  },
];

export const useConsultantStore = create<ConsultantState>((set) => ({
  consultants: initialConsultants,
  showDeleteModal: false,
  selectedConsultant: null,
  showSuccessModal: false,
  successMessage: "",
  showEditModal: false,

  setShowDeleteModal: (show, consultant = null) => 
    set({ showDeleteModal: show, selectedConsultant: consultant }),

  setShowEditModal: (show, consultant = null) => 
    set({ showEditModal: show, selectedConsultant: consultant }),

  setShowSuccessModal: (show) => set({ showSuccessModal: show }),

  deleteConsultant: (id) => {
    set((state) => ({
      consultants: state.consultants.filter((c) => c.id !== id),
      showDeleteModal: false,
      successMessage: "Consultant deleted successfully!",
      showSuccessModal: true,
    }));
    setTimeout(() => set({ showSuccessModal: false }), 3000);
  },

  toggleStatus: (id) => {
    set((state) => ({
      consultants: state.consultants.map((c) => 
        c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
      ),
    }));
  },

  updateConsultant: (id, data) => {
    set((state) => ({
      consultants: state.consultants.map((c) => 
        c.id === id ? { ...c, ...data } : c
      ),
      showEditModal: false,
      successMessage: "Consultant updated successfully!",
      showSuccessModal: true,
    }));
    setTimeout(() => set({ showSuccessModal: false }), 3000);
  },

  addConsultant: (data) => {
    set((state) => {
      const newId = Math.max(...state.consultants.map(c => c.id)) + 1;
      return {
        consultants: [...state.consultants, { id: newId, ...data }],
      };
    });
  },
}));
