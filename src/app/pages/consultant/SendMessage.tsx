import { useParams, useNavigate, Link } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Mail, Paperclip, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { useMessagingStore } from "../../store/useMessagingStore";

export default function SendMessage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    subject,
    message,
    priority,
    showSuccess,
    isSubmitting,
    setSubject,
    setMessage,
    setPriority,
    setShowSuccess,
    submitMessage,
    resetMessage,
  } = useMessagingStore();

  const client = {
    name: "Ahmed Hassan",
    company: "TechStart Inc.",
    email: "ahmed@techstart.com",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitMessage();
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

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Send Message</h1>
                  <p className="text-gray-600">Compose a message to your client</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipient Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">To:</p>
                      <p className="font-semibold text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{client.company}</p>
                    </div>
                  </div>
                </div>

                {/* Priority Selector */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPriority("normal")}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                        priority === "normal"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority("high")}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                        priority === "high"
                          ? "border-orange-600 bg-orange-50 text-orange-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      High
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority("urgent")}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                        priority === "urgent"
                          ? "border-red-600 bg-red-50 text-red-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      Urgent
                    </button>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter message subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={12}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum 20 characters (Current: {message.length})
                  </p>
                </div>

                {/* Quick Message Templates */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quick Templates (Click to use)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMessage("Thank you for attending our session. Here are the key action items we discussed...")}
                      className="p-3 text-left border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-sm"
                    >
                      <p className="font-medium text-gray-900">Follow-up Message</p>
                      <p className="text-xs text-gray-600 mt-1">Session recap and action items</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessage("I hope this message finds you well. I wanted to check in on the progress of...")}
                      className="p-3 text-left border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-sm"
                    >
                      <p className="font-medium text-gray-900">Progress Check</p>
                      <p className="text-xs text-gray-600 mt-1">Check client's progress</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessage("I'm reaching out to remind you about our upcoming session scheduled for...")}
                      className="p-3 text-left border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-sm"
                    >
                      <p className="font-medium text-gray-900">Session Reminder</p>
                      <p className="text-xs text-gray-600 mt-1">Remind about upcoming session</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessage("Following our discussion, I've prepared a detailed report that includes...")}
                      className="p-3 text-left border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-sm"
                    >
                      <p className="font-medium text-gray-900">Report Delivery</p>
                      <p className="text-xs text-gray-600 mt-1">Share reports or documents</p>
                    </button>
                  </div>
                </div>

                {/* Attachment Option */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer">
                  <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Click to attach files</p>
                  <p className="text-sm text-gray-500">PDF, DOC, XLSX (Max 10MB)</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={!subject || message.length < 20 || isSubmitting}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
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
          onClick={() => {
            setShowSuccess(false);
            resetMessage();
            navigate(`/consultant/client/${id}`);
          }}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
            <p className="text-gray-600">
              Your message has been successfully sent to {client.name}.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                resetMessage();
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
