import { Link } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { Star, MapPin, Clock, DollarSign, Award, Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const consultants = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialization: "Budget Optimization & Financial Planning",
    rating: 4.9,
    reviews: 127,
    experience: "12 years",
    price: 150,
    location: "New York, USA",
    certifications: ["CFA", "CFP"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    availability: "Available Today",
    availableColor: "green",
  },
  {
    id: 2,
    name: "Michael Chen",
    specialization: "Growth Strategy & Revenue Optimization",
    rating: 4.8,
    reviews: 98,
    experience: "10 years",
    price: 180,
    location: "San Francisco, USA",
    certifications: ["MBA", "CPA"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    availability: "Available Tomorrow",
    availableColor: "blue",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    specialization: "Startup Financial Management",
    rating: 5.0,
    reviews: 156,
    experience: "15 years",
    price: 200,
    location: "Austin, USA",
    certifications: ["CFA", "MBA"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    availability: "Available Today",
    availableColor: "green",
  },
  {
    id: 4,
    name: "David Thompson",
    specialization: "Risk Management & Compliance",
    rating: 4.7,
    reviews: 82,
    experience: "8 years",
    price: 140,
    location: "Boston, USA",
    certifications: ["CRM", "CFP"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    availability: "Available in 2 days",
    availableColor: "gray",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    specialization: "Investment Strategy & Portfolio Management",
    rating: 4.9,
    reviews: 143,
    experience: "14 years",
    price: 190,
    location: "Chicago, USA",
    certifications: ["CFA", "FRM"],
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    availability: "Available Today",
    availableColor: "green",
  },
  {
    id: 6,
    name: "James Wilson",
    specialization: "M&A Advisory & Valuations",
    rating: 4.8,
    reviews: 91,
    experience: "11 years",
    price: 220,
    location: "Los Angeles, USA",
    certifications: ["CFA", "CVA"],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    availability: "Available Tomorrow",
    availableColor: "blue",
  },
];

export function BookConsultant() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar userRole="founder" />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Consultant</h1>
            <p className="text-gray-600">Connect with expert financial consultants for personalized guidance</p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                  <option>All Specializations</option>
                  <option>Budget Optimization</option>
                  <option>Growth Strategy</option>
                  <option>Risk Management</option>
                  <option>Investment Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                  <option>Any Price</option>
                  <option>$100 - $150</option>
                  <option>$150 - $200</option>
                  <option>$200+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                  <option>Any Time</option>
                  <option>Available Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                  <option>Any Rating</option>
                  <option>4.5+ Stars</option>
                  <option>4.8+ Stars</option>
                  <option>5 Stars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consultants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Consultant Header */}
                <div className="p-6 bg-gradient-to-r from-teal-50 to-blue-50">
                  <div className="flex items-center gap-4 mb-4">
                    <ImageWithFallback
                      src={consultant.avatar}
                      alt={consultant.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{consultant.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{consultant.rating}</span>
                        <span className="text-gray-600 text-sm">({consultant.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className={`w-2 h-2 rounded-full ${
                      consultant.availableColor === "green" ? "bg-green-500" :
                      consultant.availableColor === "blue" ? "bg-blue-500" : "bg-gray-400"
                    }`}></div>
                    <span className="text-sm text-gray-700">{consultant.availability}</span>
                  </div>
                </div>

                {/* Consultant Info */}
                <div className="p-6">
                  <p className="text-gray-900 font-medium mb-4 leading-snug">
                    {consultant.specialization}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Award className="w-4 h-4" />
                      <span>{consultant.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{consultant.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold text-gray-900">${consultant.price}</span>
                      <span>/session</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {consultant.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/consultant/${consultant.id}`}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all font-medium text-sm text-center flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Session
                    </Link>
                    <Link
                      to={`/consultant/${consultant.id}`}
                      className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:border-teal-500 hover:text-teal-600 transition-colors font-medium text-sm"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Not sure which consultant to choose?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our AI advisor can help match you with the perfect consultant based on your specific needs and goals.
            </p>
            <Link
              to="/ai-chatbot"
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Get AI Recommendation
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}