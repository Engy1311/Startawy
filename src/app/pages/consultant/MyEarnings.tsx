import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MyEarnings() {
  const earningsData = [
    { id: 'earn-aug', month: "Aug", earnings: 3200 },
    { id: 'earn-sep', month: "Sep", earnings: 3800 },
    { id: 'earn-oct', month: "Oct", earnings: 4100 },
    { id: 'earn-nov', month: "Nov", earnings: 3900 },
    { id: 'earn-dec', month: "Dec", earnings: 4300 },
    { id: 'earn-jan', month: "Jan", earnings: 4000 },
    { id: 'earn-feb', month: "Feb", earnings: 4500 },
    { id: 'earn-mar', month: "Mar", earnings: 4800 },
  ];

  const paymentHistory = [
    {
      id: 1,
      date: "March 1, 2026",
      amount: "$4,500",
      client: "Multiple Clients",
      sessions: 15,
      status: "paid",
      method: "Bank Transfer",
    },
    {
      id: 2,
      date: "February 1, 2026",
      amount: "$4,000",
      client: "Multiple Clients",
      sessions: 13,
      status: "paid",
      method: "Bank Transfer",
    },
    {
      id: 3,
      date: "January 1, 2026",
      amount: "$4,300",
      client: "Multiple Clients",
      sessions: 14,
      status: "paid",
      method: "Bank Transfer",
    },
    {
      id: 4,
      date: "December 1, 2025",
      amount: "$3,900",
      client: "Multiple Clients",
      sessions: 12,
      status: "paid",
      method: "Bank Transfer",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">$4,500</h3>
              <p className="text-teal-100">This Month</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$32,600</h3>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">45</h3>
              <p className="text-sm text-gray-600">Sessions This Month</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$100</h3>
              <p className="text-sm text-gray-600">Avg. Per Session</p>
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Earnings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`$${value}`, "Earnings"]}
                />
                <Bar dataKey="earnings" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sessions</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment Method</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-bold text-lg">{payment.amount}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{payment.client}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{payment.sessions} sessions</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600">{payment.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {payment.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Next Payment Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Next Payment</h3>
                <p className="text-blue-700">Your next payment of <span className="font-bold">$4,500</span> is scheduled for <span className="font-bold">April 1, 2026</span></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}