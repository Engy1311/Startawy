import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { TrendingUp, TrendingDown, DollarSign, Upload, Sparkles } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router";

const expenseData = [
  { category: "Marketing", amount: 15000, percentage: 30 },
  { category: "Operations", amount: 10000, percentage: 20 },
  { category: "Salaries", amount: 20000, percentage: 40 },
  { category: "Technology", amount: 5000, percentage: 10 },
];

const monthlyData = [
  { month: "Jan", income: 45000, expenses: 35000 },
  { month: "Feb", income: 52000, expenses: 38000 },
  { month: "Mar", income: 48000, expenses: 40000 },
  { month: "Apr", income: 61000, expenses: 42000 },
  { month: "May", income: 55000, expenses: 39000 },
  { month: "Jun", income: 67000, expenses: 50000 },
];

const COLORS = ["#14b8a6", "#3b82f6", "#f97316", "#8b5cf6"];

export function BudgetAnalysis() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Analysis</h1>
            <p className="text-gray-600">Comprehensive financial insights and AI-powered recommendations</p>
          </div>

          {/* Upload Section */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Upload Financial Data</h2>
                <p className="text-teal-100 mb-4">
                  Upload your financial statements to get AI-powered insights and recommendations
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-all cursor-pointer font-semibold shadow-lg">
                  <Upload className="w-5 h-5" />
                  {uploadedFile ? uploadedFile : "Choose File"}
                  <input type="file" className="hidden" accept=".csv,.xlsx,.pdf" onChange={handleFileUpload} />
                </label>
              </div>
              <div className="hidden md:block">
                <Sparkles className="w-24 h-24 text-teal-200" />
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600">+15.3%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$67,000</h3>
              <p className="text-gray-600 text-sm">Total Income (Jun)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-sm font-medium text-red-600">+28.2%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$50,000</h3>
              <p className="text-gray-600 text-sm">Total Expenses (Jun)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-green-600">Profit</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">$17,000</h3>
              <p className="text-gray-600 text-sm">Net Profit (Jun)</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Income vs Expenses */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Income vs Expenses (6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#14b8a6" name="Income" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expenses" fill="#f97316" name="Expenses" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">AI-Powered Recommendations</h2>
                <p className="text-gray-600 text-sm">Based on your financial data analysis</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-teal-500 bg-teal-50 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-2">💡 Optimize Marketing Spend</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Your marketing expenses are 30% of total costs. Consider reallocating 10% to digital
                  channels with higher ROI based on industry benchmarks.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📊 Revenue Growth Opportunity</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Your revenue has grown 15.3% this month. Maintain this momentum by investing in customer
                  retention programs, which typically cost 5x less than acquisition.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ Expense Trend Alert</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Operational expenses increased by 28.2% last month. Review vendor contracts and consider
                  negotiating better rates or exploring alternative suppliers.
                </p>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-2">✅ Cash Flow Health</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Your profit margin is healthy at 25.4%. Consider setting aside 20% for emergency reserves
                  and 30% for growth investments.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link to="/generate-budget-report">
                <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-semibold">
                  Generate Detailed Report
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}