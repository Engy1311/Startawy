import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { CreditCard, Calendar, Download, Filter, Package, Users, DollarSign, CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function MyPayments() {
  const [filterType, setFilterType] = useState("all");
  
  const payments = [
    {
      id: 1,
      type: "plan",
      plan: "Premium Plan",
      amount: "$299.00",
      date: "Mar 1, 2026",
      status: "Completed",
      paymentMethod: "Visa •••• 4242",
      invoice: "INV-2026-001",
      nextBilling: "Apr 1, 2026",
    },
    {
      id: 2,
      type: "session",
      consultant: "Sarah Johnson",
      sessionType: "Financial Strategy",
      amount: "$150.00",
      date: "Feb 28, 2026",
      status: "Completed",
      paymentMethod: "Visa •••• 4242",
      invoice: "INV-2026-002",
    },
    {
      id: 3,
      type: "plan",
      plan: "Basic Plan",
      amount: "$99.00",
      date: "Feb 1, 2026",
      status: "Completed",
      paymentMethod: "Visa •••• 4242",
      invoice: "INV-2026-003",
      nextBilling: "Mar 1, 2026",
    },
    {
      id: 4,
      type: "session",
      consultant: "Michael Chen",
      sessionType: "Investment Planning",
      amount: "$175.00",
      date: "Jan 28, 2026",
      status: "Completed",
      paymentMethod: "Visa •••• 4242",
      invoice: "INV-2026-004",
    },
    {
      id: 5,
      type: "session",
      consultant: "Emily Rodriguez",
      sessionType: "Business Consulting",
      amount: "$160.00",
      date: "Jan 15, 2026",
      status: "Completed",
      paymentMethod: "Visa •••• 4242",
      invoice: "INV-2026-005",
    },
    {
      id: 6,
      type: "plan",
      plan: "Basic Plan",
      amount: "$99.00",
      date: "Jan 1, 2026",
      status: "Completed",
      paymentMethod: "Visa •••• 4242",
      invoice: "INV-2026-006",
      nextBilling: "Feb 1, 2026",
    },
  ];

  const filteredPayments = filterType === "all" 
    ? payments 
    : payments.filter(p => p.type === filterType);

  const totalSpent = payments.reduce((sum, p) => {
    const amount = parseFloat(p.amount.replace('$', '').replace(',', ''));
    return sum + amount;
  }, 0);

  const planPayments = payments.filter(p => p.type === "plan").length;
  const sessionPayments = payments.filter(p => p.type === "session").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Payments</h1>
            <p className="text-gray-600">View all your payment history and invoices</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-gray-600">Plan Payments</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{planPayments}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-gray-600">Session Payments</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{sessionPayments}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{payments.length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterType === "all"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Payments
                </button>
                <button
                  onClick={() => setFilterType("plan")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterType === "plan"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Plans Only
                </button>
                <button
                  onClick={() => setFilterType("session")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filterType === "session"
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Sessions Only
                </button>
              </div>
            </div>
          </div>

          {/* Payments List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {payment.type === "plan" ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                            <Package className="w-3 h-3" />
                            Plan
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            <Users className="w-3 h-3" />
                            Session
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {payment.type === "plan" ? (
                          <div>
                            <p className="font-semibold text-gray-900">{payment.plan}</p>
                            {payment.nextBilling && (
                              <p className="text-xs text-gray-500">Next billing: {payment.nextBilling}</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="font-semibold text-gray-900">{payment.sessionType}</p>
                            <p className="text-xs text-gray-500">with {payment.consultant}</p>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{payment.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{payment.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CreditCard className="w-4 h-4" />
                          <span className="text-sm">{payment.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm">
                          <Download className="w-4 h-4" />
                          {payment.invoice}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Visa •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2028</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/add-payment-method">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-semibold">
                    <Plus className="w-5 h-5" />
                    Add New Method
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}