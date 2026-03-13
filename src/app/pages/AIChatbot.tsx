import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Send, Bot, User as UserIcon } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm StartBot, your AI Financial Advisor. How can I help you today? You can ask me about budget planning, financial strategies, market trends, or any business-related questions.",
    timestamp: new Date(),
  },
];

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">StartBot - AI Financial Advisor</h1>
            <p className="text-gray-600">Ask me anything about your business finances and strategy</p>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-2xl rounded-2xl px-6 py-4 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === "user" ? "text-teal-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-6 py-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything about your finances..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
              
              {/* Suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setInput("How can I optimize my budget?")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  💡 Optimize budget
                </button>
                <button
                  onClick={() => setInput("What are the current market trends?")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  📊 Market trends
                </button>
                <button
                  onClick={() => setInput("How can I increase revenue?")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  💰 Increase revenue
                </button>
                <button
                  onClick={() => setInput("Should I hire a consultant?")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  👥 Get consultant advice
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}