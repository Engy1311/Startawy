import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Clock, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useAvailabilityStore } from "../../store/useAvailabilityStore";

export default function AvailabilitySchedule() {
  const {
    schedule,
    showAddSlotModal,
    selectedDay,
    startTime,
    endTime,
    isSaving,
    setStartTime,
    setEndTime,
    setShowAddSlotModal,
    setSelectedDay,
    toggleDay,
    addSlot,
    deleteSlot,
    saveSchedule,
  } = useAvailabilityStore();

  const handleAddSlot = (day: string) => {
    setSelectedDay(day);
    setShowAddSlotModal(true);
  };

  const totalSlots = schedule.reduce((sum, day) => sum + day.slots.length, 0);
  const activeDays = schedule.filter(day => day.enabled).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Your Availability</h1>
            <p className="text-gray-600">Set your working hours for client consultations</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-gray-600">Total Time Slots</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalSlots}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-green-600" />
                <p className="text-sm text-gray-600">Active Days</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{activeDays}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-gray-600">Hours/Week</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">~{totalSlots * 2}</p>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="space-y-4">
            {schedule.map((day) => (
              <div
                key={day.day}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
                  !day.enabled && "opacity-50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-gray-900">{day.day}</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={day.enabled} 
                        onChange={() => toggleDay(day.day)} 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-600">
                        {day.enabled ? "Available" : "Unavailable"}
                      </span>
                    </label>
                  </div>
                  {day.enabled && (
                    <button 
                      onClick={() => handleAddSlot(day.day)}
                      className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      Add Slot
                    </button>
                  )}
                </div>

                {day.enabled && day.slots.length > 0 && (
                  <div className="space-y-3">
                    {day.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-teal-600" />
                          <span className="font-medium text-gray-900">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteSlot(day.day, slot.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {day.enabled && day.slots.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No time slots added for this day</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button 
              onClick={saveSchedule}
              disabled={isSaving}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? "Saving..." : "Save Schedule"}
            </button>
          </div>
        </main>
      </div>

      {/* Add Slot Modal */}
      {showAddSlotModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddSlotModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">Add Time Slot - {selectedDay}</h2>
              <button 
                onClick={() => setShowAddSlotModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddSlotModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => addSlot(selectedDay)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-semibold"
                >
                  Add Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}