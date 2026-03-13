import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { TrendingUp, DollarSign, Users, Calendar, ArrowUpRight, ArrowDownRight, MessageSquare, FileText, Target } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router";

const revenueData = [
  { id: 'rev-jan', month: "Jan", revenue: 12000, expenses: 8000 },
  { id: 'rev-feb', month: "Feb", revenue: 19000, expenses: 9500 },
  { id: 'rev-mar', month: "Mar", revenue: 15000, expenses: 10000 },
  { id: 'rev-apr', month: "Apr", revenue: 25000, expenses: 11000 },
  { id: 'rev-may', month: "May", revenue: 22000, expenses: 10500 },
  { id: 'rev-jun', month: "Jun", revenue: 30000, expenses: 12000 },
];

const growthData = [
  { id: 'growth-jan', month: "Jan", value: 4000 },
  { id: 'growth-feb', month: "Feb", value: 9500 },
  { id: 'growth-mar', month: "Mar", value: 5000 },
  { id: 'growth-apr', month: "Apr", value: 14000 },
  { id: 'growth-may', month: "May", value: 11500 },
  { id: 'growth-jun', month: "Jun", value: 18000 },
];

export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="founder" />
      <div className="flex-1">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-gray-600">Here's what's happening with your startup today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+12.5%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$123,500</h3>
              <p className="text-gray-600 text-sm">Total Revenue</p>
            </div>

            {/* Monthly Profit */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+8.2%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$18,000</h3>
              <p className="text-gray-600 text-sm">Monthly Profit</p>
            </div>

            {/* Active Clients */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+15.3%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1,248</h3>
              <p className="text-gray-600 text-sm">Active Clients</p>
            </div>

            {/* Growth Rate */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>-2.4%</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">87.5%</h3>
              <p className="text-gray-600 text-sm">Target Achievement</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/budget-analysis"
                className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-xl text-white hover:shadow-lg transition-all"
              >
                <TrendingUp className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Budget Analysis</h3>
                <p className="text-teal-100 text-sm">Review your finances</p>
              </Link>

              <Link
                to="/ai-chatbot"
                className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white hover:shadow-lg transition-all"
              >
                <MessageSquare className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">AI Advisor</h3>
                <p className="text-blue-100 text-sm">Get instant insights</p>
              </Link>

              <Link
                to="/book-consultant"
                className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white hover:shadow-lg transition-all"
              >
                <Calendar className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Book Consultant</h3>
                <p className="text-purple-100 text-sm">Schedule a session</p>
              </Link>

              <Link
                to="/market-reports"
                className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white hover:shadow-lg transition-all"
              >
                <FileText className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Market Reports</h3>
                <p className="text-orange-100 text-sm">View industry data</p>
              </Link>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue vs Expenses */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue vs Expenses</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#14b8a6" 
                    strokeWidth={3} 
                    name="Revenue"
                    dot={{ fill: '#14b8a6', r: 4 }}
                    isAnimationActive={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#f97316" 
                    strokeWidth={3} 
                    name="Expenses"
                    dot={{ fill: '#f97316', r: 4 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Trend */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Growth Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#14b8a6" 
                    fill="#14b8a6" 
                    fillOpacity={0.2}
                    strokeWidth={3}
                    name="Growth"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities & Upcoming Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New payment received</p>
                    <p className="text-xs text-gray-500">$5,400 from Client XYZ</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Session scheduled</p>
                    <p className="text-xs text-gray-500">With Sarah Johnson - Financial Consultant</p>
                    <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New report available</p>
                    <p className="text-xs text-gray-500">Q1 2026 Market Analysis Report</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Sessions</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Financial Review</h4>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">Tomorrow</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">with Sarah Johnson</p>
                  <p className="text-xs text-gray-500">📅 March 9, 2026 - 10:00 AM</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Budget Planning</h4>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Mar 12</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">with Michael Chen</p>
                  <p className="text-xs text-gray-500">📅 March 12, 2026 - 2:00 PM</p>
                </div>

                <Link
                  to="/my-sessions"
                  className="block text-center py-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  View All Sessions →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}