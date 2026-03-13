import { useState, useEffect } from "react";
import { Link } from "react-router";
import { TrendingUp, MessageSquare, Users, BarChart3, Target, Shield, ArrowRight, CheckCircle, Play, Sparkles, Zap, Award, Globe, Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logoImage from "@/assets/69567af9ba0ecce1dfd02dd8c710a5e15af2845c.png";
import heroImage from "@/assets/c5dab0982181ba976c789e924259b1da6cc1ec63.png";

const features = [
  {
    icon: TrendingUp,
    title: "Budget Analysis",
    description: "Get detailed financial insights and recommendations to optimize your spending and maximize growth.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: MessageSquare,
    title: "StartBot AI Advisory",
    description: "Chat with our AI-powered advisor for instant answers to your business and financial questions.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Expert Consultants",
    description: "Book sessions with certified financial consultants who understand startup challenges.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "Market Research",
    description: "Access industry reports and market insights to stay ahead of trends and competition.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Target,
    title: "Performance Tracking",
    description: "Monitor key financial metrics and KPIs with beautiful, easy-to-understand dashboards.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and protected with enterprise-grade security.",
    color: "from-green-500 to-green-600",
  },
];

const benefits = [
  "Real-time financial insights",
  "AI-powered recommendations",
  "Expert consultant network",
  "24/7 support available",
];

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-teal-950 transition-colors duration-500">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          } border-b border-gray-200 dark:border-gray-800`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="Startawy" className="h-10 object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-0 dark:invert" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
               {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
                How It Works
              </a>
              <a href="#reviews" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
                Reviews
              </a>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animation */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-sm font-medium animate-pulse">
              <Sparkles className="w-4 h-4" />
              Financial Analysis & Business Consulting
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Empower Your Startup with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 mt-2">
                Smart Financial Insights
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Connect with expert financial consultants, get AI-powered recommendations,
              and access market research to grow your business with confidence.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-xl hover:shadow-2xl text-lg font-semibold flex items-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/plans"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all text-lg font-semibold"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transition-colors">
              <img
                src={heroImage}
                alt="Startawy Dashboard - Professional Financial Analysis Platform"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent"></div>

              {/* Overlay Badge */}
              <div className="absolute top-6 left-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Zap className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">AI-Powered Platform</span>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-5 border border-gray-100 dark:border-gray-800 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">500+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Active Startups</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-5 border border-gray-100 dark:border-gray-800 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="absolute bottom-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Global Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Cards */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white/50 dark:bg-gray-800/30 rounded-3xl my-12" id="features">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comprehensive tools and services designed for startup founders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${activeFeature === index ? "ring-2 ring-teal-500 dark:ring-teal-400 scale-105" : "border border-gray-100 dark:border-gray-700"
                  }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="how-it-works">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Startawy Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1515355252367-42ae86cb92f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzI5MjgwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Step 1"
                className="w-full h-48 object-cover opacity-80"
              />
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-teal-600 shadow-lg">
                1
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Sign Up & Setup</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Create your account and tell us about your startup. It takes less than 2 minutes.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXNpcyUyMGRhc2hib2FyZCUyMGNoYXJ0c3xlbnwxfHx8fDE3NzMwNTM1MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Step 2"
                className="w-full h-48 object-cover opacity-80"
              />
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-blue-600 shadow-lg">
                2
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get AI Insights</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Upload your financial data and get instant AI-powered analysis and recommendations.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1589114207353-1fc98a11070b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRhbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczMDEzMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Step 3"
                className="w-full h-48 object-cover opacity-80"
              />
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-purple-600 shadow-lg">
                3
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Connect with Experts</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Book sessions with our certified consultants to get personalized financial guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="reviews">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Successful Founders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See what our clients say about Startawy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Mitchell",
              role: "CEO, TechFlow",
              content: "Startawy helped us optimize our burn rate and secure our Series A. The insights were invaluable!",
              rating: 5,
            },
            {
              name: "James Rodriguez",
              role: "Founder, GrowthHub",
              content: "The AI advisor is like having a CFO on demand. It's been a game-changer for our financial planning.",
              rating: 5,
            },
            {
              name: "Emily Chen",
              role: "Co-founder, DataLabs",
              content: "Working with Startawy consultants helped us reduce costs by 30% while scaling faster than ever.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Startup?</h2>
            <p className="text-xl mb-8 text-teal-50">
              Join hundreds of successful founders who trust Startawy for their financial growth.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl text-lg font-semibold group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logoImage} alt="Startawy" className="h-10 object-contain mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering startups with smart financial insights and expert consulting.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/plans" className="hover:text-teal-400 transition-colors">Pricing</Link></li>
                <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-900 pt-8 text-center text-gray-400 dark:text-gray-500 text-sm">
            © 2026 Startawy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}