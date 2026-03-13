import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Download, Eye, FileText, Calendar, BarChart2, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function StartawyLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("All Reports");

  const featuredReport = {
    id: 1,
    title: "Q1 2026 Fintech Market Analysis",
    description: "The most comprehensive analysis of the fintech sector including digital payments, blockchain technology, neobanking trends, and regulatory insights.",
    date: "March 1, 2026",
    pages: 68,
    featured: true,
    category: "Fintech",
    badge: "Featured Report",
  };

  const reports = [
    {
      id: 2,
      title: "SaaS Industry Trends Q1 2026",
      description: "Comprehensive analysis of SaaS market trends, pricing strategies, and growth insights on the financial landscape.",
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      pages: 38,
      downloads: 2614,
      category: "SaaS",
      tags: ["SaaS", "Technology", "Trends"],
    },
    {
      id: 3,
      title: "Fintech Market Analysis 2026",
      description: "In-depth research on fintech innovations, regulatory changes, and investment trends shaping the future.",
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      pages: 48,
      downloads: 1897,
      category: "Fintech",
      tags: ["Fintech", "Market", "Investment"],
    },
    {
      id: 4,
      title: "E-Commerce Growth Strategies",
      description: "Explore strategies for scaling e-commerce businesses, including customer acquisition, retention, and optimization.",
      image: "https://images.unsplash.com/photo-1763739527737-e3626d731072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      pages: 38,
      downloads: 1673,
      category: "E-Commerce",
      tags: ["E-Commerce", "Retail", "Growth"],
    },
    {
      id: 5,
      title: "AI & Machine Learning Investment Report",
      description: "Analysis of AI/ML market opportunities, venture capital trends, and technological innovation impact.",
      image: "https://images.unsplash.com/photo-1736430043488-0c369959a5c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      pages: 52,
      downloads: 1418,
      category: "Technology",
      tags: ["AI", "Investment", "Emerging"],
    },
    {
      id: 6,
      title: "Healthcare Startup Landscape",
      description: "Overview of healthcare technology startups, partners, regulatory requirements, and market opportunities in the healthcare sector.",
      image: "https://images.unsplash.com/photo-1659353888101-6e53e32515fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      pages: 25,
      downloads: 763,
      category: "Healthcare",
      tags: ["Healthcare", "Digital Health", "Startups"],
    },
    {
      id: 7,
      title: "Sustainability & Green Tech Markets",
      description: "Research on sustainable business models, green technology innovations, ESG investing, and environmental impact.",
      image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      pages: 34,
      downloads: 1462,
      category: "Environment",
      tags: ["Sustainability", "Green Tech", "ESG"],
    },
  ];

  const categories = ["All Reports", "Fintech", "SaaS", "Technology", "Investment"];

  const filteredReports = selectedCategory === "All Reports"
    ? reports
    : reports.filter(report => report.category === selectedCategory);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Startawy Reports Library</h1>
            <p className="text-gray-600">Access industry insights, trends, and research reports.</p>
          </div>

          {/* Featured Report */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 rounded-full opacity-20 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-700 rounded-full opacity-20 -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                ★ Featured Report
              </span>
              <h2 className="text-3xl font-bold mb-3">{featuredReport.title}</h2>
              <p className="text-teal-100 mb-6 max-w-2xl leading-relaxed">
                {featuredReport.description}
              </p>
              <div className="flex items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{featuredReport.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>{featuredReport.pages} pages</span>
                </div>
              </div>
              <button className="px-8 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg font-semibold flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Report Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-teal-600 text-white rounded-full text-xs font-medium">
                      Finance
                    </span>
                  </div>
                </div>

                {/* Report Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {report.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{report.pages} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart2 className="w-4 h-4" />
                      <span>{report.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {report.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
                <p className="text-gray-600">Based on your business profile and industry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border-2 border-teal-500 bg-teal-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>📊</span> Trending in Your Industry
                </h4>
                <p className="text-gray-700 text-sm">
                  The Fintech Market Analysis report has been viewed 2.6k+ times by similar businesses
                </p>
              </div>

              <div className="p-5 border-2 border-blue-500 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🎯</span> Suggested for You
                </h4>
                <p className="text-gray-700 text-sm">
                  SaaS Industry Trends matches your business stage and growth objectives
                </p>
              </div>

              <div className="p-5 border-2 border-green-500 bg-green-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💡</span> New This Week
                </h4>
                <p className="text-gray-700 text-sm">
                  Sustainability & Green Tech report just published with latest ESG insights
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
