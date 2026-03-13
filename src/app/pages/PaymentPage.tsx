import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Lock, ArrowLeft, Check, CreditCard, Calendar, Plus } from "lucide-react";
import logoImage from "../../assets/69567af9ba0ecce1dfd02dd8c710a5e15af2845c.png";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("card");
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Get details from location state or use defaults
  const stateData = location.state || {};
  const consultantName = stateData.consultantName || "Consultant";
  const sessionDate = stateData.date || "";
  const sessionTime = stateData.time || "";
  const amount = stateData.amount || 150;
  const returnTo = stateData.returnTo || "/my-sessions";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    setShowSuccess(true);

    // Navigate back after success
    setTimeout(() => {
      navigate(returnTo);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/20 to-blue-50/20 py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-10 max-w-md mx-4 shadow-2xl transform animate-slideUp">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 animate-checkBounce shadow-lg">
                <Check className="h-10 w-10 text-white stroke-[3]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Booked Successfully!</h3>
              <p className="text-gray-600 mb-2 text-lg">Your session has been confirmed</p>
              {sessionDate && sessionTime && (
                <p className="text-teal-600 font-semibold mb-4">
                  {new Date(sessionDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })} at {sessionTime}
                </p>
              )}
              <div className="mt-6">
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-progress"></div>
                </div>
                <p className="text-sm text-gray-500 mt-3">Redirecting...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/book-consultant"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>

          <div className="text-center mb-4">
            <img
              src={logoImage}
              alt="Startawy Logo"
              className="mx-auto mb-6 h-16"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">Complete Your Payment</h1>
          <p className="text-gray-600 text-center flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Order Summary - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-teal-400/30">
                  <span className="text-teal-100">Consultant</span>
                  <span className="font-semibold">{consultantName}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-teal-400/30">
                  <span className="text-teal-100">Date</span>
                  <span className="font-semibold">{new Date(sessionDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-teal-400/30">
                  <span className="text-teal-100">Time</span>
                  <span className="font-semibold">{sessionTime}</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-4xl font-bold">
                    ${amount}
                    <span className="text-lg text-teal-100">/mo</span>
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-teal-200 flex-shrink-0 mt-0.5" />
                    <span className="text-teal-50">Consultation Session</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`relative p-6 rounded-xl border-2 transition-all ${paymentMethod === "card"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {paymentMethod === "card" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <CreditCard className={`w-8 h-8 mb-3 ${paymentMethod === "card" ? "text-teal-600" : "text-gray-400"}`} />
                  <div className="text-left">
                    <p className={`font-semibold ${paymentMethod === "card" ? "text-teal-900" : "text-gray-700"}`}>
                      Credit Card
                    </p>
                    <p className="text-sm text-gray-500">Visa, Mastercard</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("mobile")}
                  className={`relative p-6 rounded-xl border-2 transition-all ${paymentMethod === "mobile"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {paymentMethod === "mobile" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <svg className={`w-8 h-8 mb-3 ${paymentMethod === "mobile" ? "text-teal-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="text-left">
                    <p className={`font-semibold ${paymentMethod === "mobile" ? "text-teal-900" : "text-gray-700"}`}>
                      Mobile Billing
                    </p>
                    <p className="text-sm text-gray-500">Phone payment</p>
                  </div>
                </button>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {paymentMethod === "card" ? (
                  <>
                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                          <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
                            <rect width="48" height="32" rx="4" fill="#EB001B" />
                            <rect x="16" width="16" height="32" rx="8" fill="#FF5F00" />
                            <rect x="16" width="16" height="32" rx="8" fill="#F79E1B" fillOpacity="0.8" />
                          </svg>
                          <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
                            <rect width="48" height="32" rx="4" fill="#1434CB" />
                            <path d="M20 10h8v12h-8z" fill="#F7B600" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">Your payment is secure</p>
                    <p>All transactions are encrypted and processed securely through Stripe.</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay $${amount}`
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  By confirming your payment, you agree to our Terms of Service
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes checkBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-checkBounce {
          animation: checkBounce 0.5s ease-in-out;
        }
        .animate-progress {
          animation: progress 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}