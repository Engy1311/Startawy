import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { MessageCircle, Star, ThumbsUp, ThumbsDown, Filter, Search, Calendar } from "lucide-react";
import { useState } from "react";

export default function ReviewFeedback() {
  const [filterRating, setFilterRating] = useState("all");
  
  const feedbacks = [
    {
      id: 1,
      founderName: "John Doe",
      founderEmail: "john.doe@example.com",
      consultantName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent consultation! Sarah provided invaluable insights into our financial strategy. Highly recommended!",
      date: "Mar 5, 2026",
      sessionType: "Financial Strategy",
      helpful: 12,
    },
    {
      id: 2,
      founderName: "Jane Smith",
      founderEmail: "jane.smith@example.com",
      consultantName: "Michael Chen",
      rating: 4,
      comment: "Very helpful session. Michael's expertise in investment planning was evident. Would book again.",
      date: "Mar 4, 2026",
      sessionType: "Investment Planning",
      helpful: 8,
    },
    {
      id: 3,
      founderName: "Robert Williams",
      founderEmail: "robert.w@example.com",
      consultantName: "Emily Rodriguez",
      rating: 5,
      comment: "Outstanding! Emily's business consulting helped us pivot our strategy successfully.",
      date: "Mar 3, 2026",
      sessionType: "Business Consulting",
      helpful: 15,
    },
    {
      id: 4,
      founderName: "Lisa Anderson",
      founderEmail: "lisa.a@example.com",
      consultantName: "David Kim",
      rating: 3,
      comment: "Good session but could have been more tailored to our specific industry needs.",
      date: "Mar 2, 2026",
      sessionType: "Market Analysis",
      helpful: 4,
    },
    {
      id: 5,
      founderName: "Michael Brown",
      founderEmail: "m.brown@example.com",
      consultantName: "Sarah Johnson",
      rating: 5,
      comment: "Sarah is amazing! Her financial analysis was spot-on and helped us secure funding.",
      date: "Mar 1, 2026",
      sessionType: "Financial Analysis",
      helpful: 20,
    },
    {
      id: 6,
      founderName: "Emma Davis",
      founderEmail: "emma.d@example.com",
      consultantName: "Michael Chen",
      rating: 4,
      comment: "Very professional and knowledgeable. The investment recommendations were practical and actionable.",
      date: "Feb 28, 2026",
      sessionType: "Investment Planning",
      helpful: 9,
    },
  ];

  const filteredFeedbacks = filterRating === "all" 
    ? feedbacks 
    : feedbacks.filter(f => f.rating === parseInt(filterRating));

  const averageRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);
  const totalFeedbacks = feedbacks.length;
  const positiveRate = Math.round((feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      <div className="flex-1">
        <TopBar userRole="admin" />

        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Feedback</h1>
            <p className="text-gray-600">Monitor client satisfaction and service quality</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-gray-600">Total Feedbacks</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalFeedbacks}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <ThumbsUp className="w-6 h-6 text-green-600" />
                <p className="text-sm text-gray-600">Positive Rate</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{positiveRate}%</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-gray-600">This Month</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{feedbacks.filter(f => f.date.includes("Mar")).length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-6">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {feedback.founderName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feedback.founderName}</h3>
                      <p className="text-sm text-gray-600">{feedback.founderEmail}</p>
                      <p className="text-xs text-gray-500 mt-1">Session with {feedback.consultantName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{feedback.date}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    {feedback.sessionType}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{feedback.comment}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Helpful ({feedback.helpful})</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm font-medium">Report</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}