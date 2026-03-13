import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Calendar, Users, DollarSign, Clock, TrendingUp, CheckCircle } from "lucide-react";

export default function ConsultantDashboard() {
  const stats = [
    {
      icon: Calendar,
      label: "Upcoming Sessions",
      value: "12",
      trend: "+3 this week",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      icon: Users,
      label: "Active Clients",
      value: "28",
      trend: "+5 this month",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: DollarSign,
      label: "Monthly Earnings",
      value: "$4,500",
      trend: "+12% vs last month",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Clock,
      label: "Hours This Month",
      value: "45",
      trend: "36 hours remaining",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      client: "Ahmed Hassan",
      company: "TechStart Inc.",
      date: "Today, 2:00 PM",
      type: "Financial Review",
      status: "confirmed",
    },
    {
      id: 2,
      client: "Sara Mohamed",
      company: "E-Commerce Plus",
      date: "Tomorrow, 10:00 AM",
      type: "Budget Planning",
      status: "confirmed",
    },
    {
      id: 3,
      client: "Omar Ali",
      company: "HealthTech Solutions",
      date: "Mar 10, 3:00 PM",
      type: "Investment Strategy",
      status: "pending",
    },
  ];

  const recentClients = [
    {
      id: 1,
      name: "Ahmed Hassan",
      company: "TechStart Inc.",
      industry: "Technology",
      sessions: 8,
      lastSession: "2 days ago",
    },
    {
      id: 2,
      name: "Sara Mohamed",
      company: "E-Commerce Plus",
      industry: "E-Commerce",
      sessions: 5,
      lastSession: "1 week ago",
    },
    {
      id: 3,
      name: "Omar Ali",
      company: "HealthTech Solutions",
      industry: "Healthcare",
      sessions: 3,
      lastSession: "3 days ago",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-gray-600">Here's your consultant overview for today.</p>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-xs text-teal-600 font-medium">{stat.trend}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
                <a href="/consultant/sessions" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{session.client}</h3>
                        <p className="text-sm text-gray-600">{session.company}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.date}
                      </span>
                      <span>{session.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Clients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Clients</h2>
                <a href="/consultant/clients" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                        <p className="text-sm text-gray-600">{client.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {client.industry}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{client.sessions} sessions</span>
                      <span className="text-xs">Last: {client.lastSession}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mt-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">This Month's Performance</h3>
                <p className="text-teal-100">You're on track to exceed your monthly goals!</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-12 h-12" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}