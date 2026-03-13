import { useParams, Link } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import {
  Building2,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Globe,
  FileText,
  ArrowLeft,
  Target,
  Briefcase,
} from "lucide-react";

export default function StartupDetails() {
  const { id } = useParams();

  const startup = {
    id: 1,
    name: "TechStart Inc.",
    founder: "John Doe",
    email: "john@techstart.com",
    phone: "+1 (555) 123-4567",
    website: "www.techstart.com",
    location: "San Francisco, CA",
    industry: "Technology / SaaS",
    foundedDate: "January 2024",
    employees: "15-20",
    fundingStage: "Series A",
    fundingAmount: "$2.5M",
    monthlyRevenue: "$45,000",
    burnRate: "$35,000/month",
    runwayMonths: 18,
    description:
      "TechStart Inc. is a B2B SaaS platform that helps small businesses manage their operations more efficiently. Our platform integrates project management, customer relationship management, and financial tracking in one seamless solution.",
    businessModel: "B2B SaaS - Monthly Subscription",
    targetMarket: "Small to medium-sized businesses (10-100 employees)",
    competitiveAdvantage:
      "All-in-one platform with superior UX and affordable pricing",
    keyMetrics: {
      mrr: "$45,000",
      arr: "$540,000",
      customerCount: 150,
      churnRate: "3.5%",
      averageContractValue: "$300/month",
    },
    challenges: [
      "Scaling customer acquisition while maintaining profitability",
      "Improving product-market fit in competitive landscape",
      "Optimizing operational costs and improving cash flow",
      "Building a sustainable growth strategy for Series B",
    ],
    goals: [
      "Achieve $100K MRR by end of Q3 2026",
      "Reduce customer acquisition cost by 20%",
      "Expand team to 30 employees",
      "Launch enterprise tier by Q4 2026",
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="consultant" />
      <div className="flex-1">
        <TopBar userRole="consultant" />

        <main className="p-6 lg:p-8">
          {/* Back Button */}
          <Link
            to="/consultant/recommendations"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recommendations
          </Link>

          {/* Startup Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {startup.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{startup.name}</h1>
                  <p className="text-lg text-teal-600 font-medium mb-2">{startup.industry}</p>
                  <div className="flex items-center gap-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{startup.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{startup.employees} employees</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Founded {startup.foundedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg font-semibold">
                  {startup.fundingStage}
                </span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{startup.description}</p>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{startup.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{startup.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <p className="font-medium text-gray-900">{startup.website}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Metrics */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                  Key Business Metrics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">MRR</p>
                    <p className="text-2xl font-bold text-gray-900">{startup.keyMetrics.mrr}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">ARR</p>
                    <p className="text-2xl font-bold text-gray-900">{startup.keyMetrics.arr}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Customers</p>
                    <p className="text-2xl font-bold text-gray-900">{startup.keyMetrics.customerCount}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Churn Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{startup.keyMetrics.churnRate}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">ACV</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {startup.keyMetrics.averageContractValue}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Runway</p>
                    <p className="text-2xl font-bold text-gray-900">{startup.runwayMonths}m</p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-teal-600" />
                  Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Business Model</label>
                    <p className="text-gray-900 font-medium">{startup.businessModel}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Target Market</label>
                    <p className="text-gray-900 font-medium">{startup.targetMarket}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600 mb-1 block">
                      Competitive Advantage
                    </label>
                    <p className="text-gray-900 font-medium">{startup.competitiveAdvantage}</p>
                  </div>
                </div>
              </div>

              {/* Challenges */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-teal-600" />
                  Current Challenges
                </h2>
                <div className="space-y-3">
                  {startup.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                  Strategic Goals
                </h2>
                <div className="space-y-3">
                  {startup.goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <p className="text-gray-700">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Financial Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-teal-600" />
                  Financial Summary
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Total Funding</p>
                    <p className="text-2xl font-bold text-green-700">{startup.fundingAmount}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-blue-700">{startup.monthlyRevenue}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-gray-600 mb-1">Burn Rate</p>
                    <p className="text-2xl font-bold text-red-700">{startup.burnRate}</p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <p className="text-sm text-gray-600 mb-1">Runway</p>
                    <p className="text-2xl font-bold text-teal-700">{startup.runwayMonths} months</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Link to={`/consultant/client/${id}/schedule-meeting`}>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md font-medium">
                        Schedule Session
                      </button>
                    </Link>
                    <Link to={`/consultant/client/${id}/send-message`}>
                      <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Send Message
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
