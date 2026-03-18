import { create } from "zustand";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  input: string;
  isTyping: boolean;

  setInput: (input: string) => void;
  addMessage: (message: Message) => void;
  setIsTyping: (isTyping: boolean) => void;
  handleSend: () => void;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm StartBot, your AI Financial Advisor. How can I help you today? You can ask me about budget planning, financial strategies, market trends, or any business-related questions.",
    timestamp: new Date(),
  },
];

const getAIResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  if (input.includes("budget") || input.includes("expenses")) {
    return "Based on your current financial data, I recommend focusing on optimizing your marketing spend and operational costs. Your revenue is growing well at 15.3%, but expenses increased by 28.2% last month. Consider reviewing vendor contracts and exploring cost-effective alternatives.";
  } else if (input.includes("revenue") || input.includes("income") || input.includes("profit")) {
    return "Your revenue growth is impressive! To maintain this momentum, I suggest: 1) Invest in customer retention programs (5x cheaper than acquisition), 2) Explore upselling opportunities with existing clients, 3) Set aside 20% for emergency reserves and 30% for growth investments.";
  } else if (input.includes("market") || input.includes("competition")) {
    return "Market analysis shows your sector is experiencing 12% YoY growth. Key trends include digital transformation and sustainability initiatives. I recommend accessing our Market Reports library for detailed insights specific to your industry.";
  } else if (input.includes("consultant") || input.includes("advisor")) {
    return "I recommend scheduling a session with one of our expert consultants for personalized advice. Sarah Johnson specializes in budget optimization, while Michael Chen focuses on growth strategies. Both have excellent reviews from startup founders.";
  } else {
    return "That's a great question! For detailed guidance on this topic, I recommend: 1) Reviewing your Budget Analysis dashboard for current metrics, 2) Checking the Market Reports section for industry insights, or 3) Booking a session with one of our expert consultants for personalized advice. Is there anything specific you'd like to know more about?";
  }
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: initialMessages,
  input: "",
  isTyping: false,

  setInput: (input) => set({ input }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setIsTyping: (isTyping) => set({ isTyping }),

  handleSend: () => {
    const { input, messages } = get();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      input: "",
      isTyping: true,
    }));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      set((state) => ({
        messages: [...state.messages, aiResponse],
        isTyping: false,
      }));
    }, 1500);
  },
}));
