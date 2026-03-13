import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import {
  FileText,
  Building2,
  DollarSign,
  TrendingUp,
  Package,
  Truck,
  Megaphone,
  Wallet,
  Sparkles,
  Download,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";

export function GenerateBudgetReport() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Section 1: Business Information
    businessName: "",
    industry: "",
    businessStage: "",
    location: "",
    
    // Section 2: Revenue Information
    productPrice: "",
    monthlySales: "",
    expectedRevenue: "",
    
    // Section 3: Fixed Costs
    rent: "",
    salaries: "",
    softwareSubscriptions: "",
    utilities: "",
    otherFixedCosts: "",
    
    // Section 4: Variable Costs
    costPerProduct: "",
    rawMaterials: "",
    shippingCosts: "",
    packagingCosts: "",
    
    // Section 5: Marketing Budget
    monthlyMarketingBudget: "",
    advertisingSpending: "",
    
    // Section 6: Investment Information
    initialInvestment: "",
    availableMonthlyBudget: "",
    loans: "",
  });

  const [reportGenerated, setReportGenerated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateReport = () => {
    setReportGenerated(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Back Button */}
          <Link
            to="/budget-analysis"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Budget Analysis
          </Link>

          {!reportGenerated ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-teal-600" />
                  Generate Detailed Budget Report
                </h1>
                <p className="text-gray-600">
                  Fill in your business financial data to receive AI-powered budget analysis and recommendations
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Step {step} of {totalSteps}</span>
                  <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Form Sections */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                {/* Section 1: Business Information */}
                {step === 1 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
                        <p className="text-gray-600">Tell us about your business</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Business Name
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="Enter your business name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Industry / Sector
                        </label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        >
                          <option value="">Select industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Finance">Finance</option>
                          <option value="Education">Education</option>
                          <option value="Food & Beverage">Food & Beverage</option>
                          <option value="Retail">Retail</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Business Stage
                        </label>
                        <select
                          name="businessStage"
                          value={formData.businessStage}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                        >
                          <option value="">Select stage</option>
                          <option value="Idea">Idea</option>
                          <option value="Startup">Startup</option>
                          <option value="Growing">Growing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Business Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="Enter location"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 2: Revenue Information */}
                {step === 2 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Revenue Information</h2>
                        <p className="text-gray-600">Provide your revenue details</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Product / Service Price ($)
                        </label>
                        <input
                          type="number"
                          name="productPrice"
                          value={formData.productPrice}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Estimated Monthly Sales
                        </label>
                        <input
                          type="number"
                          name="monthlySales"
                          value={formData.monthlySales}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Expected Monthly Revenue ($)
                        </label>
                        <input
                          type="number"
                          name="expectedRevenue"
                          value={formData.expectedRevenue}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 3: Fixed Costs */}
                {step === 3 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Fixed Costs</h2>
                        <p className="text-gray-600">Enter your monthly fixed expenses</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Rent ($)
                        </label>
                        <input
                          type="number"
                          name="rent"
                          value={formData.rent}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Salaries ($)
                        </label>
                        <input
                          type="number"
                          name="salaries"
                          value={formData.salaries}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Software Subscriptions ($)
                        </label>
                        <input
                          type="number"
                          name="softwareSubscriptions"
                          value={formData.softwareSubscriptions}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Utilities ($)
                        </label>
                        <input
                          type="number"
                          name="utilities"
                          value={formData.utilities}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Other Fixed Costs ($)
                        </label>
                        <input
                          type="number"
                          name="otherFixedCosts"
                          value={formData.otherFixedCosts}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 4: Variable Costs */}
                {step === 4 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Variable Costs</h2>
                        <p className="text-gray-600">Enter your variable expenses</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Cost per Product ($)
                        </label>
                        <input
                          type="number"
                          name="costPerProduct"
                          value={formData.costPerProduct}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Raw Materials ($)
                        </label>
                        <input
                          type="number"
                          name="rawMaterials"
                          value={formData.rawMaterials}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Shipping Costs ($)
                        </label>
                        <input
                          type="number"
                          name="shippingCosts"
                          value={formData.shippingCosts}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Packaging Costs ($)
                        </label>
                        <input
                          type="number"
                          name="packagingCosts"
                          value={formData.packagingCosts}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 5: Marketing Budget */}
                {step === 5 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Megaphone className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Marketing Budget</h2>
                        <p className="text-gray-600">Provide your marketing spend information</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Monthly Marketing Budget ($)
                        </label>
                        <input
                          type="number"
                          name="monthlyMarketingBudget"
                          value={formData.monthlyMarketingBudget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Advertising Spending ($)
                        </label>
                        <input
                          type="number"
                          name="advertisingSpending"
                          value={formData.advertisingSpending}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 6: Investment Information */}
                {step === 6 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Investment Information</h2>
                        <p className="text-gray-600">Enter your investment and funding details</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Initial Investment ($)
                        </label>
                        <input
                          type="number"
                          name="initialInvestment"
                          value={formData.initialInvestment}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Available Monthly Budget ($)
                        </label>
                        <input
                          type="number"
                          name="availableMonthlyBudget"
                          value={formData.availableMonthlyBudget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Loans (Optional) ($)
                        </label>
                        <input
                          type="number"
                          name="loans"
                          value={formData.loans}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {step < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={generateReport}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate Budget Report
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Success Message */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Report Generated Successfully! 🎉
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Your detailed budget analysis report has been generated with AI-powered insights and recommendations.
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Report (PDF)
                </button>
                <Link to="/budget-analysis">
                  <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold">
                    Back to Budget Analysis
                  </button>
                </Link>
              </div>

              <div className="mt-12 p-6 bg-teal-50 rounded-xl text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights from Your Report:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-600">✓</span>
                    <span>Your business is projected to achieve break-even in 6-8 months</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-600">✓</span>
                    <span>Consider reducing fixed costs by 15% to improve profitability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-600">✓</span>
                    <span>Increase marketing budget allocation for better customer acquisition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-600">✓</span>
                    <span>Optimize pricing strategy to improve profit margins by 10-12%</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
