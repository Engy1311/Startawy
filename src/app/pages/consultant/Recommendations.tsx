import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Target, Send, Edit, Trash2, Plus, Calendar, User, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Recommendations() {
  const [showNewRecommendation, setShowNewRecommendation] = useState(false);
  
  const recommendations = [
    {
      id: 1,
      clientName: "John Doe",
      clientCompany: "TechStart Inc.",
      title: "Financial Restructuring Plan",
      description: "Implement a comprehensive financial restructuring to optimize cash flow and reduce operational costs by 15-20%.",
      priority: "High",
      status: "Pending Review",
      sentDate: "Mar 6, 2026",
      category: "Financial Strategy",
    },
    {
      id: 2,
      clientName: "Sarah Miller",
      clientCompany: "HealthTech Solutions",
      title: "Investment Portfolio Diversification",
      description: "Diversify current investment portfolio to include growth stocks (40%), bonds (30%), and alternative assets (30%).",
      priority: "Medium",
      status: "Accepted",
      sentDate: "Mar 4, 2026",
      category: "Investment Planning",
    },
    {
      id: 3,
      clientName: "Michael Brown",
      clientCompany: "EcoStart",
      title: "Market Expansion Strategy",
      description: "Expand into European markets with a phased approach: UK (Q2), Germany (Q3), France (Q4). Estimated investment: $500K.",
      priority: "High",
      status: "In Progress",
      sentDate: "Mar 2, 2026",
      category: "Business Strategy",
    },
    {
      id: 4,
      clientName: "Lisa Chen",
      clientCompany: "AI Innovations",
      title: "Cost Optimization Plan",
      description: "Reduce SaaS subscriptions and negotiate vendor contracts to save approximately $50K annually.",
      priority: "Low",
      status: "Completed",
      sentDate: "Feb 28, 2026",
      category: "Cost Management",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": 
        return {
          bg: "bg-red-100",
          text: "text-red-700"
        };
      case "Medium": 
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700"
        };
      case "Low": 
        return {
          bg: "bg-blue-100",
          text: "text-blue-700"
        };
      default: 
        return {
          bg: "bg-gray-100",
          text: "text-gray-700"
        };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": 
        return {
          bg: "bg-green-100",
          text: "text-green-700"
        };
      case "In Progress": 
        return {
          bg: "bg-blue-100",
          text: "text-blue-700"
        };
      case "Completed": 
        return {
          bg: "bg-teal-100",
          text: "text-teal-700"
        };
      case "Pending Review": 
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700"
        };
      default: 
        return {
          bg: "bg-gray-100",
          text: "text-gray-700"
        };
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Recommendations</h1>
              <p className="text-gray-600">Create and manage strategic recommendations for your clients</p>
            </div>
            <button 
              onClick={() => setShowNewRecommendation(!showNewRecommendation)}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Recommendation
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-gray-600">Total Recommendations</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{recommendations.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-yellow-600" />
                <p className="text-sm text-gray-600">Pending Review</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {recommendations.filter(r => r.status === "Pending Review").length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {recommendations.filter(r => r.status === "In Progress").length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Send className="w-6 h-6 text-green-600" />
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {recommendations.filter(r => r.status === "Completed").length}
              </p>
            </div>
          </div>

          {/* New Recommendation Form */}
          {showNewRecommendation && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Recommendation</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option>Select client...</option>
                      <option>John Doe - TechStart Inc.</option>
                      <option>Sarah Miller - HealthTech Solutions</option>
                      <option>Michael Brown - EcoStart</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option>Financial Strategy</option>
                      <option>Investment Planning</option>
                      <option>Business Strategy</option>
                      <option>Cost Management</option>
                      <option>Market Analysis</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Financial Restructuring Plan"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide detailed recommendations and action items..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setShowNewRecommendation(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-semibold flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Recommendation
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations List */}
          <div className="space-y-6">
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{recommendation.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {recommendation.clientName} - {recommendation.clientCompany}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{recommendation.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                          {recommendation.category}
                        </span>
                        <span className={`px-3 py-1 ${getPriorityColor(recommendation.priority).bg} ${getPriorityColor(recommendation.priority).text} rounded-full text-xs font-medium`}>
                          {recommendation.priority} Priority
                        </span>
                        <span className={`px-3 py-1 ${getStatusColor(recommendation.status).bg} ${getStatusColor(recommendation.status).text} rounded-full text-xs font-medium`}>
                          {recommendation.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-teal-50 text-teal-600 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Sent on {recommendation.sentDate}</span>
                  </div>
                  <Link to="/consultant/startup-details" className="text-sm text-teal-600 hover:text-teal-700 font-semibold">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}