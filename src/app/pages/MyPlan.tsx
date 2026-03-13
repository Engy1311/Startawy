import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Package, Check, ArrowRight, TrendingUp, Calendar, Star } from "lucide-react";
import { Link } from "react-router";

export function MyPlan() {
  const currentPlan = {
    name: "Basic",
    price: "$99",
    period: "/month",
    startDate: "Feb 1, 2026",
    nextBilling: "Apr 1, 2026",
    status: "Active",
  };

  const plans = [
    {
      id: 1,
      name: "Free Trial",
      price: "$0",
      period: "/forever",
      description: "Perfect for exploring our platform",
      features: [
        "Limited access to reports",
        "Basic AI chatbot access",
        "Limited consultations",
        "Community support",
      ],
      color: "gray",
      isCurrent: false,
      recommended: false,
    },
    {
      id: 2,
      name: "Basic",
      price: "$99",
      period: "/month",
      description: "Ideal for growing startups",
      features: [
        "Full access to market reports",
        "Budget analysis tools",
        "AI advisory chatbot",
        "Request marketing research template",
        "Email support",
        "Monthly financial reviews",
      ],
      color: "teal",
      isCurrent: true,
      recommended: false,
    },
    {
      id: 3,
      name: "Premium",
      price: "$299",
      period: "/month",
      description: "Best for scaling businesses",
      features: [
        "All Basic features",
        "Private consultant sessions",
        "Financial performance dashboard",
        "One-year follow-up support",
        "Dedicated account manager",
        "24/7 priority support",
        "Quarterly strategy sessions",
      ],
      color: "purple",
      isCurrent: false,
      recommended: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Startawy Plan</h1>
            <p className="text-gray-600">Manage your subscription and explore upgrade options</p>
          </div>

          {/* Current Plan Card */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg p-8 text-white mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-6 h-6" />
                  <span className="text-teal-100 text-sm font-medium">Current Plan</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{currentPlan.name} Plan</h2>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{currentPlan.price}</span>
                  <span className="text-xl">{currentPlan.period}</span>
                </div>
              </div>
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                {currentPlan.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-white border-opacity-20">
              <div>
                <p className="text-teal-100 text-sm mb-1">Started</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <p className="font-semibold">{currentPlan.startDate}</p>
                </div>
              </div>
              <div>
                <p className="text-teal-100 text-sm mb-1">Next Billing</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <p className="font-semibold">{currentPlan.nextBilling}</p>
                </div>
              </div>
              <div>
                <p className="text-teal-100 text-sm mb-1">Sessions This Month</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <p className="font-semibold">3 / 5 Used</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link 
                to="/plans"
                className="px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2"
              >
                Upgrade Plan
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors font-semibold">
                Cancel Subscription
              </button>
            </div>
          </div>

          {/* Available Plans */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${
                    plan.isCurrent 
                      ? "ring-2 ring-teal-500" 
                      : "hover:shadow-xl"
                  } ${plan.recommended ? "relative" : ""}`}
                >
                  {plan.recommended && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-semibold">
                        <Star className="w-3 h-3 fill-white" />
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <div className={`bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 p-6 text-white`}>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-lg">{plan.period}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                        Features:
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.isCurrent ? (
                      <button className="w-full px-4 py-3 bg-gray-100 text-gray-600 rounded-lg font-semibold cursor-not-allowed">
                        Current Plan
                      </button>
                    ) : (
                      <Link
                        to={`/payment?plan=${plan.name.toLowerCase()}`}
                        className="block w-full text-center px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-semibold"
                      >
                        {plan.id > 2 ? "Upgrade Now" : "Switch Plan"}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Benefits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Upgrade?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Better Insights</h4>
                  <p className="text-sm text-gray-600">
                    Access advanced analytics and AI-powered recommendations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">More Sessions</h4>
                  <p className="text-sm text-gray-600">
                    Get unlimited consultant sessions with Premium
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Priority Support</h4>
                  <p className="text-sm text-gray-600">
                    Get dedicated support and faster response times
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}