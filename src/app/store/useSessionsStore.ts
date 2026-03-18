import { create } from "zustand";

//sessions
interface Session {
    id: number;
    consultant: {
        name: string;
        avatar: string;
        specialization: string;
    };
    client: {
        name: string;
        avatar: string;
    };
    company: string;
    date: string;
    time: string;
    status: "upcoming" | "completed" | "confirmed" | "pending" | "cancelled";
    type: string;
    notes: string;
    meetingLink?: string;
}

interface SessionState {
    sessions: Session[];
    showJoinModal: boolean;
    showRescheduleModal: boolean;
    showCancelModal: boolean;
    showSuccessModal: boolean;
    successMessage: string;
    selectedSession: Session | null;
    rescheduleDate: string;
    rescheduleTime: string;
    
    // Setters
    setRescheduleDate: (date: string) => void;
    setRescheduleTime: (time: string) => void;
    setShowRescheduleModal: (show: boolean) => void;

    // Actions
    handleJoinSession: (session: Session) => void;
    handleReschedule: (session: Session) => void;
    handleCancelSession: (session: Session) => void;
    confirmCancelSession: () => void;
    confirmReschedule: () => void;
    rescheduleSession: (id: number, date: string, time: string) => void;
    cancelSession: (id: number) => void;
    joinSession: (id: number) => void;
}


export const useSessionStore = create<SessionState>((set, get) => ({
    sessions:[
        {
            id: 1,
            consultant: {
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                specialization: "Budget Optimization",
            },
            client: {
                name: "Ahmed Hassan",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            },
            company: "TechStart Inc.",
            date: "March 9, 2026",
            time: "10:00 AM - 11:00 AM",
            status: "upcoming",
            type: "Financial Review",
            notes: "Quarterly budget review and optimization strategies",
            meetingLink: "https://meet.startawy.com/session-1",
        },
        {
            id: 2,
            consultant: {
                name: "Michael Chen",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                specialization: "Growth Strategy",
            },
            client: {
                name: "Sara Mohamed",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            },
            company: "E-Commerce Plus",
            date: "March 12, 2026",
            time: "2:00 PM - 3:00 PM",
            status: "upcoming",
            type: "Budget Planning",
            notes: "Revenue growth strategy and market expansion planning",
            meetingLink: "https://meet.startawy.com/session-2",
        },
        {
            id: 3,
            consultant: {
                name: "Emily Rodriguez",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
                specialization: "Financial Planning",
            },
            client: {
                name: "Omar Ali",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            },
            company: "HealthTech Solutions",
            date: "March 5, 2026",
            time: "3:00 PM - 4:00 PM",
            status: "completed",
            type: "Investment Strategy",
            notes: "Annual financial planning and forecasting session",
        },
    ],
    showJoinModal: false,
    showRescheduleModal: false,
    showCancelModal: false,
    showSuccessModal: false,
    successMessage: "",
    selectedSession: null,
    rescheduleDate: "",
    rescheduleTime: "",

    setRescheduleDate: (date) => set({ rescheduleDate: date }),
    setRescheduleTime: (time) => set({ rescheduleTime: time }),
    setShowRescheduleModal: (show) => set({ showRescheduleModal: show }),

    handleJoinSession: (session) => {
        get().joinSession(session.id);
        set({ selectedSession: session, showJoinModal: true });
    },

    handleReschedule: (session) => {
        set({ selectedSession: session, showRescheduleModal: true });
    },

    handleCancelSession: (session) => {
        set({ selectedSession: session, showCancelModal: true });
    },

    confirmCancelSession: () => {
        const { selectedSession, cancelSession } = get();
        if (selectedSession) {
            cancelSession(selectedSession.id);
            set({ 
                showCancelModal: false,
                successMessage: "Session Cancelled Successfully!",
                showSuccessModal: true
            });
        }
    },

    confirmReschedule: () => {
        const { selectedSession, rescheduleDate, rescheduleTime, rescheduleSession } = get();
        if (selectedSession && rescheduleDate && rescheduleTime) {
            rescheduleSession(selectedSession.id, rescheduleDate, rescheduleTime);
            set({ 
                showRescheduleModal: false,
                successMessage: "Session Rescheduled Successfully!",
                showSuccessModal: true,
                rescheduleDate: "",
                rescheduleTime: ""
            });
        }
    },

    //reschedule
    rescheduleSession: (id, date, time) => set((state) => ({
        sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, date, time } : session
        ),
    })),
    //cancel
    cancelSession: (id) => set((state) => ({
        sessions: state.sessions.filter((session) => session.id !== id),
    })),
    //join
    joinSession: (id) => {
        console.log(`Joining session ${id}`);
    },
}))
