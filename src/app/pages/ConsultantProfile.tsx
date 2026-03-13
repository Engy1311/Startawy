import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Calendar, MapPin, Star, Award, TrendingUp, MessageSquare, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link, useParams } from "react-router";

const consultant = {
  id: 1,
  name: "Sarah Johnson",
  specialization: "Budget Optimization & Financial Planning",
  rating: 4.9,
  reviews: 127,
  experience: "12 years",
  price: 150,
  location: "New York, USA",
  certifications: ["CFA - Chartered Financial Analyst", "CFP - Certified Financial Planner"],
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  bio: "Experienced financial consultant with over 12 years of expertise in helping startups optimize their budgets and achieve sustainable growth. Specialized in financial planning, budget optimization, and strategic financial decision-making.",
  expertise: [
    "Budget Analysis & Optimization",
    "Financial Planning & Forecasting",
    "Cash Flow Management",
    "Cost Reduction Strategies",
    "Investment Planning",
    "Risk Assessment",
  ],
  availability: [
    { day: "Monday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "5:00 PM"] },
    { day: "Thursday", slots: ["9:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Friday", slots: ["10:00 AM", "3:00 PM"] },
  ],
  successStories: [
    "Helped 50+ startups reduce operational costs by 30%",
    "Managed $50M+ in startup budgets",
    "95% client satisfaction rate",
    "Average ROI increase of 45% within 6 months",
  ],
};

export function ConsultantProfile() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Back Button */}
          <Link
            to="/book-consultant"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors"
          >
            ← Back to Consultants
          </Link>

          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar & Quick Info */}
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={consultant.avatar}
                  alt={consultant.name}
                  className="w-40 h-40 rounded-2xl object-cover border-4 border-teal-100 shadow-lg"
                />
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-gray-900">{consultant.rating}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{consultant.reviews} reviews</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{consultant.name}</h1>
                <p className="text-xl text-teal-600 font-medium mb-4">{consultant.specialization}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award className="w-5 h-5 text-teal-600" />
                    <span>{consultant.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span>{consultant.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                    <span className="font-bold">${consultant.price}</span>
                    <span>/session</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{consultant.bio}</p>

                {/* Certifications */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {consultant.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Action Button */}
                <Link to="/book-session-professional">
                  <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2 mb-3">
                    <Calendar className="w-5 h-5" />
                    Book Session
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Areas of Expertise */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {consultant.expertise.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Success Stories & Achievements</h2>
                <div className="space-y-4">
                  {consultant.successStories.map((story, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg">
                      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <p className="text-gray-700 pt-1">{story}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Reviews */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Client Reviews</h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">John Smith</h4>
                        <p className="text-sm text-gray-500">CEO, TechStart Inc.</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "Sarah helped us reduce our operational costs by 35% in just 3 months. Her insights 
                      were invaluable and her approach was very practical. Highly recommended!"
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">Emily Chen</h4>
                        <p className="text-sm text-gray-500">Founder, GrowthHub</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "Excellent consultant! Very knowledgeable and responsive. She provided detailed 
                      financial analysis and actionable recommendations that transformed our business."
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">Michael Rodriguez</h4>
                        <p className="text-sm text-gray-500">Co-founder, FinanceApp</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "Professional and thorough. Sarah's budget optimization strategies helped us 
                      improve our cash flow significantly. Would definitely work with her again!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Available Time Slots</h2>
                
                {/* Session Price */}
                <div className="bg-teal-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Session Price</span>
                    <span className="text-2xl font-bold text-teal-600">${consultant.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">60 minutes per session</p>
                </div>

                {/* Availability Schedule */}
                <div className="space-y-4 mb-6">
                  {consultant.availability.slice(0, 3).map((day, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 mb-2">{day.day}</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {day.slots.map((slot, slotIndex) => (
                          <button
                            key={slotIndex}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 transition-colors text-gray-700"
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-center text-sm text-gray-600">
                  <MessageSquare className="w-4 h-4 inline-block mr-1" />
                  Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
