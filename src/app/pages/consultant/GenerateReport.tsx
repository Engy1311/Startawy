import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { ArrowLeft, FileText, Check, Calendar, User, TrendingUp, DollarSign, Target } from "lucide-react";
import { useConsultantReportStore } from "../../store/useConsultantReportStore";

export default function GenerateReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    reportForm,
    generating,
    showSuccess,
    setReportField,
    setShowSuccess,
    generateReport,
    resetForm,
  } = useConsultantReportStore();

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, setShowSuccess]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateReport();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Success Popup */}
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-scaleIn">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 animate-bounce">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Report Generated!</h3>
                  <p className="text-gray-600 mb-6">Your report is ready for download</p>
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
              to={`/consultant/client/${id}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Client Details</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Client Report</h1>
            <p className="text-gray-600">Create a comprehensive report for your client</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Configuration */}
            <div className="lg:col-span-2">
              <form onSubmit={handleGenerate} className="space-y-6">
                {/* Report Type */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-teal-600" />
                    Report Configuration
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Report Type
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { value: "comprehensive", label: "Comprehensive", desc: "Full detailed report" },
                          { value: "summary", label: "Summary", desc: "Quick overview" },
                          { value: "financial", label: "Financial Only", desc: "Focus on finances" },
                          { value: "progress", label: "Progress Tracking", desc: "Track milestones" },
                        ].map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setReportField("reportType", type.value)}
                            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                              reportForm.reportType === type.value
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {reportForm.reportType === type.value && (
                              <div className="absolute top-3 right-3">
                                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            )}
                            <p className={`font-semibold mb-1 ${reportForm.reportType === type.value ? "text-teal-900" : "text-gray-900"}`}>
                              {type.label}
                            </p>
                            <p className="text-sm text-gray-600">{type.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date Range
                      </label>
                      <select
                        value={reportForm.dateRange}
                        onChange={(e) => setReportField("dateRange", e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="last-week">Last Week</option>
                        <option value="last-month">Last Month</option>
                        <option value="last-quarter">Last Quarter</option>
                        <option value="last-year">Last Year</option>
                        <option value="all-time">All Time</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Include Sections */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Include in Report</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={reportForm.includeFinancials}
                        onChange={(e) => setReportField("includeFinancials", e.target.checked)}
                        className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-5 h-5 text-teal-600" />
                          <p className="font-semibold text-gray-900">Financial Analysis</p>
                        </div>
                        <p className="text-sm text-gray-600">Revenue, expenses, and profit margins</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={reportForm.includeProgress}
                        onChange={(e) => setReportField("includeProgress", e.target.checked)}
                        className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-5 h-5 text-teal-600" />
                          <p className="font-semibold text-gray-900">Progress Tracking</p>
                        </div>
                        <p className="text-sm text-gray-600">Goals achieved and milestones reached</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={reportForm.includeRecommendations}
                        onChange={(e) => setReportField("includeRecommendations", e.target.checked)}
                        className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-5 h-5 text-teal-600" />
                          <p className="font-semibold text-gray-900">Recommendations</p>
                        </div>
                        <p className="text-sm text-gray-600">Strategic suggestions and next steps</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Custom Notes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Notes</h2>
                  <textarea
                    value={reportForm.customNotes}
                    onChange={(e) => setReportField("customNotes", e.target.value)}
                    rows={6}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Add any custom notes or comments to include in the report..."
                  />
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Generate Report
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Report Preview</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-semibold text-gray-700">Client</p>
                    </div>
                    <p className="text-sm text-gray-900">Tech Innovators Inc.</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-semibold text-gray-700">Period</p>
                    </div>
                    <p className="text-sm text-gray-900 capitalize">{reportForm.dateRange.replace("-", " ")}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <p className="text-sm font-semibold text-gray-700">Type</p>
                    </div>
                    <p className="text-sm text-gray-900 capitalize">{reportForm.reportType} Report</p>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <p className="text-sm text-teal-800 mb-2">
                      <span className="font-semibold">Sections Included:</span>
                    </p>
                    <ul className="space-y-1">
                      {reportForm.includeFinancials && (
                        <li className="text-sm text-teal-700 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Financial Analysis
                        </li>
                      )}
                      {reportForm.includeProgress && (
                        <li className="text-sm text-teal-700 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Progress Tracking
                        </li>
                      )}
                      {reportForm.includeRecommendations && (
                        <li className="text-sm text-teal-700 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Recommendations
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Report will be generated in PDF format
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
