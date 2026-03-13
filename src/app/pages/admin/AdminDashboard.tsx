import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Users, UserCheck, Package, DollarSign, TrendingUp, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: "1,284",
      trend: "+156 this month",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      icon: UserCheck,
      label: "Active Subscriptions",
      value: "892",
      trend: "+12% vs last month",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: "$124,500",
      trend: "+$18,200 this month",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Package,
      label: "Total Consultants",
      value: "47",
      trend: "+5 this month",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const revenueData = [
    { id: 'admin-rev-aug', month: "Aug", revenue: 85000 },
    { id: 'admin-rev-sep', month: "Sep", revenue: 92000 },
    { id: 'admin-rev-oct', month: "Oct", revenue: 98000 },
    { id: 'admin-rev-nov', month: "Nov", revenue: 105000 },
    { id: 'admin-rev-dec', month: "Dec", revenue: 112000 },
    { id: 'admin-rev-jan', month: "Jan", revenue: 118000 },
    { id: 'admin-rev-feb', month: "Feb", revenue: 124500 },
    { id: 'admin-rev-mar', month: "Mar", revenue: 135000 },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed@techstart.com",
      role: "Founder",
      plan: "Premium",
      status: "Active",
      joinedDate: "Mar 5, 2026",
    },
    {
      id: 2,
      name: "Dr. Sara Mohamed",
      email: "sara@consultant.com",
      role: "Consultant",
      plan: "N/A",
      status: "Active",
      joinedDate: "Mar 4, 2026",
    },
    {
      id: 3,
      name: "Omar Ali",
      email: "omar@healthtech.com",
      role: "Founder",
      plan: "Basic",
      status: "Active",
      joinedDate: "Mar 3, 2026",
    },
    {
      id: 4,
      name: "Layla Ahmed",
      email: "layla@fashion.com",
      role: "Founder",
      plan: "Free Trial",
      status: "Active",
      joinedDate: "Mar 2, 2026",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      <div className="flex-1">
        <TopBar userRole="admin" />

        <main className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-gray-600">Here's your platform overview for today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-xs text-teal-600 font-medium">{stat.trend}</p>
                </div>
              );
            })}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">+23.5% vs last period</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
              <a href="/admin/founders" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                View All
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.plan}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.joinedDate}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <a
              href="/admin/founders"
              className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
            >
              <UserCheck className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Manage Founders</h3>
              <p className="text-teal-100 text-sm">View and manage startup founders</p>
            </a>
            <a
              href="/admin/consultants"
              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <Users className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Manage Consultants</h3>
              <p className="text-blue-100 text-sm">View and manage consultants</p>
            </a>
            <a
              href="/admin/packages"
              className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              <Package className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Manage Packages</h3>
              <p className="text-purple-100 text-sm">Edit plans and pricing</p>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}