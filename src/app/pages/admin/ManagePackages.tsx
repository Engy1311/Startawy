import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Package, Edit, DollarSign, Check, X, Plus, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ManagePackages() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditPackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowEditModal(true);
  };

  const handleAddPackage = () => {
    setShowAddModal(true);
  };

  const handleSaveEdit = () => {
    setShowEditModal(false);
    setSuccessMessage("Package updated successfully");
    setShowSuccessModal(true);
  };

  const handleSaveAdd = () => {
    setShowAddModal(false);
    setSuccessMessage("Package added successfully");
    setShowSuccessModal(true);
  };

  const packages = [
    {
      id: 1,
      name: "Free Trial",
      price: "$0",
      period: "/forever",
      subscribers: 145,
      revenue: "$0",
      features: [
        "Limited access to reports",
        "Basic AI chatbot access",
        "Limited consultations",
      ],
      bgGradient: "from-gray-500 to-gray-600",
    },
    {
      id: 2,
      name: "Basic",
      price: "$99",
      period: "/month",
      subscribers: 428,
      revenue: "$42,372",
      features: [
        "Full access to market reports",
        "Budget analysis tools",
        "AI advisory chatbot",
        "Request marketing research template",
        "Email support",
      ],
      bgGradient: "from-teal-500 to-teal-600",
    },
    {
      id: 3,
      name: "Premium",
      price: "$299",
      period: "/month",
      subscribers: 319,
      revenue: "$95,381",
      features: [
        "All Basic features",
        "Private consultant sessions",
        "Financial performance dashboard",
        "One-year follow-up support",
        "Dedicated account manager",
        "24/7 priority support",
      ],
      bgGradient: "from-purple-500 to-purple-600",
    },
  ];

  const PackageModal = ({ isEdit, onClose, onSave, packageData }: any) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {isEdit ? `Edit Package: ${packageData?.name}` : "Add New Package"}
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
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
                defaultValue={packageData?.name || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter package name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                defaultValue={packageData?.price || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="$0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Period
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option value="/month">/month</option>
                <option value="/year">/year</option>
                <option value="/forever">/forever</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color Theme
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option value="from-teal-500 to-teal-600">Teal</option>
                <option value="from-purple-500 to-purple-600">Purple</option>
                <option value="from-blue-500 to-blue-600">Blue</option>
                <option value="from-gray-500 to-gray-600">Gray</option>
              </select>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Features
            </label>
            <textarea
              defaultValue={packageData?.features.join("\n") || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={8}
              placeholder="Enter one feature per line"
            />
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={onSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              {isEdit ? "Update Package" : "Add Package"}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
                {packages.reduce((sum, pkg) => sum + pkg.subscribers, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">$137,753</p>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
                <div className={`bg-gradient-to-r ${pkg.bgGradient} p-6 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-lg">{pkg.period}</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Subscribers</p>
                      <p className="text-2xl font-bold text-gray-900">{pkg.subscribers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Revenue</p>
                      <p className="text-2xl font-bold text-green-600">{pkg.revenue}</p>
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
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Edit Button */}
                  <button 
                    onClick={() => handleEditPackage(pkg)}
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
              onClick={handleAddPackage}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Package
            </button>
          </div>
        </main>
      </div>

      {/* Edit Package Modal */}
      {showEditModal && selectedPackage && (
        <PackageModal
          isEdit={true}
          packageData={selectedPackage}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Add Package Modal */}
      {showAddModal && (
        <PackageModal
          isEdit={false}
          packageData={null}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveAdd}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSuccessModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{successMessage}</h3>
            <p className="text-gray-600 mb-6">The package has been {successMessage.includes("added") ? "created" : "updated"} successfully.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}