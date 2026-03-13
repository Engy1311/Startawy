import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Calendar, Clock, Video, CheckCircle, AlertCircle, XCircle, X } from "lucide-react";
import { useSessionStore } from "../../store/useButtonsStore";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function MySessions() {
  const { 
    sessions, 
    showJoinModal, 
    showRescheduleModal, 
    showCancelModal, 
    showSuccessModal, 
    successMessage, 
    selectedSession, 
    rescheduleDate, 
    rescheduleTime,
    setRescheduleDate,
    setRescheduleTime,
    setShowRescheduleModal,
    handleJoinSession,
    handleReschedule,
    handleCancelSession,
    confirmCancelSession,
    confirmReschedule
  } = useSessionStore();

  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const filteredSessions = sessions.filter((session) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return session.status === "upcoming" || session.status === "confirmed" || session.status === "pending";
    if (filter === "completed") return session.status === "completed";
    if (filter === "cancelled") return session.status === "cancelled";
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "upcoming":
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "upcoming":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Sessions</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your consultation sessions with clients</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
            {(["all", "upcoming", "completed", "cancelled"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  filter === tab
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div key={session.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Session Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <ImageWithFallback
                      src={session.client.avatar}
                      alt={session.client.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-100 dark:border-teal-900/50"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{session.client.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">{session.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(session.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(session.status)}`}>
                            {session.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <Video className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>{session.type}</span>
                        </div>
                      </div>
                      
                      {session.notes && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic border-l-2 border-teal-500 pl-3">
                          "{session.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    {(session.status === "upcoming" || session.status === "confirmed" || session.status === "pending") && (
                      <>
                        <button
                          onClick={() => handleJoinSession(session)}
                          className="w-full px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all font-semibold shadow-md active:scale-95"
                        >
                          Join Session
                        </button>
                        <button
                          onClick={() => handleReschedule(session)}
                          className="w-full px-6 py-2.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancelSession(session)}
                          className="w-full px-6 py-2.5 border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-semibold"
                        >
                          Cancel Session
                        </button>
                      </>
                    )}
                    {session.status === "completed" && (
                      <button className="w-full px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-semibold cursor-default">
                        Session Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredSessions.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No sessions found</h3>
                <p className="text-gray-600 dark:text-gray-400">There are no {filter !== "all" ? filter : ""} sessions at the moment.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedSession && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowRescheduleModal(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Reschedule Session</h2>
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-900/50">
                <p className="text-sm text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider mb-2">Current Session</p>
                <p className="font-bold text-gray-900 dark:text-white text-lg">{selectedSession?.client.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{selectedSession?.date} at {selectedSession?.time}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Select New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all shadow-sm"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Select New Time
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all shadow-sm"
                >
                  <option value="">Choose available time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={confirmReschedule}
                  disabled={!rescheduleDate || !rescheduleTime}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedSession && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => useSessionStore.setState({ showCancelModal: false })}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-red-500 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Cancel Session</h2>
              <button 
                onClick={() => useSessionStore.setState({ showCancelModal: false })}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Are you sure you want to cancel the session with</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-6">{selectedSession?.client.name}?</p>
              
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl mb-8 border border-red-100 dark:border-red-900/30">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium italic">
                  Note: A notification will be sent to the client.
                </p>
              </div>

              {/* In the current store, handleCancelSession already calls cancelSession and sets modal. 
                  If we wanted a confirmation step, we'd need another local state. 
                  The current store logic for cancelSession just removes it.
              */}
              {/* Confirmation Step */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => confirmCancelSession()}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg transform active:scale-95"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => useSessionStore.setState({ showCancelModal: false })}
                  className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-bold"
                >
                  No, Keep It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => useSessionStore.setState({ showSuccessModal: false })}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Wonderful!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{successMessage}</p>
            <button
              onClick={() => useSessionStore.setState({ showSuccessModal: false })}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all font-bold shadow-lg shadow-teal-500/20"
            >
              Back to Sessions
            </button>
          </div>
        </div>
      )}
      
      {/* Join Link Modal (sent link) */}
      {showJoinModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => useSessionStore.setState({ showJoinModal: false })}
        >
           <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform animate-bounce">
              <Video className="w-10 h-10 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Preparing Session</h3>
            <p className="text-gray-600 dark:text-gray-400">The meeting link has been prepared and sent to your email.</p>
          </div>
        </div>
      )}
    </div>
  );
}