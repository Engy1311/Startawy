import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { ArrowLeft, Upload, Check, User, Mail, Phone, Briefcase, GraduationCap, Award, DollarSign, Calendar } from "lucide-react";
import { useAdminStore } from "../../store/useAdminStore";

export default function AddConsultant() {
  const navigate = useNavigate();
  const {
    consultantForm,
    formErrors,
    showSuccess,
    isSubmitting,
    setConsultantField,
    toggleAvailability,
    setShowSuccess,
    submitConsultant,
    resetForm,
  } = useAdminStore();

  const specialties = [
    "Financial Planning",
    "Investment Advisory",
    "Tax Consulting",
    "Business Strategy",
    "Startup Funding",
    "Risk Management",
    "M&A Advisory",
    "Corporate Finance",
  ];

  const availabilityOptions = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        resetForm();
        navigate("/admin/consultants");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate, setShowSuccess, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitConsultant();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      <div className="flex-1">
        <TopBar userRole="admin" />

        <main className="p-6 lg:p-8">
          {/* Success Popup */}
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-scaleIn">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 animate-bounce">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Consultant Added Successfully!</h3>
                  <p className="text-gray-600 mb-6">The consultant has been added to the platform</p>
                  <div className="animate-pulse">
                    <div className="h-2 bg-teal-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <Link
              to="/admin/consultants"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Consultants</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Consultant</h1>
            <p className="text-gray-600">Fill in the consultant details to add them to the platform</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-teal-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={consultantForm.fullName}
                      onChange={(e) => setConsultantField("fullName", e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Dr. John Smith"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={consultantForm.email}
                        onChange={(e) => setConsultantField("email", e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="john.smith@example.com"
                      />
                    </div>
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={consultantForm.phone}
                        onChange={(e) => setConsultantField("phone", e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-teal-600" />
                  Professional Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specialty *
                    </label>
                    <select
                      value={consultantForm.specialty}
                      onChange={(e) => setConsultantField("specialty", e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    >
                      <option value="">Select Specialty</option>
                      {specialties.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                    {formErrors.specialty && <p className="text-red-500 text-sm mt-1">{formErrors.specialty}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Major/Field of Study *
                    </label>
                    <input
                      type="text"
                      value={consultantForm.major}
                      onChange={(e) => setConsultantField("major", e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Finance, Business Administration, etc."
                    />
                    {formErrors.major && <p className="text-red-500 text-sm mt-1">{formErrors.major}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={consultantForm.yearsOfExperience}
                        onChange={(e) => setConsultantField("yearsOfExperience", e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="5"
                        min="0"
                      />
                    </div>
                    {formErrors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{formErrors.yearsOfExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hourly Rate (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={consultantForm.hourlyRate}
                        onChange={(e) => setConsultantField("hourlyRate", e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="150"
                        min="0"
                      />
                    </div>
                    {formErrors.hourlyRate && <p className="text-red-500 text-sm mt-1">{formErrors.hourlyRate}</p>}
                  </div>
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-teal-600" />
                  Education & Certifications
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Education *
                    </label>
                    <textarea
                      value={consultantForm.education}
                      onChange={(e) => setConsultantField("education", e.target.value)}
                      rows={3}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="MBA - Harvard Business School&#10;BSc Finance - MIT"
                    />
                    {formErrors.education && <p className="text-red-500 text-sm mt-1">{formErrors.education}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Certifications
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        value={consultantForm.certifications}
                        onChange={(e) => setConsultantField("certifications", e.target.value)}
                        rows={3}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="CFA (Chartered Financial Analyst)&#10;CFP (Certified Financial Planner)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio / About *
                    </label>
                    <textarea
                      value={consultantForm.bio}
                      onChange={(e) => setConsultantField("bio", e.target.value)}
                      rows={4}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Brief description of the consultant's expertise and background..."
                    />
                    {formErrors.bio && <p className="text-red-500 text-sm mt-1">{formErrors.bio}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={consultantForm.linkedIn}
                      onChange={(e) => setConsultantField("linkedIn", e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Availability *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availabilityOptions.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleAvailability(day)}
                          className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                            consultantForm.availability.includes(day)
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-gray-300 hover:border-gray-400 text-gray-700"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                    {formErrors.availability && <p className="text-red-500 text-sm mt-1">{formErrors.availability}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Profile Picture
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-teal-600 font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding..." : "Add Consultant"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/consultants")}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
