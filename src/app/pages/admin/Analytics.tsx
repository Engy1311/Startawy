import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { TrendingUp, Users, DollarSign, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Analytics() {
  const revenueData = [
    { month: "Jan", revenue: 42000, sessions: 145, id: "jan-data" },
    { month: "Feb", revenue: 38000, sessions: 132, id: "feb-data" },
    { month: "Mar", revenue: 45000, sessions: 156, id: "mar-data" },
    { month: "Apr", revenue: 51000, sessions: 178, id: "apr-data" },
    { month: "May", revenue: 48000, sessions: 165, id: "may-data" },
    { month: "Jun", revenue: 55000, sessions: 189, id: "jun-data" },
  ];

  const packageDistribution = [
    { name: "Free Trial", value: 145, color: "#9CA3AF", id: "free-pkg" },
    { name: "Basic", value: 428, color: "#14b8a6", id: "basic-pkg" },
    { name: "Premium", value: 319, color: "#9333ea", id: "premium-pkg" },
  ];

  const consultantPerformance = [
    { name: "Sarah J.", sessions: 156, earnings: 23400, rating: 4.9, id: "sarah-perf" },
    { name: "Michael C.", sessions: 134, earnings: 20100, rating: 4.8, id: "michael-perf" },
    { name: "Emily R.", sessions: 98, earnings: 14700, rating: 4.7, id: "emily-perf" },
    { name: "David K.", sessions: 189, earnings: 28350, rating: 4.9, id: "david-perf" },
  ];

  const metrics = [
    {
      title: "Total Revenue",
      value: "$279K",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      id: "revenue-metric"
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8.3%",
      trend: "up",
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      id: "users-metric"
    },
    {
      title: "Total Sessions",
      value: "965",
      change: "+15.2%",
      trend: "up",
      icon: Calendar,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      id: "sessions-metric"
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "-0.1",
      trend: "down",
      icon: TrendingUp,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      id: "rating-metric"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track platform performance and insights</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                    </div>
                    <div className={`flex items-center gap-1 ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {metric.trend === "up" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-semibold">{metric.change}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#14b8a6" 
                    strokeWidth={3}
                    dot={{ fill: "#14b8a6", r: 4 }}
                    name="Revenue ($)"
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Package Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Package Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={packageDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                    isAnimationActive={false}
                  >
                    {packageDistribution.map((entry, index) => (
                      <Cell key={`cell-${entry.id}-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sessions Over Time */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Sessions Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#14b8a6" name="Sessions" radius={[8, 8, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Consultant Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Consultant Performance</h3>
            
            {/* Performance Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Consultant</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Sessions</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Earnings</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg. Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {consultantPerformance.map((consultant) => (
                    <tr key={consultant.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{consultant.name}</div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          {consultant.sessions}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-semibold text-gray-900">
                          ${consultant.earnings.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium text-gray-900">{consultant.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sessions Chart */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Sessions Comparison</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={consultantPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#9333ea" name="Sessions" radius={[0, 8, 8, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}