import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { FileText, Calendar, User, TrendingUp, Clock, Plus, Edit, Trash2, Check } from "lucide-react";
import { useFollowUpStore } from "../../store/useFollowUpStore";

export default function FollowUpPlans() {
  const {
    formData,
    showNewPlanModal,
    showSuccessModal,
    saving,
    setFormField,
    setShowNewPlanModal,
    setShowSuccessModal,
    createPlan,
  } = useFollowUpStore();

  const followUpPlans = [
    {
      id: 1,
      clientName: "John Doe",
      clientCompany: "TechStart Inc.",
      planTitle: "Q1 Financial Review & Strategy",
      description: "Monthly financial reviews and quarterly strategic planning sessions",
      startDate: "Jan 15, 2026",
      endDate: "Apr 15, 2026",
      frequency: "Monthly",
      nextMeeting: "Apr 10, 2026",
      progress: 75,
      status: "Active",
    },
    {
      id: 2,
      clientName: "Sarah Miller",
      clientCompany: "HealthTech Solutions",
      planTitle: "Investment Portfolio Monitoring",
      description: "Bi-weekly portfolio reviews and investment adjustment recommendations",
      startDate: "Feb 1, 2026",
      endDate: "Aug 1, 2026",
      frequency: "Bi-weekly",
      nextMeeting: "Mar 15, 2026",
      progress: 45,
      status: "Active",
    },
    {
      id: 3,
      clientName: "Michael Brown",
      clientCompany: "EcoStart",
      planTitle: "Market Expansion Support",
      description: "Quarterly check-ins on European market expansion progress",
      startDate: "Mar 1, 2026",
      endDate: "Dec 1, 2026",
      frequency: "Quarterly",
      nextMeeting: "Jun 1, 2026",
      progress: 25,
      status: "Active",
    },
    {
      id: 4,
      clientName: "Lisa Chen",
      clientCompany: "AI Innovations",
      planTitle: "Cost Optimization Follow-Up",
      description: "Monthly cost review and optimization recommendations",
      startDate: "Jan 1, 2026",
      endDate: "Mar 1, 2026",
      frequency: "Monthly",
      nextMeeting: "-",
      progress: 100,
      status: "Completed",
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Active") {
      return {
        bg: "bg-green-100",
        text: "text-green-700"
      };
    } else {
      return {
        bg: "bg-gray-100",
        text: "text-gray-700"
      };
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPlan();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Success Popup */}
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
              <div className="bg-white rounded-3xl p-10 max-w-md mx-4 shadow-2xl transform animate-slideUp">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mb-6 animate-checkBounce shadow-lg">
                    <Check className="h-10 w-10 text-white stroke-[3]" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Created!</h3>
                  <p className="text-gray-600 text-lg">Follow-up plan created successfully</p>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow-Up Plans</h1>
              <p className="text-gray-600">Manage ongoing client support and follow-up schedules</p>
            </div>
            <button 
              onClick={() => setShowNewPlanModal(!showNewPlanModal)}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Follow-Up Plan
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-gray-600">Total Plans</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{followUpPlans.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <p className="text-sm text-gray-600">Active Plans</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {followUpPlans.filter(p => p.status === "Active").length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-gray-600">Upcoming Meetings</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {followUpPlans.filter(p => p.status === "Completed").length}
              </p>
            </div>
          </div>

          {/* New Plan Form */}
          {showNewPlanModal && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Follow-Up Plan</h3>
              
              <form onSubmit={handleCreatePlan} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client
                    </label>
                    <select 
                      value={formData.client}
                      onChange={(e) => setFormField("client", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    >
                      <option value="">Select client...</option>
                      <option value="John Doe - TechStart Inc.">John Doe - TechStart Inc.</option>
                      <option value="Sarah Miller - HealthTech Solutions">Sarah Miller - HealthTech Solutions</option>
                      <option value="Michael Brown - EcoStart">Michael Brown - EcoStart</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Title
                    </label>
                    <input
                      type="text"
                      value={formData.planTitle}
                      onChange={(e) => setFormField("planTitle", e.target.value)}
                      placeholder="e.g., Q1 Financial Review & Strategy"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormField("description", e.target.value)}
                    placeholder="Describe the follow-up plan..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormField("startDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormField("endDate", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select 
                      value={formData.frequency}
                      onChange={(e) => setFormField("frequency", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowNewPlanModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-semibold disabled:opacity-50"
                  >
                    {saving ? "Creating..." : "Create Plan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Plans List */}
          <div className="space-y-6">
            {followUpPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{plan.planTitle}</h3>
                        <span className={`${getStatusColor(plan.status).bg} ${getStatusColor(plan.status).text} px-3 py-1 rounded-full text-xs font-medium`}>
                          {plan.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {plan.clientName} - {plan.clientCompany}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{plan.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Progress</span>
                          <span className="text-xs font-semibold text-gray-900">{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all"
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{plan.startDate} - {plan.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{plan.frequency}</span>
                        </div>
                        {plan.nextMeeting !== "-" && (
                          <div className="flex items-center gap-2 text-teal-600 font-semibold">
                            <Calendar className="w-4 h-4" />
                            <span>Next: {plan.nextMeeting}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-teal-50 text-teal-600 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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