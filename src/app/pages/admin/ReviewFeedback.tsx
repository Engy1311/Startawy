import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { MessageCircle, Star, ThumbsUp, ThumbsDown, Filter, Search, Calendar, AlertTriangle, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { useReviewFeedbackStore } from "../../store/useReviewFeedbackStore";

export default function ReviewFeedback() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    feedbacks,
    filterRating,
    showReportModal,
    showSuccessModal,
    successMessage,
    selectedFeedbackId,
    setFilterRating,
    markHelpful,
    openReportModal,
    closeModals,
    submitReport,
    closeSuccessModal
  } = useReviewFeedbackStore();

  const filteredFeedbacks = feedbacks.filter(f => 
    (filterRating === "all" || f.rating === parseInt(filterRating)) &&
    (f.founderName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     f.consultantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.comment.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              <div key={feedback.id} className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${feedback.isReported ? 'border-red-300 bg-red-50/30' : 'border-gray-200'}`}>
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
                    {feedback.isReported && (
                      <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Reported
                      </span>
                    )}
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
                    <button 
                      onClick={() => markHelpful(feedback.id)}
                      className={`flex items-center gap-2 transition-colors ${feedback.isHelpfulLiked ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'}`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${feedback.isHelpfulLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">Helpful ({feedback.helpful})</span>
                    </button>
                    {!feedback.isReported && (
                      <button 
                        onClick={() => openReportModal(feedback.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm font-medium">Report</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredFeedbacks.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No feedbacks found matching your criteia.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6 text-center">
            <div className="flex justify-end">
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Report Review</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to flag this review for moderation? It will be hidden pending administrator review.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={closeModals}
                className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={submitReport}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md flex-1"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Action Successful</h3>
            <p className="text-gray-600 mb-6">{successMessage}</p>
            <button 
              onClick={closeSuccessModal}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}