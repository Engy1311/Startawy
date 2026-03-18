import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Users, Edit, Trash2, CheckCircle, XCircle, Star, TrendingUp, DollarSign, Calendar, Plus, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useConsultantStore } from "../../store/useConsultantStore";

export default function ManageConsultants() {
  const navigate = useNavigate();
  const {
    consultants,
    showDeleteModal,
    showEditModal,
    selectedConsultant,
    showSuccessModal,
    successMessage,
    setShowDeleteModal,
    setShowEditModal,
    deleteConsultant,
    updateConsultant,
    toggleStatus,
    setShowSuccessModal
  } = useConsultantStore();

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    specialty: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (form = editForm) => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(form.email)) errors.email = "Invalid email format";
    if (!form.specialty.trim()) errors.specialty = "Specialty is required";

    return errors;
  };

  const handleEditChange = (field: string, value: string) => {
    const newForm = { ...editForm, [field]: value };
    setEditForm(newForm);

    if (isSubmit) {
      setFormErrors(validate(newForm));
    } else {
      const liveErrors = validate(newForm);
      setFormErrors(prev => {
        const next = { ...prev };
        if (liveErrors[field]) {
          if (liveErrors[field].toLowerCase().includes("required") && !value && !prev[field]) {
            delete next[field];
          } else {
            next[field] = liveErrors[field];
          }
        } else {
          delete next[field];
        }
        return next;
      });
    }
  };

  useEffect(() => {
    if (selectedConsultant && showEditModal) {
      setEditForm({
        name: selectedConsultant.name,
        email: selectedConsultant.email,
        specialty: selectedConsultant.specialty,
      });
      setFormErrors({});
      setIsSubmit(false);
    }
  }, [selectedConsultant, showEditModal]);

  const handleUpdate = () => {
    setIsSubmit(true);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (selectedConsultant) {
      updateConsultant(selectedConsultant.id, editForm);
    }
  };

  const activeConsultants = consultants.filter(c => c.status === "active").length;
  const totalEarnings = "$167,400";
  const totalSessions = consultants.reduce((sum, c) => sum + c.totalSessions, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      <div className="flex-1">
        <TopBar userRole="admin" />

        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Consultants</h1>
            <p className="text-gray-600">Oversee consultant performance and availability</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-gray-600">Total Consultants</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{consultants.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-sm text-gray-600">Active Consultants</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{activeConsultants}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-gray-600">Total Sessions</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalSessions}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <p className="text-sm text-gray-600">Total Earnings</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalEarnings}</p>
            </div>
          </div>

          {/* Consultants Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">All Consultants</h2>
                <button 
                  onClick={() => navigate('/admin/add-consultant')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Consultant
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Consultant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Sessions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {consultants.map((consultant) => (
                    <tr key={consultant.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                            {consultant.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{consultant.name}</p>
                            <p className="text-sm text-gray-600">{consultant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{consultant.specialty}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold text-gray-900">{consultant.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">{consultant.totalSessions}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">{consultant.totalEarnings}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleStatus(consultant.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            consultant.status === "active" 
                              ? "bg-green-100 text-green-700 hover:bg-green-200" 
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {consultant.status === "active" ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setShowEditModal(true, consultant)}
                            className="p-2 hover:bg-teal-50 text-teal-600 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowDeleteModal(true, consultant)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedConsultant && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Edit Consultant</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                <input
                  type="text"
                  value={editForm.specialty}
                  onChange={(e) => handleEditChange("specialty", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                />
                {formErrors.specialty && <p className="text-red-500 text-sm mt-1">{formErrors.specialty}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all font-bold shadow-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedConsultant && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Consultant?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedConsultant.name}</strong>? This action cannot be undone.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => deleteConsultant(selectedConsultant.id)}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{successMessage}</h3>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}