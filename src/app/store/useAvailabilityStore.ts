import { create } from "zustand";

interface Slot {
  id: number;
  time: string;
}

interface DaySchedule {
  day: string;
  slots: Slot[];
  enabled: boolean;
}

interface AvailabilityState {
  schedule: DaySchedule[];
  showAddSlotModal: boolean;
  selectedDay: string;
  startTime: string;
  endTime: string;
  isSaving: boolean;

  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setShowAddSlotModal: (show: boolean) => void;
  setSelectedDay: (day: string) => void;
  toggleDay: (day: string) => void;
  addSlot: (day: string) => void;
  deleteSlot: (day: string, slotId: number) => void;
  saveSchedule: () => Promise<void>;
}

const initialSchedule: DaySchedule[] = [
  { day: "Monday", slots: [{ id: 1, time: "9:00 AM - 11:00 AM" }, { id: 2, time: "2:00 PM - 5:00 PM" }], enabled: true },
  { day: "Tuesday", slots: [{ id: 3, time: "9:00 AM - 12:00 PM" }, { id: 4, time: "1:00 PM - 5:00 PM" }], enabled: true },
  { day: "Wednesday", slots: [{ id: 5, time: "9:00 AM - 11:00 AM" }, { id: 6, time: "3:00 PM - 6:00 PM" }], enabled: true },
  { day: "Thursday", slots: [{ id: 7, time: "10:00 AM - 12:00 PM" }, { id: 8, time: "2:00 PM - 5:00 PM" }], enabled: true },
  { day: "Friday", slots: [{ id: 9, time: "9:00 AM - 1:00 PM" }], enabled: true },
  { day: "Saturday", slots: [], enabled: false },
  { day: "Sunday", slots: [], enabled: false },
];

export const useAvailabilityStore = create<AvailabilityState>((set, get) => ({
  schedule: initialSchedule,
  showAddSlotModal: false,
  selectedDay: "",
  startTime: "",
  endTime: "",
  isSaving: false,

  setStartTime: (time) => set({ startTime: time }),
  setEndTime: (time) => set({ endTime: time }),
  setShowAddSlotModal: (show) => set({ showAddSlotModal: show }),
  setSelectedDay: (day) => set({ selectedDay: day }),

  toggleDay: (dayName) => set((state) => ({
    schedule: state.schedule.map((day) => 
      day.day === dayName ? { ...day, enabled: !day.enabled } : day
    )
  })),

  addSlot: (dayName) => {
    const { startTime, endTime, schedule } = get();
    if (!startTime || !endTime) return;

    const formatTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":");
      const h = parseInt(hours);
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    };

    const newTime = `${formatTime(startTime)} - ${formatTime(endTime)}`;
    const newSlot = { id: Date.now(), time: newTime };

    set({
      schedule: schedule.map((day) => 
        day.day === dayName ? { ...day, slots: [...day.slots, newSlot] } : day
      ),
      showAddSlotModal: false,
      startTime: "",
      endTime: ""
    });
  },

  deleteSlot: (dayName, slotId) => set((state) => ({
    schedule: state.schedule.map((day) => 
      day.day === dayName 
        ? { ...day, slots: day.slots.filter((s) => s.id !== slotId) } 
        : day
    )
  })),

  saveSchedule: async () => {
    set({ isSaving: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ isSaving: false });
    alert("Schedule saved successfully!");
  },
}));
