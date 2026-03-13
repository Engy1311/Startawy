import { useParams, Link } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import {
  User,
  Building2,
  Mail,
  Briefcase,
  Calendar,
  FileText,
  Download,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  Plus,
} from "lucide-react";

export default function ClientDetails() {
  const { id } = useParams();

  const client = {
    id: 1,
    name: "Ahmed Hassan",
    company: "TechStart Inc.",
    email: "ahmed@techstart.com",
    industry: "Technology",
    businessStage: "Growing",
    joinedDate: "Jan 15, 2026",
    totalSessions: 8,
    upcomingSessions: 2,
    totalRevenue: "$2,400",
    status: "active",
  };

  const financialDocuments = [
    {
      id: 1,
      name: "Q4 Financial Report 2025",
      type: "PDF",
      uploadDate: "Feb 28, 2026",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Budget Analysis Jan 2026",
      type: "Excel",
      uploadDate: "Jan 30, 2026",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Cash Flow Statement",
      type: "PDF",
      uploadDate: "Jan 15, 2026",
      size: "1.2 MB",
    },
  ];

  const consultationHistory = [
    {
      id: 1,
      date: "Mar 5, 2026",
      topic: "Budget Optimization Strategy",
      duration: "60 min",
      status: "Completed",
      notes: "Discussed cost reduction strategies and implemented new budget framework",
    },
    {
      id: 2,
      date: "Feb 20, 2026",
      topic: "Financial Planning Q1 2026",
      duration: "45 min",
      status: "Completed",
      notes: "Reviewed Q1 projections and adjusted spending allocations",
    },
    {
      id: 3,
      date: "Feb 5, 2026",
      topic: "Cash Flow Management",
      duration: "60 min",
      status: "Completed",
      notes: "Analyzed cash flow patterns and provided recommendations",
    },
  ];

  const businessInfo = {
    businessModel: "B2B SaaS Platform",
    employees: "15-20",
    monthlyRevenue: "$45,000",
    fundingStage: "Series A",
    primaryGoals: "Scale operations and optimize costs",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Back Button */}
          <Link
            to="/consultant/my-clients"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors font-medium"
          >
            ← Back to My Clients
          </Link>

          {/* Client Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {client.name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>{client.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{client.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      {client.industry}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Review / Recommendation
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{client.totalSessions}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{client.upcomingSessions}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{client.totalRevenue}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Member Since</p>
              <p className="text-lg font-bold text-gray-900">{client.joinedDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Business Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-teal-600" />
                  Business Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Business Model</label>
                    <p className="text-gray-900 font-medium">{businessInfo.businessModel}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Number of Employees</label>
                    <p className="text-gray-900 font-medium">{businessInfo.employees}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Monthly Revenue</label>
                    <p className="text-gray-900 font-medium">{businessInfo.monthlyRevenue}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Funding Stage</label>
                    <p className="text-gray-900 font-medium">{businessInfo.fundingStage}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600 mb-1 block">Primary Goals</label>
                    <p className="text-gray-900 font-medium">{businessInfo.primaryGoals}</p>
                  </div>
                </div>
              </div>

              {/* Financial Documents */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-teal-600" />
                  Uploaded Financial Documents
                </h2>
                <div className="space-y-4">
                  {financialDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">
                            {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-teal-600 hover:bg-teal-100 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation History */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-teal-600" />
                  Consultation History
                </h2>
                <div className="space-y-4">
                  {consultationHistory.map((session) => (
                    <div
                      key={session.id}
                      className="p-5 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{session.topic}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.duration}
                            </span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {session.status}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{session.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Link to={`/consultant/client/${id}/schedule-meeting`}>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Schedule Session
                    </button>
                  </Link>
                  <Link to={`/consultant/client/${id}/add-review`}>
                    <button className="w-full px-4 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium flex items-center justify-center gap-2">
                      <Star className="w-5 h-5" />
                      Add Review
                    </button>
                  </Link>
                  <Link to={`/consultant/client/${id}/generate-report`}>
                    <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5" />
                      Generate Report
                    </button>
                  </Link>
                  <Link to={`/consultant/client/${id}/send-message`}>
                    <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5" />
                      Send Message
                    </button>
                  </Link>
                </div>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Client Performance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className="font-semibold text-gray-900">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold text-gray-900">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satisfaction</span>
                      <span className="font-semibold text-gray-900">4.8/5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}