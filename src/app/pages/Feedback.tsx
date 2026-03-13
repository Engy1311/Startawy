import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Star, Send, ThumbsUp } from "lucide-react";

const existingReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    date: "March 5, 2026",
    comment: "Excellent platform! The AI advisor helped me optimize my budget and I saved 30% on operational costs. Highly recommended!",
    helpful: 24,
  },
  {
    id: 2,
    user: "Sarah Miller",
    rating: 5,
    date: "March 2, 2026",
    comment: "The consultants are very professional and knowledgeable. Sarah Johnson helped me create a solid financial plan for my startup.",
    helpful: 18,
  },
  {
    id: 3,
    user: "Michael Chen",
    rating: 4,
    date: "February 28, 2026",
    comment: "Great service overall. The market reports are very detailed and helpful. Would love to see more industry-specific reports.",
    helpful: 12,
  },
  {
    id: 4,
    user: "Emma Rodriguez",
    rating: 5,
    date: "February 25, 2026",
    comment: "The budget analysis tool is amazing! It gave me insights I never thought about. The platform is very user-friendly.",
    helpful: 31,
  },
];

export function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback & Reviews</h1>
            <p className="text-gray-600">Share your experience and help us improve our services</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Submit Feedback */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Your Feedback</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Rate Your Experience
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-10 h-10 ${
                              star <= (hoveredRating || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        {rating === 5 && "Excellent! ⭐"}
                        {rating === 4 && "Great! 😊"}
                        {rating === 3 && "Good 👍"}
                        {rating === 2 && "Could be better 😐"}
                        {rating === 1 && "Needs improvement 😞"}
                      </p>
                    )}
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={6}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none"
                      placeholder="Tell us about your experience with Startawy..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {comment.length} / 500 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={rating === 0 || !comment.trim()}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </button>
                </form>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                    Platform Rating
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl font-bold text-gray-900">4.8</div>
                    <div>
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">Based on 127 reviews</p>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-8">{stars} ⭐</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{
                              width: `${
                                stars === 5 ? 75 : stars === 4 ? 20 : stars === 3 ? 3 : stars === 2 ? 1 : 1
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-8">
                          {stars === 5 ? 95 : stars === 4 ? 25 : stars === 3 ? 4 : stars === 2 ? 2 : 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reviews */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">User Reviews</h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm">
                    <option>Most Recent</option>
                    <option>Highest Rated</option>
                    <option>Lowest Rated</option>
                    <option>Most Helpful</option>
                  </select>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {existingReviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                            {review.user.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.user}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors text-sm">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="text-gray-600 hover:text-teal-600 transition-colors text-sm">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-8 text-center">
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-teal-500 hover:text-teal-600 transition-colors font-medium">
                    Load More Reviews
                  </button>
                </div>
              </div>

              {/* Feature Requests Section */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Have a Feature Request?</h2>
                <p className="text-gray-700 mb-6">
                  We're always looking to improve. Let us know what features you'd like to see in Startawy!
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold">
                  Submit Feature Request
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}