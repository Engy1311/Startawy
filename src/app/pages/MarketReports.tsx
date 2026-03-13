import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Download, FileText, TrendingUp, Calendar } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Q1 2026 Fintech Market Analysis",
    category: "Fintech",
    date: "March 1, 2026",
    pages: 48,
    description: "Comprehensive analysis of the fintech sector including digital payments, blockchain, and neobanking trends.",
    color: "from-teal-500 to-teal-600",
  },
  {
    id: 2,
    title: "SaaS Growth Strategies 2026",
    category: "SaaS",
    date: "February 15, 2026",
    pages: 36,
    description: "Latest trends in SaaS business models, pricing strategies, and customer acquisition costs.",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 3,
    title: "E-commerce Industry Report",
    category: "E-commerce",
    date: "February 28, 2026",
    pages: 52,
    description: "Deep dive into e-commerce trends, consumer behavior, and emerging technologies in online retail.",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    title: "AI & Machine Learning in Business",
    category: "Technology",
    date: "January 20, 2026",
    pages: 44,
    description: "How AI and ML are transforming business operations, customer service, and decision-making.",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 5,
    title: "Startup Funding Landscape 2026",
    category: "Investment",
    date: "January 10, 2026",
    pages: 40,
    description: "Analysis of venture capital trends, funding rounds, and investor preferences for 2026.",
    color: "from-green-500 to-green-600",
  },
  {
    id: 6,
    title: "Digital Marketing ROI Report",
    category: "Marketing",
    date: "March 5, 2026",
    pages: 32,
    description: "Data-driven insights on marketing channel performance, CAC, and conversion optimization.",
    color: "from-pink-500 to-pink-600",
  },
];

export function MarketReports() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Startawy Reports Library</h1>
            <p className="text-gray-600">Access industry insights, trends, and research reports</p>
          </div>

          {/* Featured Report */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  ⭐ Featured Report
                </div>
                <h2 className="text-3xl font-bold mb-3">Q1 2026 Fintech Market Analysis</h2>
                <p className="text-teal-100 mb-6 max-w-2xl leading-relaxed">
                  The most comprehensive analysis of the fintech sector including digital payments, 
                  blockchain technology, neobanking trends, and regulatory insights.
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>March 1, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    <span>48 pages</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Report
                </button>
              </div>
              <div className="hidden lg:block">
                <TrendingUp className="w-32 h-32 text-teal-300" />
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-6 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">
              All Reports
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-600 transition-colors font-medium">
              Fintech
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-600 transition-colors font-medium">
              SaaS
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-600 transition-colors font-medium">
              Technology
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-600 transition-colors font-medium">
              Investment
            </button>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Report Header */}
                <div className={`h-32 bg-gradient-to-r ${report.color} p-6 flex items-center justify-center`}>
                  <FileText className="w-16 h-16 text-white" />
                </div>

                {/* Report Content */}
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-3">
                    {report.category}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {report.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{report.pages} pages</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all font-medium text-sm flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-teal-500 hover:text-teal-600 transition-colors font-medium text-sm">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Request Custom Report */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Report?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our research team can create customized market research reports tailored to your 
              specific industry, competitors, and business needs.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold">
              Request Custom Report
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}