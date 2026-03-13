import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Users, Edit, Trash2, CheckCircle, XCircle, Star, TrendingUp, DollarSign, Calendar, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ManageConsultants() {
  const navigate = useNavigate();
  const [consultants] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      specialty: "Financial Strategy",
      rating: 4.9,
      totalSessions: 156,
      totalEarnings: "$42,380",
      status: "active",
      joinDate: "Jan 2025",
      availability: "Available",
      clients: 48,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@example.com",
      specialty: "Investment Planning",
      rating: 4.8,
      totalSessions: 134,
      totalEarnings: "$38,920",
      status: "active",
      joinDate: "Feb 2025",
      availability: "Available",
      clients: 42,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      specialty: "Business Consulting",
      rating: 4.7,
      totalSessions: 98,
      totalEarnings: "$29,400",
      status: "inactive",
      joinDate: "Mar 2025",
      availability: "On Leave",
      clients: 35,
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@example.com",
      specialty: "Market Analysis",
      rating: 4.9,
      totalSessions: 189,
      totalEarnings: "$56,700",
      status: "active",
      joinDate: "Dec 2024",
      availability: "Available",
      clients: 62,
    },
  ]);

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
                        {consultant.status === "active" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            <XCircle className="w-3 h-3" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-teal-50 text-teal-600 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
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