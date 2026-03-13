import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Building2, Calendar, TrendingUp, Eye } from "lucide-react";
import { Link } from "react-router";

export default function MyClients() {
  const clients = [
    {
      id: 1,
      name: "Ahmed Hassan",
      company: "TechStart Inc.",
      industry: "Technology",
      joinedDate: "Jan 15, 2026",
      totalSessions: 8,
      upcomingSessions: 2,
      status: "active",
      revenue: "$2,400",
    },
    {
      id: 2,
      name: "Sara Mohamed",
      company: "E-Commerce Plus",
      industry: "E-Commerce",
      joinedDate: "Feb 1, 2026",
      totalSessions: 5,
      upcomingSessions: 1,
      status: "active",
      revenue: "$1,500",
    },
    {
      id: 3,
      name: "Omar Ali",
      company: "HealthTech Solutions",
      industry: "Healthcare",
      joinedDate: "Dec 10, 2025",
      totalSessions: 12,
      upcomingSessions: 3,
      status: "active",
      revenue: "$3,600",
    },
    {
      id: 4,
      name: "Layla Ahmed",
      company: "Fashion Hub",
      industry: "Fashion",
      joinedDate: "Nov 20, 2025",
      totalSessions: 6,
      upcomingSessions: 0,
      status: "inactive",
      revenue: "$1,800",
    },
    {
      id: 5,
      name: "Khaled Ibrahim",
      company: "Food Delivery Co.",
      industry: "Food & Beverage",
      joinedDate: "Jan 5, 2026",
      totalSessions: 4,
      upcomingSessions: 1,
      status: "active",
      revenue: "$1,200",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                  <p className="text-sm text-gray-600">Total Clients</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {clients.filter((c) => c.status === "active").length}
                  </p>
                  <p className="text-sm text-gray-600">Active Clients</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {clients.reduce((sum, c) => sum + c.totalSessions, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {clients.reduce((sum, c) => sum + c.upcomingSessions, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Industry</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sessions</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Upcoming</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-600">{client.company}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {client.industry}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{client.joinedDate}</td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium">{client.totalSessions}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-teal-600 font-medium">{client.upcomingSessions}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-semibold">{client.revenue}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            client.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/consultant/client/${client.id}`}>
                          <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </Link>
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