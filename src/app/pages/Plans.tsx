import { Link } from "react-router";
import { Check } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    period: "/forever",
    description: "Perfect for getting started",
    features: [
      "Limited access to reports",
      "Basic AI chatbot access",
      "Limited consultations",
    ],
    notIncluded: [
      "Full market reports",
      "Budget analysis tools",
      "Private consultant sessions",
      "Follow-up support",
    ],
    color: "gray",
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Basic",
    price: "$99",
    period: "/month",
    description: "Great for growing startups",
    features: [
      "Full access to market reports",
      "Budget analysis tools",
      "AI advisory chatbot",
      "Request marketing research template",
      "Email support",
    ],
    notIncluded: [
      "Private consultant sessions",
      "Financial performance dashboard",
      "One-year follow-up support",
    ],
    color: "teal",
    gradient: "from-teal-500 to-teal-600",
    popular: true,
  },
  {
    name: "Premium",
    price: "$299",
    period: "/month",
    description: "For serious entrepreneurs",
    features: [
      "All Basic features",
      "Private consultant sessions",
      "Financial performance dashboard",
      "One-year follow-up support",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom financial modeling",
    ],
    notIncluded: [],
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
  },
];

export function Plans() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan for your startup's needs. Upgrade or downgrade anytime.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
                  plan.popular ? "border-teal-500 relative" : "border-gray-200"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold py-2 text-center">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>

                  {/* Subscribe Button */}
                  <Link
                    to={`/payment?plan=${encodeURIComponent(plan.name)}`}
                    className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 block text-center ${
                      plan.popular
                        ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.price === "$0" ? "Get Started" : "Subscribe Now"}
                  </Link>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      What's Included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-teal-600" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feature, i) => (
                        <li key={`not-${i}`} className="flex items-start gap-3 opacity-40">
                          <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-gray-400 text-xs">✕</span>
                          </div>
                          <span className="text-gray-500 text-sm leading-relaxed line-through">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ or Additional Info */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a custom plan?</h2>
            <p className="text-gray-600 mb-6">
              Contact our sales team for enterprise solutions and custom pricing tailored to your needs.
            </p>
            <button className="px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-all font-semibold">
              Contact Sales
            </button>
          </div>

          {/* Money Back Guarantee */}
          <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-700">
              Try any paid plan risk-free. If you're not satisfied within the first 30 days,
              we'll refund your payment—no questions asked.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}