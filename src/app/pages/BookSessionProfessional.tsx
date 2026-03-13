import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function BookSessionProfessional() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const consultant = {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Financial Consultant",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    specialization: "Budget Optimization & Financial Planning",
    experience: "15+ years",
    rating: 4.9,
    sessionsCompleted: 342,
    hourlyRate: "$150/hour",
  };

  const availableDates = [
    "2026-03-10",
    "2026-03-11",
    "2026-03-12",
    "2026-03-13",
    "2026-03-14",
    "2026-03-17",
    "2026-03-18",
  ];

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleBookSession = () => {
    // Navigate to payment page with session details
    navigate("/payment", {
      state: {
        consultantName: consultant.name,
        date: selectedDate,
        time: selectedTime,
        amount: 150,
        returnTo: "/my-sessions",
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Back Button */}
          <Link
            to={`/consultant/${id}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Consultant Profile
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-6 mb-6">
                <ImageWithFallback
                  src={consultant.avatar}
                  alt={consultant.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {consultant.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {consultant.title}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>⭐ {consultant.rating} Rating</span>
                    <span>•</span>
                    <span>
                      {consultant.sessionsCompleted} Sessions
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-teal-600">
                      {consultant.hourlyRate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-teal-900">
                  <strong>Specialization:</strong>{" "}
                  {consultant.specialization}
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Schedule Your Session
              </h2>

              <div className="space-y-8">
                {/* Date Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-teal-600" />
                    Select a Date
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableDates.map((date) => {
                      const dateObj = new Date(date);
                      const dayName =
                        dateObj.toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                      const dayNumber = dateObj.getDate();
                      const monthName =
                        dateObj.toLocaleDateString("en-US", {
                          month: "short",
                        });

                      return (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            selectedDate === date
                              ? "border-teal-600 bg-teal-50"
                              : "border-gray-200 hover:border-teal-300"
                          }`}
                        >
                          <p className="text-xs text-gray-600 mb-1">
                            {dayName}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {dayNumber}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {monthName}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-teal-600" />
                    Select a Time
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        disabled={!selectedDate}
                        className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                          selectedTime === time
                            ? "border-teal-600 bg-teal-50 text-teal-700"
                            : "border-gray-200 hover:border-teal-300 text-gray-700"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {!selectedDate && (
                    <p className="text-sm text-gray-500 mt-2">
                      Please select a date first
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-teal-600" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any specific topics or questions you'd like to discuss..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Help your consultant prepare by sharing what
                    you'd like to focus on
                  </p>
                </div>

                {/* Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Consultant:</strong>{" "}
                        {consultant.name}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          selectedDate,
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <strong>Time:</strong> {selectedTime}
                      </p>
                      <p>
                        <strong>Duration:</strong> 1 Hour
                      </p>
                      <p>
                        <strong>Rate:</strong>{" "}
                        {consultant.hourlyRate}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBookSession}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </button>
                  <Link to={`/consultant/${id}`}>
                    <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}