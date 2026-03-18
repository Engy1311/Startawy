import { useParams, useNavigate, Link } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Star, CheckCircle, ArrowLeft } from "lucide-react";
import { useReviewStore } from "../../store/useReviewStore";

export default function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    rating,
    hoveredRating,
    reviewText,
    selectedCategories,
    showSuccess,
    isSubmitting,
    setRating,
    setHoveredRating,
    setReviewText,
    toggleCategory,
    setShowSuccess,
    submitReview,
  } = useReviewStore();

  const client = {
    name: "Ahmed Hassan",
    company: "TechStart Inc.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitReview();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Back Button */}
          <Link
            to={`/consultant/client/${id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Client Details
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Review</h1>
              <p className="text-gray-600 mb-8">
                Share your feedback about working with {client.name}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Client Info */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.company}</p>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-2">
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
                    {rating > 0 && (
                      <span className="ml-4 text-2xl font-bold text-gray-900">
                        {rating}.0
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Categories */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Performance Areas
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Communication",
                      "Responsiveness",
                      "Follow-Through",
                      "Goal Achievement",
                    ].map((category) => (
                      <div
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedCategories.includes(category)
                            ? "border-teal-500 bg-teal-50"
                            : "border-gray-200 hover:border-teal-300"
                        }`}
                      >
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className={`font-medium ${
                            selectedCategories.includes(category) ? "text-teal-700" : "text-gray-700"
                          }`}>{category}</span>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => {}} // Handled by div onClick
                            className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Your Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience working with this client..."
                    rows={8}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum 50 characters (Current: {reviewText.length})
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={rating === 0 || reviewText.length < 50 || isSubmitting}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                  <Link to={`/consultant/client/${id}`}>
                    <button
                      type="button"
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSuccess(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Review Submitted!</h2>
            <p className="text-gray-600">
              Your review has been successfully added to the client's profile.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate(`/consultant/client/${id}`);
              }}
              className="mt-6 w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
