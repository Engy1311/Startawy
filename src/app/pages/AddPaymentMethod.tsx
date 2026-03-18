import { useNavigate, Link } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { ArrowLeft, CreditCard, Calendar, Check, Lock } from "lucide-react";
import { usePaymentStore } from "../store/usePaymentStore";

export default function AddPaymentMethod() {
  const navigate = useNavigate();
  const {
    paymentType,
    formData,
    formErrors,
    isSaving,
    showSuccess,
    setPaymentType,
    setFormData,
    setShowSuccess,
    submitPayment,
  } = usePaymentStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitPayment();

    if (success) {
      // Redirect after success
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/my-payments");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Success Popup */}
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
              <div className="bg-white rounded-3xl p-10 max-w-md mx-4 shadow-2xl transform animate-slideUp">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 animate-checkBounce shadow-lg">
                    <Check className="h-10 w-10 text-white stroke-[3]" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Payment Method Added!</h3>
                  <p className="text-gray-600 text-lg">Your payment method has been saved successfully</p>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <Link
            to="/my-payments"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Payment Methods
          </Link>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Payment Method</h1>
              <p className="text-gray-600">Add a new payment method to your account</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Payment Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-4">Payment Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentType("card")}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      paymentType === "card"
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {paymentType === "card" && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    <CreditCard className={`w-8 h-8 mb-3 ${paymentType === "card" ? "text-teal-600" : "text-gray-400"}`} />
                    <div className="text-left">
                      <p className={`font-semibold ${paymentType === "card" ? "text-teal-900" : "text-gray-700"}`}>
                        Credit/Debit Card
                      </p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("bank")}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      paymentType === "bank"
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {paymentType === "bank" && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    <svg className={`w-8 h-8 mb-3 ${paymentType === "bank" ? "text-teal-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div className="text-left">
                      <p className={`font-semibold ${paymentType === "bank" ? "text-teal-900" : "text-gray-700"}`}>
                        Bank Account
                      </p>
                      <p className="text-sm text-gray-500">Direct bank transfer</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {paymentType === "card" ? (
                  <>
                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => setFormData({ cardholderName: e.target.value })}
                        className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          formErrors.cardholderName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="John Doe"
                      />
                      {formErrors.cardholderName && <p className="text-red-500 text-xs mt-1">{formErrors.cardholderName}</p>}
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ cardNumber: e.target.value })}
                        className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          formErrors.cardNumber ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
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
                            onChange={(e) => setFormData({ expiryDate: e.target.value })}
                            className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                              formErrors.expiryDate ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {formErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ cvv: e.target.value })}
                          className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            formErrors.cvv ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Bank Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ bankName: e.target.value })}
                        className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          formErrors.bankName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Bank of America"
                      />
                      {formErrors.bankName && <p className="text-red-500 text-xs mt-1">{formErrors.bankName}</p>}
                    </div>

                    {/* Account Holder Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        value={formData.accountHolderName}
                        onChange={(e) => setFormData({ accountHolderName: e.target.value })}
                        className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          formErrors.accountHolderName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="John Doe"
                      />
                      {formErrors.accountHolderName && <p className="text-red-500 text-xs mt-1">{formErrors.accountHolderName}</p>}
                    </div>

                    {/* Account Number and Routing Number */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Account Number
                        </label>
                        <input
                          type="text"
                          value={formData.accountNumber}
                          onChange={(e) => setFormData({ accountNumber: e.target.value })}
                          className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            formErrors.accountNumber ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="123456789"
                        />
                        {formErrors.accountNumber && <p className="text-red-500 text-xs mt-1">{formErrors.accountNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Routing Number
                        </label>
                        <input
                          type="text"
                          value={formData.routingNumber}
                          onChange={(e) => setFormData({ routingNumber: e.target.value })}
                          className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                            formErrors.routingNumber ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="987654321"
                        />
                        {formErrors.routingNumber && <p className="text-red-500 text-xs mt-1">{formErrors.routingNumber}</p>}
                      </div>
                    </div>
                  </>
                )}

                {/* Set as Default */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.setAsDefault}
                    onChange={(e) => setFormData({ setAsDefault: e.target.checked })}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-1">Your information is secure</p>
                    <p>All payment information is encrypted and stored securely.</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Payment Method"
                    )}
                  </button>
                  <Link to="/my-payments">
                    <button 
                      type="button"
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
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

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes checkBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-checkBounce {
          animation: checkBounce 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
