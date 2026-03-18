import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Package, Edit, DollarSign, Check, X, CheckCircle, Trash2, Plus } from "lucide-react";
import { usePackageStore } from "../../store/usePackageStore";

export default function ManagePackages() {
  const {
    packages,
    formData,
    showEditModal,
    showAddModal,
    showSuccessModal,
    successMessage,
    selectedPackage,
    saving,
    formErrors,
    setFormField,
    setShowEditModal,
    setShowAddModal,
    setShowSuccessModal,
    savePackage,
    deletePackage,
  } = usePackageStore();

  const handleSavePackage = async () => {
    await savePackage(!!selectedPackage);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      <div className="flex-1">
        <TopBar userRole="admin" />

        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Packages</h1>
            <p className="text-gray-600">Manage pricing plans and features</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-gray-600">Total Packages</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{packages.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                <p className="text-sm text-gray-600">Total Subscribers</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {packages.reduce((sum, pkg) => sum + pkg.users, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                ${packages.reduce((sum, pkg) => {
                  const price = parseInt(pkg.price.replace("$", "")) || 0;
                  return sum + (price * pkg.users);
                }, 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden relative group">
                <div className={`bg-gradient-to-r ${pkg.bgGradient} p-6 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{pkg.price}</span>
                        <span className="text-lg">{pkg.period}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deletePackage(pkg.id)}
                      className="p-2 bg-white/20 hover:bg-red-500 rounded-lg text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Subscribers</p>
                      <p className="text-2xl font-bold text-gray-900">{pkg.users}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Revenue</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${(parseInt(pkg.price.replace("$", "")) || 0) * pkg.users}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                      Features:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 uppercase">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Edit Button */}
                  <button 
                    onClick={() => setShowEditModal(true, pkg)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-semibold"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Package
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Package */}
          <div className="mt-8">
            <button 
              onClick={() => setShowAddModal(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Package
            </button>
          </div>
        </main>
      </div>

      {/* Package Modal (Inlined to prevent focus bugs) */}
      {(showEditModal || showAddModal) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {showEditModal ? `Edit Package: ${selectedPackage?.name}` : "Add New Package"}
              </h2>
              <button 
                onClick={() => showEditModal ? setShowEditModal(false) : setShowAddModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Package Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormField("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    placeholder="Enter package name"
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input
                      type="text"
                      value={formData.price.replace("$", "")}
                      onChange={(e) => setFormField("price", e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                  {formErrors.price && <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Period
                  </label>
                  <select 
                    value={formData.period}
                    onChange={(e) => setFormField("period", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  >
                    <option value="/month">/month</option>
                    <option value="/year">/year</option>
                    <option value="/forever">/forever</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <select 
                    value={formData.colorTheme}
                    onChange={(e) => setFormField("colorTheme", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  >
                    <option value="from-teal-500 to-teal-600">Teal</option>
                    <option value="from-purple-500 to-purple-600">Purple</option>
                    <option value="from-blue-500 to-blue-600">Blue</option>
                    <option value="from-gray-500 to-gray-600">Gray</option>
                    <option value="from-amber-500 to-amber-600">Gold</option>
                  </select>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormField("features", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  rows={8}
                  placeholder="Enter one feature per line"
                />
                {formErrors.features && <p className="text-red-500 text-sm mt-1">{formErrors.features}</p>}
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={handleSavePackage}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-bold disabled:opacity-50"
                >
                  {saving ? "Processing..." : (showEditModal ? "Update Package" : "Add Package")}
                </button>
                <button
                  onClick={() => showEditModal ? setShowEditModal(false) : setShowAddModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-all animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-slideUp">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{successMessage}</h3>
            <p className="text-gray-600 mb-6">The package has been {successMessage.includes("added") ? "created" : "updated"} successfully.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}