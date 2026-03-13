import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Calendar, Clock, Video, CheckCircle, XCircle, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useSessionStore } from "../store/useButtonsStore";

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

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Sessions</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your consultation sessions</p>
          </div>

          {/* Upcoming Sessions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <ImageWithFallback
                        src={session.consultant.avatar}
                        alt={session.consultant.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{session.consultant.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{session.consultant.specialization}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-teal-600" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-teal-600" />
                            <span>Video Call</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300">{session.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={()=>handleJoinSession(session)}
                        className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all font-medium whitespace-nowrap"
                      >
                        Join Session
                      </button>
                      <button
                        onClick={() => handleReschedule(session)}
                        className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelSession(session)}
                        className="px-6 py-2 border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Sessions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Completed Sessions</h2>
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <div key={session.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 opacity-75">
                  <div className="flex items-start gap-4">
                    <ImageWithFallback
                      src={session.consultant.avatar}
                      alt={session.consultant.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{session.consultant.name}</h3>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{session.consultant.specialization}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300">{session.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Join Session Modal */}
      {showJoinModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => useSessionStore.setState({ showJoinModal: false })}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Link Sent Successfully!</h3>
            <p className="text-gray-600 dark:text-gray-400">The meeting link has been sent to your email</p>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedSession && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRescheduleModal(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Reschedule Session</h2>
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Session</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedSession.consultant.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSession.date} at {selectedSession.time}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select New Time
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Choose available time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={confirmReschedule}
                  disabled={!rescheduleDate || !rescheduleTime}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Reschedule
                </button>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Session Modal */}
      {showCancelModal && selectedSession && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => useSessionStore.setState({ showCancelModal: false })}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Are you sure?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Do you really want to cancel your session with {selectedSession.consultant.name}?
            </p>
            
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
                No, Keep
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => useSessionStore.setState({ showSuccessModal: false })}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{successMessage}</h3>
          </div>
        </div>
      )}
    </div>
  );
}