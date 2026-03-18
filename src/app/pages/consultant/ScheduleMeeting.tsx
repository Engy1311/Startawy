import { useParams, useNavigate, Link } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Calendar, Clock, FileText, CheckCircle, ArrowLeft, Video } from "lucide-react";
import { useMeetingStore } from "../../store/useMeetingStore";

export default function ScheduleMeeting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    showSuccess,
    setFormField,
    setShowSuccess,
    submitMeeting,
    resetForm,
  } = useMeetingStore();

  const client = {
    name: "Ahmed Hassan",
    company: "TechStart Inc.",
  };

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitMeeting();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetForm();
    navigate(`/consultant/client/${id}`);
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Session</h1>
              <p className="text-gray-600 mb-8">
                Schedule a consultation session with {client.name}
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Client Info */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.company}</p>
                </div>

                {/* Meeting Type */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Meeting Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormField("meetingType", "video")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.meetingType === "video"
                          ? "border-teal-600 bg-teal-50"
                          : "border-gray-200 hover:border-teal-300"
                      }`}
                    >
                      <Video className={`w-8 h-8 mx-auto mb-2 ${
                        formData.meetingType === "video" ? "text-teal-600" : "text-gray-400"
                      }`} />
                      <p className={`font-medium ${
                        formData.meetingType === "video" ? "text-teal-600" : "text-gray-700"
                      }`}>Video Call</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormField("meetingType", "phone")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.meetingType === "phone"
                          ? "border-teal-600 bg-teal-50"
                          : "border-gray-200 hover:border-teal-300"
                      }`}
                    >
                      <span className={`text-4xl block mb-2 ${
                        formData.meetingType === "phone" ? "text-teal-600" : "text-gray-400"
                      }`}>📞</span>
                      <p className={`font-medium ${
                        formData.meetingType === "phone" ? "text-teal-600" : "text-gray-700"
                      }`}>Phone Call</p>
                    </button>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-teal-600" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={formData.selectedDate}
                    onChange={(e) => setFormField("selectedDate", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-teal-600" />
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormField("selectedTime", time)}
                        disabled={!formData.selectedDate}
                        className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                          formData.selectedTime === time
                            ? "border-teal-600 bg-teal-50 text-teal-700"
                            : "border-gray-200 hover:border-teal-300 text-gray-700"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {!formData.selectedDate && (
                    <p className="text-sm text-gray-500 mt-2">Please select a date first</p>
                  )}
                </div>

                {/* Meeting Agenda */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-teal-600" />
                    Meeting Agenda
                  </label>
                  <textarea
                    value={formData.agenda}
                    onChange={(e) => setFormField("agenda", e.target.value)}
                    placeholder="e.g., Q1 Budget Review, Cost Optimization Strategies..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                {/* Session Summary */}
                {formData.selectedDate && formData.selectedTime && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Session Summary</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Client:</strong> {client.name}
                      </p>
                      <p>
                        <strong>Date:</strong> {new Date(formData.selectedDate).toLocaleDateString("en-US", { 
                          weekday: "long", 
                          year: "numeric", 
                          month: "long", 
                          day: "numeric" 
                        })}
                      </p>
                      <p>
                        <strong>Time:</strong> {formData.selectedTime}
                      </p>
                      <p>
                        <strong>Type:</strong> {formData.meetingType === "video" ? "Video Call" : "Phone Call"}
                      </p>
                      <p>
                        <strong>Duration:</strong> 1 Hour
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={!formData.selectedDate || !formData.selectedTime || !formData.agenda}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Schedule Session
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
          onClick={handleCloseSuccess}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Session Scheduled!</h2>
            <p className="text-gray-600 mb-2">
              Your consultation session with {client.name} has been scheduled successfully.
            </p>
            <p className="text-gray-700 font-medium">
              {formData.selectedDate} at {formData.selectedTime}
            </p>
            <p className="text-sm text-gray-500 mt-4">The client will be notified via email.</p>
            <button
              onClick={handleCloseSuccess}
              className="mt-6 w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
