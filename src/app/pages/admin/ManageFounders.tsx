import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Search, Filter, Edit, Trash2, Eye, UserX, UserCheck } from "lucide-react";
import { useState } from "react";

export default function ManageFounders() {
  const [searchTerm, setSearchTerm] = useState("");

  const founders = [
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed@techstart.com",
      company: "TechStart Inc.",
      plan: "Premium",
      status: "Active",
      joinedDate: "Jan 15, 2026",
      sessions: 12,
      revenue: "$299",
    },
    {
      id: 2,
      name: "Omar Ali",
      email: "omar@healthtech.com",
      company: "HealthTech Solutions",
      plan: "Basic",
      status: "Active",
      joinedDate: "Dec 10, 2025",
      sessions: 8,
      revenue: "$99",
    },
    {
      id: 3,
      name: "Layla Ahmed",
      email: "layla@fashion.com",
      company: "Fashion Hub",
      plan: "Free Trial",
      status: "Active",
      joinedDate: "Feb 20, 2026",
      sessions: 2,
      revenue: "$0",
    },
    {
      id: 4,
      name: "Khaled Ibrahim",
      email: "khaled@fooddelivery.com",
      company: "Food Delivery Co.",
      plan: "Basic",
      status: "Inactive",
      joinedDate: "Nov 5, 2025",
      sessions: 5,
      revenue: "$99",
    },
    {
      id: 5,
      name: "Mona Salem",
      email: "mona@edutech.com",
      company: "EduTech Platform",
      plan: "Premium",
      status: "Active",
      joinedDate: "Jan 1, 2026",
      sessions: 15,
      revenue: "$299",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      <div className="flex-1">
        <TopBar userRole="admin" />

        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Founders</h1>
            <p className="text-gray-600">Manage and monitor all registered startup founders</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Total Founders</p>
              <p className="text-3xl font-bold text-gray-900">{founders.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Active Users</p>
              <p className="text-3xl font-bold text-green-600">
                {founders.filter((f) => f.status === "Active").length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Premium Users</p>
              <p className="text-3xl font-bold text-purple-600">
                {founders.filter((f) => f.plan === "Premium").length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-teal-600">
                ${founders.reduce((sum, f) => sum + parseInt(f.revenue.replace("$", "")), 0)}
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Founders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Founder</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sessions</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {founders.map((founder) => (
                    <tr key={founder.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{founder.name}</p>
                          <p className="text-sm text-gray-600">{founder.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{founder.company}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            founder.plan === "Premium"
                              ? "bg-purple-100 text-purple-700"
                              : founder.plan === "Basic"
                              ? "bg-teal-100 text-teal-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {founder.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            founder.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {founder.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{founder.sessions}</td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-semibold">{founder.revenue}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{founder.joinedDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          {founder.status === "Active" ? (
                            <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                              <UserX className="w-4 h-4" />
                            </button>
                          ) : (
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <UserCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
    </div>
  );
}